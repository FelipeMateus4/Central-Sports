import {z} from 'zod';

const torneio = z.object({
    name: z.string(),
    descricao: z.string(),
    qtdVagas: z.number(),
    esporte: z.string(),
    data: z.string().datetime(),
});

type torneio = z.infer<typeof torneio>;

export {torneio as torneioType};