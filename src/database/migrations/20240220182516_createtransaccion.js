'use strict';
const { QueryInterface } = require('sequelize');
const Sequelize = require('sequelize');


/**
 * @param {QueryInterface} queryInterface
 * @param {Sequelize} sequelize
 * @param {boolean} force
 */
const downMethod = async (queryInterface, sequelize, force) => {
	await queryInterface.sequelize.query(`DROP PROCEDURE IF EXISTS fa_createTransaction;`)
}


module.exports = {
	/**
	 * @param {QueryInterface} queryInterface
	 * @param {Sequelize} sequelize
	 */
	async up (queryInterface, sequelize) {

		try {
			await queryInterface.sequelize.query(`DROP PROCEDURE IF EXISTS fa_createTransaction;`)

			await queryInterface.sequelize.query(`
				CREATE PROCEDURE fa_createTransaction(
					_categoryid INTEGER,
					_date DATE,
					_title VARCHAR(50),
					_description VARCHAR(100),
					_amount DOUBLE,
					_typeid INTEGER,
					_userid INTEGER
				)
				BEGIN
					DECLARE _total DOUBLE;
					DECLARE _limit INTEGER;
					DECLARE _id INTEGER;
					DECLARE _newRecordId INTEGER;
				
				
					SELECT SUM(T.amount), C.limit, C.id INTO _total, _limit, _id
					FROM facategories AS C
					JOIN fatransactions AS T ON T.category_id = C.id
					WHERE C.id = _categoryid
					GROUP BY C.id;
					
					IF(_total + _amount) > _limit THEN
						SELECT 'Out of the limit' as message;
					ELSE 
						INSERT INTO fatransactions (user_id, date, title, description, amount, type_id, category_id)
						VALUES (_userid, _date, _title, _description, _amount, _typeid, _categoryid);
						
						SET _newRecordId = LAST_INSERT_ID();
				
						SELECT *
						FROM fatransactions
						WHERE id = _newRecordId;
					END IF;
				END
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