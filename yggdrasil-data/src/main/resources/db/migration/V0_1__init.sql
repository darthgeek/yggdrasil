CREATE TABLE User (
  id          BIGINT       NOT NULL,
  email       VARCHAR(255) NOT NULL UNIQUE,
  username    VARCHAR(255) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,
  enabled     BIT          NOT NULL,
  createdTime TIMESTAMP    NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Role (
  id   BIGINT       NOT NULL,
  name VARCHAR(255) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE Permission (
  id   BIGINT       NOT NULL,
  name VARCHAR(255) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE User_Role (
  users_id BIGINT NOT NULL,
  roles_id BIGINT NOT NULL,
  FOREIGN KEY (users_id) REFERENCES User (id),
  FOREIGN KEY (roles_id) REFERENCES Role (id),
);

CREATE TABLE Role_Permission (
  roles_id       BIGINT NOT NULL,
  permissions_id BIGINT NOT NULL,
  FOREIGN KEY (roles_id) REFERENCES Role (id),
  FOREIGN KEY (permissions_id) REFERENCES Permission (id)
);

-- Default user: admin/password
INSERT INTO User (id, email, username, password, enabled, createdTime)
VALUES (1, 'yggdrasil-admin@example.com', 'admin', '$2a$10$nY19RQx74gIF7qKjlYScceQcutEVVwb8w2q9knbH3Sp5oiDoWrsem', 1,
        CURRENT_TIME());

INSERT INTO Role (id, name) VALUES (1, 'USER');
INSERT INTO Role (id, name) VALUES (2, 'ADMIN');

INSERT INTO User_Role (users_id, roles_id) VALUES (1, 1);
INSERT INTO User_Role (users_id, roles_id) VALUES (1, 2);
