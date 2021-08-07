const User = require('../../../models/user');

const db = require('../../../dbConfig/config');

describe('User model', () => {
	describe('create', () => {
		beforeEach(async () => {
			await resetTestDB();
		});

		it('resolves with user', async () => {
			let userData = {
				name: 'test user',
				password: 'test',
				email: 'testuser@example.com',
			};
			expect.assertions(4);
			const user = await User.create(userData);
			expect(user).toHaveProperty('id');
			expect(user).toHaveProperty('name');
			expect(user).toHaveProperty('email');
			expect(user).toBeInstanceOf(User);
		});

		it('rejects with error on failed db query', async () => {
			try {
				expect.assertions(1);
				let userData = {};
				const data = await User.create(userData);
			} catch (err) {
				expect(err.message).toEqual('User could not be created');
			}
		});
	});
});
