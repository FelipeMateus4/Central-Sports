import { z } from 'zod';

const user = z.object({
    email: z.string(),
    password: z.string(),
    age: z.number(),
    secret: z.string(),
    type: z.string(),
});

type user = z.infer<typeof user>;

export { user as userType };
