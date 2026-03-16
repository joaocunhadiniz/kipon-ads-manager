import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config();
const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const { data, error } = await sb.from('agent_summaries').select('*').order('created_at', { ascending: false }).limit(5);
console.log('agent_summaries:', JSON.stringify(data, null, 2));
if (error) console.log('erro:', error.message);
