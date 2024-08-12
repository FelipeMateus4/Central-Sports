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
    const { email, password, secret, type } = req.body;

    const user: userType = {
        email: email,
        password: password,
        secret: secret.base32,
        session: false,
        type: type,
    };

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

router.get('/', ensureAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id;
    const transaction: any = await sequelize.transaction();

    try {
        const torneio: any = await TorneioServices.getTorneioService(id);

        await transaction.commit();

        res.status(200).send({ message: 'Veja os dados do torneio abaixo: ', data: { torneio } });
    } catch (error) {
        await transaction.rollback();
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

export { router as torneioController };
