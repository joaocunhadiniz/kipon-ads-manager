import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config();
const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const { data: campaigns } = await sb.from('campaigns').select('id, google_ads_campaign_id, name').limit(5);
console.log('campaigns:', JSON.stringify(campaigns, null, 2));

// Testa inserir uma métrica
const c = campaigns?.[0];
if (c) {
  const { error } = await sb.from('campaign_metrics').upsert({
    campaign_id: c.google_ads_campaign_id,
    date: '2026-03-11',
    impressions: 1,
    clicks: 0,
    cost_brl: 0,
    conversions: 0,
    ctr: 0,
    avg_cpc: 0,
  }, { onConflict: 'campaign_id,date' });
  console.log('insert com google_ads_campaign_id:', error?.message ?? 'OK');

  const { error: error2 } = await sb.from('campaign_metrics').upsert({
    campaign_id: c.id,
    date: '2026-03-11',
    impressions: 1,
    clicks: 0,
    cost_brl: 0,
    conversions: 0,
    ctr: 0,
    avg_cpc: 0,
  }, { onConflict: 'campaign_id,date' });
  console.log('insert com uuid:', error2?.message ?? 'OK');
}
