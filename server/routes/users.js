const usersRouter = require('express').Router();
const usersController = require('../controllers/users');
const { validateToken } = require('../middleware/auth');

usersRouter.get('/:id', validateToken, usersController.show);
usersRouter.put('/:id', validateToken, usersController.update);
usersRouter.delete('/:id', validateToken, usersController.destroy);
usersRouter.post('/register', usersController.create);
usersRouter.post('/login', usersController.login);

module.exports = usersRouter;
