import { Router } from "express";
import * as VehicleController from "../controllers/vehicle.controller.js";

const router = Router();

router.get("/", VehicleController.getAll);
router.get("/:id", VehicleController.getById);
router.post("/", VehicleController.create);
router.put("/:id", VehicleController.update);
router.delete("/:id", VehicleController.remove);

export default router;
