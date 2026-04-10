import type { Request, Response } from "express";
import { getDataSource } from "../database/data-source.connection.js";
import { Vehicle } from "../entities/vehicle.entity.js";

const repo = () => getDataSource().getRepository(Vehicle);

export async function getAll(_req: Request, res: Response): Promise<void> {
  const vehicles = await repo().find();
  res.json(vehicles);
}

export async function getById(req: Request, res: Response): Promise<void> {
  const vehicle = await repo().findOneBy({ id: Number(req.params["id"]) });
  if (!vehicle) {
    res.status(404).json({ message: "Veículo não encontrado" });
    return;
  }
  res.json(vehicle);
}

export async function create(req: Request, res: Response): Promise<void> {
  const { placa, chassi, renavam, modelo, marca, ano } = req.body as Vehicle;
  const currentYear = new Date().getFullYear();
  if (ano > currentYear) {
    res.status(400).json({ message: `O ano do veículo não pode ser maior que ${currentYear}` });
    return;
  }
  const vehicle = repo().create({ placa, chassi, renavam, modelo, marca, ano });
  const saved = await repo().save(vehicle);
  res.status(201).json(saved);
}

export async function update(req: Request, res: Response): Promise<void> {
  const vehicle = await repo().findOneBy({ id: Number(req.params["id"]) });
  if (!vehicle) {
    res.status(404).json({ message: "Veículo não encontrado" });
    return;
  }
  const { placa, chassi, renavam, modelo, marca, ano } = req.body as Vehicle;
  const currentYear = new Date().getFullYear();
  if (ano > currentYear) {
    res.status(400).json({ message: `O ano do veículo não pode ser maior que ${currentYear}` });
    return;
  }
  repo().merge(vehicle, { placa, chassi, renavam, modelo, marca, ano });
  const updated = await repo().save(vehicle);
  res.json(updated);
}

export async function remove(req: Request, res: Response): Promise<void> {
  const vehicle = await repo().findOneBy({ id: Number(req.params["id"]) });
  if (!vehicle) {
    res.status(404).json({ message: "Veículo não encontrado" });
    return;
  }
  await repo().remove(vehicle);
  res.status(204).send();
}
