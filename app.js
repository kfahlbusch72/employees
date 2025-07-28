import express from "express";
import morgan from "morgan";

import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "./db/queries/employees.js";

const app = express();
export default app;

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

app.get("/employees", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.json(employees);
  } catch (err) {
    next(err);
  }
});

app.post("/employees", async (req, res, next) => {
  try {
    if (!req.body) return res.status(400).send("Missing request body");

    const { name, birthday, salary } = req.body;
    if (!name || !birthday || salary === undefined) {
      return res.status(400).send("Missing required field");
    }

    const employee = await createEmployee({ name, birthday, salary });
    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
});

app.get("/employees/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).send("Invalid ID");
    }

    const employee = await getEmployee(id);
    if (!employee) return res.status(404).send("Employee not found");

    res.json(employee);
  } catch (err) {
    next(err);
  }
});

app.delete("/employees/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).send("Invalid ID");
    }

    const deleted = await deleteEmployee(id);
    if (!deleted) return res.status(404).send("Employee not found");

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

app.put("/employees/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).send("Invalid ID");
    }

    if (!req.body) return res.status(400).send("Missing request body");

    const { name, birthday, salary } = req.body;
    if (!name || !birthday || salary === undefined) {
      return res.status(400).send("Missing required field");
    }

    const updated = await updateEmployee({ id, name, birthday, salary });
    if (!updated) return res.status(404).send("Employee not found");

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal server error");
});
