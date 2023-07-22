CREATE DATABASE todo_db;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(200)
);

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(200) NOT NULL,
    user_email VARCHAR(200) NOT NULL,
    user_password VARCHAR(200) NOT NULL
);

INSERT INTO users(user_name,user_email,user_password)
VALUES ('Taohid','tawhidulbali00@gmail.com','me0r');