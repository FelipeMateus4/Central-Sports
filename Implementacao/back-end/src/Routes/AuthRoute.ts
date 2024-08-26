import { login, authenticate, logout } from '../Controllers/AuthController';
import { Router } from 'express';
import errorHandler from '../Middlewares/ErrorHandler';
import { ensureAuthenticated } from '../Middlewares/IsAuthenticated';

const router = Router();

router.use('/login', login, errorHandler);
router.use('/authenticate', ensureAuthenticated, authenticate, errorHandler);
router.use('/logout', ensureAuthenticated, logout, errorHandler);

export { router as authRouter };
