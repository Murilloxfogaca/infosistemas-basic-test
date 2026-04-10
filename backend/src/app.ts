import express from "express";
import cors from "cors";
import vehicleRoutes from "./routes/vehicle.routes.js";

const app = express();

app.use(cors({
  origin: process.env["CORS_ORIGIN"] ?? "http://localhost:4200",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.options("/{*path}", cors());
app.use(express.json());
app.use("/vehicles", vehicleRoutes);

export default app;
