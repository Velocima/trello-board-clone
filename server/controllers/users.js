const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function show(req, res) {
	try {
		const { id } = req.params;
		const user = await User.show(id);
		const response = {
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
		};
		res.status(200).send(response);
	} catch (err) {
		res.status(404).send({ error: err.message });
	}
}

async function update(req, res) {
	try {
		const { id } = req.params;
		const { password } = req.body;
		const user = await User.show(id);
		const isUpdated = await user.update(password);
		if (!isUpdated) {
			throw new Error('Unable to update');
		}
		const response = {
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
		};
		res.status(200).send(response);
	} catch (err) {
		if (err.message === 'User not found') {
			res.status(404).send({ error: err.message });
			return;
		}
		res.status(400).send({ error: err.message });
	}
}

async function destroy(req, res) {
	try {
		const { id } = req.params;
		const user = await User.show(id);
		const result = await user.destroy();
		if (!result) {
			throw new Error('Unable to destroy');
		}
		res.status(204).send();
	} catch (err) {
		if ((err.message = 'User not found')) {
			res.status(404).send({ error: err.message });
			return;
		}
		res.status(500).send();
	}
}

async function create(req, res) {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			throw new Error('Invalid body data');
		}
		const salt = await bcrypt.genSalt();
		const hash = await bcrypt.hash(password, salt);
		const user = await User.create({ name, email, password: hash });
		const response = {
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
		};
		res.status(201).send(response);
	} catch (err) {
		if (err.message === 'Invalid body data') {
			res.status(400).send({ error: err.message });
			return;
		}
		res.status(500).send();
	}
}

async function login(req, res) {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			throw new Error('Missing body data');
		}
		const user = await User.findByEmail(email);
		const authed = await bcrypt.compare(password, user.password);

		if (!authed) {
			throw new Error('Password or email incorrect');
		}
		const token = await jwt.sign(
			{ id: user.id, name: user.name, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: 86400 }
		);

		res.status(200).send({ ok: true, token: `Bearer ${token}` });
	} catch (err) {
		switch (err.message) {
			case 'Missing body data':
				res.status(400).send({ error: err.message });
				break;
			case 'Password or email incorrect':
				res.status(401).send({ error: err.message });
				break;
			case 'User not found':
				res.status(404).send({ error: err.message });
				break;
			default:
				res.status(500).send();
				break;
		}
	}
}

module.exports = { show, update, destroy, create, login };
