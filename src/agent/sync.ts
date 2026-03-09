/**
 * Sync Service — puxa dados do Google Ads e salva no Supabase
 */

import { supabase } from './supabase-client.js';
import { log } from './logger.js';
import GoogleAdsClient from '../services/google-ads-client.js';

export async function syncCampaigns(): Promise<number> {
  await log({ action: 'SYNC_STARTED', status: 'info', message: 'Iniciando sync de campanhas' });

  try {
    const adsClient = GoogleAdsClient.getInstance();
    const campaigns = await adsClient.listCampaigns();

    let updated = 0;

    for (const row of campaigns) {
      const c = row.campaign;
      const b = row.campaign_budget;
      const m = row.metrics;

      if (!c?.id) continue;

      // Upsert campanha
      await supabase.from('campaigns').upsert({
        google_ads_campaign_id: String(c.id),
        google_ads_customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID,
        name: c.name,
        status: c.status === 2 ? 'ENABLED' : 'PAUSED',
        budget_daily_brl: b?.amount_micros ? Number(b.amount_micros) / 1_000_000 : 0,
        channel_type: 'SEARCH',
      }, { onConflict: 'google_ads_campaign_id' });

      // Inserir métricas do dia
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

    await supabase.from('sync_log').insert({
      synced_at: new Date().toISOString(),
      status: 'success',
      records_updated: updated,
    });

    await log({
      action: 'SYNC_COMPLETED',
      status: 'success',
      message: `Sync concluído — ${updated} campanhas atualizadas`,
    });

    return updated;
  } catch (error: any) {
    await log({
      action: 'SYNC_FAILED',
      status: 'error',
      message: `Erro no sync: ${error?.message ?? error}`,
    });
    throw error;
  }
}
