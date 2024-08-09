import { Router } from 'express';
import { AtletaController } from '../Controllers/AtletaController';
import errorHandler from '../Middlewares/ErrorHandler';

const router = Router();

router.use('/atleta', AtletaController, errorHandler);

export { router as userAtletaRoutes };
