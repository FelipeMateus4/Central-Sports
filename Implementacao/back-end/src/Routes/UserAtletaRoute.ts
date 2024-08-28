import { Router } from 'express';
import { getAtleta, registerAtleta, updateAtleta, deleteAtleta } from '../Controllers/AtletaController';
import errorHandler from '../Middlewares/ErrorHandler';
import { ensureAuthenticated } from '../Middlewares/IsAuthenticated';

const router = Router();

router.post('/', registerAtleta, errorHandler);
router.put('/', ensureAuthenticated, updateAtleta, errorHandler);
router.delete('/', ensureAuthenticated, deleteAtleta, errorHandler);
router.get('/:id', ensureAuthenticated, getAtleta, errorHandler);

export { router as userAtletaRoutes };
