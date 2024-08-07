import { userModel } from './UserModel';
import { treinadorModel } from './TreinadorModel';
import sequelize from '../Connections/Sequelize';

// Associacoes polimorficas são definidas aqui

// Definindo as associações
treinadorModel.hasMany(userModel, { foreignKey: 'treinadorModelId' as 'user' });
userModel.belongsTo(treinadorModel, { foreignKey: 'treinadorModelId', as: 'treinador' });

const syncModels = async () => {
    await sequelize.sync();
};

export default syncModels;
