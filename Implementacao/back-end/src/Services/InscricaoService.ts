import InscricoesPersistence from '../Persistence/InscricoesPersistence';
import TorneioPersistence from '../Persistence/TorneioPersistence';

const createInscricao = async (inscricao: any) => {
    try {
        const inscricoesAtleta = await InscricoesPersistence.countInscricaoAtleta(inscricao.atletaId);
        const inscricoesTreinador = await InscricoesPersistence.countInscricaoTreinador(inscricao.treinadorId);
        const vagas = await TorneioPersistence.getVagas(inscricao.torneioId);
        if (vagas <= 0) {
            throw new Error('Torneio sem vagas');
        }
        await TorneioPersistence.decrementVagas(inscricao.torneioId);
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
        const inscricoes: any[] = await InscricoesPersistence.getInscricaoTreinador(id);

        if (inscricoes.length === 0) {
            throw new Error('Nenhuma inscrição encontrada');
        }

        const torneios = [];

        // Para cada inscrição, busca o torneio associado e adiciona ao array
        for (const inscricao of inscricoes) {
            const torneioId = inscricao.dataValues.torneioModelId;

            if (torneioId) {
                const torneio = await TorneioPersistence.getTorneioById(torneioId);
                if (torneio) {
                    torneios.push(torneio); // Adiciona o objeto completo do torneio ao array
                }
            }
        }

        return torneios; // Retorna o array completo de objetos Torneio
    } catch (error) {
        console.error('Erro ao buscar torneios:', error);
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

const getInscricaolist = async () => {
    try {
        return await InscricoesPersistence.getInscricaoAll();
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
    getInscricaolist,
};
