CREATE DATABASE NETFLIX; 
USE NETFLIX;
CREATE TABLE movies(
id int auto_increment not null primary key, 
title varchar(45) not null,
gender varchar(45) not null, 
image varchar(1000) not null,
category varchar(45) not null,
year int 
); 

CREATE TABLE Users(
idUsers int auto_increment not null primary key,
user varchar(45) not null,
password varchar(45) not null,
name varchar(45) not null,
email varchar(45) not null,
plan_details varchar(45) not null
); 

CREATE TABLE Actors(
idActor int auto_increment not null primary key,
user varchar(45) not null,
name varchar(45) not null,
lastname varchar(45) not null,
country varchar(45) not null,
birthday date
); 

INSERT INTO movies (title, gender,image,category,year) VALUES
 ("Pulp Fiction", "Crimen","https://pics.filmaffinity.com/pulp_fiction-210382116-large.jpg", "Top 10", "1994"), 
("La vita è bella", "Comedia","https://pics.filmaffinity.com/la_vita_e_bella-646167341-mmed.jpg", "Top 10", "1996"), 
("Forrest Gump", "Comedia", "https://pics.filmaffinity.com/forrest_gump-212765827-mmed.jpg", "Top 10", "1994"); 

SELECT * from movies; 
INSERT INTO users (user, password, name, email, plan_details) VALUES
("laura_dev", "laura", "Laura", "laura@gmail.com", "Standard"),
("maria_dev", "maria", "María", "maria@gmail.com", "Standard"),
("ester_dev", "ester", "Ester", "ester@gmail.com", "Standard"); 

SELECT * from users; 

INSERT INTO Actors (name, lastname, country, birthday) VALUES
("Tom", "Hanks", "Estados Unidos", "1956-06-09"); 

SELECT * from Actors; 
SELECT * from Actors; 

SELECT * from movies; 

SELECT title, gender FROM movies
WHERE year > "1990"; 

SELECT * from movies; 

SELECT title FROM movies 
WHERE category = "Top 10"; 

UPDATE movies 
SET year="1997"
WHERE id=2; 

SELECT * from movies; 

SELECT * from Actors; 

SELECT name from Actors
WHERE birthday BETWEEN "1950-01-01" AND "1960-01-01"; 

SELECT name, lastname from Actors 
WHERE country="Estados Unidos"; 

SELECT * from users; 

SELECT user from users
WHERE plan_details="Standard"; 

DELETE FROM users
WHERE name LIKE "M%";  

ALTER TABLE Actors 
ADD column image varchar(45); 


INSERT INTO Actors (name, lastname, country, birthday) VALUES
("Tom", "Hanks", "Estados Unidos", "1956-06-09"); 

INSERT INTO Actors (name, lastname, country, birthday) VALUES
("Roberto", "Benigni", "Italia", "1952-10-27"); 

DELETE FROM Actors user;

CREATE TABLE rel_movies_users (
id int auto_increment not null primary key,
fkIdUser int not null,
foreign key (fkIdUser) references Users (idUsers),
fkIdMovie int not null,
foreign key (fkIdMovie) references movies (id)
);

SELECT * FROM rel_movies_users;

INSERT INTO rel_movies_users (fkIdUser, fkIdMovie) VALUES 
(1, 1), (1, 2), (2, 2);

ALTER TABLE rel_movies_users
ADD column score FLOAT;

UPDATE rel_movies_users SET score = 10 WHERE fkIdUser = 1 AND fkIdMovie = 1;
UPDATE rel_movies_users SET score = 8.5 WHERE fkIdUser = 1 AND fkIdMovie = 2;
UPDATE rel_movies_users SET score = 9 WHERE fkIdUser = 2 AND fkIdMovie = 2;


DELETE FROM rel_movies_users 
WHERE id > 3;

CREATE TABLE rel_movies_actors (
id int auto_increment not null primary key,
fkIdActor int not null,
foreign key (fkIdActor) references Actors (idActor),
fkIdMovie int not null,
foreign key (fkIdMovie) references movies (id)
);

SELECT * FROM rel_movies_actors;

INSERT INTO rel_movies_actors (fkIdActor, fkIdMovie) VALUES 
(1, 1), (1, 2), (2, 2);


