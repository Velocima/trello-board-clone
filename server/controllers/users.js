const User = require('../models/user');

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
		const isUpdated = user.update(password);
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
		}
		res.status(400).send({ error: err.message });
	}
}

module.exports = { show, update };
