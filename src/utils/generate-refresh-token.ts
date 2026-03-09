/**
 * Script helper para gerar Refresh Token do Google Ads
 *
 * Uso:
 * 1. Configure CLIENT_ID e CLIENT_SECRET no .env
 * 2. Execute: npm run generate-refresh-token
 * 3. Siga as instruções no terminal
 */

import { createInterface } from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const REDIRECT_URI = 'urn:ietf:wg:oauth:2.0:oob';
const SCOPE = 'https://www.googleapis.com/auth/adwords';

async function main() {
  const rl = createInterface({ input, output });

  console.log('🔐 Gerador de Refresh Token - Google Ads API\n');

  // Pedir credenciais
  const clientId = await rl.question('Client ID: ');
  const clientSecret = await rl.question('Client Secret: ');

  if (!clientId || !clientSecret) {
    console.error('❌ Client ID e Client Secret são obrigatórios!');
    process.exit(1);
  }

  // Gerar URL de autorização
  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
  authUrl.searchParams.set('scope', SCOPE);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('access_type', 'offline');
  authUrl.searchParams.set('prompt', 'consent');

  console.log('\n📋 Passo 1: Abra esta URL no navegador:\n');
  console.log(authUrl.toString());
  console.log('\n');

  // Pedir código de autorização
  const authCode = await rl.question('Passo 2: Cole o código de autorização aqui: ');

  if (!authCode) {
    console.error('❌ Código de autorização é obrigatório!');
    process.exit(1);
  }

  console.log('\n⏳ Obtendo refresh token...\n');

  // Trocar código por refresh token
  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code: authCode,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Erro ao obter refresh token:');
      console.error(JSON.stringify(data, null, 2));
      process.exit(1);
    }

    console.log('✅ Refresh token obtido com sucesso!\n');
    console.log('📝 Adicione esta linha ao seu arquivo .env:\n');
    console.log(`GOOGLE_ADS_REFRESH_TOKEN=${data.refresh_token}\n`);

    if (data.access_token) {
      console.log('ℹ️  Access token (expira em 1 hora):');
      console.log(`${data.access_token}\n`);
    }
  } catch (error) {
    console.error('❌ Erro ao fazer requisição:', error);
    process.exit(1);
  }

  rl.close();
}

main().catch(console.error);
