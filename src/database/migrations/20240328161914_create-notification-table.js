'use strict';
const { QueryInterface } = require('sequelize');
const Sequelize = require('sequelize');


/**
 * @param {QueryInterface} queryInterface
 * @param {Sequelize} sequelize
 * @param {boolean} force
 */
const downMethod = async (queryInterface, sequelize, force) => {
	await queryInterface.dropTable('FaReminderNotifications')
}


module.exports = {
	/**
	 * @param {QueryInterface} queryInterface
	 * @param {Sequelize} sequelize
	 */
	async up (queryInterface, sequelize) {	
		try {

			await queryInterface.createTable('FaReminderNotifications', {
				id: {
					type: sequelize.DataTypes.TINYINT.UNSIGNED,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false
				},
				externalId: {
					type: sequelize.DataTypes.STRING(60),
					allowNull: false
				},
				reminderId: {
					type: sequelize.DataTypes.TINYINT.UNSIGNED,
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

			await queryInterface.addConstraint('FaReminderNotifications', {
				fields: ['reminderId'],
				type: 'foreign key',
				references: {field: 'id', table: 'FaReminders'},
				onDelete: 'cascade',
				onUpdate: 'cascade'
			});


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
		await downMethod(queryInterface, sequelize, true)
	}
}