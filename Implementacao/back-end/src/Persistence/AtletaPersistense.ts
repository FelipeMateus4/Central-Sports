import { Transaction } from 'sequelize';
import { atletaModel } from '../Models/AtletaModel';

const createAtleta = async (atleta: any, transaction: Transaction) => {
    try {
        return await atletaModel.create(atleta, { transaction });
    } catch (error) {
        throw error;
    }
};

const getAtleta = async (id: number, transaction: Transaction) => {
    try {
        return await atletaModel.findByPk(id, { transaction });
    } catch (error) {
        throw error;
    }
};

const updateAtleta = async (updates: any, transaction: Transaction) => {
    try {
        const atleta: any = await atletaModel.findByPk(updates.atletaModelId);
        const atletaKeys = Object.keys(atleta.dataValues);
        const updateskeys = Object.keys(updates);
        const fields: string[] = [];

        if (atleta) {
            Object.keys(updates).forEach((key) => {
                if (atletaKeys.includes(key) && updateskeys.includes(key)) {
                    atleta[key] = updates[key] !== undefined ? updates[key] : atleta[key];
                    fields.push(key);
                }
            });

            return await atleta.save({ fields, transaction });
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        throw error;
    }
};

const deleteAtleta = async (id: number, transaction: Transaction) => {
    try {
        const confirm = await atletaModel.destroy({ where: { id: id } });
        if (confirm >= 1) {
            return 'user deleted successful';
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        throw error;
    }
};

export default { createAtleta, getAtleta, updateAtleta, deleteAtleta };
