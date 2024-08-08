import { z } from 'zod';

const Patrocinador = z.object({
    name: z.string(),
    cnpj: z.string(),
});

// extract the inferred type
type Patrocinador = z.infer<typeof Patrocinador>;

export { Patrocinador as PatrocinadorType };
