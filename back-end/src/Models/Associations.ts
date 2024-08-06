import { userModel } from './UserModel';
import { treinadorModel } from './TreinadorModel';

// Associacoes polimorficas são definidas aqui

// Definindo as associações
treinadorModel.hasMany(userModel, { foreignKey: 'treinadorModelId' as 'user' });
userModel.belongsTo(treinadorModel, { foreignKey: 'treinadorModelId', as: 'treinador' });
