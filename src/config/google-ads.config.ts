import { env } from './env.js';

export interface GoogleAdsConfig {
  developer_token: string;
  client_id: string;
  client_secret: string;
  refresh_token: string;
}

export interface CustomerConfig {
  customer_id: string;
  login_customer_id?: string;
}

/**
 * Configuração de autenticação da Google Ads API
 */
export const googleAdsAuthConfig: GoogleAdsConfig = {
  developer_token: env.GOOGLE_ADS_DEVELOPER_TOKEN,
  client_id: env.GOOGLE_ADS_CLIENT_ID,
  client_secret: env.GOOGLE_ADS_CLIENT_SECRET,
  refresh_token: env.GOOGLE_ADS_REFRESH_TOKEN,
};

/**
 * Configuração da conta do cliente
 */
export const customerConfig: CustomerConfig = {
  customer_id: env.GOOGLE_ADS_CUSTOMER_ID,
  login_customer_id: env.GOOGLE_ADS_LOGIN_CUSTOMER_ID,
};

/**
 * Função helper para formatar Customer ID (remove hífens se presentes)
 */
export function formatCustomerId(customerId: string): string {
  return customerId.replace(/-/g, '');
}
