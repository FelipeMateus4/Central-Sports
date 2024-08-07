import { userModel } from '../Models/UserModel';
import { userType } from '../Types/UserType';
import { Transaction } from 'sequelize';

const createUser = async (user: userType, transaction: Transaction) => {
    await userModel.sync();
    return await userModel.create(user, { transaction });
};

export default { createUser };
