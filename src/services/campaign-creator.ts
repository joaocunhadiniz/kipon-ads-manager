/**
 * Serviço para criação de campanhas Google Ads
 */

import { Customer } from 'google-ads-api';
import type { LandingPageCampaign } from '../types/google-ads.types.js';
import { formatCustomerId } from '../config/google-ads.config.js';

export class CampaignCreator {
  constructor(private customer: Customer) {}

  /**
   * Cria uma campanha completa com ad groups, keywords e ads
   */
  async createCampaign(config: LandingPageCampaign): Promise<{
    campaignId: string;
    budgetId: string;
    adGroupIds: string[];
  }> {
    console.log(`\n📊 Criando campanha: ${config.campaign.name}`);

    try {
      // 1. Criar Budget
      const budgetId = await this.createBudget(config.campaign.name, config.campaign.budget);
      console.log(`✅ Budget criado: ${budgetId}`);

      // 2. Criar Campaign
      const campaignId = await this.createCampaignResource(config.campaign, budgetId);
      console.log(`✅ Campanha criada: ${campaignId}`);

      // 3. Criar Ad Groups, Keywords e Ads
      const adGroupIds: string[] = [];
      for (const adGroupConfig of config.adGroups) {
        const adGroupId = await this.createAdGroup(
          campaignId,
          adGroupConfig.adGroup.name,
          adGroupConfig.adGroup.status
        );
        adGroupIds.push(adGroupId);
        console.log(`✅ Ad Group criado: ${adGroupConfig.adGroup.name} (${adGroupId})`);

        // Adicionar Keywords
        await this.addKeywords(adGroupId, adGroupConfig.keywords);
        console.log(`  ✅ ${adGroupConfig.keywords.length} keywords adicionadas`);

        // Adicionar Ads
        for (const adConfig of adGroupConfig.ads) {
          await this.createResponsiveSearchAd(adGroupId, adConfig);
        }
        console.log(`  ✅ ${adGroupConfig.ads.length} anúncios criados`);
      }

      console.log(`\n✅ Campanha "${config.campaign.name}" criada com sucesso!`);
      console.log(`   - Campaign ID: ${campaignId}`);
      console.log(`   - ${adGroupIds.length} Ad Groups`);

      return { campaignId, budgetId, adGroupIds };
    } catch (error) {
      console.error(`❌ Erro ao criar campanha "${config.campaign.name}":`, error);
      throw error;
    }
  }

  /**
   * Cria um Budget
   */
  private async createBudget(name: string, budgetConfig: any): Promise<string> {
    const budget = {
      name: `Budget - ${name}`,
      amount_micros: budgetConfig.amountMicros,
      delivery_method: budgetConfig.deliveryMethod,
    };

    const response = await this.customer.campaignBudgets.create([budget]);
    return response.results[0].resource_name;
  }

  /**
   * Cria uma Campaign
   */
  private async createCampaignResource(campaignConfig: any, budgetResourceName: string): Promise<string> {
    const campaign = {
      name: campaignConfig.name,
      status: campaignConfig.status || 'PAUSED',
      advertising_channel_type: campaignConfig.advertisingChannelType,
      campaign_budget: budgetResourceName,
      network_settings: campaignConfig.networkSettings || {
        target_google_search: true,
        target_search_network: true,
        target_content_network: false,
        target_partner_search_network: false,
      },
      start_date: campaignConfig.startDate,
      end_date: campaignConfig.endDate,
    };

    // Adicionar bidding strategy
    if (campaignConfig.biddingStrategy.type === 'MAXIMIZE_CONVERSIONS') {
      (campaign as any).maximize_conversions = {};
    } else if (campaignConfig.biddingStrategy.type === 'TARGET_CPA') {
      (campaign as any).target_cpa = {
        target_cpa_micros: campaignConfig.biddingStrategy.targetCpaMicros,
      };
    } else if (campaignConfig.biddingStrategy.type === 'MANUAL_CPC') {
      (campaign as any).manual_cpc = {
        enhanced_cpc_enabled: true,
      };
    }

    const response = await this.customer.campaigns.create([campaign]);
    return response.results[0].resource_name;
  }

  /**
   * Cria um Ad Group
   */
  private async createAdGroup(
    campaignResourceName: string,
    name: string,
    status: string = 'ENABLED'
  ): Promise<string> {
    const adGroup = {
      name,
      campaign: campaignResourceName,
      status,
      type: 'SEARCH_STANDARD',
    };

    const response = await this.customer.adGroups.create([adGroup]);
    return response.results[0].resource_name;
  }

  /**
   * Adiciona Keywords a um Ad Group
   */
  private async addKeywords(adGroupResourceName: string, keywords: any[]): Promise<void> {
    const keywordOperations = keywords.map((kw) => ({
      ad_group: adGroupResourceName,
      keyword: {
        text: kw.text,
        match_type: kw.matchType,
      },
      status: 'ENABLED',
      cpc_bid_micros: kw.cpcBidMicros,
    }));

    await this.customer.adGroupCriteria.create(keywordOperations);
  }

  /**
   * Cria um Responsive Search Ad
   */
  private async createResponsiveSearchAd(adGroupResourceName: string, adConfig: any): Promise<void> {
    const ad = {
      ad_group: adGroupResourceName,
      status: 'ENABLED',
      ad: {
        final_urls: adConfig.finalUrls,
        responsive_search_ad: {
          headlines: adConfig.headlines.map((text: string) => ({ text })),
          descriptions: adConfig.descriptions.map((text: string) => ({ text })),
          path1: adConfig.path1,
          path2: adConfig.path2,
        },
      },
    };

    await this.customer.adGroupAds.create([ad]);
  }

  /**
   * Adiciona negative keywords em nível de campanha
   */
  async addNegativeKeywords(campaignResourceName: string, negativeKeywords: string[]): Promise<void> {
    console.log(`\n🚫 Adicionando ${negativeKeywords.length} negative keywords...`);

    const operations = negativeKeywords.map((keyword) => ({
      campaign: campaignResourceName,
      keyword: {
        text: keyword,
        match_type: 'BROAD',
      },
      negative: true,
    }));

    await this.customer.campaignCriteria.create(operations);
    console.log(`✅ Negative keywords adicionadas`);
  }
}

export default CampaignCreator;
