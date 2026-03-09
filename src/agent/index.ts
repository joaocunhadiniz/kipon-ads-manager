/**
 * Kipon Ads Agent — loop principal com scheduler
 *
 * Schedules:
 * - A cada hora: sync de métricas
 * - Todo dia às 8h: otimização por regras
 * - Todo domingo às 9h: análise semanal com IA
 */

import cron from 'node-cron';
import { syncCampaigns } from './sync.js';
import { runOptimizer } from './optimizer.js';
import { log } from './logger.js';

async function start() {
  console.log('🤖 Kipon Ads Agent iniciando...\n');

  // Sync a cada hora
  cron.schedule('0 * * * *', async () => {
    console.log('⏰ [CRON] Sync horário iniciado');
    try {
      await syncCampaigns();
    } catch (e) {
      console.error('Erro no sync:', e);
    }
  });

  // Otimização diária às 8h
  cron.schedule('0 8 * * *', async () => {
    console.log('⏰ [CRON] Otimização diária iniciada');
    try {
      await runOptimizer(false);
    } catch (e) {
      console.error('Erro na otimização:', e);
    }
  });

  // Análise semanal com IA todo domingo às 9h
  cron.schedule('0 9 * * 0', async () => {
    console.log('⏰ [CRON] Análise semanal com IA iniciada');
    try {
      await runOptimizer(true);
    } catch (e) {
      console.error('Erro na análise semanal:', e);
    }
  });

  await log({
    action: 'SYNC_STARTED',
    status: 'info',
    message: '🤖 Agente iniciado. Schedules: sync/hora, otimização/dia 8h, análise-IA/domingo 9h',
  });

  console.log('✅ Agente rodando. Schedules ativos:');
  console.log('   - Sync: a cada hora');
  console.log('   - Otimização: diariamente às 8h');
  console.log('   - Análise IA: todo domingo às 9h\n');

  // Roda sync imediato na inicialização
  console.log('▶️  Rodando sync inicial...');
  try {
    await syncCampaigns();
  } catch (e) {
    console.error('Sync inicial falhou (aguardando próximo ciclo):', e);
  }
}

start().catch(console.error);
