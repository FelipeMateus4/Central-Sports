import sequelize from '../Connections/Sequelize';
import { DataTypes, Model } from 'sequelize';

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
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        graduation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Treinador',
        schema: 'public',
        tableName: 'Treinadores',
    }
);

export { Treinador as treinadorModel };
