import { Router } from 'express';
import { ensureAuthenticated } from '../Middlewares/IsAuthenticated';
import errorHandler from '../Middlewares/ErrorHandler';

const router = Router();

export { router as inscricaoRoutes };
