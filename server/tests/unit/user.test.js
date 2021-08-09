const User = require('../../../models/user');

const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/config');

describe('User model', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.resetAllMocks();
	});

	describe('create', () => {
		it('resolves with user on successful db query', async () => {
			expect.assertions(4);
			let userData = {
				name: 'test user',
				password: 'test',
				email: 'testuser@example.com',
			};
			jest.spyOn(db, 'query').mockResolvedValueOnce({
				rows: [{ ...userData, id: 'a3cb3416-8fcf-4719-8897-3f51767a578d' }],
			});
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
				jest.spyOn(db, 'query').mockRejectedValueOnce(new Error('User could not be created'));
				const data = await User.create(userData);
			} catch (err) {
				expect(err.message).toEqual('User could not be created');
			}
		});
	});
});
