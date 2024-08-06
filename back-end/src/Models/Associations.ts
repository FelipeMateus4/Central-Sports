import { userModel } from './UserModel';
import { treinadorModel } from './TreinadorModel';

// Associacoes polimorficas são definidas aqui

treinadorModel.hasMany(userModel, {
    foreignKey: 'associatedId',
    constraints: false,
    scope: {
        associatedType: 'Treinador',
    },
});
userModel.belongsTo(treinadorModel, {
    foreignKey: 'associatedId',
    constraints: false,
    as: 'treinador',
});
