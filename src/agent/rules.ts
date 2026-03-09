/**
 * Regras de otimização do agente
 * Cada regra define uma condição e uma ação automática
 */

export interface Rule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  condition: (metrics: CampaignMetrics) => boolean;
  action: 'PAUSE_CAMPAIGN' | 'ACTIVATE_CAMPAIGN' | 'REDUCE_BUDGET' | 'INCREASE_BUDGET' | 'ALERT';
  actionValue?: number; // percentual para ajuste de orçamento
}

export interface CampaignMetrics {
  campaign_id: string;
  campaign_name: string;
  status: string;
  budget_daily_brl: number;
  impressions_7d: number;
  clicks_7d: number;
  cost_7d: number;
  conversions_7d: number;
  ctr_7d: number;
  avg_cpc_7d: number;
}

export const defaultRules: Rule[] = [
  {
    id: 'low-ctr-pause',
    name: 'Pausar campanha com CTR muito baixo',
    description: 'Pausa campanhas com CTR < 1% por 7 dias consecutivos e mais de 500 impressões',
    enabled: true,
    condition: (m) => m.ctr_7d < 1 && m.impressions_7d > 500 && m.status === 'ENABLED',
    action: 'PAUSE_CAMPAIGN',
  },
  {
    id: 'no-impressions-alert',
    name: 'Alerta de zero impressões',
    description: 'Alerta quando campanha ativa não recebe impressões por 3 dias',
    enabled: true,
    condition: (m) => m.impressions_7d === 0 && m.status === 'ENABLED',
    action: 'ALERT',
  },
  {
    id: 'high-cpc-reduce-budget',
    name: 'Reduzir orçamento com CPC alto',
    description: 'Reduz orçamento em 20% quando CPC médio supera R$ 5,00',
    enabled: true,
    condition: (m) => m.avg_cpc_7d > 5 && m.status === 'ENABLED',
    action: 'REDUCE_BUDGET',
    actionValue: 20,
  },
  {
    id: 'good-performance-increase-budget',
    name: 'Aumentar orçamento com boa performance',
    description: 'Aumenta orçamento em 10% quando CTR > 5% e CPC < R$ 2,50',
    enabled: true,
    condition: (m) => m.ctr_7d > 5 && m.avg_cpc_7d < 2.5 && m.status === 'ENABLED',
    action: 'INCREASE_BUDGET',
    actionValue: 10,
  },
];
