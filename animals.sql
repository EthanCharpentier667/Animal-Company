CREATE DATABASE IF NOT EXISTS animals;
USE animals;

CREATE TABLE IF NOT EXISTS person (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lastName VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(255) NOT NULL
) COMMENT = 'Table containing person informations';

CREATE TABLE IF NOT EXISTS animal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    dateOfBirth DATE NOT NULL DEFAULT CURDATE(),
    species VARCHAR(255) NOT NULL,
    breed VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    weight INT,
    person_id INT NOT NULL,
    FOREIGN KEY (person_id) REFERENCES person(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) COMMENT = 'Table containing animal informations';