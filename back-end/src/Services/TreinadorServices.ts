import { treinadorType } from '../Types/TreinadorTypes';
import TreinadorPersistence from '../Persistence/TreinadorPersistence';
import { treinadorModel } from '../Models/TreinadorModel';
import { Transaction } from 'sequelize';

const createTreinadorService = (treinador: treinadorType, transaction: Transaction) => {
    try {
        return TreinadorPersistence.createTreinador(treinador, transaction);
    } catch (error) {
        throw error;
    }
};

const getTreinadorServices = async (id: number, transaction: Transaction) => {
    try {
        return await TreinadorPersistence.getTreinador(id, transaction);
    } catch (error) {
        throw error;
    }
};

export default { createTreinadorService, getTreinadorServices };