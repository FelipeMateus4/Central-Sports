import TorneioPersistence from '../Persistence/TorneioPersistence';
import { torneioModel } from '../Models/TorneioModel';
import { torneioType } from '../Types/TorneioType';
import { Transaction } from 'sequelize';
import { any } from 'zod';

const createTorneio = async (torneio: any) => {
    try {
        return await TorneioPersistence.createTorneio(torneio);
    } catch (error) {
        throw error;
    }
};

const getTorneio = async () => {
    try {
        return await TorneioPersistence.getTorneio();
    } catch (error) {
        throw error;
    }
};

const getTorneioById = async (id: number) => {
    try {
        return await TorneioPersistence.getTorneioById(id);
    } catch (error) {
        throw error;
    }
};
const updateTorneio = async (updates: any) => {
    try {
        return await TorneioPersistence.updateTorneio(updates);
    } catch (error) {
        throw error;
    }
};

const deleteTorneio = async (id: number) => {
    try {
        return await TorneioPersistence.deleteTorneio(id);
    } catch (error) {
        throw error;
    }
};

export default {
    createTorneio,
    getTorneio,
    updateTorneio,
    deleteTorneio,
    getTorneioById,
};
