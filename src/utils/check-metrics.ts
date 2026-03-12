import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config();
const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const { data } = await sb
  .from('campaign_metrics')
  .select('campaign_id, date, impressions, clicks, cost_brl')
  .order('date', { ascending: false })
  .limit(15);
console.log(JSON.stringify(data, null, 2));
