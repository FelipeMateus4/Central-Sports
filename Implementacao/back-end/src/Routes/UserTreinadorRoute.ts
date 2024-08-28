import { Router } from 'express';
import { createTreinador, getTreinador, updateTreinador, deleteTreinador } from '../Controllers/TreinadorController';
import errorHandler from '../Middlewares/ErrorHandler';
import { ensureAuthenticated } from '../Middlewares/IsAuthenticated';

const router = Router();

router.post('/', createTreinador, errorHandler);
router.patch('/', ensureAuthenticated, updateTreinador, errorHandler);
router.delete('/', ensureAuthenticated, deleteTreinador, errorHandler);
router.get('/:id', ensureAuthenticated, getTreinador, errorHandler);

export { router as TreinadorRoutes };
