import { userModel } from './UserModel';
import { treinadorModel } from './TreinadorModel';

// Associacoes polimorficas são definidas aqui

// Definindo as associações
treinadorModel.hasMany(userModel, { foreignKey: 'treinadorModelId' });
userModel.belongsTo(treinadorModel, { foreignKey: 'treinadorModelId', as: 'treinadorModel' });
