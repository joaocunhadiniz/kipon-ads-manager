/**
 * Script para listar campanhas existentes
 *
 * Uso: npm run list-campaigns
 */

import GoogleAdsClient from '../services/google-ads-client.js';

async function main() {
  console.log('📊 Kipon Ads Manager - Lista de Campanhas\n');
  console.log('═══════════════════════════════════════════════════\n');

  try {
    // Inicializar cliente
    const adsClient = GoogleAdsClient.getInstance();

    // Testar conexão
    const connected = await adsClient.testConnection();

    if (!connected) {
      console.error('\n❌ Não foi possível conectar. Verifique suas credenciais.');
      process.exit(1);
    }

    console.log('\n═══════════════════════════════════════════════════\n');

    // Listar campanhas
    console.log('📋 CAMPANHAS ATIVAS:\n');
    const campaigns = await adsClient.listCampaigns();

    if (campaigns.length === 0) {
      console.log('ℹ️  Nenhuma campanha encontrada.');
      console.log('\n💡 Dica: Execute "npm run create-campaigns" para criar as campanhas Kipon.\n');
      return;
    }

    // Agrupar por status
    const enabled = campaigns.filter((c) => c.campaign?.status === 'ENABLED');
    const paused = campaigns.filter((c) => c.campaign?.status === 'PAUSED');
    const removed = campaigns.filter((c) => c.campaign?.status === 'REMOVED');

    // Mostrar campanhas ativas
    if (enabled.length > 0) {
      console.log('🟢 ATIVAS:');
      enabled.forEach((c) => {
        console.log(`\n   ${c.campaign?.name}`);
        console.log(`   ID: ${c.campaign?.id}`);
        console.log(`   Tipo: ${c.campaign?.advertising_channel_type}`);
        console.log(`   Orçamento: R$ ${(c.campaign_budget?.amount_micros || 0) / 1_000000}/dia`);
        console.log(`   Impressões: ${c.metrics?.impressions || 0}`);
        console.log(`   Cliques: ${c.metrics?.clicks || 0}`);
        console.log(`   Custo: R$ ${((c.metrics?.cost_micros || 0) / 1_000000).toFixed(2)}`);
        if (c.metrics?.clicks && c.metrics?.impressions) {
          const ctr = ((c.metrics.clicks / c.metrics.impressions) * 100).toFixed(2);
          console.log(`   CTR: ${ctr}%`);
        }
      });
    }

    // Mostrar campanhas pausadas
    if (paused.length > 0) {
      console.log('\n\n⏸️  PAUSADAS:');
      paused.forEach((c) => {
        console.log(`\n   ${c.campaign?.name}`);
        console.log(`   ID: ${c.campaign?.id}`);
        console.log(`   Orçamento: R$ ${(c.campaign_budget?.amount_micros || 0) / 1_000000}/dia`);
      });
    }

    // Mostrar campanhas removidas
    if (removed.length > 0) {
      console.log('\n\n🗑️  REMOVIDAS:');
      removed.forEach((c) => {
        console.log(`\n   ${c.campaign?.name}`);
        console.log(`   ID: ${c.campaign?.id}`);
      });
    }

    console.log('\n═══════════════════════════════════════════════════');
    console.log(`\n📊 TOTAL: ${campaigns.length} campanhas`);
    console.log(`   - Ativas: ${enabled.length}`);
    console.log(`   - Pausadas: ${paused.length}`);
    console.log(`   - Removidas: ${removed.length}`);

    console.log('\n═══════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('\n❌ Erro ao listar campanhas:', error);
    process.exit(1);
  }
}

main().catch(console.error);
