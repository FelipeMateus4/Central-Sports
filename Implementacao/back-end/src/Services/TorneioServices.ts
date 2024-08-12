import TorneioPersistence from '../Persistence/TorneioPersistence';
import { torneioModel } from '../Models/TorneioModel';
import { torneioType } from '../Types/TorneioType';
import { Transaction } from 'sequelize';
import { any } from 'zod';

const createTorneioService = async (torneio: any) => {
    try {
        return await TorneioPersistence.createTorneio(torneio);
    } catch (error) {
        throw error;
    }
};

const getTorneioService = async (id: number) => {
    try {
        return await TorneioPersistence.getTorneio(id);
    } catch (error) {
        throw error;
    }
};

const updateTorneioService = async (updates: any) => {
    try {
        return await TorneioPersistence.updateTorneio(updates);
    } catch (error) {
        throw error;
    }
};

const deleteTorneioService = async (id: number) => {
    try {
        return await TorneioPersistence.deleteTorneio(id);
    } catch (error) {
        throw error;
    }
};

export default { createTorneioService, getTorneioService, updateTorneioService, deleteTorneioService };
