import sequelize from '../Connections/Sequelize';
import { DataTypes, Model } from 'sequelize';

class Patrocinador extends Model {
    declare name: string;
    declare cnpj: string;
}

Patrocinador.init(
    {
        // Definindo os atributos da classe
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [0, 30],
                    msg: 'O nome deve ter no máximo 30 caracteres.',
                },
            },
        },
        cnpj: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
                    msg: 'CNPJ deve estar no formato 99.999.999/9999-99',
                },
            },
        },
    },
    {
        sequelize,
        modelName: 'Patrocinador',
        schema: 'public',
        tableName: 'Patrocinador',
    }
);

export { Patrocinador as PatrocinadorModel };
