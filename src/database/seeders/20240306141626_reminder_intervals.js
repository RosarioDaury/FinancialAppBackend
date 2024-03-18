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
			const intervals = [
				{ title: "Weekly", interval: 7 },
				{ title: "Biweekly", interval: 15},
				{ title: "Monthly", interval: 30},
			];

			const dbData = await queryInterface.sequelize.query(
				`
					SELECT id AS COUNT
					FROM FaReminderIntervals
				`,
				{
					type: sequelize.QueryTypes.SELECT
				}
			)

			if(dbData.length == 0) {
				await queryInterface.bulkInsert('FaReminderIntervals', intervals)
			}

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