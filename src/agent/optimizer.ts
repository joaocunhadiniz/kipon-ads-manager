/**
 * Optimizer — avalia métricas, aplica regras e usa Claude para decisões inteligentes
 */

import OpenAI from 'openai';
import { supabase } from './supabase-client.js';
import { log } from './logger.js';
import { defaultRules, type CampaignMetrics } from './rules.js';
import GoogleAdsClient from '../services/google-ads-client.js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function fetchMetrics(): Promise<CampaignMetrics[]> {
  const { data } = await supabase.rpc('get_campaign_metrics_7d');
  return data ?? [];
}

async function applyRule(rule: typeof defaultRules[0], metrics: CampaignMetrics): Promise<void> {
  await log({
    action: 'RULE_TRIGGERED',
    status: 'info',
    campaign_id: metrics.campaign_id,
    message: `Regra "${rule.name}" acionada para "${metrics.campaign_name}"`,
    metadata: { rule_id: rule.id, action: rule.action, metrics },
  });

  const adsClient = GoogleAdsClient.getInstance();

  switch (rule.action) {
    case 'PAUSE_CAMPAIGN':
      // await adsClient.pauseCampaign(metrics.campaign_id);
      await supabase.from('campaigns')
        .update({ status: 'PAUSED' })
        .eq('google_ads_campaign_id', metrics.campaign_id);
      await log({
        action: 'CAMPAIGN_PAUSED',
        status: 'success',
        campaign_id: metrics.campaign_id,
        message: `Campanha "${metrics.campaign_name}" pausada automaticamente`,
      });
      break;

    case 'ACTIVATE_CAMPAIGN':
      // await adsClient.activateCampaign(metrics.campaign_id);
      await supabase.from('campaigns')
        .update({ status: 'ENABLED' })
        .eq('google_ads_campaign_id', metrics.campaign_id);
      await log({
        action: 'CAMPAIGN_ACTIVATED',
        status: 'success',
        campaign_id: metrics.campaign_id,
        message: `Campanha "${metrics.campaign_name}" ativada automaticamente`,
      });
      break;

    case 'REDUCE_BUDGET':
    case 'INCREASE_BUDGET': {
      const factor = rule.action === 'REDUCE_BUDGET'
        ? 1 - (rule.actionValue! / 100)
        : 1 + (rule.actionValue! / 100);
      const newBudget = Math.round(metrics.budget_daily_brl * factor * 100) / 100;
      await supabase.from('campaigns')
        .update({ budget_daily_brl: newBudget })
        .eq('google_ads_campaign_id', metrics.campaign_id);
      await log({
        action: 'BUDGET_ADJUSTED',
        status: 'success',
        campaign_id: metrics.campaign_id,
        message: `Orçamento de "${metrics.campaign_name}" ajustado: R$${metrics.budget_daily_brl} → R$${newBudget}`,
      });
      break;
    }

    case 'ALERT':
      await log({
        action: 'RULE_TRIGGERED',
        status: 'error',
        campaign_id: metrics.campaign_id,
        message: `ALERTA: "${metrics.campaign_name}" — ${rule.description}`,
        metadata: { metrics },
      });
      break;
  }
}

async function aiWeeklyAnalysis(allMetrics: CampaignMetrics[]): Promise<void> {
  await log({ action: 'OPTIMIZATION_STARTED', status: 'info', message: 'Iniciando análise semanal com IA' });

  const prompt = `Você é um especialista em Google Ads para a Kipon, empresa B2B de consultoria.

Analise as métricas das campanhas abaixo e forneça recomendações práticas:

${JSON.stringify(allMetrics, null, 2)}

Responda em português com:
1. Resumo da performance geral (2-3 frases)
2. Principal problema identificado
3. 3 ações prioritárias para esta semana
4. Estimativa de melhoria esperada se as ações forem implementadas`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });

  const analysis = response.choices[0].message.content ?? '';

  await supabase.from('agent_logs').insert({
    action: 'AI_DECISION',
    status: 'success',
    message: 'Análise semanal de IA concluída',
    metadata: { analysis },
    created_at: new Date().toISOString(),
  });

  await log({
    action: 'OPTIMIZATION_COMPLETED',
    status: 'success',
    message: 'Análise semanal concluída',
    metadata: { analysis },
  });

  console.log('\n📊 Análise Semanal IA:\n', analysis);
}

export async function runOptimizer(weeklyAnalysis = false): Promise<void> {
  const metrics = await fetchMetrics();

  if (metrics.length === 0) {
    console.log('Sem métricas disponíveis para otimização.');
    return;
  }

  // Avaliar regras para cada campanha
  for (const m of metrics) {
    for (const rule of defaultRules) {
      if (rule.enabled && rule.condition(m)) {
        await applyRule(rule, m);
      }
    }
  }

  // Análise semanal com IA (apenas aos domingos ou quando solicitado)
  if (weeklyAnalysis) {
    await aiWeeklyAnalysis(metrics);
  }
}
