'use strict';
const { QueryInterface } = require('sequelize');
const Sequelize = require('sequelize');


/**
 * @param {QueryInterface} queryInterface
 * @param {Sequelize} sequelize
 * @param {boolean} force
 */
const downMethod = async (queryInterface, sequelize, force) => {
	await queryInterface.dropTable('FaReminders');
	await queryInterface.dropTable('FaReminderIntervals');
}


module.exports = {
	/**
	 * @param {QueryInterface} queryInterface
	 * @param {Sequelize} sequelize
	 */
	async up (queryInterface, sequelize) {

		try {

			await queryInterface.createTable('FaReminderIntervals', {
				id: {
					type: sequelize.DataTypes.TINYINT.UNSIGNED,
					primaryKey: true,
					allowNull: false
				},
				title: {
					type: sequelize.DataTypes.STRING(20),
					allowNull: false
				},
				interval: {
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

			await queryInterface.createTable('FaReminders', {
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
				amount: {
					type: sequelize.DataTypes.DOUBLE(),
					allowNull: false
				},
				interval_id: {
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


			// FOREING KEYS
			await queryInterface.addConstraint('FaReminders', {
				fields: ['user_id'],
				type: 'foreign key',
				references: {field: 'id', table: 'FaUsers'},
				onDelete: 'cascade',
				onUpdate: 'cascade'
			})

			await queryInterface.addConstraint('FaReminders', {
				fields: ['interval_id'],
				type: 'foreign key',
				references: {field: 'id', table: 'FaReminderIntervals'},
				onDelete: 'cascade',
				onUpdate: 'cascade'
			})

			// INDEXES

			await queryInterface.addIndex('FaReminders', {
				fields: ['title'],
				name: 'fareminders_idx_fulltext',
				type: 'FULLTEXT'
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