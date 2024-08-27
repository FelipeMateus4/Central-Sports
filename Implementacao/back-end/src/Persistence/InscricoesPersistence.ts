import { Transaction } from 'sequelize';
import { InscricaoModel } from '../Models/Inscricões';

const createInscricao = async (inscricao: any) => {
    try {
        return await InscricaoModel.create({
            atletaModelId: inscricao.atletaId,
            treinadorModelId: inscricao.treinadorId,
            torneioModelId: inscricao.torneioId,
        });
    } catch (error) {
        throw error;
    }
};

const getInscricaoAtleta = async (id: number) => {
    try {
        return await InscricaoModel.findAll({ where: { atletaModelId: id } });
    } catch (error) {
        throw error;
    }
};

const countInscricaoAtleta = async (id: number, transaction?: Transaction) => {
    try {
        const count = await InscricaoModel.count({ where: { atletaModelId: id } });
        return count;
    } catch (error) {
        throw error;
    }
};

const countInscricaoTreinador = async (id: number, transaction?: Transaction) => {
    try {
        const count = await InscricaoModel.count({ where: { treinadorModelId: id } });
        return count;
    } catch (error) {
        throw error;
    }
};

const getInscricaoAdmin = async (id: number) => {
    try {
        return await InscricaoModel.findAll({ where: { atletaModelId: id } });
    } catch (error) {
        throw error;
    }
};
const getInscricaoTreinador = async (id: number) => {
    try {
        return await InscricaoModel.findAll({ where: { treinadorModelId: id } });
    } catch (error) {
        throw error;
    }
};

const updateInscricao = async (updates: any) => {
    try {
        const inscricao: any = await InscricaoModel.findByPk(updates.id);
        const updateKeys = Object.keys(updates);
        const field: string[] = [];
        if (inscricao) {
            Object.keys(updates).forEach((key) => {
                if (updateKeys.includes(key)) {
                    inscricao[key] = updates[key] !== undefined ? updates[key] : inscricao[key];
                    field.push(key);
                }
            });
        } else {
            throw new Error('Inscricao not found');
        }

        return await inscricao.save({ field });
    } catch (error) {
        throw error;
    }
};
const deleteInscricao = async (id: number) => {
    try {
        const confirm = await InscricaoModel.destroy({ where: { id: id } });
        if (confirm >= 1) {
            return 'Inscricao successfully deleted';
        } else {
            throw new Error('Inscricao not found');
        }
    } catch (error) {
        throw error;
    }
};

const getInscricaoAll = async () => {
    try {
        return await InscricaoModel.findAll();
    } catch (error) {
        throw error;
    }
};

export default {
    createInscricao,
    getInscricaoAtleta,
    getInscricaoAdmin,
    getInscricaoTreinador,
    updateInscricao,
    deleteInscricao,
    countInscricaoTreinador,
    countInscricaoAtleta,
    getInscricaoAll,
};
