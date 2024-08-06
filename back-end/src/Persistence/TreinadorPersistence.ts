import { throws } from 'assert';
import { treinadorModel } from '../Models/TreinadorModel';
import { treinadorType } from '../Types/TreinadorTypes';
import { Transaction } from 'sequelize';

const createTreinador = async (treinador: treinadorType, transaction?: Transaction) => {
    try {
        await treinadorModel.sync();
        return await treinadorModel.create(treinador, { transaction });
    } catch (error) {
        throw error;
    }
};

export default { createTreinador };
