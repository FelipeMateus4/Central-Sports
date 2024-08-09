import sequelize from '../Connections/Sequelize';
import { DataTypes, Model } from 'sequelize';

class Atleta extends Model {
    declare name: string;
    declare cpf: string;
    declare sport: string;
}

Atleta.init(
    {
        // Definindo os atributos da classe
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sport: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Atleta',
        schema: 'public',
        tableName: 'Atletas',
    }
);

export { Atleta as atletaModel };
