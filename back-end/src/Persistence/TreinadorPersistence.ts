import { treinadorModel } from '../Models/TreinadorModel';
import { treinadorType } from '../Types/TreinadorTypes';
import { Transaction } from 'sequelize';

const createTreinador = async (treinador: treinadorType, transaction?: Transaction) => {
    try {
        return await treinadorModel.create(treinador, { transaction });
    } catch (error) {
        throw error;
    }
};

const getTreinador = async (id: number, transaction: Transaction) => {
    try {
        return await treinadorModel.findByPk(id, { transaction });
    } catch (error) {
        throw error;
    }
};

const updateTreinador = async (updates: any, transaction: Transaction) => {
    try {
        const treinador: any = await treinadorModel.findByPk(updates.treinadorModelId);
        Object.keys(updates).forEach((key) => {
            treinador[key] = updates[key] !== undefined ? updates[key] : treinador[key];
        });
        return await treinador.save({ Transaction });
    } catch (error) {
        throw error;
    }
};
export default { createTreinador, getTreinador, updateTreinador };
