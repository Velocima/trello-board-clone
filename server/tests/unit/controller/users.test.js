const User = require('../../../models/user');
const usersController = require('../../../controllers/users');

jest.mock('../../../middleware/auth', () => jest.fn((req, res, next) => next()));

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn((code) => ({ send: mockSend, json: mockJson }));
const mockRes = { status: mockStatus };

describe('Users controller', () => {
	let testUser = {
		name: 'test user 1',
		email: 'testuser1@example.com',
		id: 'd939bc6e-495d-457a-a997-aab91c4e080a',
	};

	afterAll(() => {
		jest.resetAllMocks();
	});

	describe('show', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('returns a user with a 200 status code for valid id', async () => {
			jest.spyOn(User, 'show').mockResolvedValueOnce(new User(testUser));
			await usersController.show(null, mockRes);
			expect(mockStatus).toHaveBeenCalledWith(200);
			expect(mockSend).toHaveBeenCalledWith(testUser);
		});

		it('returns error message with a 404 status code for invalid id', async () => {
			jest.spyOn(User, 'show').mockRejectedValueOnce(new Error('User not found'));
			await usersController.show(null, mockRes);
			expect(mockStatus).toHaveBeenCalledWith(404);
			expect(mockSend).toHaveBeenCalledWith({ error: 'User not found' });
		});
	});

	describe('update', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('returns a user with a 200 status code for valid id', async () => {
			jest.spyOn(User, 'show').mockResolvedValueOnce(new User(testUser));
			jest.spyOn(User.prototype, 'update').mockResolvedValueOnce(true);
			await usersController.show({ body: { password: 'newpassword' } }, mockRes);
			expect(mockStatus).toHaveBeenCalledWith(200);
			expect(mockSend).toHaveBeenCalledWith(testUser);
		});

		it('returns error message with a 404 status code for invalid id', async () => {
			jest.spyOn(User, 'show').mockRejectedValueOnce(new Error('User not found'));
			await usersController.show({ body: { password: 'newpassword' } }, mockRes);
			expect(mockStatus).toHaveBeenCalledWith(404);
			expect(mockSend).toHaveBeenCalledWith({ error: 'User not found' });
		});

		it.each([{ body: {} }, { body: { password: null } }, { body: { password: '' } }])(
			'returns error message with a 400 status code for invalid body',
			async (reqBody) => {
				jest.spyOn(User, 'show').mockRejectedValueOnce(new Error('User not found'));
				await usersController.show(reqBody, mockRes);
				expect(mockStatus).toHaveBeenCalledWith(400);
				expect(mockSend).toHaveBeenCalledWith({ error: 'Invalid password' });
			}
		);
	});
});
