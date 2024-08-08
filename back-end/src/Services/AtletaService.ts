import { Transaction } from 'sequelize';
import AtletaPersistence from '../Persistence/AtletaPersistense';

const createAtletaService = async (atleta: any, transaction: Transaction) => {
    try {
        return await AtletaPersistence.createAtletaPersistense(atleta, transaction);
    } catch (error) {
        throw error;
    }
};

export default { createAtletaService };
