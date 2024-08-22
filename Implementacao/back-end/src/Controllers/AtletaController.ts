import { Router, Request, Response, NextFunction } from 'express';
import { userType } from '../Types/UserType';
import sequelize from '../Connections/Sequelize';
import UserServices from '../Services/UserServices';
import AtletaServices from '../Services/AtletaService';
import { ensureAuthenticated } from '../Middlewares/IsAuthenticated';
import { atletaType } from '../Types/AtletaType';
import speakeasy from 'speakeasy';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
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

        return res.status(201).send({ message: 'User criado com sucesso.', data: { createdUser, createdAtleta } });
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
        const atleta: any = await AtletaServices.getAtleta(user.atletaModelId, transaction);

        await transaction.commit();

        return res.status(200).send({ message: 'Veja seus dados abaixo: ', data: { user, atleta } });
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
});

router.patch('/', ensureAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    const keys = req.body;
    const transaction = await sequelize.transaction();

    try {
        const user: any = await UserServices.updateUserServices(keys, transaction);
        const atleta: any = await AtletaServices.updateAtletaServices(keys, transaction);

        await transaction.commit();

        return res.status(200).send({ message: 'Veja abaixo seus dados atualizados', data: { user, atleta } });
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
});

router.delete('/', ensureAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const transaction = await sequelize.transaction();

    try {
        const user: any = await UserServices.getUserServices(email, transaction);
        const atleta: any = await AtletaServices.deleteAtletaServices(user.atletaModelId, transaction);
        await UserServices.deleteUserServices(email, transaction);

        await transaction.commit();

        return res.status(200).send({ message: atleta });
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
});

export { router as AtletaController };
