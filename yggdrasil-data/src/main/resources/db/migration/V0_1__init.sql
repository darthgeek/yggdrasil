CREATE TABLE User (
  id                   BIGINT AUTO_INCREMENT NOT NULL,
  email                VARCHAR(255)          NOT NULL UNIQUE,
  username             VARCHAR(255)          NOT NULL UNIQUE,
  password             VARCHAR(255)          NOT NULL,
  enabled              BIT                   NOT NULL,
  createdTime          TIMESTAMP             NOT NULL,
  externalAuthProvider VARCHAR(255),
  externalAuthKey      VARCHAR(1024),
  PRIMARY KEY (id)
);

CREATE TABLE Role (
  id   BIGINT AUTO_INCREMENT NOT NULL,
  name VARCHAR(255)          NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE Permission (
  id   BIGINT AUTO_INCREMENT NOT NULL,
  name VARCHAR(255)          NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE User_Role (
  user_id BIGINT NOT NULL,
  role_id BIGINT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES User (id),
  FOREIGN KEY (role_id) REFERENCES Role (id),
);

CREATE TABLE Role_Permission (
  role_id       BIGINT NOT NULL,
  permission_id BIGINT NOT NULL,
  FOREIGN KEY (role_id) REFERENCES Role (id),
  FOREIGN KEY (permission_id) REFERENCES Permission (id)
);

-- Default user: admin/password
INSERT INTO User (id, email, username, password, enabled, createdTime)
VALUES (1, 'yggdrasil-admin@example.com', 'admin', '$2a$10$nY19RQx74gIF7qKjlYScceQcutEVVwb8w2q9knbH3Sp5oiDoWrsem',
        1, CURRENT_TIMESTAMP());

INSERT INTO Role (id, name) VALUES (10, 'USER');
INSERT INTO Role (id, name) VALUES (20, 'ADMIN');

INSERT INTO Permission (id, name) VALUES (100, 'ADMIN');

INSERT INTO User_Role (user_id, role_id) VALUES (1, 10);
INSERT INTO User_Role (user_id, role_id) VALUES (1, 20);

INSERT INTO Role_Permission (role_id, permission_id) VALUES (20, 100);

-- Spring "remember me" authentication
CREATE TABLE persistent_logins (
  username  VARCHAR(64) NOT NULL,
  series    VARCHAR(64) PRIMARY KEY,
  token     VARCHAR(64) NOT NULL,
  last_used TIMESTAMP   NOT NULL
);

