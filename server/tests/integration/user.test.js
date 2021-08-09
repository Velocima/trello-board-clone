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

		it('GET to user/:id should return 404 for invalid id', (done) => {
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
	});

	describe('DELETE /user/:id', () => {
		beforeEach(async () => {
			await resetTestDB();
		});

		it('should return status 204', (done) => {
			request(api).delete(`/users/${testUser.id}`).expect(204, done);
		});
	});

	describe('POST /user/register ', () => {
		beforeEach(async () => {
			await resetTestDB();
		});

		it('should return status 201 user information', (done) => {
			const newUserData = {
				name: 'new user',
				password: 'superPassword',
				email: 'newuser@example.com',
			};
			const { name, email } = newUserData;
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
	});
});
