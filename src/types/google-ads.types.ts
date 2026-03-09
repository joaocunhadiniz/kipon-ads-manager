/**
 * Tipos TypeScript para Google Ads API
 */

export interface CampaignConfig {
  name: string;
  budget: {
    amountMicros: number; // Valor em micros (ex: 1000000 = R$ 1.00)
    deliveryMethod: 'STANDARD' | 'ACCELERATED';
  };
  biddingStrategy: {
    type: 'TARGET_CPA' | 'MAXIMIZE_CONVERSIONS' | 'MAXIMIZE_CLICKS' | 'MANUAL_CPC' | 'TARGET_ROAS';
    targetCpaMicros?: number;
    targetRoas?: number;
  };
  geoTargetCountryCodes?: string[]; // ex: ['2076'] = Brasil
  languageCodes?: string[];         // ex: ['1014'] = Português
  advertisingChannelType: 'SEARCH' | 'DISPLAY' | 'SHOPPING' | 'VIDEO';
  advertisingChannelSubType?: 'SEARCH_MOBILE_APP' | 'DISPLAY_MOBILE_APP' | 'SEARCH_EXPRESS' | 'DISPLAY_EXPRESS';
  status?: 'ENABLED' | 'PAUSED' | 'REMOVED';
  startDate?: string; // Formato: YYYY-MM-DD
  endDate?: string;   // Formato: YYYY-MM-DD
  networkSettings?: {
    targetGoogleSearch?: boolean;
    targetSearchNetwork?: boolean;
    targetContentNetwork?: boolean;
    targetPartnerSearchNetwork?: boolean;
  };
}

export interface AdGroupConfig {
  name: string;
  campaignId?: string;
  status?: 'ENABLED' | 'PAUSED' | 'REMOVED';
  cpcBidMicros?: number;
}

export interface KeywordConfig {
  text: string;
  matchType: 'EXACT' | 'PHRASE' | 'BROAD';
  cpcBidMicros?: number;
}

export interface AdConfig {
  headlines: string[]; // Máximo 15, cada uma com até 30 caracteres
  descriptions: string[]; // Máximo 4, cada uma com até 90 caracteres
  finalUrls: string[];
  path1?: string; // Até 15 caracteres
  path2?: string; // Até 15 caracteres
}

export interface CampaignPerformanceMetrics {
  campaignId: string;
  campaignName: string;
  status: string;
  impressions: number;
  clicks: number;
  cost: number;
  conversions: number;
  ctr: number;
  averageCpc: number;
  costPerConversion: number;
}

export interface LandingPageCampaign {
  landingPageUrl: string;
  campaign: CampaignConfig;
  adGroups: Array<{
    adGroup: AdGroupConfig;
    keywords: KeywordConfig[];
    ads: AdConfig[];
  }>;
}
