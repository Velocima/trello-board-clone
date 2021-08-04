# Trello Clone

A simple trello clone.

## Technologies

### Client

- Nodejs
- NPM
  - Webpack
  - React

### Server

- Nodejs
- NPM
  - express
  - cors
  - morgan
  - uuid
  - jsonwebtoken
  - pg
  - nodemon
  - jest
  - supertest

### Database

## API endpoints

### Users

| Route name | Path              | Method   | Purpose                | Status      |
| ---------- | ----------------- | -------- | ---------------------- | ----------- |
| create     | `/users/register` | `POST`   | Register a new account | In progress |
| create     | `/users/login`    | `POST`   | Login to an account    | In progress |
| show       | `/users/:id`      | `GET`    | Get User info by id    | In progress |
| update     | `/users/:id`      | `PUT`    | Update password        | In progress |
| destroy    | `/users/:id`      | `DELETE` | Detele user by id      | In progress |

### Boards

| Route name | Path                    | Method   | Purpose               | Status      |
| ---------- | ----------------------- | -------- | --------------------- | ----------- |
| show       | `/users/:id/boards`     | `GET`    | Get all users boards  | In progress |
| create     | `/users/:id/boards`     | `POST`   | Create new user board | In progress |
| show       | `/users/:id/boards/:id` | `GET`    | Get board by id       | In progress |
| update     | `/users/:id/boards/:id` | `PUT`    | Update board name     | In progress |
| destroy    | `/users/:id/boards/:id` | `DELETE` | Delete board by id    | In progress |

### Columns

| Route name | Path                                | Method   | Purpose                    | Status      |
| ---------- | ----------------------------------- | -------- | -------------------------- | ----------- |
| show       | `/users/:id/boards/:id/columns`     | `GET`    | Get all boards columns     | In progress |
| create     | `/users/:id/boards/:id/columns`     | `POST`   | Create new column in board | In progress |
| show       | `/users/:id/boards/:id/columns/:id` | `PUT`    | Get column by id           | In progress |
| update     | `/users/:id/boards/:id/columns/:id` | `PUT`    | Update column name         | In progress |
| destroy    | `/users/:id/boards/:id/columns/:id` | `DELETE` | Delete column by id        | In progress |

### Cards

| Route name | Path                                          | Method   | Purpose                   | Status      |
| ---------- | --------------------------------------------- | -------- | ------------------------- | ----------- |
| show       | `/users/:id/boards/:id/columns/:id/cards`     | `GET`    | Get all columns cards     | In progress |
| create     | `/users/:id/boards/:id/columns/:id/cards`     | `POST`   | Create new card in column | In progress |
| show       | `/users/:id/boards/:id/columns/:id/cards/:id` | `PUT`    | Get card by id            | In progress |
| update     | `/users/:id/boards/:id/columns/:id/cards/:id` | `PUT`    | Update card content       | In progress |
| destroy    | `/users/:id/boards/:id/columns/:id/cards/:id` | `DELETE` | Delete card by id         | In progress |
