const jwt = require('jsonwebtoken');

async function validateToken(req, res, next) {
	const header = req.header('Authorization');
	if (header) {
		const token = header.split(' ')[1];
		await jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
			if (err) {
				console.log(err.message);
				res.status(403).send({ error: err.message });
			} else {
				next();
			}
		});
	} else {
		res.status(403).send({ err: 'Missing token' });
	}
}
module.exports = { validateToken };
