import db from "#db/client";
import { createEmployee } from "./queries/employees.js";
import dotenv from "dotenv";
dotenv.config();
await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  const employees = [
    { name: "Alice Johnson", birthday: "1987-04-12", salary: 70000 },
    { name: "Bob Smith", birthday: "1990-08-23", salary: 65000 },
    { name: "Carol Taylor", birthday: "1985-12-05", salary: 72000 },
    { name: "David Brown", birthday: "1979-11-11", salary: 68000 },
    { name: "Eva Green", birthday: "1992-01-29", salary: 71000 },
    { name: "Frank White", birthday: "1983-07-19", salary: 69000 },
    { name: "Grace Lee", birthday: "1995-05-03", salary: 66000 },
    { name: "Henry King", birthday: "1980-09-22", salary: 73000 },
    { name: "Ivy Clark", birthday: "1988-10-30", salary: 70000 },
    { name: "Jake Walker", birthday: "1991-06-17", salary: 67000 },
  ];

  for (const employee of employees) {
    await createEmployee(employee);
  }

  console.log("✅ Employees seeded successfully.");
}
