import { userModel } from '../Models/UserModel';
import { userType } from '../Types/UserType';
import { Transaction } from 'sequelize';

const createUser = async (user: userType, transaction: Transaction) => {
    try {
        await userModel.sync();
        return await userModel.create(user, { transaction });
    } catch (error) {
        throw error;
    }
};

const getUser = async (email: string, transaction: Transaction) => {
    try {
        return await userModel.findOne({ where: { email: email }, transaction: transaction });
    } catch (error) {
        throw error;
    }
};
export default { createUser, getUser };
