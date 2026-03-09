import { GoogleAdsApi, Customer } from 'google-ads-api';
import { googleAdsAuthConfig, customerConfig, formatCustomerId } from '../config/google-ads.config.js';

/**
 * Cliente singleton para Google Ads API
 */
class GoogleAdsClient {
  private static instance: GoogleAdsClient;
  private client: GoogleAdsApi;
  private customer: Customer;

  private constructor() {
    // Inicializar cliente da Google Ads API
    this.client = new GoogleAdsApi({
      client_id: googleAdsAuthConfig.client_id,
      client_secret: googleAdsAuthConfig.client_secret,
      developer_token: googleAdsAuthConfig.developer_token,
    });

    // Inicializar customer
    const customerId = formatCustomerId(customerConfig.customer_id);
    this.customer = this.client.Customer({
      customer_id: customerId,
      refresh_token: googleAdsAuthConfig.refresh_token,
      login_customer_id: customerConfig.login_customer_id
        ? formatCustomerId(customerConfig.login_customer_id)
        : undefined,
    });

    console.log(`✅ Google Ads Client inicializado para Customer ID: ${customerId}`);
  }

  /**
   * Retorna a instância singleton do cliente
   */
  public static getInstance(): GoogleAdsClient {
    if (!GoogleAdsClient.instance) {
      GoogleAdsClient.instance = new GoogleAdsClient();
    }
    return GoogleAdsClient.instance;
  }

  /**
   * Retorna o objeto Customer para realizar operações
   */
  public getCustomer(): Customer {
    return this.customer;
  }

  /**
   * Retorna o cliente da API
   */
  public getClient(): GoogleAdsApi {
    return this.client;
  }

  /**
   * Testa a conexão com a API
   */
  public async testConnection(): Promise<boolean> {
    try {
      const query = `
        SELECT
          customer.id,
          customer.descriptive_name,
          customer.currency_code,
          customer.time_zone
        FROM customer
        LIMIT 1
      `;

      const result = await this.customer.query(query);
      const customerInfo = result[0];

      console.log('✅ Conexão bem-sucedida!');
      console.log('📊 Informações da conta:');
      console.log(`   - ID: ${customerInfo.customer?.id}`);
      console.log(`   - Nome: ${customerInfo.customer?.descriptive_name}`);
      console.log(`   - Moeda: ${customerInfo.customer?.currency_code}`);
      console.log(`   - Fuso horário: ${customerInfo.customer?.time_zone}`);

      return true;
    } catch (error) {
      console.error('❌ Erro ao conectar com Google Ads API:', error);
      return false;
    }
  }

  /**
   * Lista todas as campanhas da conta
   */
  public async listCampaigns(): Promise<any[]> {
    try {
      const query = `
        SELECT
          campaign.id,
          campaign.name,
          campaign.status,
          campaign.advertising_channel_type,
          campaign_budget.amount_micros,
          metrics.impressions,
          metrics.clicks,
          metrics.cost_micros
        FROM campaign
        ORDER BY campaign.id
      `;

      const campaigns = await this.customer.query(query);
      return campaigns;
    } catch (error) {
      console.error('❌ Erro ao listar campanhas:', error);
      throw error;
    }
  }

  /**
   * Busca uma campanha específica pelo nome
   */
  public async getCampaignByName(name: string): Promise<any | null> {
    try {
      const query = `
        SELECT
          campaign.id,
          campaign.name,
          campaign.status
        FROM campaign
        WHERE campaign.name = '${name}'
        LIMIT 1
      `;

      const campaigns = await this.customer.query(query);
      return campaigns.length > 0 ? campaigns[0] : null;
    } catch (error) {
      console.error(`❌ Erro ao buscar campanha "${name}":`, error);
      return null;
    }
  }
}

export default GoogleAdsClient;
