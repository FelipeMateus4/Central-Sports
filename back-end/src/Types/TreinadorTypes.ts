import { z } from 'zod';

const treinador = z.object({
    id: z.number(),
    age: z.number(),
    nome: z.string(),
    especialidade: z.string(),
});

type treinador = z.infer<typeof treinador>;

export { treinador as treinadorType };
