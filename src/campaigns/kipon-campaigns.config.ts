/**
 * Configuração das Campanhas Kipon
 *
 * Campanha 1: Mapeamento de Skills
 * Campanha 2: Humanos + Agentes IA
 */

import type { LandingPageCampaign } from '../types/google-ads.types.js';

// ============================================================================
// CAMPANHA 1: MAPEAMENTO DE SKILLS
// ============================================================================

const campaign1: LandingPageCampaign = {
  landingPageUrl: 'https://consultoriaskill.kipon.io/',

  campaign: {
    name: 'Kipon - Mapeamento Skills - Search',
    budget: {
      amountMicros: 20_000000, // R$ 20/dia
      deliveryMethod: 'STANDARD',
    },
    biddingStrategy: {
      // MAXIMIZE_CLICKS para conta nova sem histórico de conversões.
      // Migrar para MAXIMIZE_CONVERSIONS após ~30 conversões registradas.
      type: 'MAXIMIZE_CLICKS',
    },
    advertisingChannelType: 'SEARCH',
    status: 'PAUSED', // Iniciar pausada para revisão
    networkSettings: {
      targetGoogleSearch: true,
      targetSearchNetwork: false, // Apenas Google Search, sem parceiros
      targetContentNetwork: false,
      targetPartnerSearchNetwork: false,
    },
    geoTargetCountryCodes: ['2076'], // Brasil
    languageCodes: ['1014'],         // Português
  },

  adGroups: [
    // Ad Group 1: Mapeamento de Competências (Alto Intent)
    {
      adGroup: {
        name: 'Mapeamento Competências',
        status: 'ENABLED',
      },
      keywords: [
        { text: 'mapeamento de competências', matchType: 'EXACT' },
        { text: 'mapeamento de skills', matchType: 'EXACT' },
        { text: 'mapeamento de habilidades organizacional', matchType: 'PHRASE' },
        { text: 'consultoria mapeamento competências', matchType: 'PHRASE' },
        { text: 'diagnóstico de competências empresarial', matchType: 'PHRASE' },
      ],
      ads: [
        {
          headlines: [
            'Mapeie Skills da Organização',
            'Diagnóstico de Competências',
            'Identifique Lacunas de Talento',
            'Metodologia Proprietária',
            'Mapeamento Completo de Skills',
            'Análise de Competências Real',
          ],
          descriptions: [
            'Descubra as competências reais da sua equipe com metodologia proprietária.',
            'Conecte skills com estratégia. Produto integrado. Resultados práticos e acionáveis.',
            'Startup de skills mais inovadora do Brasil. Agende diagnóstico sem custo.',
          ],
          finalUrls: ['https://consultoriaskill.kipon.io/?utm_source=google&utm_medium=cpc&utm_campaign=skills-br-2026-chro-mapeamento&utm_content=competencias'],
          path1: 'Mapeamento',
          path2: 'Skills',
        },
      ],
    },

    // Ad Group 2: Lacunas de Talento
    {
      adGroup: {
        name: 'Lacunas Talento',
        status: 'ENABLED',
      },
      keywords: [
        { text: 'identificar lacunas de talento', matchType: 'PHRASE' },
        { text: 'gap de competências', matchType: 'EXACT' },
        { text: 'análise de gaps de habilidades', matchType: 'PHRASE' },
        { text: 'falta de talentos na empresa', matchType: 'PHRASE' },
        { text: 'gaps de skills', matchType: 'EXACT' },
      ],
      ads: [
        {
          headlines: [
            'Identifique Gaps de Talento',
            'Lacunas de Competências',
            'Análise Precisa de Skills',
            'Descubra Skills Faltantes',
            'Diagnóstico de Lacunas',
            'Mapeamento de Gaps',
          ],
          descriptions: [
            'Saiba exatamente quais competências faltam. Metodologia validada por CHROs líderes.',
            'Entenda com precisão as lacunas de skills. Produto integrado. Time especialista.',
            'Conecte lacunas com estratégia de crescimento. Agende diagnóstico gratuito.',
          ],
          finalUrls: ['https://consultoriaskill.kipon.io/?utm_source=google&utm_medium=cpc&utm_campaign=skills-br-2026-chro-mapeamento&utm_content=lacunas'],
          path1: 'Diagnóstico',
          path2: 'Lacunas',
        },
      ],
    },

    // Ad Group 3: People Strategy
    {
      adGroup: {
        name: 'People Strategy',
        status: 'ENABLED',
      },
      keywords: [
        { text: 'workforce strategy', matchType: 'PHRASE' },
        { text: 'estratégia de pessoas', matchType: 'PHRASE' },
        { text: 'people strategy consultoria', matchType: 'PHRASE' },
        { text: 'planejamento estratégico RH', matchType: 'PHRASE' },
        { text: 'talent strategy', matchType: 'PHRASE' },
        { text: 'estratégia de talentos', matchType: 'PHRASE' },
      ],
      ads: [
        {
          headlines: [
            'Evolua People Strategy',
            'Estratégia Baseada em Skills',
            'Workforce Planning Preciso',
            'Skills como Base Estratégica',
            'People Analytics Real',
            'Dados de Competências Reais',
          ],
          descriptions: [
            'Transforme people strategy com dados reais de competências. Metodologia proprietária.',
            'Conecte skills com objetivos de negócio. Time da startup mais inovadora do Brasil.',
            'Decisões estratégicas baseadas em capabilities reais. Agende consulta.',
          ],
          finalUrls: ['https://consultoriaskill.kipon.io/?utm_source=google&utm_medium=cpc&utm_campaign=skills-br-2026-chro-mapeamento&utm_content=strategy'],
          path1: 'People',
          path2: 'Strategy',
        },
      ],
    },

    // Ad Group 4: Tech & Fintechs (Segmento)
    {
      adGroup: {
        name: 'Tech Fintechs',
        status: 'ENABLED',
      },
      keywords: [
        { text: 'mapeamento competências tech', matchType: 'PHRASE' },
        { text: 'skills assessment fintech', matchType: 'PHRASE' },
        { text: 'consultoria RH startups', matchType: 'PHRASE' },
        { text: 'talent management tech companies', matchType: 'PHRASE' },
        { text: 'gestão de talentos empresas tech', matchType: 'PHRASE' },
      ],
      ads: [
        {
          headlines: [
            'Mapeamento Skills Tech',
            'Especialistas em Fintechs',
            'Skills para Scale-ups',
            'Tech Talent Strategy',
            'Competências Tech Reais',
            'Assessment para Startups',
          ],
          descriptions: [
            'Especialistas em empresas de tecnologia. Mapeie skills críticas para crescimento.',
            'Time da startup de skills mais relevante do Brasil. Metodologia ágil e prática.',
            'Entenda competências reais do seu time tech. Produto integrado.',
          ],
          finalUrls: ['https://consultoriaskill.kipon.io/?utm_source=google&utm_medium=cpc&utm_campaign=skills-br-2026-chro-mapeamento&utm_content=tech'],
          path1: 'Tech',
          path2: 'Startups',
        },
      ],
    },
  ],
};

