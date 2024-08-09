import { Router } from 'express';
import { patrocinadorController } from '../Controllers/PatrocinadorController';

const router = Router();

router.use('/sponsors', patrocinadorController);

export { router as PatrocinadorRoutes };
