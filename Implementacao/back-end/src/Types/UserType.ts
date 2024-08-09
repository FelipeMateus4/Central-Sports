import { session } from 'passport';
import { z } from 'zod';

const user = z.object({
    email: z.string(),
    password: z.string(),
    secret: z.string(),
    type: z.string(),
    session: z.boolean().default(false),
    treinadorModelId: z.number().optional(),
    atletaModelId: z.number().optional(),
});

type user = z.infer<typeof user>;

export { user as userType };
