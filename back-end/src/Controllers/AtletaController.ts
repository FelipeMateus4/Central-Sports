import { Router, Request, Response, NextFunction } from 'express';
import { userType } from '../Types/UserType';
import sequelize from '../Connections/Sequelize';
import UserServices from '../Services/UserServices';
import AtletaServices from '../Services/AtletaService';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, secret, type } = req.body;

    const user: userType = {
        email,
        password,
        secret,
        type,
    };

    const atleta: any = {
        name: req.body.name,
        cpf: req.body.cpf,
        sport: req.body.sport,
    };

    const transaction = await sequelize.transaction();

    try {
        const createdAtleta: any = await AtletaServices.createAtletaService(atleta, transaction);

        user.atletaModelId = createdAtleta.id;

        const createdUser = await UserServices.createUserServices(user, transaction);

        await transaction.commit();

        return res.status(201).send({ message: 'User criado com sucesso.', data: { user } });
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
});

export { router as AtletaController };
