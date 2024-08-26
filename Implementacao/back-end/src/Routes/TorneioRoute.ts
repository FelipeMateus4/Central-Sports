import { Router } from 'express';
import {
    createTorneio,
    getAllTorneios,
    getTorneioById,
    updateTorneio,
    deleteTorneio,
} from '../Controllers/TorneioController';
import errorHandler from '../Middlewares/ErrorHandler';
import { ensureAuthenticated } from '../Middlewares/IsAuthenticated';

const router = Router();

router.post('/', ensureAuthenticated, createTorneio, errorHandler);
router.patch('/', ensureAuthenticated, updateTorneio, errorHandler);
router.delete('/:id', ensureAuthenticated, deleteTorneio, errorHandler);
router.get('/:id', ensureAuthenticated, getTorneioById, errorHandler);
router.get('/', ensureAuthenticated, getAllTorneios, errorHandler);

export { router as torneioRoutes };
