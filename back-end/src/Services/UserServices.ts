import { userType } from '../Types/UserType';
import UserPersistence from '../Persistence/UserPersistence';
import { Transaction } from 'sequelize';

const createUserServices = async (user: userType, transaction: Transaction) => {
    return await UserPersistence.createUser(user, transaction);
};

export default { createUserServices };
