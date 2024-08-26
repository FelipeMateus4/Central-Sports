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
        const treinadorKeys = Object.keys(treinador.dataValues);
        const updateskeys = Object.keys(updates);
        const fields: string[] = [];

        if (treinador) {
            Object.keys(updates).forEach((key) => {
                if (treinadorKeys.includes(key) && updateskeys.includes(key)) {
                    treinador[key] = updates[key] !== undefined ? updates[key] : treinador[key];
                    fields.push(key);
                }
            });

            return await treinador.save({ fields, transaction });
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        throw error;
    }
};

const deleteTreinador = async (id: number, transaction: Transaction) => {
    try {
        const confirm = await treinadorModel.destroy({ where: { id: id } });
        if (confirm >= 1) {
            return 'user deleted successful';
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        throw error;
    }
};

export default { createTreinador, getTreinador, updateTreinador, deleteTreinador };
