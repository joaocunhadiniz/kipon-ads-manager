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
    ORDER BY campaign.id
  `;

  const campaigns = await customer.query(query);
  let updated = 0;

  for (const row of campaigns) {
    const c = row.campaign;
    const b = row.campaign_budget;
    const m = row.metrics;

    if (!c?.id) continue;

    await supabase.from('campaigns').upsert({
      google_ads_campaign_id: String(c.id),
      google_ads_customer_id: customerId,
      name: c.name,
      status: c.status === 2 ? 'ENABLED' : 'PAUSED',
      budget_daily_brl: b?.amount_micros ? Number(b.amount_micros) / 1_000_000 : 0,
      channel_type: 'SEARCH',
    }, { onConflict: 'google_ads_campaign_id' });

    if (m) {
      await supabase.from('campaign_metrics').upsert({
        campaign_id: String(c.id),
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
    }

    updated++;
  }

  return updated;
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
