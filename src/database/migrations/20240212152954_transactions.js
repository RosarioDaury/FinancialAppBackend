'use strict';
const { QueryInterface } = require('sequelize');
const Sequelize = require('sequelize');


/**
 * @param {QueryInterface} queryInterface
 * @param {Sequelize} sequelize
 * @param {boolean} force
 */
const downMethod = async (queryInterface, sequelize, force) => {
	await queryInterface.dropTable('FaTransactionTypes', {force: true});
	await queryInterface.dropTable('FaTransactions', {force: true});

}


module.exports = {
	/**
	 * @param {QueryInterface} queryInterface
	 * @param {Sequelize} sequelize
	 */
	async up (queryInterface, sequelize) {

		try {

			// TABLE CREATION
			await queryInterface.createTable('FaTransactionTypes', {
				id: {
					type: sequelize.DataTypes.TINYINT.UNSIGNED,
					primaryKey: true,
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
			})

			await queryInterface.createTable('FaTransactions', {
				id: {
					type: sequelize.DataTypes.TINYINT.UNSIGNED,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false
				},
				user_id: {
					type: sequelize.DataTypes.TINYINT.UNSIGNED,
					allowNull: false
				},
				date: {
					type: sequelize.DataTypes.DATE,
					allowNull: false,
				},
				title: {
					type: sequelize.DataTypes.STRING(50),
					allowNull: false
				},
				description: {
					type: sequelize.DataTypes.STRING(100),
					allowNull: false
				},
				amount: {
					type: sequelize.DataTypes.DOUBLE(),
					allowNull: false
				},
				type_id: {
					type: sequelize.DataTypes.TINYINT.UNSIGNED,
					allowNull: false
				},
				category_id: {
					type: sequelize.DataTypes.TINYINT.UNSIGNED,
					allowNull: true,
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
			})

			// FOREIGN KEYS
			await queryInterface.addConstraint('FaTransactions', {
				fields: ['user_id'],
				type: 'foreign key',
				references: {field: 'id', table: 'FaUsers'},
				onDelete: 'cascade',
				onUpdate: 'cascade'
			});

			await queryInterface.addConstraint('FaTransactions', {
				fields: ['type_id'],
				type: 'foreign key',
				references: {field: 'id', table: 'FaTransactionTypes'},
				onDelete: 'cascade',
				onUpdate: 'cascade'
			});

			await queryInterface.addConstraint('FaTransactions', {
				fields: ['category_id'],
				type: 'foreign key',
				references: {field: 'id', table: 'FaCategories'},
				onDelete: 'cascade',
				onUpdate: 'cascade'
			});

			// INDEXES	
			await queryInterface.addIndex('FaTransactions', {
				fields: ['title'],
				name: 'fatransactions_idx_fulltext',
				type: 'FULLTEXT'
			})

			await queryInterface.addIndex('FaTransactions', {
				fields: ['date'],
				name: 'fatransactions_idx_date',
			})


		} catch(err) {
			await downMethod(queryInterface, sequelize, true)
			throw err;
		}

	},

	/**
	 * @param {QueryInterface} queryInterface
	 * @param {Sequelize} sequelize
	 */
	async down (queryInterface, sequelize) {
		await downMethod(queryInterface, sequelize, false)
	}
}