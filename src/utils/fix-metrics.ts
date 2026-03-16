/**
 * Limpa campaign_metrics e re-popula com dados diários corretos
 * via Google Ads API com segments.date
 */
import { GoogleAdsApi } from 'google-ads-api';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config();

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const CUSTOMER_IDS = ['1851037564', '8888978544'];
const LOGIN_CUSTOMER_ID = '1536142544';

const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
});

// 1. Limpar tabela
console.log('🗑️  Limpando campaign_metrics...');
const { error: deleteError } = await supabase.from('campaign_metrics').delete().neq('id', '00000000-0000-0000-0000-000000000000');
if (deleteError) console.error('Erro ao limpar:', deleteError.message);
else console.log('✅ Tabela limpa');

// 2. Re-popular com dados diários dos últimos 7 dias
const dates: string[] = [];
for (let i = 6; i >= 0; i--) {
  const d = new Date();
  d.setDate(d.getDate() - i);
  dates.push(d.toISOString().split('T')[0]);
}

console.log(`\n📅 Buscando dados para: ${dates.join(', ')}\n`);

for (const customerId of CUSTOMER_IDS) {
  const customer = client.Customer({
    customer_id: customerId,
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
    login_customer_id: LOGIN_CUSTOMER_ID,
  });

  for (const date of dates) {
    try {
      const rows = await customer.query(`
        SELECT
          campaign.id,
          campaign.name,
          metrics.impressions,
          metrics.clicks,
          metrics.cost_micros,
          metrics.conversions,
          segments.date
        FROM campaign
        WHERE campaign.status != 'REMOVED'
          AND segments.date = '${date}'
      `);

      for (const row of rows) {
        const c = row.campaign;
        const m = row.metrics;
        if (!c?.id) continue;

        const { data: camp } = await supabase
          .from('campaigns')
          .select('id')
          .eq('google_ads_campaign_id', String(c.id))
          .single();

        if (!camp?.id) continue;

        const { error } = await supabase.from('campaign_metrics').upsert({
          campaign_id: camp.id,
          date,
          impressions: Number(m?.impressions ?? 0),
          clicks: Number(m?.clicks ?? 0),
          cost_brl: Number(m?.cost_micros ?? 0) / 1_000_000,
          conversions: Number(m?.conversions ?? 0),
          ctr: Number(m?.impressions ?? 0) > 0
            ? (Number(m?.clicks ?? 0) / Number(m?.impressions ?? 0)) * 100 : 0,
          avg_cpc: Number(m?.clicks ?? 0) > 0
            ? (Number(m?.cost_micros ?? 0) / 1_000_000) / Number(m?.clicks ?? 0) : 0,
        }, { onConflict: 'campaign_id,date' });

        if (error) console.error(`Erro ${c.name} ${date}:`, error.message);
        else console.log(`✅ ${c.name} | ${date} | ${Number(m?.cost_micros ?? 0) / 1_000_000} BRL`);
      }
    } catch (e: any) {
      // Ignora erros de datas sem dados
    }
  }
}

console.log('\n✅ Métricas corrigidas!');
