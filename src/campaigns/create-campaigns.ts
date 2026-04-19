/**
 * Script para criar as campanhas Kipon no Google Ads
 *
 * Uso: npm run create-campaigns
 */

import GoogleAdsClient from '../services/google-ads-client.js';
import CampaignCreator from '../services/campaign-creator.js';
import assemblyCampaigns from './assembly-campaigns.config.js';

async function main() {
  console.log('🚀 Kipon Ads Manager - Criação de Campanhas\n');
  console.log('═══════════════════════════════════════════════════\n');

  try {
    // 1. Inicializar cliente
    const adsClient = GoogleAdsClient.getInstance();
    const customer = adsClient.getCustomer();

    // 2. Testar conexão
    console.log('🔌 Testando conexão...');
    const connected = await adsClient.testConnection();

    if (!connected) {
      console.error('\n❌ Não foi possível conectar. Verifique suas credenciais no .env');
      process.exit(1);
    }

    console.log('\n═══════════════════════════════════════════════════\n');

    // 3. Verificar se campanha já existe
    console.log('🔍 Verificando campanhas existentes...\n');
    const campaign1Exists = await adsClient.getCampaignByName(assemblyCampaigns.campaign1.campaign.name);

    if (campaign1Exists) {
      console.log('⚠️  ATENÇÃO: Campanha já existe!\n');
      console.log(`   - "${assemblyCampaigns.campaign1.campaign.name}" já existe`);
      console.log('\n❌ Cancelando criação para evitar duplicatas.');
      console.log('💡 Dica: Delete a campanha existente ou altere o nome na configuração.\n');
      process.exit(1);
    }

    console.log('✅ Nenhuma campanha existente encontrada. Prosseguindo...\n');
    console.log('═══════════════════════════════════════════════════\n');

    // 4. Criar campanha
    const creator = new CampaignCreator(customer);

    console.log('📊 CAMPANHA: ASSEMBLY - AGENTE DE VOZ PARA TIMES');
    console.log('───────────────────────────────────────────────────');
    const result1 = await creator.createCampaign(assemblyCampaigns.campaign1);

    await creator.addNegativeKeywords(result1.campaignId, assemblyCampaigns.negativeKeywords);

    console.log('\n═══════════════════════════════════════════════════\n');

    // 5. Resumo final
    console.log('✅ CAMPANHA CRIADA COM SUCESSO!\n');
    console.log('📋 RESUMO:');
    console.log('───────────────────────────────────────────────────');
    console.log(`\n🎯 Campanha: ${assemblyCampaigns.campaign1.campaign.name}`);
    console.log(`   ID: ${result1.campaignId}`);
    console.log(`   Orçamento: R$ 5/dia`);
    console.log(`   Ad Groups: ${result1.adGroupIds.length}`);
    console.log(`   Status: PAUSADA (ativar após revisão)`);
    console.log(`   Landing Page: ${assemblyCampaigns.campaign1.landingPageUrl}`);

    console.log('\n═══════════════════════════════════════════════════\n');

    // 6. Próximos passos
    console.log('📝 PRÓXIMOS PASSOS:\n');
    console.log('1. Acesse Google Ads e revise as campanhas criadas');
    console.log('2. Verifique se os anúncios estão em aprovação');
    console.log('3. Configure conversões no Google Ads (se ainda não configurado)');
    console.log('4. Ative as campanhas quando estiver pronto');
    console.log('5. Monitore performance: npm run list-campaigns');
    console.log('\n💡 DICA: Use as marketing skills para:');
    console.log('   - Auditar campanhas após 1 semana (google-ads-audit)');
    console.log('   - Otimizar landing pages (landing-page-audit)');
    console.log('   - Ajustar distribuição de orçamento (ad-spend-allocator)');
    console.log('\n═══════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('\n❌ ERRO AO CRIAR CAMPANHAS:\n');
    console.error(error);
    console.log('\n💡 TROUBLESHOOTING:');
    console.log('   - Verifique se todas as credenciais estão corretas no .env');
    console.log('   - Confirme que o developer token está aprovado');
    console.log('   - Verifique se a conta Google Ads está ativa');
    console.log('   - Consulte CREDENTIALS_GUIDE.md para mais ajuda\n');
    process.exit(1);
  }
}

main().catch(console.error);
