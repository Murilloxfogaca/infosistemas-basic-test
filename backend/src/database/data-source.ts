import "reflect-metadata";
import { DataSource } from "typeorm";
import { Vehicle } from "../entities/vehicle.entity.js";

export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: process.env["DB_DATABASE"] ?? "database.sqlite",
  synchronize: process.env["DB_SYNCHRONIZE"] !== "false",
  logging: process.env["DB_LOGGING"] === "true",
  entities: [Vehicle],
});
