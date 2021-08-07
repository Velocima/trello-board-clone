describe('User endpoints', () => {
	let api;

	beforeAll(() => {
		api = app.listen(3000, () => console.log('Test server running on port 3000'));
	});

	afterAll(async () => {
		console.log('Gracefully stopping test server');
		await api.close();
	});

	describe('Success', () => {
		let testUser = {
			name: 'test user 1',
			email: 'testuser1@example.com',
			id: 'd939bc6e-495d-457a-a997-aab91c4e080a',
		};
		beforeEach(async () => {
			await resetTestDB();
		});

		it('should return user information', (done) => {
			request(api)
				.get('/users/d939bc6e-495d-457a-a997-aab91c4e080a')
				.expect('Content-Type', /json/)
				.expect(200)
				.expect({ user: testUser }, done);
		});
	});

	describe('Error', () => {
		beforeEach(async () => {
			await resetTestDB();
		});

		it('should return 404 for invalid id', (done) => {
			request(api).get('/users/1').expect(404).expect({ error: 'User does not exist' }, done);
		});
	});
});
