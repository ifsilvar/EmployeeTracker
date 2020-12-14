DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;

CREATE TABLE department (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    deptId INT,
    CONSTRAINT FOREIGN KEY fk_dept (deptId) REFERENCES department (id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INTEGER NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    roleId INT,
    managerId INT NULL,
    CONSTRAINT FOREIGN KEY fk_role (roleId) REFERENCES role (id) ON DELETE CASCADE,
    CONSTRAINT FOREIGN KEY fk_manager (managerId) REFERENCES employee (id) ON DELETE SET null,
    PRIMARY KEY (id)
);


INSERT INTO department (name) values ('Human Resources');
INSERT INTO department (name) values ('R&D');
INSERT INTO department (name) values ('Legal');
INSERT INTO department (name) values ('Sales');

INSERT INTO role (title, salary) values ('Engineer', 120000);
INSERT INTO role (title, salary) values ('Attourney', 200000);
INSERT INTO role (title, salary) values ('Sales Analyst', 90000);
INSERT INTO role (title, salary) values ('HR Specialist', 80000);

INSERT INTO employee (firstName, lastName) values ('Ivan', 'Flores');

SELECT firstName, lastName, title, salary
FROM employee
INNER JOIN role ON employee.roleId = role.id;

SELECT title, salary, name
FROM role
INNER JOIN department ON role.deptId = department.id;

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;


