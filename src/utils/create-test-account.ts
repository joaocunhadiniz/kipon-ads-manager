/**
 * Cria uma conta de teste vinculada ao MCC via Google Ads API
 */

import { GoogleAdsApi } from 'google-ads-api';
import { config } from 'dotenv';

config();

async function createTestAccount() {
  console.log('🧪 Criando conta de teste no Google Ads...\n');

  const client = new GoogleAdsApi({
    client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
    client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
    developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
  });

  // Usa o MCC como login customer
  const manager = client.Customer({
    customer_id: '1536142544', // Kipon Manager MCC
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
    login_customer_id: '1536142544',
  });

  try {
    const result = await manager.mutateResources([
      {
        _resource: 'CustomerClient',
        // @ts-ignore
        customer: {
          descriptive_name: 'Kipon Test Account',
          currency_code: 'BRL',
          time_zone: 'America/Sao_Paulo',
          test_account: true,
        },
        email_address: process.env.GOOGLE_ADS_CONTACT_EMAIL || 'joao@kipon.io',
        access_role: 'ADMIN',
      },
    ]);

    console.log('✅ Conta de teste criada!');
    console.log(result);
  } catch (error: any) {
    // Tenta via CustomerService diretamente
    console.log('Tentando método alternativo...');
    console.error(error?.errors?.[0]?.message || error);
  }
}

createTestAccount().catch(console.error);
