import { Router } from 'express';
import { ensureAuthenticated } from '../Middlewares/IsAuthenticated';
import errorHandler from '../Middlewares/ErrorHandler';
import {
    crateInscricao,
    deleteInscricao,
    getInscricaoAtleta,
    getInscricaoById,
    getInscricaoTreinador,
    updateInscricao,
} from '../Controllers/InscricoesController';

const router = Router();

router.post('/', ensureAuthenticated, crateInscricao, errorHandler);
router.patch('/', ensureAuthenticated, updateInscricao, errorHandler);
router.delete('/', ensureAuthenticated, deleteInscricao, errorHandler);
router.get('/', ensureAuthenticated, getInscricaoAtleta, errorHandler);
router.get('/treinador', ensureAuthenticated, getInscricaoTreinador, errorHandler);
router.get('/:id', ensureAuthenticated, getInscricaoById, errorHandler);

export { router as inscricaoRoutes };
