import { DataTypes, Model } from 'sequelize';
import sequelize from '../Connections/Sequelize';
import PasswordValidator from 'password-validator';
import bcrypt from 'bcrypt';

class User extends Model {
    declare email: string;
    declare password: string;
    declare secret: string;
    declare type: string;
    declare treinadorModelId?: number;
    declare atletaModelId?: number;

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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: 'Você deve digitar um email válido',
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
                    msg: 'A senha deve ter entre 8 e 20 caracteres',
                },
                isPasswordValid(value: string) {
                    if (!passwordSchema.validate(value)) {
                        throw new Error(
                            'A senha deve ter pelo menos 8 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 símbolo'
                        );
                    }
                },
            },
        },
        secret: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        treinadorModelId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Treinador',
                key: 'id',
            },
        },
        atletaModelId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Atleta',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'User',
        schema: 'public',
        tableName: 'Users',
        hooks: {
            beforeSave: async (user: User) => {
                if (user.password) {
                    user.password = await bcrypt.hash(user.password, 10);
                }
            },
        },
    }
);

export { User as userModel };
