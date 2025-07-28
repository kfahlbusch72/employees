import express from "express";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../db/queries/employees.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.json(employees);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
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

router.get("/:id", async (req, res, next) => {
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

router.put("/:id", async (req, res, next) => {
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

router.delete("/:id", async (req, res, next) => {
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

export default router;
