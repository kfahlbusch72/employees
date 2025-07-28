import express from "express";
import morgan from "morgan";
import employeesRouter from "./api/employees.js";

const app = express();
export default app;

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

app.use("/employees", employeesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal server error");
});
