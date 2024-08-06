import { z } from 'zod';

const treinador = z.object({
    name: z.string(),
    age: z.number(),
    specialty: z.string(),
});

type treinador = z.infer<typeof treinador>;

export { treinador as treinadorType };