// ============================================================================
// CAMPANHA 2: HUMANOS + AGENTES IA
// ============================================================================

const campaign2: LandingPageCampaign = {
  landingPageUrl: 'https://consultoria.kipon.io/',

  campaign: {
    name: 'Kipon - Humanos+IA - Search',
    budget: {
      amountMicros: 20_000000, // R$ 20/dia
      deliveryMethod: 'STANDARD',
    },
    biddingStrategy: {
      // MAXIMIZE_CLICKS para conta nova sem histórico de conversões.
      // Migrar para MAXIMIZE_CONVERSIONS após ~30 conversões registradas.
      type: 'MAXIMIZE_CLICKS',
    },
    advertisingChannelType: 'SEARCH',
    status: 'PAUSED', // Iniciar pausada para revisão
    networkSettings: {
      targetGoogleSearch: true,
      targetSearchNetwork: false, // Apenas Google Search, sem parceiros
      targetContentNetwork: false,
      targetPartnerSearchNetwork: false,
    },
    geoTargetCountryCodes: ['2076'], // Brasil
    languageCodes: ['1014'],         // Português
  },

  adGroups: [
    // Ad Group 1: Redesenho Trabalho IA
    {
      adGroup: {
        name: 'Redesenho Trabalho IA',
        status: 'ENABLED',
      },
      keywords: [
        { text: 'consultoria implementação IA', matchType: 'PHRASE' },
        { text: 'redesenhar trabalho com IA', matchType: 'PHRASE' },
        { text: 'organização humanos e IA', matchType: 'PHRASE' },
        { text: 'estratégia IA empresarial', matchType: 'PHRASE' },
        { text: 'transformação digital com IA', matchType: 'PHRASE' },
      ],
      ads: [
        {
          headlines: [
            'Redesenhe Trabalho com IA',
            'Arquitetura Humano+IA Clara',
            'Otimize Pessoas e Máquinas',
            'Sprint com Valor Entregue',
            'IA com Redesenho Claro',
            'Especialistas IA+Organização',
          ],
          descriptions: [
            'Defina quem faz o quê: humanos vs IA. Metodologia proprietária. Time especialista.',
            'Sprint com valor entregue rápido. Já trabalhamos com principais empresas do Brasil.',
            'Redesenhe a jornada de valor com IA. Clareza organizacional e eficiência real.',
          ],
          finalUrls: ['https://consultoria.kipon.io/?utm_source=google&utm_medium=cpc&utm_campaign=ia-br-2026-coo-redesenho&utm_content=trabalho'],
          path1: 'Consultoria',
          path2: 'IA',
        },
      ],
    },

    // Ad Group 2: Automação e Eficiência
    {
      adGroup: {
        name: 'Automação Eficiência',
        status: 'ENABLED',
      },
      keywords: [
        { text: 'o que automatizar com IA', matchType: 'PHRASE' },
        { text: 'automação inteligente empresarial', matchType: 'PHRASE' },
        { text: 'eficiência operacional IA', matchType: 'PHRASE' },
        { text: 'otimização processos com IA', matchType: 'PHRASE' },
        { text: 'automação com agentes de IA', matchType: 'PHRASE' },
      ],
      ads: [
        {
          headlines: [
            'O Que Automatizar com IA?',
            'Automação com Clareza',
            'Eficiência Real com IA',
            'Decisões IA vs Humano',
            'Otimize Operações com IA',
            'Roadmap IA+Pessoas',
          ],
          descriptions: [
            'Descubra o que automatizar e o que manter humano. Metodologia validada.',
            'Evite automação fragmentada. Sprint com resultados rápidos e práticos.',
            'Especialistas em arquitetura humano+IA. Trabalhamos com líderes de mercado.',
          ],
          finalUrls: ['https://consultoria.kipon.io/?utm_source=google&utm_medium=cpc&utm_campaign=ia-br-2026-coo-redesenho&utm_content=automacao'],
          path1: 'Automação',
          path2: 'IA',
        },
      ],
    },

    // Ad Group 3: Transformação Papéis
    {
      adGroup: {
        name: 'Transformação Papéis',
        status: 'ENABLED',
      },
      keywords: [
        { text: 'futuro do trabalho IA', matchType: 'PHRASE' },
        { text: 'papéis trabalho transformação digital', matchType: 'PHRASE' },
        { text: 'redesenho funções IA', matchType: 'PHRASE' },
        { text: 'impacto IA nos empregos', matchType: 'PHRASE' },
        { text: 'novas funções com inteligência artificial', matchType: 'PHRASE' },
      ],
      ads: [
        {
          headlines: [
            'Redesenhe Papéis com IA',
            'Futuro do Trabalho Claro',
            'Funções em Transformação',
            'Clareza Organizacional IA',
            'Novo Design de Papéis',
            'Skills para Era IA',
          ],
          descriptions: [
            'Redefina papéis com clareza. Evite medo e sobrecarga. Metodologia prática.',
            'Arquitetura humano+IA redesenha quem faz o quê, com quais skills.',
            'Time especialista. Sprint com valor entregue. Resultados em semanas.',
          ],
          finalUrls: ['https://consultoria.kipon.io/?utm_source=google&utm_medium=cpc&utm_campaign=ia-br-2026-coo-redesenho&utm_content=papeis'],
          path1: 'Redesenho',
          path2: 'Papéis',
        },
      ],
    },

    // Ad Group 4: COO / Operações
    {
      adGroup: {
        name: 'COO Operações',
        status: 'ENABLED',
      },
      keywords: [
        { text: 'consultoria operações IA', matchType: 'PHRASE' },
        { text: 'otimização operacional com IA', matchType: 'PHRASE' },
        { text: 'COO estratégia de IA', matchType: 'PHRASE' },
        { text: 'transformação digital operações', matchType: 'PHRASE' },
        { text: 'agentes IA para operações', matchType: 'PHRASE' },
      ],
      ads: [
        {
          headlines: [
            'IA para COO e Operações',
            'Otimize Ops com IA',
            'Arquitetura Operacional IA',
            'Eficiência com Redesenho',
            'Ops + IA Integrados',
            'Sprint Operacional IA',
          ],
          descriptions: [
            'Redesenhe operações com IA. Clareza em quem faz o quê. Resultados rápidos.',
            'Especialistas em otimização humano+máquina. Principais empresas do Brasil.',
            'Metodologia proprietária. Sprint com valor entregue em semanas.',
          ],
          finalUrls: ['https://consultoria.kipon.io/?utm_source=google&utm_medium=cpc&utm_campaign=ia-br-2026-coo-redesenho&utm_content=operacoes'],
          path1: 'Operações',
          path2: 'IA',
        },
      ],
    },
  ],
};

// ============================================================================
// NEGATIVE KEYWORDS (Aplicar em ambas campanhas)
// ============================================================================

export const negativeKeywords = [
  'gratis',
  'gratuito',
  'free',
  'curso',
  'treinamento online',
  'tutorial',
  'como fazer',
  'diy',
  'salário',
  'emprego',
  'vaga',
  'faculdade',
  'graduação',
  'certificação',
  'planilha',
  'template',
  'software livre',
  'open source',
  'youtube',
];

// ============================================================================
// EXPORT
// ============================================================================

export const kiponCampaigns = {
  campaign1, // Mapeamento de Skills
  campaign2, // Humanos + IA
  negativeKeywords,
};

export default kiponCampaigns;
