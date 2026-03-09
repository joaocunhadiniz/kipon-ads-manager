# Marketing Skills para Kipon Ads Manager

Skills especializadas integradas ao projeto para otimização de campanhas.

## Skills Disponíveis

### 1. Google Ads Audit (`37-google-ads-audit.md`)
**O que faz:** Análise completa da saúde da conta Google Ads, detectando gastos desperdiçados, vazamentos de termos de pesquisa, lacunas de palavras-chave negativas, problemas de estratégia de lance e Quality Score.

**Quando usar:**
- Após criar campanhas, para avaliar performance
- Mensalmente, para identificar oportunidades de otimização
- Quando houver aumento de CPA sem explicação clara
- Para auditorias pré-planejamento de orçamento

**Como usar:**
1. Exporte dados das campanhas do Google Ads
2. Forneça os dados ao Claude com contexto: "Use a skill google-ads-audit para analisar estes dados"
3. Receba relatório com issues críticos e plano de ação priorizado

### 2. Landing Page Audit (`10-google-and-meta-landing-page-audit.md`)
**O que faz:** Analisa landing pages contra os anúncios que direcionam tráfego, verificando correspondência de mensagem, clareza de CTA, alinhamento above-the-fold e fricção em formulários.

**Quando usar:**
- Antes de lançar campanhas (preventivo)
- Quando CVR cai mas métricas de anúncio (CTR, CPC) permanecem estáveis
- Reviews trimestrais de landing pages
- Ao criar hipóteses para testes A/B

**Como usar:**
1. Forneça o copy do anúncio e a URL da LP (ou o conteúdo da página)
2. Solicite: "Use a skill landing-page-audit para avaliar a correspondência"
3. Receba análise de message match, fricção de formulário e recomendações

### 3. UTM Tracking Generator (`44-google-and-meta-utm-tracking-generator.md`)
**O que faz:** Gera parâmetros UTM consistentes, nomenclatura de eventos GA4 e specs de tracking de conversão seguindo melhores práticas de taxonomia.

**Quando usar:**
- Antes de criar qualquer campanha nova
- Ao configurar tracking entre múltiplos canais
- Para padronizar nomenclatura de tracking
- Ao implementar GA4 events

**Como usar:**
1. Descreva a campanha (canais, objetivos, audiência, ofertas)
2. Solicite: "Use a skill utm-tracking-generator para criar os UTMs"
3. Receba UTMs completos, eventos GA4 e guia de implementação

### 4. Ad Spend Allocator (`32-google-and-meta-ad-spend-allocator.md`)
**O que faz:** Gera estratégias de realocação de orçamento entre plataformas baseado em performance, eficiência e potencial de crescimento.

**Quando usar:**
- Ao distribuir orçamento entre as 2 campanhas Kipon
- Mensalmente, para rebalancear investimento
- Quando há mudança significativa em performance
- Ao aumentar ou reduzir orçamento total

## Integração com o Projeto

As skills podem ser usadas em conjunto com os scripts do projeto:

```bash
# 1. Criar campanhas com UTMs adequados
npm run create-campaigns

# 2. Após criação, auditar landing pages
# (forneça dados ao Claude e peça para usar landing-page-audit)

# 3. Monitorar e auditar campanhas regularmente
npm run list-campaigns
# (use google-ads-audit com os dados exportados)

# 4. Otimizar distribuição de orçamento
# (use ad-spend-allocator com dados de performance)
```

## Workflow Recomendado

### Setup Inicial
1. ✅ **UTM Tracking Generator** - Definir nomenclatura de tracking
2. ✅ **Landing Page Audit** - Otimizar LPs antes de criar campanhas
3. ✅ Criar campanhas com nosso script
4. ✅ Implementar tracking recomendado

### Otimização Contínua
- **Semanal**: Monitorar campanhas (npm run list-campaigns)
- **Mensal**: Google Ads Audit completo
- **Mensal**: Revisar Ad Spend Allocator
- **Trimestral**: Landing Page Audit revisitado

## Fonte

Skills do repositório [marketing-skills](https://github.com/irinabuht12-oss/marketing-skills) by @irinabuht12-oss
