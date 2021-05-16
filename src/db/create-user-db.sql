-- DROP DATABASE IF EXISTS test_db;   
-- CREATE DATABASE IF NOT EXISTS test_db;   
-- USE test_db; 

DROP TABLE IF EXISTS user; 

CREATE TABLE IF NOT EXISTS user 
  ( 
     id         INT PRIMARY KEY auto_increment, 
     username   VARCHAR(25) UNIQUE NOT NULL, 
     password   CHAR(60) NOT NULL, 
     first_name VARCHAR(50) NOT NULL, 
     last_name  VARCHAR(50) NOT NULL, 
     email      VARCHAR(100) UNIQUE NOT NULL, 
     role       ENUM('Admin', 'SuperUser') DEFAULT 'SuperUser', 
     age        INT(11) DEFAULT 0 
  ); 


DROP TABLE IF EXISTS blog; 

CREATE TABLE IF NOT EXISTS blog 
  ( 
     id         INT PRIMARY KEY auto_increment, 
     title   VARCHAR(500) UNIQUE NOT NULL, 
     category VARCHAR(50) NOT NULL, 
     blogdesc  VARCHAR(50) NOT NULL
  ); 