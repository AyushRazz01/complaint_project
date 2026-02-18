CREATE DATABASE complaint_db;
USE complaint_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(255),
  role VARCHAR(20)
);

CREATE TABLE complaints (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(200),
  category VARCHAR(100),
  description TEXT,
  status VARCHAR(50),
  created_at DATETIME,
  sla_deadline DATETIME,
  resolved_at DATETIME
);

INSERT INTO users(name,email,password,role)
VALUES
('Admin','admin@gmail.com','1234','admin'),
('Ayush','ayush@gmail.com','1234','user');
