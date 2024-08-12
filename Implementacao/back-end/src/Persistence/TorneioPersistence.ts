import { Transaction } from 'sequelize';
import { torneioModel } from '../Models/TorneioModel';
import { torneioType } from '../Types/TorneioType';

const createTorneio = async (torneio: any) => {
    try {
        return await torneioModel.create(torneio);
    } catch (error) {
        throw error;
    }
};

const getTorneio = async (id: number) => {
    try {
        return await torneioModel.findByPk(id);
    } catch (error) {
        throw error;
    }
};

const updateTorneio = async (updates: any) => {
    try {
        const torneio: any = await torneioModel.findByPk(updates.torneioModelID);
        const torneioKeys = Object.keys(torneio.dataValues);
        const updateKeys = Object.keys(updates);
        const field: string[] = [];
        if (torneio) {
            Object.keys(updates).forEach((key) => {
                if (updateKeys.includes(key)) {
                    torneio[key] = updates[key] !== undefined ? updates[key] : torneio[key];
                    field.push(key);
                }
            });
        } else {
            throw new Error('Torneio not found');
        }

        return await torneio.save({ field });
    } catch (error) {
        throw error;
    }
};

const deleteTorneio = async (id: number) => {
    try {
        const confirm = await torneioModel.destroy({ where: { id: id } });
        if (confirm >= 1) {
            return 'Torneio successfully deleted';
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        throw error;
    }
};

export default { createTorneio, getTorneio, updateTorneio, deleteTorneio };