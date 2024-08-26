import { Router, Request, Response, NextFunction } from 'express';
import speakeasy from 'speakeasy';
import sequelize from '../Connections/Sequelize';
import UserServices from '../Services/UserServices';
import AtletaServices from '../Services/AtletaService';
import { userType } from '../Types/UserType';
import { atletaType } from '../Types/AtletaType';

const registerAtleta = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name, cpf, sport } = req.body;
    const secret = speakeasy.generateSecret({ length: 20 });
    const type = 'atleta';

    const user: userType = {
        email: email,
        password: password,
        secret: secret.base32,
        session: false,
        type: type,
    };

    const atleta: atletaType = {
        name: name,
        cpf: cpf,
        sport: sport,
    };

    const transaction = await sequelize.transaction();

    try {
        const createdAtleta: any = await AtletaServices.createAtleta(atleta, transaction);
        user.atletaModelId = createdAtleta.id;

        const createdUser = await UserServices.createUserServices(user, transaction);

        await transaction.commit();

        return res.status(201).send({ message: 'User criado com sucesso.', data: { createdUser, createdAtleta } });
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};

const getAtleta = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const transaction = await sequelize.transaction();

    try {
        const user: any = await UserServices.getUserServices(email, transaction);
        const atleta: any = await AtletaServices.getAtleta(user.atletaModelId, transaction);

        await transaction.commit();

        return res.status(200).send({ message: 'Veja seus dados abaixo: ', data: { user, atleta } });
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};

const updateAtleta = async (req: Request, res: Response, next: NextFunction) => {
    const keys = req.body;
    const transaction = await sequelize.transaction();

    try {
        const user: any = await UserServices.updateUserServices(keys, transaction);
        const atleta: any = await AtletaServices.updateAtleta(keys, transaction);

        await transaction.commit();

        return res.status(200).send({ message: 'Veja abaixo seus dados atualizados', data: { user, atleta } });
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};

const deleteAtleta = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const transaction = await sequelize.transaction();

    try {
        const user: any = await UserServices.getUserServices(email, transaction);
        const atleta: any = await AtletaServices.deleteAtleta(user.atletaModelId, transaction);
        await UserServices.deleteUserServices(email, transaction);

        await transaction.commit();

        return res.status(200).send({ message: 'Usuário e atleta deletados com sucesso.' });
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};

export { registerAtleta, getAtleta, updateAtleta, deleteAtleta };
