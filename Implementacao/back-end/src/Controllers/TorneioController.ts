import { Router, Request, Response, NextFunction } from 'express';
import { torneioType } from '../Types/TorneioType';
import { userType } from '../Types/UserType';
import sequelize from '../Connections/Sequelize';
import TorneioServices from '../Services/TorneioServices';
import UserServices from '../Services/UserServices';
import { ensureAuthenticated } from '../Middlewares/IsAuthenticated';
import speakeasy from 'speakeasy';

const router = Router();

router.post('/', ensureAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    const { name, descricao, qtdVagas, esporte, data } = req.body;

    const torneio: torneioType = {
        name: req.body.name,
        descricao: req.body.descricao,
        qtdVagas: req.body.qtdVagas,
        esporte: req.body.esporte,
        data: req.body.data,
    };

    try {
        const createdTorneio: any = await TorneioServices.createTorneioService(torneio);

        return res.status(201).send({ message: 'Torneio criado com sucesso. ', data: { createdTorneio } });
    } catch (error) {
        next(error);
    }
});

router.get('/:id', ensureAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = parseInt(req.params.id, 10);

        const torneio = await TorneioServices.getTorneioByIdService(id);

        return res.status(200).send({ message: 'Veja abaixo os dados do torneio: ', data: { torneio } });
    } catch (error) {
        next(error);
    }
});
router.get('/', ensureAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const torneio: any = await TorneioServices.getTorneioService();

        res.status(200).send({ message: 'Veja abaixo os dados do torneio: ', data: { torneio } });
    } catch (error) {
        next(error);
    }
});

router.patch('/', ensureAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    const keys = req.body;

    try {
        const torneio: any = await TorneioServices.updateTorneioService(keys);
        return res.status(200).send({ message: 'Veja abaixo os dados atualizados do torneio', data: { torneio } });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', ensureAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id, 10); // Convert id to a number

    try {
        const result: any = await TorneioServices.deleteTorneioService(id);

        return res.status(200).send({ message: result });
    } catch (error) {
        next(error);
    }
});

export { router as torneioController };
