import "reflect-metadata";
import { DataSource } from "typeorm";
import { Vehicle } from "../entities/vehicle.entity.js";

export const TestDataSource = new DataSource({
  type: "better-sqlite3",
  database: ":memory:",
  synchronize: true,
  logging: false,
  entities: [Vehicle],
});
