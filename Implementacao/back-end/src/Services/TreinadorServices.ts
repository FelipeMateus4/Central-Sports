import { treinadorType } from '../Types/TreinadorTypes';
import TreinadorPersistence from '../Persistence/TreinadorPersistence';
import { treinadorModel } from '../Models/TreinadorModel';
import { Transaction } from 'sequelize';

const createTreinador = (treinador: treinadorType, transaction: Transaction) => {
    try {
        return TreinadorPersistence.createTreinador(treinador, transaction);
    } catch (error) {
        throw error;
    }
};

const getTreinador = async (id: number, transaction: Transaction) => {
    try {
        return await TreinadorPersistence.getTreinador(id, transaction);
    } catch (error) {
        throw error;
    }
};

const updateTreinador = async (updates: any, transaction: Transaction) => {
    try {
        return await TreinadorPersistence.updateTreinador(updates, transaction);
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (id: number, transaction: Transaction) => {
    try {
        return await TreinadorPersistence.deleteUser(id, transaction);
    } catch (error) {
        throw error;
    }
};

export default { createTreinador, getTreinador, updateTreinador, deleteUser };
