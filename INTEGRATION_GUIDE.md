# Guia de Integração - Kipon Ads Manager + Marketing Skills

Este guia mostra como usar o Kipon Ads Manager em conjunto com as Marketing Skills para máxima eficiência.

## Fase 1: Preparação (Antes de Criar Campanhas)

### 1.1 Auditar Landing Pages

Antes de gastar qualquer centavo em anúncios, otimize suas LPs:

```
Prompt para Claude:
"Use a skill landing-page-audit para analisar as seguintes landing pages da Kipon:

LP 1: [URL]
LP 2: [URL]

Foco: consultoria B2B, conversão de leads qualificados"
```

**Output esperado:**
- Message match score
- Problemas de fricção em formulários
- Recomendações de CTA
- Checklist de otimização

**Ação:** Implemente as correções recomendadas antes de criar campanhas.

---

### 1.2 Definir Estrutura de Tracking

```
Prompt para Claude:
"Use a skill utm-tracking-generator para criar tracking completo para:

Campanha 1: [Descrição da LP1]
Campanha 2: [Descrição da LP2]

Canal: Google Ads Search
Objetivo: Conversão de leads (preenchimento de formulário)
Geografia: Brasil
Público: Empresas buscando consultoria [área específica]"
```

**Output esperado:**
- UTM parameters completos
- GA4 event specifications
- Naming convention documentada

**Ação:** Salve os UTMs gerados para usar na configuração das campanhas.

---

## Fase 2: Configuração de Campanhas

### 2.1 Configurar Credenciais

Siga o guia em `CREDENTIALS_GUIDE.md`:

```bash
# 1. Configure variáveis no .env
cp .env.example .env
nano .env

# 2. Gere refresh token se necessário
npm run generate-refresh-token

# 3. Teste conexão
npm run dev
```

---

### 2.2 Configurar Campanhas

Edite `src/campaigns/kipon-campaigns.config.ts` com:
- URLs das LPs (com UTMs gerados na Fase 1.2)
- Orçamentos
- Palavras-chave
- Textos de anúncios (validados na Fase 1.1)

---

### 2.3 Criar Campanhas

```bash
npm run create-campaigns
```

---

## Fase 3: Monitoramento e Otimização

### 3.1 Otimização Semanal Completa (TODA SEMANA)

**Passo 1:** Exporte dados do Google Ads
- Campaign Performance Report (últimos 7 dias)
- Search Terms Report
- Keyword Performance Report

**Passo 2:** Liste performance básica

```bash
npm run list-campaigns
```

Verifique:
- CTR (deve ser >1.5% para não-brand)
- CPC vs. orçamento
- Conversões
- Quality Score

**Passo 3:** Auditoria com Google Ads Audit Skill

```
Prompt para Claude:
"Use a skill google-ads-audit para analisar os seguintes dados:

[Cole dados exportados]

Foco especial em:
- Termos de busca que estão desperdiçando orçamento
- Quality Score das keywords principais
- Oportunidades de palavras-chave negativas"
```

**Passo 4:** Landing Page Audit

```
Prompt para Claude:
"Use a skill landing-page-audit para revisar:

LP 1: https://consultoriaskill.kipon.io/
LP 2: https://consultoria.kipon.io/

Analisar performance da semana e identificar pontos de fricção"
```

**Passo 5:** Otimização de Orçamento

```
Prompt para Claude:
"Use a skill ad-spend-allocator para otimizar distribuição de orçamento:

Campanha 1 (Skills):
- Gasto última semana: R$ [X]
- Conversões: [Y]
- CPA: R$ [Z]

Campanha 2 (IA):
- Gasto última semana: R$ [X]
- Conversões: [Y]
- CPA: R$ [Z]

Orçamento total disponível: R$ 40/dia
Objetivo: Maximizar conversões qualificadas"
```

**Passo 6:** Implemente recomendações
- Adicione negative keywords
- Pause keywords com baixo performance
- Ajuste lances conforme sugerido
- Otimize elementos de LP identificados
- Realoque orçamento entre campanhas

---

## Fase 4: Testes e Iteração

### 4.1 Teste A/B de Landing Pages

Quando quiser testar variações de LP:

1. Crie variação da LP
2. Audite com landing-page-audit
3. Crie campanha duplicada apontando para nova LP
4. Compare performance por 2-4 semanas
5. Implemente vencedora

---

### 4.2 Refinamento de Anúncios

Use dados de Search Terms Report para:
- Descobrir novas keywords de alta conversão
- Adicionar negatives
- Ajustar match types
- Refinar copy dos anúncios

---

## Checklist de Manutenção

### Diário
- [ ] Verificar alertas de orçamento
- [ ] Checar se campanhas estão ativas

### Semanal (FAZER TODA SEMANA)
- [ ] `npm run list-campaigns` - Performance check
- [ ] Exportar dados do Google Ads (últimos 7 dias)
- [ ] **Skill: google-ads-audit** - Auditoria completa
- [ ] **Skill: landing-page-audit** - Revisar LPs
- [ ] **Skill: ad-spend-allocator** - Otimizar orçamento
- [ ] Revisar termos de busca novos
- [ ] Adicionar negative keywords
- [ ] Revisar Quality Scores
- [ ] Ajustar lances se necessário
- [ ] A/B test de headlines/descriptions
- [ ] Implementar melhorias nas LPs
- [ ] Documentar learnings da semana

---

## Troubleshooting com Skills

### CPA muito alto
1. Use `google-ads-audit` para identificar desperdícios
2. Use `landing-page-audit` para verificar fricção de conversão

### CTR baixo
1. Use `landing-page-audit` para verificar message match
2. Revise relevância de keywords

### Baixo volume de impressões
1. Verifique orçamento diário
2. Revise lances (podem estar muito baixos)
3. Expanda match types ou keywords

---

## Recursos Adicionais

- **Skills**: Ver `skills/README.md` para detalhes de cada skill
- **Credenciais**: Ver `CREDENTIALS_GUIDE.md`
- **Google Ads API**: [Documentação oficial](https://developers.google.com/google-ads/api/docs/start)
- **Marketing Skills Repo**: [GitHub](https://github.com/irinabuht12-oss/marketing-skills)
