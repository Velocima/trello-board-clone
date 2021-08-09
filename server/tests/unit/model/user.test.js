const User = require('../../../models/user');

const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/config');

describe('User model', () => {
	afterAll(() => {
		jest.resetAllMocks();
	});

	describe('create', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('resolves with user on successful db query', async () => {
			expect.assertions(5);
			let userData = {
				name: 'test user',
				password: 'test',
				email: 'testuser@example.com',
			};
			jest.spyOn(db, 'query').mockResolvedValueOnce({
				rows: [{ ...userData, id: 'a3cb3416-8fcf-4719-8897-3f51767a578d' }],
			});
			const user = await User.create(userData);
			expect(user).toBeInstanceOf(User);
			expect(user.id).toEqual('a3cb3416-8fcf-4719-8897-3f51767a578d');
			expect(user.name).toEqual(userData.name);
			expect(user.email).toEqual(userData.email);
			expect(user).toHaveProperty('password');
		});

		it('rejects with error on failed db query', async () => {
			try {
				expect.assertions(1);
				let userData = {};
				jest.spyOn(db, 'query').mockRejectedValueOnce(new Error('User could not be created'));
				const data = await User.create(userData);
			} catch (err) {
				expect(err.message).toEqual('User could not be created');
			}
		});
	});
});