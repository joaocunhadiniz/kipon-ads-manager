import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config();
const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const { data } = await sb.from('campaigns').select('name, status, google_ads_customer_id').order('google_ads_customer_id');
console.log(JSON.stringify(data, null, 2));
