import { authCOntroller } from '../Controllers/AuthController';
import { Router } from 'express';
import errorHandler from '../Middlewares/ErrorHandler';

const router = Router();

router.use('/auth', authCOntroller, errorHandler);

export { router as authRouter };
