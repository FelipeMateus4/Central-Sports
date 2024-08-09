import { userType } from '../Types/UserType';
import UserPersistence from '../Persistence/UserPersistence';
import { Transaction } from 'sequelize';
import { sendTokenEmail } from '../utils/sendGridEmailOptions';

const createUserServices = async (user: userType, transaction: Transaction) => {
    try {
        const result = await UserPersistence.createUser(user, transaction);
        await sendTokenEmail(user.email);
        return result;
    } catch (error) {
        throw error;
    }
};

const getUserServices = async (email: string, transaction: Transaction) => {
    try {
        return await UserPersistence.getUser(email, transaction);
    } catch (error) {
        throw error;
    }
};

const updateUserServices = async (updates: any, transaction: Transaction) => {
    try {
        return await UserPersistence.updateUser(updates, transaction);
    } catch (error) {
        throw error;
    }
};

const deleteUserServices = async (email: string, transaction: Transaction) => {
    try {
        return await UserPersistence.deleteUser(email, transaction);
    } catch (error) {
        throw error;
    }
};

export default { createUserServices, getUserServices, updateUserServices, deleteUserServices };
