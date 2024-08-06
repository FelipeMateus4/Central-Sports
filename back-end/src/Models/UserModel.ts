import sequelize from '../Connections/Sequelize';
import { DataTypes, Model } from 'sequelize';
import PasswordValidator from 'password-validator';
import bcrypt from 'bcrypt';

class User extends Model {
    declare email: string;
    declare password: string;
    declare secret: string;
    declare tipo: string;

    public async comparePassword(enteredPassword: string): Promise<boolean> {
        return await bcrypt.compare(enteredPassword, this.password);
    }
}

const passwordSchema = new PasswordValidator();
passwordSchema
    .is()
    .min(8)
    .is()
    .max(20)
    .has()
    .uppercase(1)
    .has()
    .lowercase()
    .has()
    .not()
    .spaces()
    .has()
    .symbols(1)
    .has()
    .digits(1);

User.init(
    {
        // Definindo os atributos da classe
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: ' voce deve digitar um email valido',
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: {
                    args: [8, 20],
                    msg: 'A senha deve ter entre 6 e 20 caracteres',
                },
                isPasswordValid(value: string) {
                    if (!passwordSchema.validate(value)) {
                        throw new Error(
                            'A senha deve ter pelo menos 6 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 símbolo'
                        );
                    }
                },
            },
        },
        secret: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
        schema: 'public',
        tableName: 'User',
        hooks: {
            beforeCreate: async (user: User) => {
                if (user.password) {
                    user.password = await bcrypt.hash(user.password, 10);
                }
            },

            beforeUpdate: async (user: User) => {
                if (user.password) {
                    user.password = await bcrypt.hash(user.password, 10);
                }
            },
        },
    }
);
