const User = require('../../../models/user');
const usersController = require('../../../controllers/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

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
	const password = 'test';

	afterAll(() => {
		jest.resetAllMocks();
	});

	describe('show', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('returns a user with a 200 status code for valid id', async () => {
			jest.spyOn(User, 'show').mockResolvedValueOnce(new User({ ...testUser, password }));
			await usersController.show({ params: { id: testUser.id } }, mockRes);
			expect(mockStatus).toHaveBeenCalledWith(200);
			expect(mockSend).toHaveBeenCalledWith(testUser);
		});

		it('returns error message with a 404 status code for invalid id', async () => {
			jest.spyOn(User, 'show').mockRejectedValueOnce(new Error('User not found'));
			await usersController.show({ params: { id: 'test' } }, mockRes);
			expect(mockStatus).toHaveBeenCalledWith(404);
			expect(mockSend).toHaveBeenCalledWith({ error: 'User not found' });
		});
	});

	describe('update', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('returns a user with a 200 status code for valid id', async () => {
			jest.spyOn(User, 'show').mockResolvedValueOnce(new User({ ...testUser, password }));
			jest.spyOn(User.prototype, 'update').mockResolvedValueOnce(true);
			await usersController.show(
				{ params: { id: testUser.id }, body: { password: 'newpassword' } },
				mockRes
			);
			expect(mockStatus).toHaveBeenCalledWith(200);
			expect(mockSend).toHaveBeenCalledWith(testUser);
		});

		it('returns error message with a 404 status code for invalid id', async () => {
			jest.spyOn(User, 'show').mockRejectedValueOnce(new Error('User not found'));
			await usersController.show(
				{ params: { id: testUser.id }, body: { password: 'newpassword' } },
				mockRes
			);
			expect(mockStatus).toHaveBeenCalledWith(404);
			expect(mockSend).toHaveBeenCalledWith({ error: 'User not found' });
		});

		it.each([
			{ params: { id: testUser.id }, body: {} },
			{ params: { id: testUser.id }, body: { password: null } },
			{ params: { id: testUser.id }, body: { password: '' } },
		])('returns error message with a 400 status code for invalid body', async (reqBody) => {
			jest.spyOn(User, 'show').mockRejectedValueOnce(new Error('Invalid password'));
			await usersController.show(reqBody, mockRes);
			expect(mockStatus).toHaveBeenCalledWith(400);
			expect(mockSend).toHaveBeenCalledWith({ error: 'Invalid password' });
		});
	});

	describe('destroy', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('returns a user with a 200 status code for valid id', async () => {
			jest.spyOn(User, 'show').mockResolvedValueOnce(new User({ ...testUser, password }));
			jest.spyOn(User.prototype, 'destroy').mockResolvedValueOnce(true);
			await usersController.destroy({ params: testUser.id }, mockRes);
			expect(mockStatus).toHaveBeenCalledWith(204);
			expect(mockSend).toHaveBeenCalled();
		});

		it('returns error message with a 404 status code for invalid id', async () => {
			jest.spyOn(User, 'show').mockRejectedValueOnce(new Error('User not found'));
			jest.spyOn(User.prototype, 'destroy').mockResolvedValueOnce(true);
			await usersController.destroy({ params: testUser.id }, mockRes);
			expect(mockStatus).toHaveBeenCalledWith(404);
			expect(mockSend).toHaveBeenCalledWith({ error: 'User not found' });
		});
	});

	describe('create', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		const newUserData = {
			name: 'test user 1',
			email: 'testuser1@example.com',
			password: 'password',
		};
		const { name, email, password } = newUserData;

		it('returns a user with a 200 status code for valid id', async () => {
			jest.spyOn(User, 'create').mockResolvedValueOnce(new User(newUserData));
			await usersController.create({ body: newUserData }, mockRes);
			expect(mockStatus).toHaveBeenCalledWith(201);
			expect(mockSend).toHaveBeenCalled(testUser);
		});

		it.each([
			{ name, email },
			{ name, password },
			{ email, password },
		])('returns error message with a 400 status code for missing body data', async (userData) => {
			await usersController.create({ body: userData }, mockRes);
			expect(mockStatus).toHaveBeenCalledWith(400);
			expect(mockSend).toHaveBeenCalledWith({ error: 'Invalid body data' });
		});
	});

	describe('login', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		const body = { ...testUser, password };

		it('returns a user with a 200 status code for valid id', async () => {
			jest.spyOn(User, 'findByEmail').mockResolvedValueOnce(new User(testUser));
			jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);
			jest.spyOn(jwt, 'sign').mockResolvedValueOnce('token');
			await usersController.login({ body }, mockRes);
			expect(mockStatus).toHaveBeenCalledWith(201);
			expect(mockSend).toHaveBeenCalled({ ok: true, token: 'Bearer token' });
		});

		it('returns error message with a 404 status code for invalid email', async () => {
			jest.spyOn(User, 'findByEmail').mockRejectedValueOnce(new Error('User not found'));
			await usersController.login({ body }, mockRes);
			expect(mockStatus).toHaveBeenCalledWith(404);
			expect(mockSend).toHaveBeenCalledWith({ error: 'User not found' });
		});

		it('returns error message with a 401 status code for invalid password', async () => {
			jest.spyOn(User, 'findByEmail').mockResolvedValueOnce(new User(testUser));
			jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);
			await usersController.create({ body }, mockRes);
			expect(mockStatus).toHaveBeenCalledWith(401);
			expect(mockSend).toHaveBeenCalledWith({ error: 'Password or email incorrect' });
		});
	});
});
