import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config();
const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

// Busca todas as métricas da campanha Mapeamento Skills
const { data: campaign } = await sb
  .from('campaigns')
  .select('id, name')
  .eq('google_ads_campaign_id', '23642996156')
  .single();

console.log('Campanha:', campaign);

const { data: metrics } = await sb
  .from('campaign_metrics')
  .select('*')
  .eq('campaign_id', campaign?.id)
  .order('date');

console.log('Métricas:', JSON.stringify(metrics, null, 2));
console.log('Total registros:', metrics?.length);
console.log('Total cost_brl:', metrics?.reduce((sum, m) => sum + m.cost_brl, 0).toFixed(2));
