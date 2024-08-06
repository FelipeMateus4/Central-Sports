import { treinadorType } from '../Types/TreinadorTypes';
import TreinadorPersistence from '../Persistence/TreinadorPersistence';
import { treinadorModel } from '../Models/TreinadorModel';
import { Transaction } from 'sequelize';

const createTreinadorService = (treinador: treinadorType, transaction: Transaction) => {
    return TreinadorPersistence.createTreinador(treinador, transaction);
};

export default { createTreinadorService };
