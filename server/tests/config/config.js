const { Pool } = require('pg');
const fs = require('fs');

const request = require('supertest');
const app = require('../../app');

// import reset query
const reset = fs.readFileSync(__dirname + '/test_seeds.sql').toString();

// enable resetting of db between tests
const resetTestDB = () => {
	return new Promise(async (res, rej) => {
		try {
			const db = new Pool();
			await db.query(reset);
			res('Test DB reset');
		} catch (err) {
			rej('Could not reset TestDB');
		}
	});
};

// make these things available to test suites
global.request = request;
global.app = app;
global.resetTestDB = resetTestDB;
global.port = process.env.PORT || 3000;
