import { torneioModel } from '../Models/TorneioModel';

const createTorneio = async (torneio: any) => {
    try {
        return await torneioModel.create(torneio);
    } catch (error) {
        throw error;
    }
};

const getTorneio = async () => {
    try {
        return await torneioModel.findAll();
    } catch (error) {
        throw error;
    }
};

const getTorneioById = async (id: number) => {
    try {
        return await torneioModel.findByPk(id);
    } catch (error) {
        throw error;
    }
};

const updateTorneio = async (updates: any) => {
    try {
        const torneio: any = await torneioModel.findByPk(updates.id);
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
            throw new Error('Torneio not found');
        }
    } catch (error) {
        throw error;
    }
};

const decrementVagas = async (id: number) => {
    try {
        const torneio = await torneioModel.findByPk(id);
        if (!torneio) {
            throw new Error('Torneio not found');
        }
        if (torneio.qtdVagas > 0) {
            torneio.qtdVagas -= 1;
            await torneio.save();
        } else {
            throw new Error('No more vacancies available');
        }
        return torneio.qtdVagas;
    } catch (error) {
        throw error;
    }
};

const getVagas = async (id: number) => {
    try {
        const torneio = await torneioModel.findByPk(id, {
            attributes: ['qtdVagas'],
        });
        if (!torneio) {
            throw new Error('Torneio not found');
        }
        return torneio.qtdVagas;
    } catch (error) {
        throw error;
    }
};

export default {
    createTorneio,
    getTorneio,
    getTorneioById,
    updateTorneio,
    deleteTorneio,
    decrementVagas,
    getVagas,
};
