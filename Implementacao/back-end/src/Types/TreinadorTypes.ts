import { z } from 'zod';

const treinador = z.object({
    name: z.string(),
    cpf: z.string(),
    graduation: z.string(),
});

type treinador = z.infer<typeof treinador>;

export { treinador as treinadorType };
