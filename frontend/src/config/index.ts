import { z } from "zod";


const СonfigSchema = z.object({
  base: z.string(),
  backendUrl: z.url(),
});

export const env = СonfigSchema.parse({
  base: import.meta.env.VITE_BASE as string,
  backendUrl: import.meta.env.VITE_BACKEND_URL as string,
} satisfies z.infer<typeof СonfigSchema>);