const { validate } = require('uuid');

const User = require('../../../models/user');

describe('User model', () => {
	describe('create', () => {
		const testData = {
			name: 'test user',
			email: 'testuser@example.com',
			password: 'test',
		};
		const { name, email, password } = testData;

		beforeEach(async () => {
			await resetTestDB();
		});

		it('resolves with user', async () => {
			expect.assertions(5);
			const user = await User.create(testData);
			expect(user).toBeInstanceOf(User);
			expect(validate(user.id)).toEqual(true);
			expect(user.name).toEqual(testData.name);
			expect(user.email).toEqual(testData.email);
			expect(user).toHaveProperty('password');
		});

		it.each([
			{ name, email },
			{ name, password },
			{ email, password },
		])('rejects with error message when called with invalid data', async (userData) => {
			try {
				expect.assertions(1);
				const data = await User.create(userData);
			} catch (err) {
				expect(err.message).toEqual('Missing required data');
			}
		});
	});

	describe('show', () => {
		beforeEach(async () => {
			await resetTestDB();
		});

		it('resolves with user', async () => {
			expect.assertions(5);
			const user = await User.show('d939bc6e-495d-457a-a997-aab91c4e080a');
			expect(user).toBeInstanceOf(User);
			expect(user.id).toEqual('d939bc6e-495d-457a-a997-aab91c4e080a');
			expect(user.name).toEqual('test user 1');
			expect(user.email).toEqual('testuser1@example.com');
			expect(user.password).toEqual('$2a$04$1zezalVLhbbA.jBhdlMkm.JmR9eniEtFblJd3I3w05RUf0MmiLMh.');
		});

		it('rejects with error message for invalid id', async () => {
			try {
				expect.assertions(1);
				const data = await User.show('invalidId');
			} catch (err) {
				expect(err.message).toEqual('User not found');
			}
		});
	});

	describe('findByEmail', () => {
		beforeEach(async () => {
			await resetTestDB();
		});

		it('resolves with user', async () => {
			expect.assertions(5);
			const user = await User.findByEmail('testuser1@example.com');
			expect(user).toBeInstanceOf(User);
			expect(user.id).toEqual('d939bc6e-495d-457a-a997-aab91c4e080a');
			expect(user.name).toEqual('test user 1');
			expect(user.email).toEqual('testuser1@example.com');
			expect(user.password).toEqual('$2a$04$1zezalVLhbbA.jBhdlMkm.JmR9eniEtFblJd3I3w05RUf0MmiLMh.');
		});

		it('rejects with error message for invalid email', async () => {
			try {
				expect.assertions(1);
				const data = await User.findByEmail('invalid@example.com');
			} catch (err) {
				expect(err.message).toEqual('User not found');
			}
		});
	});

	describe('destroy', () => {
		beforeEach(async () => {
			await resetTestDB();
		});

		const userData = {
			id: 'd939bc6e-495d-457a-a997-aab91c4e080a',
			name: 'test user 1',
			email: 'testuser1@example.com',
			password: '$2a$04$1zezalVLhbbA.jBhdlMkm.JmR9eniEtFblJd3I3w05RUf0MmiLMh.',
		};

		it('resolves true on success', async () => {
			expect.assertions(1);
			const user = new User(userData);
			const result = await user.destroy();
			expect(result).toBe(true);
		});
	});

	describe('update', () => {
		beforeEach(async () => {
			await resetTestDB();
		});

		it('resolves with user', async () => {
			expect.assertions(1);
			const user = await User.show('d939bc6e-495d-457a-a997-aab91c4e080a');
			const oldPassword = user.password;
			const result = await user.update('newPassword');
			expect(result.password).not.toEqual(oldPassword);
		});

		it.each([null, '', 4])('rejects with error message with invalid password', async (password) => {
			try {
				expect.assertions(1);
				const user = await User.show('d939bc6e-495d-457a-a997-aab91c4e080a');
				const result = await user.update(password);
			} catch (err) {
				expect(err.message).toEqual('Invalid argument for new password');
			}
		});
	});
});
