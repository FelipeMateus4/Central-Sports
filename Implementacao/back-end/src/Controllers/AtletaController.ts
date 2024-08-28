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
    const id: number = parseInt(req.params.id);
    const transaction = await sequelize.transaction();

    try {
        const user: any = await UserServices.getUserById(id, transaction);
        const atleta: any = await AtletaServices.getAtleta(user.atletaModelId, transaction);

        await transaction.commit();

        return res.status(200).send({ message: 'Veja seus dados abaixo: ', data: { user, atleta } });
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};

const updateAtleta = async (req: Request, res: Response, next: NextFunction) => {
    const { id, ...updatedData } = req.body;
    const transaction = await sequelize.transaction();

    try {
        console.log('Iniciando atualização do usuário com ID:', id);

        // Atualiza o usuário com base no ID
        const user = await UserServices.updateUserServices({ id: id, ...updatedData }, transaction);

        if (!user) {
            throw new Error('Usuário não encontrado ou não atualizado');
        }
        console.log('Usuário atualizado:', user);

        // Verifica se o atletaModelId existe antes de tentar atualizar o atleta
        if (user.atletaModelId) {
            console.log('Atualizando atleta com ID:', user.atletaModelId);
            const atleta = await AtletaServices.updateAtleta({ id: user.atletaModelId, ...updatedData }, transaction);
            console.log('Atleta atualizado:', atleta);
        } else {
            console.log('Nenhum atleta associado ao usuário.');
        }

        await transaction.commit();

        return res.status(200).send({ message: 'Perfil atualizado com sucesso', data: { user } });
    } catch (error) {
        console.error('Erro durante a atualização:', error);
        await transaction.rollback();
        next(error);
    }
};

const deleteAtleta = async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.body.id);
    const transaction = await sequelize.transaction();

    try {
        const user: any = await UserServices.getUserServices(id, transaction);
        const atleta: any = await AtletaServices.deleteAtleta(user.atletaModelId, transaction);
        await UserServices.deleteUserServices(user.email, transaction);

        await transaction.commit();

        return res.status(200).send({ message: 'Usuário e atleta deletados com sucesso.' });
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};

export { registerAtleta, getAtleta, updateAtleta, deleteAtleta };
