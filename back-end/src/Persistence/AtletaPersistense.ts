import { Transaction } from 'sequelize';
import { atletaModel } from '../Models/AtletaModel';

const createAtletaPersistense = async (atleta: any, transaction: Transaction) => {
    try {
        return await atletaModel.create(atleta, { transaction });
    } catch (error) {
        throw error;
    }
};

export default { createAtletaPersistense };
