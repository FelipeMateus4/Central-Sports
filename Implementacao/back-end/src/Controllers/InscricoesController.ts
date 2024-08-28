import { InscricaoType } from '../Types/InscricoesType';
import InscricaoService from '../Services/InscricaoService';
import { Request, Response, NextFunction } from 'express';

const createInscricao = async (req: Request, res: Response, next: NextFunction) => {
    const { atletaId, treinadorId, torneioId } = req.body;

    const inscricao: InscricaoType = {
        atletaId: atletaId,
        treinadorId: treinadorId,
        torneioId: torneioId,
    };

    try {
        const createdInscricao = await InscricaoService.createInscricao(inscricao);

        return res.status(201).send({ message: 'Inscricao criada com sucesso.', data: { createdInscricao } });
    } catch (error) {
        next(error);
    }
};

const getInscricaoById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = parseInt(req.params.id, 10);

        const inscricao = await InscricaoService.getInscricaoAll(id);

        return res.status(200).send({ message: 'Veja abaixo os dados da inscricao:', data: { inscricao } });
    } catch (error) {
        next(error);
    }
};

const getInscricaoAtleta = async (req: Request, res: Response, next: NextFunction) => {
    const atletaId = req.body.atletaId;

    try {
        const inscricao = await InscricaoService.getInscricaoAtleta(atletaId);

        return res.status(200).send({ message: 'Veja abaixo os dados da inscricao:', data: { inscricao } });
    } catch (error) {
        next(error);
    }
};

const getInscricaoTreinador = async (req: Request, res: Response, next: NextFunction) => {
    const treinadorId: number = parseInt(req.params.id, 10);

    try {
        const inscricao = await InscricaoService.getInscricaoTreinador(treinadorId);

        return res.status(200).send({ message: 'Veja abaixo os dados da inscricao:', data: { inscricao } });
    } catch (error) {
        next(error);
    }
};

const updateInscricao = async (req: Request, res: Response, next: NextFunction) => {
    const keys = req.body;

    try {
        const inscricao = await InscricaoService.updateInscricao(keys);
        return res.status(200).send({ message: 'Veja abaixo os dados atualizados da inscricao:', data: { inscricao } });
    } catch (error) {
        next(error);
    }
};

const deleteInscricao = async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const result = await InscricaoService.deleteInscricao(id);

        return res.status(200).send({ message: result });
    } catch (error) {
        next(error);
    }
};

const getInscricaoAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const inscricao = await InscricaoService.getInscricaolist();

        res.status(200).send({ message: 'Veja abaixo os dados da inscricao:', data: { inscricao } });
    } catch (error) {
        next(error);
    }
};
export {
    createInscricao,
    getInscricaoById,
    getInscricaoAtleta,
    getInscricaoTreinador,
    updateInscricao,
    deleteInscricao,
    getInscricaoAll,
};
