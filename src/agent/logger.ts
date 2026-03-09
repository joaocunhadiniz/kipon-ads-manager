/**
 * Logger do agente — registra todas as ações no Supabase
 * Schema compatível com Lovable Cloud: level, message, metadata
 */

import { supabase } from './supabase-client.js';

export type LogAction =
  | 'SYNC_STARTED'
  | 'SYNC_COMPLETED'
  | 'SYNC_FAILED'
  | 'CAMPAIGN_PAUSED'
  | 'CAMPAIGN_ACTIVATED'
  | 'BUDGET_ADJUSTED'
  | 'OPTIMIZATION_STARTED'
  | 'OPTIMIZATION_COMPLETED'
  | 'RULE_TRIGGERED'
  | 'AI_DECISION';

export interface LogEntry {
  action: LogAction;
  status: 'success' | 'error' | 'info';
  message: string;
  campaign_id?: string;
  metadata?: Record<string, unknown>;
}

export async function log(entry: LogEntry): Promise<void> {
  console.log(`[${new Date().toISOString()}] [${entry.action}] ${entry.message}`);

  // Mapeia status → level (schema do Lovable)
  const level = entry.status === 'error' ? 'error'
    : entry.status === 'success' ? 'info'
    : 'info';

  await supabase.from('agent_logs').insert({
    level,
    message: `[${entry.action}] ${entry.message}`,
    metadata: {
      action: entry.action,
      status: entry.status,
      campaign_id: entry.campaign_id ?? null,
      ...entry.metadata,
    },
  });
}
