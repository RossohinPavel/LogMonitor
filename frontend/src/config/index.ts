import { z } from "zod";


const СonfigSchema = z.object({
  backendUrl: z.url(),
});

export const env = СonfigSchema.parse({
  backendUrl: import.meta.env.VITE_BACKEND_URL as string,
} satisfies z.infer<typeof СonfigSchema>);