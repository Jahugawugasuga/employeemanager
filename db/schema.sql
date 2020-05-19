-- 
DROP DATABASE IF EXISTS employees_db;

-- Creates the "animals_db" database --
CREATE DATABASE employees_db;

-- Makes it so all of the following code will affect employees_db --
USE employees_db;


-- Creates the table "departments" within employees_db --
CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);
-- Creates the table "roles" within employees_db --
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(30) NOT NULL, -- hold role title
    salary DECIMAL(10, 2)NOT NULL, -- hold role salary
    department_id INT NOT NULL -- hold reference to dept that role belongs to,
    -- suggested by tutor, don't understand full functionality yet CONSTRAINT a_department FOREIGN KEY(departments_id) REFERENCES departments(id) ON DELETE CASCADE
);
-- Creates the table "employees" within employees_db --
CREATE TABLE employees (
    id INT PRIMARY KEY,
    first_name VARCHAR (30) NOT NULL, -- hold employee first name
    last_name VARCHAR (30) NOT NULL, -- hold employee last name
    manager_id INTEGER NOT NULL, 
    role_id INTEGER NOT NULL
    -- suggested by tutor, same as above, used to pull data from tables together CONSTRAINT a_role FOREIGN KEY(role_id) REFERENCES roles(id) ON DELETE CASCADE, 
    -- suggested by tutor, same as above - also protects data from manipulation or deletion CONSTRAINT a_manager FOREIGN KEY(manager_id) REFERENCES employees(id) ON DELETE SET NULL
);

-- joins foreign keys need an id from another table - a_roles, a_departments, a_manager REFERENCES points to the table that is being referenced
-- join creates a temp table - they can be indexed by dept id
-- when we makie a change then it will cascade upon deletion
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John","Doe", "Engineer", 2);

INSERT INTO departments (name)
VALUES ("Human Resources");

INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 125000, 3);