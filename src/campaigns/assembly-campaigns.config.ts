import type { LandingPageCampaign } from '../types/google-ads.types.js';

const campaign1: LandingPageCampaign = {
  landingPageUrl: 'https://demoassembly.kpn.run/',

  campaign: {
    name: 'Kipon - Assembly - Search',
    budget: {
      amountMicros: 5_000000, // R$ 5/dia
      deliveryMethod: 'STANDARD',
    },
    biddingStrategy: {
      type: 'MAXIMIZE_CLICKS',
    },
    advertisingChannelType: 'SEARCH',
    status: 'PAUSED',
    networkSettings: {
      targetGoogleSearch: true,
      targetSearchNetwork: false,
      targetContentNetwork: false,
      targetPartnerSearchNetwork: false,
    },
    geoTargetCountryCodes: ['2076'], // Brasil
    languageCodes: ['1014'],         // Português
  },

  adGroups: [
    {
      adGroup: { name: 'Montagem de Times Tech', status: 'ENABLED' },
      keywords: [
        { text: 'como montar um time de tecnologia', matchType: 'PHRASE' },
        { text: 'montar time tech', matchType: 'EXACT' },
        { text: 'estruturar equipe de engenharia', matchType: 'PHRASE' },
        { text: 'montagem de equipe de desenvolvimento', matchType: 'PHRASE' },
        { text: 'como contratar time de tecnologia', matchType: 'PHRASE' },
      ],
      ads: [{
        headlines: [
          'Monte seu Time Tech com IA',
          'Agente que Estrutura seu Time',
          'Times Personalizados por IA',
          'Voz que Monta Equipes Tech',
          'Líderes que Contratam Melhor',
          'Assembly: IA para seu Time',
        ],
        descriptions: [
          'Agente de voz que ajuda líderes tech a montar times ideais. Personalizado para seu contexto.',
          'Deixe a IA guiar sua decisão de time. Experimente agora — sem cadastro.',
        ],
        finalUrls: ['https://demoassembly.kpn.run/?utm_source=google&utm_medium=cpc&utm_campaign=assembly-br-2026-lider-tech&utm_content=montagem-times'],
        path1: 'Times',
        path2: 'Tech',
      }],
    },

    {
      adGroup: { name: 'Liderança e Gestão de Equipes', status: 'ENABLED' },
      keywords: [
        { text: 'gestão de times de tecnologia', matchType: 'PHRASE' },
        { text: 'liderança de equipes tech', matchType: 'PHRASE' },
        { text: 'como estruturar equipe de produto', matchType: 'PHRASE' },
        { text: 'líder tech contratação', matchType: 'PHRASE' },
        { text: 'decisão de time empresa tech', matchType: 'PHRASE' },
      ],
      ads: [{
        headlines: [
          'Lidere com Dados de Time',
          'IA que Apoia seu RH',
          'Decisões de Time com IA',
          'Gestão de Equipe Inteligente',
          'Estruture Times com Clareza',
          'Contrate Melhor com IA',
        ],
        descriptions: [
          'Agente de voz personalizado para líderes tech. Monte times alinhados à sua estratégia.',
          'IA treinada para decisões de equipe. Fale com o agente e veja na prática.',
        ],
        finalUrls: ['https://demoassembly.kpn.run/?utm_source=google&utm_medium=cpc&utm_campaign=assembly-br-2026-lider-tech&utm_content=lideranca'],
        path1: 'Liderança',
        path2: 'Times',
      }],
    },

    {
      adGroup: { name: 'IA para Recrutamento Tech', status: 'ENABLED' },
      keywords: [
        { text: 'agente de IA para recrutamento', matchType: 'PHRASE' },
        { text: 'inteligência artificial para contratar', matchType: 'PHRASE' },
        { text: 'IA para montar times', matchType: 'EXACT' },
        { text: 'automação de recrutamento tech', matchType: 'PHRASE' },
        { text: 'agente IA RH empresa tech', matchType: 'PHRASE' },
      ],
      ads: [{
        headlines: [
          'Agente IA para seu RH',
          'IA que Recruta por Você',
          'Recrutamento Tech com IA',
          'Automatize Montagem de Times',
          'Agente de Voz para RH',
          'IA Personalizada para Times',
        ],
        descriptions: [
          'Agente de voz com IA que guia líderes na montagem de times. Personalizado para tech.',
          'Do briefing ao time ideal — tudo via conversa com IA. Teste o demo agora.',
        ],
        finalUrls: ['https://demoassembly.kpn.run/?utm_source=google&utm_medium=cpc&utm_campaign=assembly-br-2026-lider-tech&utm_content=ia-recrutamento'],
        path1: 'IA',
        path2: 'Recrutamento',
      }],
    },

    {
      adGroup: { name: 'Scale-ups e Startups', status: 'ENABLED' },
      keywords: [
        { text: 'escalar time de tecnologia', matchType: 'PHRASE' },
        { text: 'crescer equipe startup tech', matchType: 'PHRASE' },
        { text: 'contratar time startup', matchType: 'PHRASE' },
        { text: 'aumentar equipe de desenvolvimento', matchType: 'PHRASE' },
        { text: 'escalar engenharia startup', matchType: 'PHRASE' },
      ],
      ads: [{
        headlines: [
          'Escale seu Time com IA',
          'Times para Scale-ups',
          'Cresça sua Equipe Tech',
          'Startup que Contrata Certo',
          'IA para Escalar Engenharia',
          'Assembly para Scale-ups',
        ],
        descriptions: [
          'Líderes de scale-ups usam IA para montar times certos na hora certa. Veja como.',
          'Agente de voz personalizado para decisões de time em empresas que crescem rápido.',
        ],
        finalUrls: ['https://demoassembly.kpn.run/?utm_source=google&utm_medium=cpc&utm_campaign=assembly-br-2026-lider-tech&utm_content=scaleups'],
        path1: 'Scale-up',
        path2: 'Times',
      }],
    },
  ],
};

export const negativeKeywords = [
  'gratis', 'gratuito', 'free', 'curso', 'tutorial',
  'como fazer', 'emprego', 'vaga', 'salário', 'template',
  'planilha', 'certificação', 'faculdade', 'youtube',
];

export const assemblyCampaigns = { campaign1, negativeKeywords };
export default assemblyCampaigns;
