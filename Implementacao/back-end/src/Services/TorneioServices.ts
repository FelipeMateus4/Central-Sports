import TorneioPersistence from '../Persistence/TorneioPersistence';
import { torneioModel } from '../Models/TorneioModel';
import { torneioType } from '../Types/TorneioType';
import { Transaction } from 'sequelize';
import { any } from 'zod';

const createTorneioService = async (torneio: any, transaction: Transaction) => {
    try {
        return await TorneioPersistence.createTorneio(torneio, transaction);
    } catch (error) {
        throw error;
    }
};

const getTorneioService = async (id: number, transaction: Transaction) => {
    try {
        return await TorneioPersistence.getTorneio(id, transaction);
    } catch (error) {
        throw error;
    }
};

const updateTorneioService = async (updates: any, transaction: Transaction) => {
    try {
        return await TorneioPersistence.updateTorneio(updates, transaction);
    } catch (error) {
        throw error;
    }
};

const deleteTorneioService = async (id: number, transaction: Transaction) => {
    try {
        return await TorneioPersistence.deleteTorneio(id, transaction);
    } catch (error) {
        throw error;
    }
};

export default { createTorneioService, getTorneioService, updateTorneioService, deleteTorneioService };
