# SQL

## CREATING A DATABASE

```sql
CREATE DATABASE database_name;
```

## DELETING A DATABASE

```sql
DROP DATABASE database_name;
```

## Making a Database readonly

```sql
ALTER DATABASE database_name READ_ONLY = 1;
```

## Creating a table

```sql
create table employess (
    employee_id int,
    first_name varchar(50),
    last_name varchar(50),
    hourly_pay decimal(5,2),
    hire_date date
);
```

## Selecting all columns from a table

```sql
select * from employees;
```

## Changing table name

```sql
RENAME TABLE 'employees' TO 'staff';
```

## Deleting a Table

```sql
    DROP TABLE staff;
```

## Adding a column to a table

```sql
ALTER TABLE employees ADD middle_name varchar(50);
```

## renaming a table

```sql
    ALTER TABLE employees RENAME COLUMN middle_name TO middle_initial;
```

## modifying a column

```sql
    ALTER TABLE employees MODIFY COLUMN middle_initial varchar(1);
```

## changing order of column

```sql
        ALTER TABLE employees MODIFY COLUMN middle_initial varchar(1) AFTER first_name;
```

## deleting a column

```sql
    ALTER TABLE employees DROP COLUMN middle_initial;
```

## Inserting data

```sql
        INSERT INTO employees (employee_id, first_name, last_name, hourly_pay, hire_date)
        VALUES (1, 'John', 'Smith', 15.00, '2018-01-01');
```

### Inserting into specific columns of a table not all

```sql
    INSERT INTO employees (employee_id, first_name, last_name)
    VALUES (2, 'Jane', 'Doe');
```

## Selecting specific data instead of all

```sql
    SELECT first_name, last_name FROM employees;
```

## Selecting data with a where clause

```sql
    SELECT first_name, last_name FROM employees WHERE employee_id = 1;
```

### where clause which arithmetic operators

```sql
        SELECT first_name, last_name FROM employees WHERE hourly_pay > 15;
```

### Not equal operator (!=)

```sql
    SELECT first_name, last_name FROM employees WHERE hourly_pay != 15;
```

## IS Clause

```sql
        SELECT first_name, last_name FROM employees WHERE hourly_pay IS NULL;
```

```sql
        SELECT first_name, last_name FROM employees WHERE hourly_pay IS NOT NULL;
```

## Deleting data

```sql
        DELETE FROM employees WHERE employee_id = 1;
```

## AUTOCOMMIT

```sql
    SET AUTOCOMMIT = 0;
```

## COMMIT

```sql
    COMMIT;
```

## ROLLBACK

```sql
    ROLLBACK;
```

how does all of it works?

```sql
    SET AUTOCOMMIT = OFF;
    INSERT INTO employees (employee_id, first_name, last_name, hourly_pay, hire_date)
    VALUES (1, 'John', 'Smith', 15.00, '2018-01-01');
    ROLLBACK;
```

## UNIQUE constraint

```sql
    CREATE TABLE employees (
        employee_id int,
        first_name varchar(50),
        last_name varchar(50),
        hourly_pay decimal(5,2),
        hire_date date,
        UNIQUE (employee_id)
    );
```

### adding unique after table is created

```sql
    ALTER TABLE employees
    ADD CONSTRAINT 
    UNIQUE (employee_id);
```

### modifying table type

```sql
    ALTER TABLE employees
    MODIFY COLUMN employee_id int UNIQUE;
```

## Check constraint

```sql
    CREATE TABLE employees (
        employee_id int,
        first_name varchar(50),
        last_name varchar(50),
        hourly_pay decimal(5,2),
        hire_date date,
        CONSTRAINT hourly_pay_check CHECK (hourly_pay > 0)
    );
```

### adding check constraint after table is created

```sql
    ALTER TABLE employees
    ADD CONSTRAINT hourly_pay_check CHECK (hourly_pay > 0);
```

### dropping a constraint

```sql
    ALTER TABLE employees
    DROP CONSTRAINT hourly_pay_check;
```

## DEFAULT constraint

```sql
    CREATE TABLE employees (
        employee_id int,
        first_name varchar(50),
        last_name varchar(50),
        hourly_pay decimal(5,2) DEFAULT 15.00,
        hire_date date
    );
```

