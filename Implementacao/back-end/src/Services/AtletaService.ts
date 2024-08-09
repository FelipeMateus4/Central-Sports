import { Transaction } from 'sequelize';
import AtletaPersistence from '../Persistence/AtletaPersistense';
import { any } from 'zod';

const createAtletaService = async (atleta: any, transaction: Transaction) => {
    try {
        return await AtletaPersistence.createAtletaPersistense(atleta, transaction);
    } catch (error) {
        throw error;
    }
};

const getAtleta = async (id: number, transaction: Transaction) => {
    try {
        return await AtletaPersistence.getAtleta(id, transaction);
    } catch (error) {
        throw error;
    }
};

const updateAtletaServices = async (updates: any, transaction: Transaction) => {
    try {
        return await AtletaPersistence.updateAtleta(updates, transaction);
    } catch (error) {
        throw error;
    }
};

const deleteAtletaServices = async (id: number, transaction: Transaction) => {
    try {
        return await AtletaPersistence.deleteAtleta(id, transaction);
    } catch (error) {
        throw error;
    }
};

export default { createAtletaService, getAtleta, updateAtletaServices, deleteAtletaServices };
