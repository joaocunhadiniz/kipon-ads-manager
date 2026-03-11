import { GoogleAdsApi } from 'google-ads-api';
import { config } from 'dotenv';

config();

const CUSTOMER_ID = '1851037564';
const LOGIN_CUSTOMER_ID = '1536142544';
const CAMPAIGN_IDS = ['23642996156', '23647618306'];
const NEW_BUDGET_BRL = 10; // R$ 10/dia

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
  // Busca os resource_names dos budgets das campanhas
  const rows = await customer.query(`
    SELECT campaign.id, campaign.name, campaign_budget.resource_name
    FROM campaign
    WHERE campaign.id IN (${CAMPAIGN_IDS.join(',')})
  `);

  const updates = rows.map((row: any) => ({
    resource_name: row.campaign_budget.resource_name,
    amount_micros: NEW_BUDGET_BRL * 1_000_000,
  }));

  await customer.campaignBudgets.update(updates);

  for (const row of rows) {
    console.log(`✅ ${row.campaign.name}: R$${NEW_BUDGET_BRL}/dia`);
  }
}

main().catch(console.error);