## Primary Key Constraint

```sql
    CREATE TABLE employees (
        employee_id int PRIMARY KEY,
        first_name varchar(50),
        last_name varchar(50),
        hourly_pay decimal(5,2),
        hire_date date
    );
```

### adding primary key after table is created

```sql
    ALTER TABLE employees
    ADD PRIMARY KEY (employee_id);
```

```sql
    ALTER TABLE employees
    ADD CONSTRAINT employee_pk PRIMARY KEY (employee_id);
```

## AUTO INCREMENT

```sql
    CREATE TABLE employees (
        employee_id int PRIMARY KEY AUTO_INCREMENT,
        first_name varchar(50),
        last_name varchar(50),
        hourly_pay decimal(5,2),
        hire_date date
    );
```

## FOREIGN KEYS

```sql
    CREATE TABLE employees (
            employee_id int PRIMARY KEY AUTO_INCREMENT,
            first_name varchar(50),
            last_name varchar(50),
            hourly_pay decimal(5,2),
            hire_date date,
            department_id int,
            CONSTRAINT employee_department_fk FOREIGN KEY (department_id) REFERENCES departments (department_id)
    );
```

### dropping a foreign key
  
```sql
    ALTER TABLE employees
    DROP FOREIGN KEY employee_department_fk;
```

## JOINS

### INNER JOIN

explain inner join?
Inner join is used to combine data from two or more tables based on a common field between them. It is used to combine rows from two or more tables in a single result set based on a common column between them.

```sql
select transaction_id, amount, first_name, last_name
from transactions inner join customers
on transactions.customer_id = customers.customer_id;
```

### LEFT JOIN

explain left join?
The LEFT JOIN keyword returns all records from the left table (table1), and the matched records from the right table (table2). The result is NULL from the right side, if there is no match.

```sql
select transaction_id, amount, first_name, last_name
from transactions left join customers
on transactions.customer_id = customers.customer_id;
```

### RIGHT JOIN

explain right join?
The RIGHT JOIN keyword returns all records from the right table (table2), and the matched records from the left table (table1). The result is NULL from the left side, when there is no match.

```sql
select transaction_id, amount, first_name, last_name
from transactions right join customers
on transactions.customer_id = customers.customer_id;
```

## Functions

### COUNT

```sql
    SELECT COUNT(*) FROM employees;
```

### SUM

```sql
    SELECT SUM(hourly_pay) FROM employees;
```

### AVERAGE

```sql
    SELECT AVG(hourly_pay) FROM employees;
```

### MINIMUM

```sql
    SELECT MIN(hourly_pay) FROM employees;
```

### MAXIMUM

```sql
    SELECT MAX(hourly_pay) FROM employees;
```

### CONCAT

```sql
    SELECT CONCAT(first_name, ' ', last_name) FROM employees;
```

## LOGICAL OPERATORS

### AND

```sql
    SELECT first_name, last_name FROM employees WHERE hourly_pay > 15 AND hourly_pay < 20;
```

### OR

```sql
    SELECT first_name, last_name FROM employees WHERE hourly_pay < 15 OR hourly_pay > 20;
```

### NOT

```sql
    SELECT first_name, last_name FROM employees WHERE NOT hourly_pay > 15;
```

### BETWEEN

```sql
    SELECT first_name, last_name FROM employees WHERE hourly_pay BETWEEN 15 AND 20;
```

### IN

```sql
    SELECT first_name, last_name FROM employees WHERE hourly_pay IN (15, 20);
```

## WILDCARDS CHARACTERS

### %

```sql
    SELECT first_name, last_name FROM employees WHERE first_name LIKE 'J%';
```

### _

```sql
    SELECT first_name, last_name FROM employees WHERE first_name LIKE 'J_n';
```

## ORDER BY CLAUSE

```sql
    SELECT first_name, last_name FROM employees ORDER BY first_name DESC;
```

## LIMIT CLAUSE

```sql
    SELECT first_name, last_name FROM employees LIMIT 5;
```

### offset

```sql
    SELECT first_name, last_name FROM employees LIMIT 5,5;
```

## UNION CLAUSE

```sql
    SELECT first_name, last_name FROM employees
    UNION
    SELECT first_name, last_name FROM customers;
```

