/**
 * Registra o crédito inicial no Supabase
 * Uso: npx tsx src/utils/setup-credit.ts 100
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const amount = parseFloat(process.argv[2] ?? '0');

if (!amount) {
  console.error('Uso: npx tsx src/utils/setup-credit.ts <valor>');
  console.error('Exemplo: npx tsx src/utils/setup-credit.ts 100');
  process.exit(1);
}

const { error } = await supabase.from('account_config').upsert({
  key: 'credit_brl',
  value: String(amount),
  updated_at: new Date().toISOString(),
}, { onConflict: 'key' });

if (error) {
  console.error('Erro:', error.message);
  console.log('\n👉 Crie a tabela no Supabase primeiro:');
  console.log(`
CREATE TABLE account_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
  `);
  process.exit(1);
}

console.log(`✅ Crédito de R$ ${amount.toFixed(2)} registrado no Supabase`);
