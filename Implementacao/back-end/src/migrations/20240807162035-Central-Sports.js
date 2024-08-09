'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Treinadores', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            cpf: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            graduation: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
        });
        await queryInterface.createTable('Atletas', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            cpf: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            sport: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
        });

        await queryInterface.createTable('Users', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            secret: {
                type: Sequelize.STRING,
            },
            type: {
                type: Sequelize.STRING,
            },
            session: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            treinadorModelId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Treinadores',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            atletaModelId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Atletas',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
        await queryInterface.dropTable('Treinadores');
        await queryInterface.dropTable('Atletas');
    },
};