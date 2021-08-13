const usersRouter = require('express').Router();
const usersController = require('../controllers/users');

usersRouter.get('/:id', usersController.show);
usersRouter.post('/register', usersController.create);
usersRouter.put('/:id', usersController.update);
usersRouter.delete('/:id', usersController.destroy);
usersRouter.post('/login', usersController.login);

module.exports = usersRouter;
