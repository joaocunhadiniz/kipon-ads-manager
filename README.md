# Kipon Ads Manager

Gestor de campanhas Google Ads para as landing pages da Kipon voltadas a venda de consultoria.

**Status:** ✅ Pronto para uso
**Campanhas:** 2 campanhas configuradas (Mapeamento Skills + Humanos+IA)
**Orçamento:** R$ 40/dia total (R$ 20/dia cada)

---

## 🚀 Quick Start

### 1. Configurar Credenciais

```bash
# Copiar template
cp .env.example .env

# Editar e preencher credenciais
nano .env
```

📖 Siga o guia completo: [`CREDENTIALS_GUIDE.md`](./CREDENTIALS_GUIDE.md)

### 2. Testar Conexão

```bash
npm run dev
```

### 3. Criar Campanhas

```bash
npm run create-campaigns
```

### 4. Monitorar

```bash
npm run list-campaigns
```

---

## 📊 Campanhas Configuradas

### Campanha 1: Mapeamento de Skills
- **Público:** CHRO, People Director, Head de Talent/L&D
- **Segmentos:** Tech, Fintechs, Consultorias
- **Landing Page:** https://consultoriaskill.kipon.io/
- **Ad Groups:** 4 (Mapeamento, Lacunas, Strategy, Tech)

### Campanha 2: Humanos + Agentes IA
- **Público:** COO, Head Operações, Chief Digital/AI, CEO
- **Segmentos:** Tech, Marketing, Empresas Digitais
- **Landing Page:** https://consultoria.kipon.io/
- **Ad Groups:** 4 (Redesenho, Automação, Papéis, Operações)

📖 Detalhes completos: [`CAMPANHAS_KIPON.md`](./CAMPANHAS_KIPON.md)

---

## 🛠️ Estrutura do Projeto

```
kipon-ads-manager/
├── src/
│   ├── config/                    # Configurações e credenciais
│   │   ├── env.ts                # Validação de variáveis de ambiente
│   │   └── google-ads.config.ts  # Config Google Ads
│   ├── types/                     # Tipos TypeScript
│   │   └── google-ads.types.ts   # Tipos de campanhas, ads, keywords
│   ├── services/                  # Serviços
│   │   ├── google-ads-client.ts  # Cliente Google Ads (singleton)
│   │   └── campaign-creator.ts   # Criação de campanhas
│   ├── campaigns/                 # Campanhas
│   │   ├── kipon-campaigns.config.ts  # Configuração das 2 campanhas
│   │   ├── create-campaigns.ts        # Script de criação
│   │   └── list-campaigns.ts          # Script de listagem
│   ├── utils/                     # Utilitários
│   │   └── generate-refresh-token.ts  # Helper OAuth2
│   └── index.ts                   # Entry point
├── skills/                        # Marketing Skills integradas
│   ├── 37-google-ads-audit.md
│   ├── 10-google-and-meta-landing-page-audit.md
│   ├── 44-google-and-meta-utm-tracking-generator.md
│   ├── 32-google-and-meta-ad-spend-allocator.md
│   └── README.md
├── .env.example                   # Template de variáveis
├── CREDENTIALS_GUIDE.md           # Guia de credenciais
├── CAMPANHAS_KIPON.md            # Especificações das campanhas
├── INTEGRATION_GUIDE.md          # Workflow completo
└── package.json
```

---

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev                      # Testar conexão com Google Ads API
npm run build                    # Compilar TypeScript

# Credenciais
npm run generate-refresh-token   # Gerar refresh token OAuth2

# Campanhas
npm run create-campaigns         # Criar as 2 campanhas Kipon
npm run list-campaigns          # Listar campanhas existentes
```

---

## 🎯 Marketing Skills Integradas

4 skills profissionais para otimização:

1. **Google Ads Audit** - Detecta gastos desperdiçados, Quality Score baixo
2. **Landing Page Audit** - Analisa message match, fricção de formulários
3. **UTM Tracking Generator** - Cria tracking consistente e GA4 events
4. **Ad Spend Allocator** - Otimiza distribuição de orçamento

📖 Ver: [`skills/README.md`](./skills/README.md)

---

## 🔄 Workflow Recomendado

### Setup Inicial
1. ✅ Configurar credenciais (`.env`)
2. ✅ Testar conexão (`npm run dev`)
3. ✅ Criar campanhas (`npm run create-campaigns`)
4. ✅ Revisar no Google Ads
5. ✅ Ativar campanhas

### Otimização Contínua (TODA SEMANA)
- **Diário:** Verificar status e aprovações
- **Semanal:**
  - Search terms + negative keywords
  - Auditoria completa (google-ads-audit skill)
  - Landing page audit (landing-page-audit skill)
  - Otimização de orçamento (ad-spend-allocator skill)
  - A/B tests e ajustes

📖 Workflow detalhado: [`INTEGRATION_GUIDE.md`](./INTEGRATION_GUIDE.md)

---

## 📚 Documentação

| Documento | Descrição |
|-----------|-----------|
| [`CREDENTIALS_GUIDE.md`](./CREDENTIALS_GUIDE.md) | Como obter credenciais Google Ads API |
| [`CAMPANHAS_KIPON.md`](./CAMPANHAS_KIPON.md) | Especificações completas das campanhas |
| [`CHECKLIST_SEMANAL.md`](./CHECKLIST_SEMANAL.md) | ⭐ Rotina semanal de otimização |
| [`INTEGRATION_GUIDE.md`](./INTEGRATION_GUIDE.md) | Workflow de otimização com skills |
| [`skills/README.md`](./skills/README.md) | Guia das marketing skills |

---

## 🆘 Troubleshooting

### Erro: "OAuth2 credentials have insufficient permission"
- Verifique se adicionou o scope correto no OAuth consent screen
- Gere um novo refresh token

### Erro: "Developer token is not approved"
- Use uma conta de teste para desenvolvimento
- Solicite aprovação do token para produção

### Erro: "Customer not found"
- Verifique se o Customer ID está correto
- Remova os hífens do Customer ID no `.env`

---

## 🌟 Recursos Externos

- [Google Ads API - Get Started](https://developers.google.com/google-ads/api/docs/start)
- [google-ads-api Library (npm)](https://www.npmjs.com/package/google-ads-api)
- [Best Practices](https://developers.google.com/google-ads/api/docs/best-practices/overview)
- [Marketing Skills Repo](https://github.com/irinabuht12-oss/marketing-skills)

---

## 📄 Licença

ISC

---

**Criado para Kipon** 🚀
