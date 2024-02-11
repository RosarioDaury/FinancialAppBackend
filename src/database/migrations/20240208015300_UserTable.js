'use strict';
const { QueryInterface } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = {
	/**
	 * @param {QueryInterface} queryInterface
	 * @param {Sequelize} sequelize
	 */
	async up (queryInterface, sequelize) {

		try {

			await queryInterface.createTable('FaUserType', {
				id: {
					type: sequelize.DataTypes.TINYINT.UNSIGNED,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false
				},
				type: {
					type: sequelize.DataTypes.STRING(20),
					allowNull: false
				},
				createdAt: {
					type: 'TIMESTAMP',
					allowNull: false,
					defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
				},
				updatedAt: {
					type: 'TIMESTAMP',
					allowNull: false,
					defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
				}
			});


			await queryInterface.createTable('FaUser', {
				id: {
					type: sequelize.DataTypes.TINYINT.UNSIGNED,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false
				},
				firstName: {
					type: sequelize.DataTypes.STRING(20),
					allowNull: false
				},
				lastName: {
					type: sequelize.DataTypes.STRING(20),
					allowNull: false
				},
				username: {
					type: sequelize.DataTypes.STRING(50),
					allowNull: false
				},
				password: {
					type: sequelize.DataTypes.TEXT,
					allowNull: false
				},
				email: {
					type: sequelize.DataTypes.STRING(50),
					allowNull: false
				},
				userType: {
					type: sequelize.DataTypes.TINYINT.UNSIGNED,
					allowNull: false
				},
				active: {
					type: sequelize.DataTypes.BOOLEAN,
					allowNull: false,
					defaultValue: true
				},
				balance: {
					type: sequelize.DataTypes.INTEGER,
					allowNull: false
				},
				createdAt: {
					type: 'TIMESTAMP',
					allowNull: false,
					defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
				},
				updatedAt: {
					type: 'TIMESTAMP',
					allowNull: false,
					defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
				}
			});

			await queryInterface.addConstraint('FaUser', {
				fields: ['userType'],
				type: 'foreign key',
				name: 'fauser_fk_usertype',
				references: { field: 'id', table: 'FaUserType'},
				onDelete: 'restrict',
				onUpdate: 'restrict'
			});

			await queryInterface.addIndex('FaUser', {
				fields: ['firstName', 'lastName'],
				name: 'fauser_ft_fullname',
				type: 'FULLTEXT'
			});

			await queryInterface.addIndex('FaUser', {
				fields: ['email'],
				name: 'fauser_idx_email',
				type: 'UNIQUE'
			});

			await queryInterface.addIndex('FaUser', {
				fields: ['username'],
				name: 'fauser_idx_username',
				type: 'UNIQUE'
			});

			await queryInterface.addIndex('FaUser', {
				fields: ['active'],
				name: 'fauser_idx_active'
			})

		} catch(err) {

			await queryInterface.dropTable('FaUserType', {
				force: true
			});

			await queryInterface.dropTable('FaUser', {
				force: true
			});

			throw err;
		}

	},

	/**
	 * @param {QueryInterface} queryInterface
	 * @param {Sequelize} sequelize
	 */
	async down (queryInterface, sequelize) {
		await queryInterface.dropTable('FaUserType', {
			force: true
		});

		await queryInterface.dropTable('FaUser', {
			force: true
		});

	}
}