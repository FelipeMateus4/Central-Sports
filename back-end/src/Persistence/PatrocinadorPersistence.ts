import { PatrocinadorModel } from '../Models/PatrocinadorModel';
import { PatrocinadorType } from '../Types/PatrocinadorType';

const criarPatrocinador = async (patrocinador: PatrocinadorType) => {
    try {
        await PatrocinadorModel.sync();
        const result = await PatrocinadorModel.create(patrocinador);
        return result;
    } catch (error) {
        throw error;
    }
};

export default { criarPatrocinador };
