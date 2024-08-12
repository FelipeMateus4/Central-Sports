import sequelize from '../Connections/Sequelize';
import { DataTypes, Model } from 'sequelize';

class Torneios extends Model {
    declare name: string;
    declare descricao: string;
    declare qtdVagas: number;
    declare esporte: string;
    declare data: Date;
}

Torneios.init(
    {
        // Definindo os atributos da classe
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        qtdVagas: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        esporte: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Torneio',
        schema: 'public',
        tableName: 'Torneios',
    }
);

export { Torneios as torneioModel };
