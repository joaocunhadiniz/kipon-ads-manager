# Kipon Ads Manager — Fluxo Completo

## Visão Geral

Sistema autônomo de gestão de campanhas Google Ads para as landing pages da Kipon. O agente sincroniza métricas, aplica regras de otimização e gera análises com IA — tudo sem intervenção manual.

---

## Arquitetura

```
Google Ads API
      ↓ (sync de hora em hora)
   Railway
  (agente Node.js)
      ↓ (salva dados)
   Supabase
      ↓ (lê dados)
   Lovable
  (dashboard)
```

---

## Contas e Credenciais

| Item | Valor |
|---|---|
| MCC (Manager) | 153-614-2544 — Kipon Manager |
| Conta principal | 185-103-7564 — kipon |
| Conta secundária | 888-897-8544 — Kipon |
| OAuth App | Google Cloud Console |
| Supabase | pbhtytkbcfrronokpvjd.supabase.co |

---

## Campanhas Criadas

### Campanha 1 — Mapeamento Skills
- **Nome:** Kipon - Mapeamento Skills - Search
- **ID:** 23642996156
- **Landing page:** https://consultoriaskill.kipon.io/
- **Orçamento:** R$10/dia
- **Estratégia:** Maximize Clicks (migrar para Maximize Conversions após 30 conversões)
- **Ad Groups:** Mapeamento Competências, Lacunas Talento, People Strategy, Tech Fintechs

### Campanha 2 — Humanos + IA
- **Nome:** Kipon - Humanos+IA - Search
- **ID:** 23647618306
- **Landing page:** https://consultoria.kipon.io/
- **Orçamento:** R$10/dia
- **Estratégia:** Maximize Clicks
- **Ad Groups:** Redesenho Trabalho IA, Automação Eficiência, Transformação Papéis, COO Operações

Ambas na conta **185-103-7564**, status **ENABLED**, 19 negative keywords cada.

---

## Agente Autônomo (Railway)

Roda 24/7 em `https://railway.app` — projeto `kipon-ads-manager`.

### Schedules

| Horário | Ação |
|---|---|
| A cada hora | Sync de métricas do Google Ads → Supabase |
| Todo dia às 8h | Avaliação de regras + resumo diário |
| Todo domingo às 9h | Análise semanal com GPT-4o |

### O que o sync faz
1. Puxa campanhas e métricas das duas contas via Google Ads API
2. Salva em `campaigns` e `campaign_metrics` no Supabase
3. Atualiza saldo de crédito em `account_config`

### Regras automáticas (`src/agent/rules.ts`)
- **CTR < 1% por 7 dias** → pausa a campanha
- **0 impressões em 3 dias** → alerta
- **CPC > R$15** → reduz orçamento em 20%
- **CTR > 3% e custo baixo** → aumenta orçamento em 10%

---

## Tabelas Supabase

| Tabela | Conteúdo |
|---|---|
| `campaigns` | Dados das campanhas (nome, status, orçamento) |
| `campaign_metrics` | Métricas diárias (impressões, cliques, custo, CTR, CPC) |
| `agent_logs` | Log de todas as ações do agente |
| `agent_summaries` | Resumos diários e semanais |
| `account_config` | Configurações (saldo de crédito) |
| `sync_log` | Histórico de syncs |

---

## Dashboard Lovable

Exibe em tempo real:
- Impressões, Cliques, Custo Total, CPC Médio
- Saldo de crédito Google Ads (R$100 inicial)
- Gráfico de performance — últimos 30 dias
- Lista de campanhas ativas com status

---

## Scripts Disponíveis

```bash
# Sincronizar manualmente
npm run agent:sync

# Rodar agente localmente
npm run agent

# Criar campanhas
npm run create-campaigns

# Listar campanhas
npm run list-campaigns

# Gerar novo refresh token (quando expirar)
npm run generate-refresh-token
```

---

## Manutenção

### Refresh token expira (a cada ~6 meses)
```bash
npm run generate-refresh-token
# Copiar novo token → .env + Railway Variables
```

### Adicionar crédito no Google Ads
O saldo atualiza automaticamente no próximo sync.

### Alterar orçamento das campanhas
```bash
# Editar src/campaigns/update-budget.ts com novo valor
npx tsx src/campaigns/update-budget.ts
```

### Pausar todas as campanhas
```bash
npx tsx src/campaigns/pause-all.ts
```

### Ativar campanhas Kipon
```bash
npx tsx src/campaigns/activate-kipon.ts
```

---

## Repositório

GitHub: https://github.com/joaocunhadiniz/kipon-ads-manager

Deploy automático: todo push na branch `main` faz redeploy no Railway.
