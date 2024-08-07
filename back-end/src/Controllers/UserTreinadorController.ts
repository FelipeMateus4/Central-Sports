import { Router, Request, Response, NextFunction } from 'express';
import { treinadorType } from '../Types/TreinadorTypes';
import { userType } from '../Types/UserType';
import sequelize from '../Connections/Sequelize';
import TreinadorServices from '../Services/TreinadorServices';
import UserServices from '../Services/UserServices';

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
        age: req.body.age,
        specialty: req.body.specialty,
    };

    const transaction = await sequelize.transaction();

    try {
        // Criação do Treinador
        const createdTreinador: any = await TreinadorServices.createTreinadorService(treinador, transaction);

        // Associar o treinador ao usuário
        user.treinadorId = createdTreinador.id;

        // Criação do User
        const createdUser = await UserServices.createUserServices(user, transaction);

        // Commit da transação
        await transaction.commit();

        return res
            .status(201)
            .send({ message: 'Treinador e User criados com sucesso.', data: { createdTreinador, createdUser } });
    } catch (error) {
        // Rollback da transação em caso de erro
        await transaction.rollback();
        next(error);
    }
});

export { router as treinadorController };
