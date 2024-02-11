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
			{type: "Person"},
			{type: "Company"}
		]
		
		const dbData = await queryInterface.sequelize.query(
			`
				SELECT TYPE AS COUNT
				FROM FaUserType
			`,
			{
				type: sequelize.QueryTypes.SELECT
			}
		)

		if(dbData.length === 0){
			await queryInterface.bulkInsert('FaUserType', types)
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