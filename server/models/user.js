const db = require('../dbConfig/config');
const { v4: uuid } = require('uuid');

class User {
	constructor({ name, email, id, password }) {
		this.name = name;
		this.email = email;
		this.id = id;
		this.password = password;
	}

	static create({ name, email, password }) {
		return new Promise(async (resolve, reject) => {
			try {
				const id = uuid();
				const userData = await db.query(
					'INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING name, email, id;',
					[id, name, email, password]
				);
				const user = new User(userData.rows[0]);
				if (!user.id || !user.email || !user.name) {
					throw new Error('User could not be created');
				}
				resolve(user);
			} catch (err) {
				reject(err);
			}
		});
	}

	static show(id) {
		return new Promise(async (resolve, reject) => {
			try {
				const userData = await db.query('SELECT id, name, email FROM users WHERE id = $1;', [id]);
				if (userData.rows.length !== 1) {
					throw new Error('User not found');
				}
				const user = new User(userData.rows[0]);
				resolve(user);
			} catch (err) {
				reject(err);
			}
		});
	}

	static findByEmail(email) {
		return new Promise(async (resolve, reject) => {
			try {
				const userData = await db.query('SELECT id, name, email FROM users WHERE email = $1;', [
					email,
				]);
				if (userData.rows.length !== 1) {
					throw new Error('User not found');
				}
				const user = new User(userData.rows[0]);
				resolve(user);
			} catch (err) {
				reject(err);
			}
		});
	}

	destroy() {
		return new Promise(async (resolve, reject) => {
			try {
				await db.query('DELETE * FROM users WHERE id = $1;');
				resolve(true);
			} catch (err) {
				reject(err);
			}
		});
	}

	update(password) {
		return new Promise(async (resolve, reject) => {
			try {
				if (!password || typeof password !== 'string') {
					throw new Error('Invalid argument for new password');
				}
				const userData = await db.query(
					'UPDATE users SET password = $1 WHERE id = $2 RETURNING id;',
					[password, this.id]
				);
				if (userData.rows[0].id !== this.id) {
					throw new Error('Unable to update');
				}
				resolve(true);
			} catch (err) {
				reject(err);
			}
		});
	}
}

module.exports = User;
