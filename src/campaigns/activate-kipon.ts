/**
 * Ativa as duas campanhas Kipon criadas via API
 */

import { GoogleAdsApi, enums } from 'google-ads-api';
import { config } from 'dotenv';

config();

const CUSTOMER_ID = '1851037564';
const LOGIN_CUSTOMER_ID = '1536142544';

const CAMPAIGN_IDS = [
  '23642996156', // Kipon - Mapeamento Skills - Search
  '23647618306', // Kipon - Humanos+IA - Search
];

const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
});

const customer = client.Customer({
  customer_id: CUSTOMER_ID,
  refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
  login_customer_id: LOGIN_CUSTOMER_ID,
});

async function main() {
  console.log('▶️  Ativando campanhas Kipon...\n');

  await customer.campaigns.update(
    CAMPAIGN_IDS.map(id => ({
      resource_name: `customers/${CUSTOMER_ID}/campaigns/${id}`,
      status: enums.CampaignStatus.ENABLED,
    }))
  );

  for (const id of CAMPAIGN_IDS) {
    console.log(`✅ Campanha ${id} ativada`);
  }

  console.log('\n🚀 Campanhas no ar!');
}

main().catch(console.error);
