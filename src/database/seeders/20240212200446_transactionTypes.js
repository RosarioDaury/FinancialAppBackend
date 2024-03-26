'use strict';
const { QueryInterface } = require('sequelize');
const Sequelize = require('sequelize');


module.exports = {
	/**
	 * @param {QueryInterface} queryInterface
	 * @param {Sequelize} sequelize
	 */
	async up (queryInterface, sequelize) {
		const types = [
			{id: 1, type: "Income"},
			{id: 2, type: "Outcome"}
		]
		
		const dbData = await queryInterface.sequelize.query(
			`
				SELECT TYPE AS COUNT
				FROM FaTransactionTypes
			`,
			{
				type: sequelize.QueryTypes.SELECT
			}
		)

		if(dbData.length === 0){
			await queryInterface.bulkInsert('FaTransactionTypes', types)
		}

	},

	/**
	 * @param {QueryInterface} queryInterface
	 * @param {Sequelize} sequelize
	 */
	async down (queryInterface, sequelize) {
		// await downMethod(queryInterface, sequelize, false)
	}
}