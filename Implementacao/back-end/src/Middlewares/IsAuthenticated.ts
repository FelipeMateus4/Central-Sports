import { Request, Response, NextFunction } from 'express';

const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log(req.isAuthenticated());
    return res.status(401).send({ message: 'Usuario não logado' });
};
export { ensureAuthenticated };
