import { Router, Request, Response, NextFunction } from 'express';
import { torneioType } from '../Types/TorneioType';
import sequelize from '../Connections/Sequelize';
import TorneioServices from '../Services/TorneioServices';
import { ensureAuthenticated } from '../Middlewares/IsAuthenticated';

const createTorneio = async (req: Request, res: Response, next: NextFunction) => {
    const { name, descricao, qtdVagas, esporte, data } = req.body;

    const torneio: torneioType = {
        name: name,
        descricao: descricao,
        qtdVagas: qtdVagas,
        esporte: esporte,
        data: data,
    };

    try {
        const createdTorneio = await TorneioServices.createTorneioService(torneio);

        return res.status(201).send({ message: 'Torneio criado com sucesso.', data: { createdTorneio } });
    } catch (error) {
        next(error);
    }
};

const getTorneioById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = parseInt(req.params.id, 10);

        const torneio = await TorneioServices.getTorneioByIdService(id);

        return res.status(200).send({ message: 'Veja abaixo os dados do torneio:', data: { torneio } });
    } catch (error) {
        next(error);
    }
};

const getAllTorneios = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const torneio = await TorneioServices.getTorneioService();

        res.status(200).send({ message: 'Veja abaixo os dados do torneio:', data: { torneio } });
    } catch (error) {
        next(error);
    }
};

const updateTorneio = async (req: Request, res: Response, next: NextFunction) => {
    const keys = req.body;

    try {
        const torneio = await TorneioServices.updateTorneioService(keys);
        return res.status(200).send({ message: 'Veja abaixo os dados atualizados do torneio:', data: { torneio } });
    } catch (error) {
        next(error);
    }
};

const deleteTorneio = async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const result = await TorneioServices.deleteTorneioService(id);

        return res.status(200).send({ message: result });
    } catch (error) {
        next(error);
    }
};

export { createTorneio, getTorneioById, getAllTorneios, updateTorneio, deleteTorneio };
