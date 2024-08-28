import { compare } from 'bcrypt';
import { userModel } from '../Models/UserModel';
import { userType } from '../Types/UserType';
import { Transaction } from 'sequelize';

const createUser = async (user: userType, transaction: Transaction) => {
    try {
        return await userModel.create(user, { transaction });
    } catch (error) {
        throw error;
    }
};

const getUser = async (id: number, transaction: Transaction) => {
    try {
        return await userModel.findByPk(id, { transaction });
    } catch (error) {
        throw error;
    }
};

const updateUser = async (updates: any, transaction?: Transaction) => {
    try {
        const user: any = await userModel.findByPk(updates.id);
        const userKeys = Object.keys(user.dataValues);
        const updateKeys = Object.keys(updates);
        const fields: string[] = [];
        if (user) {
            Object.keys(updates).forEach((key) => {
                if (userKeys.includes(key) && updateKeys.includes(key)) {
                    user[key] = updates[key] !== undefined ? updates[key] : user[key];
                    fields.push(key);
                }
            });
            if (transaction) {
                return await user.save({ fields, transaction });
            } else {
                return await user.save({ fields });
            }
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (email: string, transaction: Transaction) => {
    try {
        const confirm = await userModel.destroy({ where: { email: email } });
        if (confirm >= 1) {
            return 'user deleted successful';
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        throw error;
    }
};

const getUserById = async (id: number, transaction: Transaction) => {
    try {
        return await userModel.findByPk(id, { transaction });
    } catch (error) {
        throw error;
    }
};

export default { createUser, getUser, updateUser, deleteUser, getUserById };
