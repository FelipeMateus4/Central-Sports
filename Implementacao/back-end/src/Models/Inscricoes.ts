import sequelize from '../Connections/Sequelize';
import { DataTypes, Model } from 'sequelize';

class Inscricao extends Model {
    declare atletaModelId: number;
    declare treinadorModelId: number;
    declare torneioModelId: number;
}

Inscricao.init(
    {
        atletaModelId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        treinadorModelId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        torneioModelId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Inscricao',
        schema: 'public',
        tableName: 'Inscricoes',
    }
);

export { Inscricao as InscricaoModel };
