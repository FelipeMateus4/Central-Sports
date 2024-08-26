import { Router, Request, Response, NextFunction } from 'express';
import { treinadorType } from '../Types/TreinadorTypes';
import { userType } from '../Types/UserType';
import sequelize from '../Connections/Sequelize';
import TreinadorServices from '../Services/TreinadorServices';
import UserServices from '../Services/UserServices';
import { ensureAuthenticated } from '../Middlewares/IsAuthenticated';
import speakeasy from 'speakeasy';

const router = Router();

const createTreinador = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const secret = speakeasy.generateSecret({ length: 20 });
    const type = 'treinador';
    const user: userType = {
        email: email,
        password: password,
        secret: secret.base32,
        session: false,
        type: type,
    };

    const treinador: treinadorType = {
        name: req.body.name,
        cpf: req.body.cpf,
        graduation: req.body.graduation,
    };

    const transaction = await sequelize.transaction();

    try {
        const createdTreinador: any = await TreinadorServices.createTreinador(treinador, transaction);

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
};

const getTreinador = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const transaction = await sequelize.transaction();

    try {
        const user: any = await UserServices.getUserServices(email, transaction);
        const treinador: any = await TreinadorServices.getTreinador(user.treinadorModelId, transaction);

        await transaction.commit();

        return res.status(200).send({ message: 'Veja seus dados abaixo: ', data: { user, treinador } });
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};

const updateTreinador = async (req: Request, res: Response, next: NextFunction) => {
    const updates = req.body;
    const transaction = await sequelize.transaction();

    try {
        const updatedTreinador = await TreinadorServices.updateTreinador(updates, transaction);
        const updatedUser = await UserServices.updateUserServices(updates, transaction);
        await transaction.commit();

        return res
            .status(200)
            .send({ message: 'Dados Atualizados com sucesso', data: { updatedTreinador, updatedUser } });
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};

const deleteTreinador = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const transaction = await sequelize.transaction();
    try {
        const user: any = await UserServices.getUserServices(email, transaction);
        const result = await TreinadorServices.deleteUser(user.treinadorModelId, transaction);
        const result2 = await UserServices.deleteUserServices(email, transaction);
        transaction.commit();
        return res.status(200).send({ message: result });
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};

export { createTreinador, getTreinador, updateTreinador, deleteTreinador };
