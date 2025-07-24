DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
   name text not null,
   birthday date not null,
   salary integer not null
);
