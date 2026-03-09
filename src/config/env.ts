import { config } from 'dotenv';
import { z } from 'zod';

// Load environment variables
config();

// Schema de validação para variáveis de ambiente
const envSchema = z.object({
  GOOGLE_ADS_DEVELOPER_TOKEN: z.string().min(1, 'Developer token é obrigatório'),
  GOOGLE_ADS_CLIENT_ID: z.string().min(1, 'Client ID é obrigatório'),
  GOOGLE_ADS_CLIENT_SECRET: z.string().min(1, 'Client Secret é obrigatório'),
  GOOGLE_ADS_REFRESH_TOKEN: z.string().min(1, 'Refresh token é obrigatório'),
  GOOGLE_ADS_CUSTOMER_ID: z.string().min(1, 'Customer ID é obrigatório'),
  GOOGLE_ADS_LOGIN_CUSTOMER_ID: z.string().optional(),
});

// Validar variáveis de ambiente
function validateEnv() {
  try {
    return envSchema.parse({
      GOOGLE_ADS_DEVELOPER_TOKEN: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
      GOOGLE_ADS_CLIENT_ID: process.env.GOOGLE_ADS_CLIENT_ID,
      GOOGLE_ADS_CLIENT_SECRET: process.env.GOOGLE_ADS_CLIENT_SECRET,
      GOOGLE_ADS_REFRESH_TOKEN: process.env.GOOGLE_ADS_REFRESH_TOKEN,
      GOOGLE_ADS_CUSTOMER_ID: process.env.GOOGLE_ADS_CUSTOMER_ID,
      GOOGLE_ADS_LOGIN_CUSTOMER_ID: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Erro na validação das variáveis de ambiente:');
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
      console.error('\n📝 Verifique o arquivo .env e siga o guia em CREDENTIALS_GUIDE.md');
      process.exit(1);
    }
    throw error;
  }
}

export const env = validateEnv();

export type Env = z.infer<typeof envSchema>;
