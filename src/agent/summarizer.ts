/**
 * Summarizer — gera resumos diários e semanais das ações do agente
 * e salva na tabela agent_summaries do Supabase
 */

import { supabase } from './supabase-client.js';
import { log } from './logger.js';

export interface DailySummary {
  date: string;
  campaigns_synced: number;
  rules_triggered: number;
  campaigns_paused: number;
  campaigns_activated: number;
  budgets_adjusted: number;
  sync_errors: number;
  total_cost_brl: number;
  total_clicks: number;
  total_impressions: number;
}

export interface WeeklySummary {
  week_start: string;
  week_end: string;
  total_cost_brl: number;
  total_clicks: number;
  total_impressions: number;
  avg_ctr: number;
  avg_cpc: number;
  total_conversions: number;
  agent_actions: number;
  ai_analysis: string;
  prev_week_cost_brl: number;
  prev_week_clicks: number;
}

export async function generateDailySummary(): Promise<void> {
  const today = new Date().toISOString().split('T')[0];
  const startOfDay = `${today}T00:00:00.000Z`;

  // Busca logs do dia
  const { data: logs } = await supabase
    .from('agent_logs')
    .select('*')
    .gte('created_at', startOfDay);

  if (!logs) return;

  const summary: DailySummary = {
    date: today,
    campaigns_synced: logs.filter(l => l.message?.includes('SYNC_COMPLETED')).length,
    rules_triggered: logs.filter(l => l.message?.includes('RULE_TRIGGERED')).length,
    campaigns_paused: logs.filter(l => l.message?.includes('CAMPAIGN_PAUSED')).length,
    campaigns_activated: logs.filter(l => l.message?.includes('CAMPAIGN_ACTIVATED')).length,
    budgets_adjusted: logs.filter(l => l.message?.includes('BUDGET_ADJUSTED')).length,
    sync_errors: logs.filter(l => l.level === 'error').length,
    total_cost_brl: 0,
    total_clicks: 0,
    total_impressions: 0,
  };

  // Busca métricas do dia
  const { data: metrics } = await supabase
    .from('campaign_metrics')
    .select('cost_brl, clicks, impressions')
    .eq('date', today);

  if (metrics) {
    summary.total_cost_brl = metrics.reduce((s, m) => s + (m.cost_brl ?? 0), 0);
    summary.total_clicks = metrics.reduce((s, m) => s + (m.clicks ?? 0), 0);
    summary.total_impressions = metrics.reduce((s, m) => s + (m.impressions ?? 0), 0);
  }

  await supabase.from('agent_summaries').upsert({
    type: 'daily',
    period_start: today,
    period_end: today,
    data: summary,
    created_at: new Date().toISOString(),
  }, { onConflict: 'type,period_start' });

  await log({
    action: 'OPTIMIZATION_COMPLETED',
    status: 'success',
    message: `Resumo diário gerado — ${summary.campaigns_synced} syncs, ${summary.rules_triggered} regras, R$${summary.total_cost_brl.toFixed(2)} gasto`,
    metadata: summary,
  });
}

export async function generateWeeklySummary(aiAnalysis: string): Promise<void> {
  const now = new Date();
  const weekEnd = now.toISOString().split('T')[0];
  const weekStart = new Date(now.setDate(now.getDate() - 6)).toISOString().split('T')[0];
  const prevWeekStart = new Date(now.setDate(now.getDate() - 7)).toISOString().split('T')[0];

  // Métricas da semana atual
  const { data: currentMetrics } = await supabase
    .from('campaign_metrics')
    .select('cost_brl, clicks, impressions, conversions, ctr, avg_cpc')
    .gte('date', weekStart)
    .lte('date', weekEnd);

  // Métricas da semana anterior (para comparativo)
  const { data: prevMetrics } = await supabase
    .from('campaign_metrics')
    .select('cost_brl, clicks')
    .gte('date', prevWeekStart)
    .lt('date', weekStart);

  // Ações do agente na semana
  const { data: logs } = await supabase
    .from('agent_logs')
    .select('id')
    .gte('created_at', `${weekStart}T00:00:00.000Z`);

  const cm = currentMetrics ?? [];
  const pm = prevMetrics ?? [];

  const totalImpressions = cm.reduce((s, m) => s + (m.impressions ?? 0), 0);
  const totalClicks = cm.reduce((s, m) => s + (m.clicks ?? 0), 0);
  const totalCost = cm.reduce((s, m) => s + (m.cost_brl ?? 0), 0);

  const summary: WeeklySummary = {
    week_start: weekStart,
    week_end: weekEnd,
    total_cost_brl: totalCost,
    total_clicks: totalClicks,
    total_impressions: totalImpressions,
    avg_ctr: totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0,
    avg_cpc: totalClicks > 0 ? totalCost / totalClicks : 0,
    total_conversions: cm.reduce((s, m) => s + (m.conversions ?? 0), 0),
    agent_actions: logs?.length ?? 0,
    ai_analysis: aiAnalysis,
    prev_week_cost_brl: pm.reduce((s, m) => s + (m.cost_brl ?? 0), 0),
    prev_week_clicks: pm.reduce((s, m) => s + (m.clicks ?? 0), 0),
  };

  await supabase.from('agent_summaries').upsert({
    type: 'weekly',
    period_start: weekStart,
    period_end: weekEnd,
    data: summary,
    created_at: new Date().toISOString(),
  }, { onConflict: 'type,period_start' });

  await log({
    action: 'OPTIMIZATION_COMPLETED',
    status: 'success',
    message: `Resumo semanal gerado — ${totalClicks} cliques, R$${totalCost.toFixed(2)} gasto, ${summary.agent_actions} ações do agente`,
    metadata: summary,
  });
}
