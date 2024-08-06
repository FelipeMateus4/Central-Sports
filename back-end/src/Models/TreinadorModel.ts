import sequelize from '../Connections/Sequelize';
import { DataTypes, Model } from 'sequelize';
import { treinadorType } from '../Types/TreinadorTypes';
import internal from 'stream';

class Treinador extends Model {
    declare name: string;
    declare age: number;
    declare specialty: string;
}

Treinador.init(
    {
        // Definindo os atributos da classe
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cnpj: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        specialty: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Treinador',
        schema: 'public',
        tableName: 'Treinador',
    }
);

export { Treinador as treinadorModel };
