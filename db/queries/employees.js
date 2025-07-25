import db from "../client.js";

/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  // TODO
  const result = await db.query(
    `insert into employees (name, birthday, salary)
  values ($1, $2, $3)
  returning *`,
    [name, birthday, salary]
  );
  return result.rows[0];
}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  // TODO
  const result = await db.query(`select * from employees order by id`);
  return result.rows;
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  // TODO
  const result = await db.query(`select * from employees where id = $1`, [id]);
  return result.rows[0];
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  // TODO
  const result = await db.query(
    `update employees
    set name = $2, birthday = $3, salary = $4
    where id = $1
    returning *`,
    [id, name, birthday, salary]
  );
  return result.rows[0];
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  // TODO
  const result = await db.query(
    `delete from employees
    where id = $1
    returning *`,
    [id]
  );
  return result.rows[0];
}
