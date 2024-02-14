'use strict';
const { QueryInterface } = require('sequelize');
const Sequelize = require('sequelize');


/**
 * @param {QueryInterface} queryInterface
 * @param {Sequelize} sequelize
 * @param {boolean} force
 */
const downMethod = async (queryInterface, sequelize, force) => {

}


module.exports = {
	/**
	 * @param {QueryInterface} queryInterface
	 * @param {Sequelize} sequelize
	 */
	async up (queryInterface, sequelize) {

		try {

			await queryInterface.createTable('FaCategories', {
				id: {
					type: sequelize.DataTypes.TINYINT.UNSIGNED,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false
				},
				name: {
					type: sequelize.DataTypes.STRING(20),
					allowNull: false
				},
				user_id: {
					type: sequelize.DataTypes.TINYINT.UNSIGNED,
					allowNull: false
				},
				limit: {
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

			await queryInterface.addConstraint('FaCategories', {
				fields: ['user_id'],
				type: 'foreign key',
				name: 'facategories_fk_userid',
				references: { field: 'id', table: 'FaUsers'},
				onDelete: 'restrict',
				onUpdate: 'restrict'
			});

			await queryInterface.addIndex('FaCategories', {
				fields: ['name'],
				name: 'facategories_idx_name',
				type: 'FULLTEXT'
			});

		} catch(err) {
			await queryInterface.dropTable('FaCategories', {
				force: true
			});
			throw err
		}

	},

	/**
	 * @param {QueryInterface} queryInterface
	 * @param {Sequelize} sequelize
	 */
	async down (queryInterface, sequelize) {
		await queryInterface.dropTable('FaCategories', {
			force: true
		});
	}
}