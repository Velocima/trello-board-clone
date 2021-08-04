DROP TABLE IF EXISTS users;

CREATE TABLE users(
  id VARCHAR PRIMARY KEY, 
  name VARCHAR(100),
  password VARCHAR,
  email VARCHAR UNIQUE
);

DROP TABLE IF EXISTS boards;

CREATE TABLE boards(
  id VARCHAR PRIMARY KEY, 
  userId VARCHAR,
  name VARCHAR(100),
  FOREIGN KEY (userId) REFERENCES users(id)
);

DROP TABLE IF EXISTS columns;

CREATE TABLE columns(
  id VARCHAR PRIMARY KEY, 
  boardId VARCHAR,
  name VARCHAR(100),
  FOREIGN KEY (boardId) REFERENCES boards(id)
);

DROP TABLE IF EXISTS cards;

CREATE TABLE cards(
  id VARCHAR PRIMARY KEY, 
  columnId VARCHAR,
  content VARCHAR(400),
  card_position INTEGER,
  FOREIGN KEY (columnId) REFERENCES columns(id)
);
