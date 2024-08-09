import { z } from 'zod';

const atleta = z.object({
    name: z.string(),
    cpf: z.string(),
    sport: z.string(),
});

type atleta = z.infer<typeof atleta>;

export { atleta as atletaType };
