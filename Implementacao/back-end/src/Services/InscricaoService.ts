import InscricoesPersistence from '../Persistence/InscricoesPersistence';

const createInscricao = async (inscricao: any) => {
    try {
        const inscricoesAtleta = await InscricoesPersistence.countInscricaoAtleta(inscricao.atletaId);
        const inscricoesTreinador = await InscricoesPersistence.countInscricaoTreinador(inscricao.treinadorId);
        if (inscricoesAtleta >= 1) {
            throw new Error('Atleta já inscrito em um torneio');
        }
        if (inscricoesTreinador >= 5) {
            throw new Error('Treinador não pode se inscrever em mais de 5 torneios');
        }
        return await InscricoesPersistence.createInscricao(inscricao);
    } catch (error) {
        throw error;
    }
};

const getInscricaoAtleta = async (id: number) => {
    try {
        return await InscricoesPersistence.getInscricaoAtleta(id);
    } catch (error) {
        throw error;
    }
};

const getInscricaoAll = async (id: number) => {
    try {
        return await InscricoesPersistence.getInscricaoAdmin(id);
    } catch (error) {
        throw error;
    }
};

const getInscricaoTreinador = async (id: number) => {
    try {
        return await InscricoesPersistence.getInscricaoTreinador(id);
    } catch (error) {
        throw error;
    }
};

const updateInscricao = async (updates: any) => {
    try {
        return await InscricoesPersistence.updateInscricao(updates);
    } catch (error) {
        throw error;
    }
};

const deleteInscricao = async (id: number) => {
    try {
        return await InscricoesPersistence.deleteInscricao(id);
    } catch (error) {
        throw error;
    }
};

export default {
    createInscricao,
    getInscricaoAtleta,
    getInscricaoAll,
    getInscricaoTreinador,
    updateInscricao,
    deleteInscricao,
};
