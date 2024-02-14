'use strict';
const { QueryInterface } = require('sequelize');
const Sequelize = require('sequelize');


/**
 * @param {QueryInterface} queryInterface
 * @param {Sequelize} sequelize
 * @param {boolean} force
 */
const downMethod = async (queryInterface, sequelize, force) => {
	await queryInterface.sequelize.query(`DROP PROCEDURE IF EXISTS facategories_get;`)
}


module.exports = {
	/**
	 * @param {QueryInterface} queryInterface
	 * @param {Sequelize} sequelize
	 */
	async up (queryInterface, sequelize) {

		try {

			await queryInterface.sequelize.query(`DROP PROCEDURE IF EXISTS facategories_get;`)

			await queryInterface.sequelize.query(`
				CREATE PROCEDURE facategories_get
				(
					_userid INTEGER,
					_offset INTEGER,
					_limit INTEGER
				)
				
					SELECT C.id, C.name, C.limit, C.createdAt, SUM(T.amount) AS total
					FROM facategories AS C
					JOIN fatransactions AS T ON T.category_id = C.id
					WHERE C.id = _userid
					GROUP BY C.id
					LIMIT _offset , _limit;
			
			`)

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