import { z } from 'zod';

const envVars = z.object({
  NEXT_PUBLIC_BACKEND_URL: z.string(),
});

envVars.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVars> {}
  }
}
