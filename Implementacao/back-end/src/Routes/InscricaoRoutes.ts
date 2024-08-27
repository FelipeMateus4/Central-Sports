import { Router } from 'express';
import { ensureAuthenticated } from '../Middlewares/IsAuthenticated';
import errorHandler from '../Middlewares/ErrorHandler';
import {
    createInscricao,
    deleteInscricao,
    getInscricaoAtleta,
    getInscricaoById,
    getInscricaoTreinador,
    updateInscricao,
    getInscricaoAll,
} from '../Controllers/InscricoesController';

const router = Router();
router.post('/', ensureAuthenticated, createInscricao, errorHandler);
router.patch('/', ensureAuthenticated, updateInscricao, errorHandler);
router.delete('/:id', ensureAuthenticated, deleteInscricao, errorHandler);
// router.get('/', ensureAuthenticated, getInscricaoAtleta, errorHandler);
router.get('/treinador', ensureAuthenticated, getInscricaoTreinador, errorHandler);
router.get('/:id', ensureAuthenticated, getInscricaoById, errorHandler);
router.get('/', ensureAuthenticated, getInscricaoAll, errorHandler);

export { router as inscricaoRoutes };
