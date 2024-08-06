import { z } from 'zod';

const user = z.object({
    email: z.string(),
    password: z.string(),
    secret: z.string(),
    type: z.string(),
    treinadorId: z.number().optional(),
});

type user = z.infer<typeof user>;

export { user as userType };
