import { Router, Request, Response } from 'express';
import { PatrocinadorType } from '../Types/PatrocinadorType';
import PatrocinadorService from '../Services/PatrocinadorService';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const patrocinador: PatrocinadorType = {
        name: req.body.name,
        cnpj: req.body.cnpj,
    };
    try {
        const result = await PatrocinadorService.criarPatrocinador(patrocinador);
        return res.status(201).send({ message: 'Patrocinador criado com sucesso.', data: result });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
    }
});

export { router as patrocinadorController };
