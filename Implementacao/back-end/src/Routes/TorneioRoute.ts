import { Router } from 'express';
import { torneioController } from '../Controllers/TorneioController';
import errorHandler from '../Middlewares/ErrorHandler';

const router = Router();

router.use('/torneio', torneioController, errorHandler);

export { router as torneioRoutes };
