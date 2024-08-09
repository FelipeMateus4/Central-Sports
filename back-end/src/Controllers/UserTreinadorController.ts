import { Router, Request, Response, NextFunction } from 'express';
import { treinadorType } from '../Types/TreinadorTypes';
import { userType } from '../Types/UserType';
import sequelize from '../Connections/Sequelize';
import TreinadorServices from '../Services/TreinadorServices';
import UserServices from '../Services/UserServices';
import { ensureAuthenticated } from '../Middlewares/IsAuthenticated';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, secret, type } = req.body;

    const user: userType = {
        email,
        password,
        secret,
        type,
    };

    const treinador: treinadorType = {
        name: req.body.name,
        cpf: req.body.cpf,
        graduation: req.body.graduation,
    };

    const transaction = await sequelize.transaction();

    try {
        const createdTreinador: any = await TreinadorServices.createTreinadorService(treinador, transaction);

        user.treinadorModelId = createdTreinador.id;

        const createdUser = await UserServices.createUserServices(user, transaction);

        await transaction.commit();

        return res
            .status(201)
            .send({ message: 'Treinador e User criados com sucesso.', data: { createdTreinador, createdUser } });
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
});

router.get('/', ensureAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const transaction = await sequelize.transaction();

    try {
        const user: any = await UserServices.getUserServices(email, transaction);
        const treinador: any = await TreinadorServices.getTreinadorServices(user.treinadorModelId, transaction);

        await transaction.commit();

        res.status(200).send({ message: 'Veja seus dados abaixo: ', data: { user, treinador } });
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
});

router.patch('/', ensureAuthenticated,)

export { router as treinadorController };
