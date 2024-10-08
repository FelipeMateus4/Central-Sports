import { Request, Response, NextFunction } from 'express';
import { UniqueConstraintError, ValidationError } from 'sequelize';
import jwt from 'jsonwebtoken';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof UniqueConstraintError) {
        const detail = (err.parent as any).detail;
        let message = 'Registro duplicado';
        if (detail.includes('Chave (email)')) {
            message = 'Email já registrado';
        } else if (detail.includes('Chave (username)')) {
            message = 'Nome de usuário já registrado';
        } else if (detail.includes('Chave (CPF)')) {
            message = 'CPF já registrado';
        }
        return res.status(400).send({
            message: message,
            error: detail,
        });
    } else if (err instanceof ValidationError) {
        return res.status(400).send({
            error: 'Validation error',
            message: err.errors.map((err: any) => err.message).join(', '),
        });
    } else if (err instanceof jwt.JsonWebTokenError) {
        if (err.message === 'jwt expired') {
            return res.status(401).send({
                message: 'O token expirou.',
                error: err.message,
            });
        } else {
            return res.status(401).send({
                message: 'Token inválido.',
                error: err.message,
            });
        }
    } else if (err instanceof Error) {
        if (err.message === 'User not found') {
            return res.status(404).send({
                message: 'O usuário não foi encontrado.',
                error: err.message,
            });
        } else if (err.message === 'Atleta já inscrito em um torneio') {
            return res.status(404).send({
                message: 'Atleta já inscrito em um torneio',
                error: err.message,
            });
        } else if (err.message === 'Atleta não encontrado') {
            return res.status(404).send({
                message: 'Atleta não encontrado',
                error: err.message,
            });
        } else if (err.message === 'Inscrições pendentes') {
            return res.status(404).send({
                message: 'A sua conta não pode ser apagada pois possui inscrições pendentes',
                error: err.message,
            });
        }
        return res.status(500).send({
            message: 'Internal server error',
            error: err.message,
        });
    }

    res.status(500).send({
        message: 'Internal server error',
        error: err,
    });
};

export default errorHandler;
