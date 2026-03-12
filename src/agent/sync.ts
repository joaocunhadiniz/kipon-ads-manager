/**
 * Sync Service — puxa dados do Google Ads e salva no Supabase
 * Sincroniza todas as contas cliente vinculadas ao MCC
 */

import { GoogleAdsApi } from 'google-ads-api';
import { supabase } from './supabase-client.js';
import { log } from './logger.js';
import { googleAdsAuthConfig } from '../config/google-ads.config.js';

const CUSTOMER_IDS = ['1851037564', '8888978544']; // kipon + Kipon
const LOGIN_CUSTOMER_ID = '1536142544'; // Kipon Manager MCC
const BILLING_CUSTOMER_ID = '1851037564'; // conta onde o crédito foi adicionado

async function syncAccount(customerId: string): Promise<number> {
  const client = new GoogleAdsApi({
    client_id: googleAdsAuthConfig.client_id,
    client_secret: googleAdsAuthConfig.client_secret,
    developer_token: googleAdsAuthConfig.developer_token,
  });

  const customer = client.Customer({
    customer_id: customerId,
    refresh_token: googleAdsAuthConfig.refresh_token,
    login_customer_id: LOGIN_CUSTOMER_ID,
  });

  const query = `
    SELECT
      campaign.id,
      campaign.name,
      campaign.status,
      campaign.advertising_channel_type,
      campaign_budget.amount_micros,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions
    FROM campaign
    WHERE campaign.status != 'REMOVED'
    ORDER BY campaign.id
  `;

  const campaigns = await customer.query(query);
  let updated = 0;

  for (const row of campaigns) {
    const c = row.campaign;
    const b = row.campaign_budget;
    const m = row.metrics;

    if (!c?.id) continue;

    const { data: upserted } = await supabase.from('campaigns').upsert({
      google_ads_campaign_id: String(c.id),
      google_ads_customer_id: customerId,
      name: c.name,
      status: c.status === 2 ? 'ENABLED' : 'PAUSED',
      budget_daily_brl: b?.amount_micros ? Number(b.amount_micros) / 1_000_000 : 0,
      channel_type: 'SEARCH',
    }, { onConflict: 'google_ads_campaign_id' }).select('id').single();

    const campaignUuid = upserted?.id;

    if (m && campaignUuid) {
      const { error: metricsError } = await supabase.from('campaign_metrics').upsert({
        campaign_id: campaignUuid,
        date: new Date().toISOString().split('T')[0],
        impressions: Number(m.impressions ?? 0),
        clicks: Number(m.clicks ?? 0),
        cost_brl: Number(m.cost_micros ?? 0) / 1_000_000,
        conversions: Number(m.conversions ?? 0),
        ctr: Number(m.impressions ?? 0) > 0
          ? (Number(m.clicks ?? 0) / Number(m.impressions ?? 0)) * 100
          : 0,
        avg_cpc: Number(m.clicks ?? 0) > 0
          ? (Number(m.cost_micros ?? 0) / 1_000_000) / Number(m.clicks ?? 0)
          : 0,
      }, { onConflict: 'campaign_id,date' });
      if (metricsError) console.error(`Erro ao salvar métricas para ${c.name}:`, metricsError.message);
    }

    updated++;
  }

  return updated;
}

async function syncAccountBalance(): Promise<void> {
  const client = new GoogleAdsApi({
    client_id: googleAdsAuthConfig.client_id,
    client_secret: googleAdsAuthConfig.client_secret,
    developer_token: googleAdsAuthConfig.developer_token,
  });

  const customer = client.Customer({
    customer_id: BILLING_CUSTOMER_ID,
    refresh_token: googleAdsAuthConfig.refresh_token,
    login_customer_id: LOGIN_CUSTOMER_ID,
  });

  try {
    const rows = await customer.query(`
      SELECT
        account_budget.approved_spending_limit_micros,
        account_budget.amount_served_micros,
        account_budget.adjusted_spending_limit_micros
      FROM account_budget
      WHERE account_budget.status = 'APPROVED'
    `);

    if (rows.length === 0) return;

    const budget = rows[0].account_budget;
    const limit = Number(budget?.adjusted_spending_limit_micros ?? budget?.approved_spending_limit_micros ?? 0);
    const served = Number(budget?.amount_served_micros ?? 0);
    const remaining = (limit - served) / 1_000_000;
    const total = limit / 1_000_000;

    await supabase.from('account_config').upsert({
      key: 'credit_brl',
      value: String(Math.max(0, remaining)),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'key' });

    await supabase.from('account_config').upsert({
      key: 'credit_total_brl',
      value: String(total),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'key' });
  } catch {
    // account_budget pode não estar disponível em todas as contas — ignora silenciosamente
  }
}

export async function syncCampaigns(): Promise<number> {
  await log({ action: 'SYNC_STARTED', status: 'info', message: 'Iniciando sync de todas as contas' });

  let totalUpdated = 0;

  try {
    for (const customerId of CUSTOMER_IDS) {
      try {
        const updated = await syncAccount(customerId);
        totalUpdated += updated;
        await log({
          action: 'SYNC_COMPLETED',
          status: 'success',
          message: `Conta ${customerId}: ${updated} campanhas sincronizadas`,
        });
      } catch (err: any) {
        await log({
          action: 'SYNC_FAILED',
          status: 'error',
          message: `Erro na conta ${customerId}: ${err?.message ?? err}`,
        });
      }
    }

    await syncAccountBalance();

    await supabase.from('sync_log').insert({
      synced_at: new Date().toISOString(),
      status: 'success',
      records_updated: totalUpdated,
    });

    await log({
      action: 'SYNC_COMPLETED',
      status: 'success',
      message: `Sync completo — ${totalUpdated} campanhas atualizadas em ${CUSTOMER_IDS.length} contas`,
    });

    return totalUpdated;
  } catch (error: any) {
    await log({
      action: 'SYNC_FAILED',
      status: 'error',
      message: `Erro geral no sync: ${error?.message ?? error}`,
    });
    throw error;
  }
}

// Permite rodar diretamente: npm run agent:sync
const isDirectRun = process.argv[1]?.endsWith('sync.ts') || process.argv[1]?.endsWith('sync.js');
if (isDirectRun) {
  syncCampaigns()
    .then(n => console.log(`✅ ${n} campanhas sincronizadas`))
    .catch(console.error);
}
