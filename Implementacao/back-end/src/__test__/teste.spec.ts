// TorneioServices.test.ts
import TorneioServices from '../Services/TorneioServices';
import TorneioPersistence from '../Persistence/TorneioPersistence';
import { torneioType } from '../Types/TorneioType';

jest.mock('../Persistence/TorneioPersistence');

describe('TorneioServices', () => {
    const torneioMock: torneioType = {
        name: 'Torneio de Futebol',
        descricao: 'Torneio de futebol amador',
        qtdVagas: 16,
        esporte: 'Futebol',
        data: '2024-09-01',
    };

    const errorMessage = 'An error occurred';

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Success Scenarios', () => {
        it('should create a new torneio', async () => {
            (TorneioPersistence.createTorneio as jest.Mock).mockResolvedValue(torneioMock);

            const result = await TorneioServices.createTorneio(torneioMock);

            expect(result).toEqual(torneioMock);
            expect(TorneioPersistence.createTorneio).toHaveBeenCalledWith(torneioMock);
        });

        it('should get a torneio by id', async () => {
            const torneioId = 1;
            (TorneioPersistence.getTorneioById as jest.Mock).mockResolvedValue(torneioMock);

            const result = await TorneioServices.getTorneioById(torneioId);

            expect(result).toEqual(torneioMock);
            expect(TorneioPersistence.getTorneioById).toHaveBeenCalledWith(torneioId);
        });

        it('should return all torneios', async () => {
            const torneioList = [torneioMock];
            (TorneioPersistence.getTorneio as jest.Mock).mockResolvedValue(torneioList);

            const result = await TorneioServices.getTorneio();

            expect(result).toEqual(torneioList);
            expect(TorneioPersistence.getTorneio).toHaveBeenCalled();
        });

        it('should update a torneio', async () => {
            const updates = { id: 1, name: 'Updated Torneio' };
            const updatedTorneio = { ...torneioMock, ...updates };
            (TorneioPersistence.updateTorneio as jest.Mock).mockResolvedValue(updatedTorneio);

            const result = await TorneioServices.updateTorneio(updates);

            expect(result).toEqual(updatedTorneio);
            expect(TorneioPersistence.updateTorneio).toHaveBeenCalledWith(updates);
        });

        it('should delete a torneio', async () => {
            const torneioId = 1;
            const deleteMessage = 'Torneio successfully deleted';
            (TorneioPersistence.deleteTorneio as jest.Mock).mockResolvedValue(deleteMessage);

            const result = await TorneioServices.deleteTorneio(torneioId);

            expect(result).toBe(deleteMessage);
            expect(TorneioPersistence.deleteTorneio).toHaveBeenCalledWith(torneioId);
        });
    });

    describe('Error Handling Scenarios', () => {
        it('should handle error when creating a torneio', async () => {
            (TorneioPersistence.createTorneio as jest.Mock).mockRejectedValue(new Error(errorMessage));

            await expect(TorneioServices.createTorneio(torneioMock)).rejects.toThrow(errorMessage);
            expect(TorneioPersistence.createTorneio).toHaveBeenCalledWith(torneioMock);
        });

        it('should handle error when getting a torneio by id', async () => {
            const torneioId = 1;
            (TorneioPersistence.getTorneioById as jest.Mock).mockRejectedValue(new Error(errorMessage));

            await expect(TorneioServices.getTorneioById(torneioId)).rejects.toThrow(errorMessage);
            expect(TorneioPersistence.getTorneioById).toHaveBeenCalledWith(torneioId);
        });

        it('should handle error when getting all torneios', async () => {
            (TorneioPersistence.getTorneio as jest.Mock).mockRejectedValue(new Error(errorMessage));

            await expect(TorneioServices.getTorneio()).rejects.toThrow(errorMessage);
            expect(TorneioPersistence.getTorneio).toHaveBeenCalled();
        });

        it('should handle error when updating a torneio', async () => {
            const updates = { id: 1, name: 'Updated Torneio' };
            (TorneioPersistence.updateTorneio as jest.Mock).mockRejectedValue(new Error(errorMessage));

            await expect(TorneioServices.updateTorneio(updates)).rejects.toThrow(errorMessage);
            expect(TorneioPersistence.updateTorneio).toHaveBeenCalledWith(updates);
        });

        it('should handle error when deleting a torneio', async () => {
            const torneioId = 1;
            (TorneioPersistence.deleteTorneio as jest.Mock).mockRejectedValue(new Error(errorMessage));

            await expect(TorneioServices.deleteTorneio(torneioId)).rejects.toThrow(errorMessage);
            expect(TorneioPersistence.deleteTorneio).toHaveBeenCalledWith(torneioId);
        });
    });
});
