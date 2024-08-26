import { z } from 'zod';

const Inscricao = z.object({
    atletaId: z.number(),
    treinadorId: z.number(),
    torneioId: z.number(),
});

type Inscricao = z.infer<typeof Inscricao>;

export { Inscricao as InscricaoType };
