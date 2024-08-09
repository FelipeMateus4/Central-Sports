import { Router } from 'express';
import { treinadorController } from '../Controllers/UserTreinadorController';
import errorHandler from '../Middlewares/ErrorHandler';

const router = Router();

router.use('/treinador', treinadorController, errorHandler);

export { router as userTreinadorRoutes };
