# Guia de Configuração - Google Ads API Credentials

Este guia detalha o processo completo para obter todas as credenciais necessárias para usar a Google Ads API.

## Pré-requisitos

- Conta Google Ads ativa
- Acesso ao Google Cloud Console
- Conta Google Ads com gastos históricos (para obter Developer Token em produção)

## Passo 1: Criar Projeto no Google Cloud Console

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Clique em "Select a project" no topo
3. Clique em "New Project"
4. Dê um nome ao projeto (ex: "Kipon Ads Manager")
5. Clique em "Create"

## Passo 2: Ativar a Google Ads API

1. No menu lateral, vá em "APIs & Services" > "Library"
2. Busque por "Google Ads API"
3. Clique em "Google Ads API"
4. Clique em "Enable"

## Passo 3: Configurar OAuth 2.0 Consent Screen

1. No menu lateral, vá em "APIs & Services" > "OAuth consent screen"
2. Selecione "External" (ou "Internal" se for Google Workspace)
3. Clique em "Create"
4. Preencha as informações obrigatórias:
   - **App name**: Kipon Ads Manager
   - **User support email**: seu email
   - **Developer contact**: seu email
5. Clique em "Save and Continue"
6. Em "Scopes", clique em "Add or Remove Scopes"
7. Adicione o scope: `https://www.googleapis.com/auth/adwords`
8. Clique em "Save and Continue"
9. Em "Test users", adicione seu email do Google Ads
10. Clique em "Save and Continue"

## Passo 4: Criar OAuth 2.0 Client ID

1. No menu lateral, vá em "APIs & Services" > "Credentials"
2. Clique em "Create Credentials" > "OAuth client ID"
3. Tipo de aplicação: "Desktop app"
4. Nome: "Kipon Ads Manager Client"
5. Clique em "Create"
6. **Salve o Client ID e Client Secret** - você vai precisar deles!

Adicione no `.env`:
```
GOOGLE_ADS_CLIENT_ID=seu_client_id_aqui
GOOGLE_ADS_CLIENT_SECRET=seu_client_secret_aqui
```

## Passo 5: Obter Refresh Token

O Refresh Token é gerado através de um fluxo OAuth2. Você tem duas opções:

### Opção A: Usar o script helper (Recomendado)

Vamos criar um script que facilita esse processo. Execute:

```bash
npm run generate-refresh-token
```

O script vai:
1. Abrir uma URL no navegador
2. Pedir para você autorizar o acesso
3. Retornar o código de autorização
4. Gerar o refresh token automaticamente

### Opção B: Processo manual

1. Monte a URL de autorização (substitua CLIENT_ID pelo seu):
```
https://accounts.google.com/o/oauth2/v2/auth?client_id=CLIENT_ID&redirect_uri=urn:ietf:wg:oauth:2.0:oob&scope=https://www.googleapis.com/auth/adwords&response_type=code&access_type=offline&prompt=consent
```

2. Acesse a URL no navegador
3. Faça login com a conta Google Ads
4. Autorize o acesso
5. Copie o código de autorização que aparecer

6. Faça uma requisição POST para obter o refresh token:
```bash
curl -X POST https://oauth2.googleapis.com/token \
  -d "code=AUTHORIZATION_CODE" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "redirect_uri=urn:ietf:wg:oauth:2.0:oob" \
  -d "grant_type=authorization_code"
```

7. Copie o `refresh_token` da resposta

Adicione no `.env`:
```
GOOGLE_ADS_REFRESH_TOKEN=seu_refresh_token_aqui
```

## Passo 6: Obter Developer Token

### Para Teste (Test Account)

1. Acesse [Google Ads](https://ads.google.com/)
2. Clique no ícone de ferramentas no canto superior direito
3. Em "CONFIGURAÇÃO", clique em "Central de API"
4. Clique em "Criar token de desenvolvedor"
5. Copie o token

**Nota**: Developer tokens de teste têm limitações:
- Só funcionam em contas de teste
- Limite de requisições por dia
- Não podem criar campanhas reais

### Para Produção (Requer aprovação)

1. Na Central de API, solicite acesso básico ou padrão
2. Preencha o formulário de solicitação
3. Aguarde aprovação (pode levar alguns dias)
4. Sua conta precisa ter histórico de gastos

Adicione no `.env`:
```
GOOGLE_ADS_DEVELOPER_TOKEN=seu_developer_token_aqui
```

## Passo 7: Obter Customer ID

1. Acesse [Google Ads](https://ads.google.com/)
2. O Customer ID está no canto superior direito (formato: 123-456-7890)
3. Remova os hífens ao adicionar no `.env`

Adicione no `.env`:
```
GOOGLE_ADS_CUSTOMER_ID=1234567890
```

## Passo 8: Login Customer ID (Opcional)

Se você estiver usando uma conta gerenciadora (MCC):

1. Use o Customer ID da conta gerenciadora
2. Isso permite gerenciar múltiplas contas de cliente

Adicione no `.env`:
```
GOOGLE_ADS_LOGIN_CUSTOMER_ID=9876543210
```

## Arquivo .env Final

Seu arquivo `.env` deve ficar assim:

```env
GOOGLE_ADS_DEVELOPER_TOKEN=abc123xyz789
GOOGLE_ADS_CLIENT_ID=123456789-abc.apps.googleusercontent.com
GOOGLE_ADS_CLIENT_SECRET=GOCSPX-abc123xyz
GOOGLE_ADS_REFRESH_TOKEN=1//abc123xyz789...
GOOGLE_ADS_CUSTOMER_ID=1234567890
GOOGLE_ADS_LOGIN_CUSTOMER_ID=9876543210
```

## Verificar Configuração

Depois de configurar todas as credenciais, execute:

```bash
npm run dev
```

Se tudo estiver correto, você verá uma mensagem de conexão bem-sucedida.

## Troubleshooting

### Erro: "OAuth2 credentials have insufficient permission"
- Verifique se adicionou o scope correto no OAuth consent screen
- Gere um novo refresh token

### Erro: "Developer token is not approved"
- Use uma conta de teste para desenvolvimento
- Solicite aprovação do token para produção

### Erro: "Customer not found"
- Verifique se o Customer ID está correto
- Remova os hífens do Customer ID

## Recursos Úteis

- [Google Ads API - Get Started](https://developers.google.com/google-ads/api/docs/start)
- [OAuth2 for Google APIs](https://developers.google.com/identity/protocols/oauth2)
- [Google Ads API Forum](https://groups.google.com/g/adwords-api)
