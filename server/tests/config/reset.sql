TRUNCATE users, boards, columns, cards RESTART IDENTITY;

INSERT INTO users(id, name, email, password) 
VALUES 
  (
    'd939bc6e-495d-457a-a997-aab91c4e080a',
    'test user 1',
    'testuser1@example.com',
    '$2a$04$1zezalVLhbbA.jBhdlMkm.JmR9eniEtFblJd3I3w05RUf0MmiLMh.'
  ),
  (
    'cc311348-69fe-430a-8c8f-d0fc3f02acd5',
    'test user 2',
    'testuser2@example.com',
    '$2a$04$vn64baHWiLiFl6lgOQwY3uymNb9iOvexfjKlt.y6jg53R/FKdYCK.'
  ),
  (
    'a70f1eaf-c785-4466-9eb8-51853ace03b5',
    'test user 3',
    'testuser3@example.com',
    '$2a$04$nyh4tL/ExjTTYT3ktV7Rfu3G/xSxECgfQuZiZUgud4YbQcxRKZ6mq'
  );