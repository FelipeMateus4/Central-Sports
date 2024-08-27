import { Transaction } from 'sequelize';
import { InscricaoModel } from '../Models/Inscricoes';
import { atletaModel } from '../Models/AtletaModel';
import { treinadorModel } from '../Models/TreinadorModel';
import sequelize from '../Connections/Sequelize';
import { torneioModel } from '../Models/TorneioModel';

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
        console.log(updates);

        // Verifique se a inscrição existe
        const inscricaoExistente = await InscricaoModel.findOne({ where: { id: updates.id } });
        if (!inscricaoExistente) {
            throw new Error('Inscrição não encontrada');
        }

        // Verificar se os IDs estão presentes nos dados de atualização
        if (!updates.atletaId && !updates.treinadorId && !updates.torneioId) {
            throw new Error('Pelo menos um dos IDs (atleta, treinador ou torneio) deve ser fornecido.');
        }

        // Atualizar a inscrição existente com os novos valores
        await InscricaoModel.update(
            {
                atletaModelId: updates.atletaId || inscricaoExistente.atletaModelId,
                treinadorModelId: updates.treinadorId || inscricaoExistente.treinadorModelId,
                torneioModelId: updates.torneioId || inscricaoExistente.torneioModelId,
            },
            { where: { id: updates.id } }
        );

        console.log(`Inscrição com ID ${updates.id} foi atualizada.`);

        return await InscricaoModel.findOne({ where: { id: updates.id } });
    } catch (error) {
        console.error('Erro ao atualizar a inscrição:', error);
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