### UNION ALL

```sql
        SELECT first_name, last_name FROM employees
        UNION ALL
        SELECT first_name, last_name FROM customers;
```

## SELF JOINS

explain self join like a five year old?
A self join is a join in which a table is joined with itself (which is also called Unary relationships), especially when the table has a FOREIGN KEY which references its own PRIMARY KEY.

```sql
    SELECT e1.first_name, e1.last_name, e2.first_name, e2.last_name
    FROM employees AS e1 INNER JOIN employees AS e2
    ON e1.employee_id = e2.employee_id;
```

## VIEWS

What is a view?
A view is a virtual table based on the result-set of an SQL statement.

```sql
        CREATE VIEW employee_names AS
        SELECT first_name, last_name FROM employees;
```

## INDEXES

what is a index? Indexes are used to find values within a specific column more quickly. Without an index, MySQL must begin with the first row and then read through the entire table to find the relevant rows. Update takes more time, select takes less time.

```sql
        CREATE INDEX employee_id_index ON employees (employee_id);
```

### multicolumn index

```sql
        CREATE INDEX employee_name_index ON employees (first_name, last_name);
```

## SUBQUERIES

```sql
    SELECT first_name, last_name FROM employees 
    WHERE employee_id IN (SELECT employee_id FROM transactions);
```

## GROUP BY

explain group by?
The GROUP BY statement is often used with aggregate functions (COUNT, MAX, MIN, SUM, AVG) to group the result-set by one or more columns.

```sql
    SELECT employee_id, SUM(amount) FROM transactions GROUP BY employee_id;
```

### HAVING

```sql
    SELECT employee_id, SUM(amount) FROM transactions GROUP BY employee_id HAVING SUM(amount) > 1000;
```

## ROLLUP CLAUSE

```sql
    SELECT employee_id, SUM(amount) FROM transactions GROUP BY employee_id WITH ROLLUP;
```

## ON DELETE

### SET NULL

```sql
    CREATE TABLE employees (
        employee_id int PRIMARY KEY AUTO_INCREMENT,
        first_name varchar(50),
        last_name varchar(50),
        hourly_pay decimal(5,2),
        hire_date date,
        department_id int,
        CONSTRAINT employee_department_fk FOREIGN KEY (department_id) REFERENCES departments (department_id) ON DELETE SET NULL
    );
```

### CASCADE

```sql
    CREATE TABLE employees (
        employee_id int PRIMARY KEY AUTO_INCREMENT,
        first_name varchar(50),
        last_name varchar(50),
        hourly_pay decimal(5,2),
        hire_date date,
        department_id int,
        CONSTRAINT employee_department_fk FOREIGN KEY (department_id) REFERENCES departments (department_id) ON DELETE CASCADE
    );
```

### modifying a foreign to add on delete set null

```sql
    ALTER TABLE employees
    DROP FOREIGN KEY employee_department_fk;
    ALTER TABLE employees
    ADD CONSTRAINT employee_department_fk FOREIGN KEY (department_id) REFERENCES departments (department_id) ON DELETE SET NULL;
```

## STORED PROCEDURES

```sql
    DELIMITER //
    CREATE PROCEDURE get_employee_count()
    BEGIN
        SELECT COUNT(*) FROM employees;
    END //
    DELIMITER ;
```

// why do we change the delimiter?
The DELIMITER statement changes the standard delimiter which is semicolon (;) to something else. This allows you to write stored procedures and stored functions that have a semicolon in the body without causing a syntax error.

### With parameters

```sql
    DELIMITER //
    CREATE PROCEDURE get_employee_count_by_department(IN d_id INT)
    BEGIN
        SELECT COUNT(*) FROM employees WHERE department_id = d_id;
    END //
    DELIMITER ;
```

## TRIGGERS

```sql
    DELIMITER //
    CREATE TRIGGER employee_insert
    AFTER INSERT ON employees
    FOR EACH ROW
    BEGIN
        INSERT INTO employees_audit
        SET action = 'insert',
        employee_id = NEW.employee_id,
        first_name = NEW.first_name,
        last_name = NEW.last_name,
        modified_date = NOW();
    END //
    DELIMITER ;
```

```sql
update employees
set salary = hourly_pay * 2080;
```
