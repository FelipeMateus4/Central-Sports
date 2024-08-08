import { PatrocinadorType } from '../Types/PatrocinadorType';
import PatrocinadorPersistence from '../Persistence/PatrocinadorPersistence';

const criarPatrocinador = async (patrocinador: PatrocinadorType) => {
    try {
        const result = await PatrocinadorPersistence.criarPatrocinador(patrocinador);
        return result;
    } catch (error) {
        throw error;
    }
};

export default { criarPatrocinador };
