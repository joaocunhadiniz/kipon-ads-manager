import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config();
const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const { data, error } = await sb.rpc('get_campaign_metrics_7d');
console.log('data:', JSON.stringify(data, null, 2));
console.log('error:', error?.message ?? 'nenhum');
