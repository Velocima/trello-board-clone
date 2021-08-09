const { validate } = require('uuid');

describe('User endpoints', () => {
	let api;

	let testUser = {
		name: 'test user 1',
		email: 'testuser1@example.com',
		id: 'd939bc6e-495d-457a-a997-aab91c4e080a',
	};

	beforeAll(() => {
		api = app.listen(3000, () => console.log('Test server running on port 3000'));
	});

	afterAll(async () => {
		console.log('Gracefully stopping test server');
		await api.close();
	});

	describe('GET /user/:id', () => {
		beforeEach(async () => {
			await resetTestDB();
		});

		it('should return status 200 with user information', (done) => {
			request(api)
				.get(`/users/${testUser.id}`)
				.expect('Content-Type', /json/)
				.expect(200)
				.expect({ user: testUser }, done);
		});

		it('should return 404 for invalid id', (done) => {
			request(api).get('/users/1').expect(404).expect({ error: 'User not found' }, done);
		});
	});

	describe('PUT /user/:id', () => {
		beforeEach(async () => {
			await resetTestDB();
		});

		it('should return status 200 user information', (done) => {
			request(api)
				.put(`/users/${testUser.id}`)
				.send({ password: 'new password' })
				.set('Content-Type', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.expect({ user: testUser }, done);
		});

		it('should return 404 for invalid id', (done) => {
			request(api)
				.put('/users/1')
				.send({ password: 'new password' })
				.set('Content-Type', 'application/json')
				.expect(404)
				.expect({ error: 'User not found' }, done);
		});

		it('should return 400 for invalid password', (done) => {
			request(api)
				.put('/users/1')
				.send()
				.set('Content-Type', 'application/json')
				.expect(400)
				.expect({ error: 'Invalid new password' }, done);
		});
	});

	describe('DELETE /user/:id', () => {
		beforeEach(async () => {
			await resetTestDB();
		});

		it('should return status 204', (done) => {
			request(api).delete(`/users/${testUser.id}`).expect(204, done);
		});

		it('should return 404 for invalid id', (done) => {
			request(api).delete('/users/1').expect(404).expect({ error: 'User not found' }, done);
		});
	});

	describe('POST /user/register ', () => {
		beforeEach(async () => {
			await resetTestDB();
		});

		const newUserData = {
			name: 'new user',
			password: 'superPassword',
			email: 'newuser@example.com',
		};
		const { name, email, password } = newUserData;

		it('should return status 201 user information', (done) => {
			request(api)
				.post('/users/')
				.send(newUserData)
				.set('Content-Type', 'application/json')
				.expect('Content-Type', /json/)
				.expect(201)
				.expect((res) => {
					if (validate(res.body.id)) {
						res.body.id = true;
					}
				})
				.expect({ user: { name, id: true, email } }, done);
		});

		it.each([
			{ password, email },
			{ name, email },
			{ name, password },
		])('should return 400 for missing data', (userData, done) => {
			request(api)
				.post('/users/register')
				.send(userData)
				.set('Content-Type', 'application/json')
				.expect(400)
				.expect({ error: 'Missing required user data' }, done);
		});
	});

	describe('POST /user/login ', () => {
		beforeEach(async () => {
			await resetTestDB();
		});

		it('should return status 200', (done) => {
			request(api)
				.post(`/users/login`)
				.send({ email: testUser.email, password: 'test1' })
				.set('Content-Type', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.expect((res) => {
					if (res.body.token.includes('Bearer ')) {
						res.body.token = true;
					}
				})
				.expect({ token: true, ok: true }, done);
		});

		it.each([
			{ email: 'wrongemail@example.com', password: 'test1' },
			{ email: testUser.email, password: 'wrongpassword' },
			{},
		])('should return 401 for invalid email or password', (loginData, done) => {
			request(api)
				.post('/users/login')
				.send(loginData)
				.set('Content-Type', 'application/json')
				.expect(401)
				.expect({ error: 'Password or email incorrect' }, done);
		});
	});
});
