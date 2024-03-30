'use strict';
const { QueryInterface } = require('sequelize');
const Sequelize = require('sequelize');


/**
 * @param {QueryInterface} queryInterface
 * @param {Sequelize} sequelize
 * @param {boolean} force
 */
const downMethod = async (queryInterface, sequelize, force) => {
	await queryInterface.sequelize.query(`DROP PROCEDURE IF EXISTS FA_GET_REMINDERS;`)

}


module.exports = {
	/**
	 * @param {QueryInterface} queryInterface
	 * @param {Sequelize} sequelize
	 */
	async up (queryInterface, sequelize) {

		try {
			await queryInterface.sequelize.query(`DROP PROCEDURE IF EXISTS FA_GET_REMINDERS;`)

			await queryInterface.sequelize.query(`
				CREATE PROCEDURE FA_GET_REMINDERS(
					_offset INTEGER,
					_limit INTEGER,
					_user_id INTEGER
				)
					
					SELECT R.id, R.user_id, R.amount, R.interval_id, R.title, R.description, R.date, R.createdAt, R.updatedAt, N.externalId, I.title as intervalTitle
					FROM FAREMINDERS AS R INNER JOIN faremindernotifications AS N ON R.id = N.reminderId
					INNER JOIN fareminderintervals AS I ON R.interval_id = I.id
					WHERE R.user_id = _user_id
					LIMIT _offset , _limit;
			`)

			await queryInterface.sequelize.query(`
				CREATE PROCEDURE FA_GET_REMINDERS_FILTER(
					_offset INTEGER,
					_limit INTEGER,
					_user_id INTEGER,
					_title VARCHAR(50)
				)
					
					SELECT R.id, R.user_id, R.amount, R.interval_id, R.title, R.description, R.date, R.createdAt, R.updatedAt, N.externalId, I.title as intervalTitlle
					FROM FAREMINDERS AS R INNER JOIN faremindernotifications AS N ON R.id = N.reminderId
					INNER JOIN fareminderintervals AS I ON R.interval_id = I.id
					WHERE R.user_id = _user_id AND R.title LIKE CONCAT('%', _title, '%')
					LIMIT _offset , _limit;
			`)

			await queryInterface.sequelize.query(`
				CREATE PROCEDURE FA_GET_REMINDERS_FILTER_BYID(
					_user_id INTEGER,
					_id INTEGER
				)
					
					SELECT R.id, R.user_id, R.amount, R.interval_id, R.title, R.description, R.date, R.createdAt, R.updatedAt, N.externalId, i.title as intervalTitle
					FROM FAREMINDERS AS R INNER JOIN faremindernotifications AS N ON R.id = N.reminderId
					INNER JOIN fareminderintervals AS I ON R.interval_id = I.id
					WHERE R.user_id = _user_id AND R.id = _id
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