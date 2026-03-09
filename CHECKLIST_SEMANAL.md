# ✅ Checklist Semanal - Kipon Ads Manager

Execute **TODA SEMANA** para otimização máxima das campanhas.

---

## 📅 Segunda-feira: Coleta de Dados

### 1. Exportar Dados do Google Ads

Acesse Google Ads e exporte:

- [ ] **Campaign Performance Report** (últimos 7 dias)
  - Métricas: Impressões, Cliques, CTR, Custo, Conversões, CPA

- [ ] **Search Terms Report** (últimos 7 dias)
  - Ver quais termos geraram cliques
  - Identificar desperdícios

- [ ] **Keyword Performance Report** (últimos 7 dias)
  - Quality Score por keyword
  - CTR, CPC, Conversões

### 2. Verificar Status Básico

```bash
cd kipon-ads-manager
npm run list-campaigns
```

- [ ] Campanhas estão ativas?
- [ ] Orçamento está sendo gasto?
- [ ] Anúncios foram aprovados?

---

## 🔍 Terça-feira: Auditoria com Skills

### 3. Google Ads Audit

```
Prompt para Claude:
"Use a skill google-ads-audit para analisar:

[Cole dados exportados da segunda-feira]

Foco em:
- Termos de busca desperdiçando orçamento
- Keywords com baixo Quality Score
- Oportunidades de negative keywords
- CTR por ad group"
```

**Ações:**
- [ ] Adicionar negative keywords recomendadas
- [ ] Pausar keywords com QS < 5
- [ ] Ajustar lances conforme recomendado

---

### 4. Landing Page Audit

```
Prompt para Claude:
"Use a skill landing-page-audit para revisar:

LP 1: https://consultoriaskill.kipon.io/
LP 2: https://consultoria.kipon.io/

Dados da semana:
- Campanha 1: [X] cliques, [Y]% taxa conversão
- Campanha 2: [X] cliques, [Y]% taxa conversão

Identificar pontos de fricção e message match"
```

**Ações:**
- [ ] Implementar correções urgentes na LP
- [ ] Agendar testes A/B
- [ ] Ajustar copy se necessário

---

## 💰 Quarta-feira: Otimização de Orçamento

### 5. Ad Spend Allocator

```
Prompt para Claude:
"Use a skill ad-spend-allocator:

Campanha 1 (Skills):
- Gasto: R$ [total últimos 7 dias]
- Conversões: [número]
- CPA: R$ [valor]
- CTR: [%]

Campanha 2 (IA):
- Gasto: R$ [total últimos 7 dias]
- Conversões: [número]
- CPA: R$ [valor]
- CTR: [%]

Orçamento total: R$ 40/dia
Objetivo: Maximizar conversões qualificadas"
```

**Ações:**
- [ ] Realocar orçamento entre campanhas
- [ ] Ajustar lances por ad group
- [ ] Pausar ad groups com performance ruim

---

## 🎯 Quinta-feira: Implementação

### 6. Aplicar Mudanças no Google Ads

- [ ] **Negative Keywords:** Adicionar lista semanal
- [ ] **Pausar/Ativar:** Keywords e ad groups conforme auditoria
- [ ] **Lances:** Ajustar CPCs conforme recomendado
- [ ] **Orçamentos:** Realocar entre campanhas
- [ ] **Anúncios:** Criar variações para A/B test

### 7. Atualizar Landing Pages

- [ ] Implementar correções identificadas
- [ ] Testar formulários
- [ ] Ajustar CTAs se necessário
- [ ] Verificar velocidade de carregamento

---

## 📊 Sexta-feira: Análise e Documentação

### 8. Comparar Semana vs. Semana Anterior

Métricas principais:

| Métrica | Semana Atual | Semana Anterior | Δ |
|---------|--------------|-----------------|---|
| Impressões | | | |
| Cliques | | | |
| CTR | | | |
| Custo | | | |
| Conversões | | | |
| CPA | | | |
| Quality Score | | | |

### 9. Documentar Learnings

- [ ] O que funcionou bem esta semana?
- [ ] O que não funcionou?
- [ ] Quais mudanças foram implementadas?
- [ ] Quais testes foram iniciados?
- [ ] Próximas ações para semana seguinte

---

## 🚀 Resumo Rápido (Toda Semana)

```bash
# 1. Coletar dados
Google Ads → Exportar relatórios

# 2. Verificar status
npm run list-campaigns

# 3. Auditorias (usar skills)
- google-ads-audit
- landing-page-audit
- ad-spend-allocator

# 4. Implementar
- Negative keywords
- Ajustar lances
- Pausar/ativar
- Melhorias LP

# 5. Documentar
- Comparar métricas
- Registrar learnings
```

---

## 💡 Metas Semanais

**Semanas 1-2 (Aprendizado):**
- CTR > 1.5%
- QS > 5
- Estabelecer baseline de conversões

**Semanas 3-4 (Otimização):**
- CTR > 2%
- QS > 7
- CPA < R$ 200

**Semana 5+ (Escala):**
- CTR > 2.5%
- QS > 8
- CPA < R$ 150
- Taxa conversão LP > 5%

---

## ⚠️ Alertas de Atenção

**Se CTR < 1%:**
- Revisar relevância de anúncios
- Usar landing-page-audit URGENTE
- Considerar pausar campanha temporariamente

**Se CPA > R$ 300:**
- Revisar Quality Scores
- Adicionar mais negative keywords
- Usar google-ads-audit URGENTE

**Se conversões = 0 após 2 semanas:**
- Verificar tracking
- Auditoria completa de LP
- Revisar targeting e keywords

---

## 📌 Dica Pro

**Mantenha um Google Sheet com histórico semanal:**

Colunas:
- Semana (data)
- Impressões
- Cliques
- CTR
- Custo
- Conversões
- CPA
- QS médio
- Ações tomadas
- Resultados

Isso facilita identificar tendências e tomar decisões baseadas em dados!

---

**💪 Consistência é a chave! Execute este checklist TODA semana para resultados máximos.**
