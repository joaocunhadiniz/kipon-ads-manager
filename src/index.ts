/**
 * Entry point do Kipon Ads Manager
 */

import GoogleAdsClient from './services/google-ads-client.js';

async function main() {
  console.log('🚀 Kipon Ads Manager - Iniciando...\n');

  try {
    // Inicializar cliente
    const adsClient = GoogleAdsClient.getInstance();

    // Testar conexão
    const connected = await adsClient.testConnection();

    if (!connected) {
      console.error('\n❌ Não foi possível conectar. Verifique suas credenciais.');
      process.exit(1);
    }

    console.log('\n✅ Sistema pronto para uso!');
    console.log('\n📝 Próximos passos:');
    console.log('   - npm run create-campaigns  # Criar campanhas');
    console.log('   - npm run list-campaigns    # Listar campanhas existentes');
  } catch (error) {
    console.error('\n❌ Erro ao inicializar:', error);
    process.exit(1);
  }
}

main().catch(console.error);
