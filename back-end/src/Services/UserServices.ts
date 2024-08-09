import { userType } from '../Types/UserType';
import UserPersistence from '../Persistence/UserPersistence';
import { Transaction } from 'sequelize';

const createUserServices = async (user: userType, transaction: Transaction) => {
    try {
        return await UserPersistence.createUser(user, transaction);
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

export default { createUserServices, getUserServices, updateUserServices };
