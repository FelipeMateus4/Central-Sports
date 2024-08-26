import passport from '../utils/Passportoptions';
import { Router, Request, Response, NextFunction } from 'express';
import speakeasy from 'speakeasy';
import UserServices from '../Services/UserServices';
import { session } from 'passport';
import { userModel } from '../Models/UserModel';

const login = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
        if (err) return next(err);
        if (!user) {
            return res.status(401).json({
                message: info.message,
            });
        }
        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.status(200).json({
                message: 'login efetuado',
                user: user,
            });
        });
    })(req, res, next);
};

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.body.token;
        const user: any = req.user;
        console.log('seu token: ', token);
        const tokenValidates = speakeasy.totp.verify({
            secret: user.secret,
            encoding: 'base32',
            token: token,
            window: 6,
        });

        if (tokenValidates) {
            const update = {
                id: user.id,
                session: true,
            };
            await UserServices.updateUserServices(update);
            return res.status(200).send({ message: 'verificao concluida com sucesso' });
        } else {
            return res.status(401).send({ message: 'codigo errado ou expirado' });
        }
    } catch (error) {
        next(error);
    }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: any = req.user;
        if (user.allowsession) {
            await userModel.update({ session: false }, { where: { id: user.id } });
        }
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            return res.status(200).send({ message: 'Usuário deslogado com sucesso' });
        });
    } catch (error) {
        next(error);
    }
};

export { login, authenticate, logout };
