import { Transaction } from 'sequelize';
import AtletaPersistence from '../Persistence/AtletaPersistense';
import { any } from 'zod';

const createAtleta = async (atleta: any, transaction: Transaction) => {
    try {
        return await AtletaPersistence.createAtleta(atleta, transaction);
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

const updateAtleta = async (updates: any, transaction: Transaction) => {
    try {
        return await AtletaPersistence.updateAtleta(updates, transaction);
    } catch (error) {
        throw error;
    }
};

const deleteAtleta = async (id: number, transaction: Transaction) => {
    try {
        return await AtletaPersistence.deleteAtleta(id, transaction);
    } catch (error) {
        throw error;
    }
};

export default { createAtleta, getAtleta, updateAtleta, deleteAtleta };
