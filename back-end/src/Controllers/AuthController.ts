import passport from '../utils/Passportoptions';
import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.post('/login', (req: Request, res: Response, next) => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
        if (err) return next(err);
        if (!user) {
            // Retorna um JSON com a URL de redirecionamento para falha
            return res.status(401).json({
                message: info.message,
            });
        }
        req.logIn(user, (err) => {
            if (err) return next(err);
            // Retorna um JSON com a URL de redirecionamento para sucesso
            return res.status(200).json({
                message: 'login efetuado',
                user: user,
            });
        });
    })(req, res, next);
});

router.post('/logout', async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            return res.status(200).send({ message: 'Usuário deslogado com sucesso' });
        });
    } catch (error) {
        next(error);
    }
});

export { router as authCOntroller };
