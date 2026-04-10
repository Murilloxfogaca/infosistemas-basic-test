import "reflect-metadata";
import assert from "node:assert/strict";
import { before, after, beforeEach, describe, it } from "mocha";
import request from "supertest";
import { TestDataSource } from "../database/data-source-test.js";
import { setDataSource } from "../database/data-source.connection.js";
import { Vehicle } from "../entities/vehicle.entity.js";
import app from "../app.js";

before(async () => {
  await TestDataSource.initialize();
  setDataSource(TestDataSource);
});

after(async () => {
  await TestDataSource.destroy();
});

beforeEach(async () => {
  await TestDataSource.getRepository(Vehicle).clear();
});

const base = "/vehicles";

const payload = {
  placa: "ABC-1234",
  chassi: "9BWZZZ377VT004251",
  renavam: "12345678901",
  modelo: "Civic",
  marca: "Honda",
  ano: 2022,
};

describe("POST /vehicles - create", () => {
  it("cria um veículo e retorna 201 com os dados", async () => {
    const res = await request(app).post(base).send(payload);
    assert.equal(res.status, 201);
    assert.equal(res.body.placa, payload.placa);
    assert.equal(res.body.chassi, payload.chassi);
    assert.equal(res.body.renavam, payload.renavam);
    assert.equal(res.body.modelo, payload.modelo);
    assert.equal(res.body.marca, payload.marca);
    assert.equal(res.body.ano, payload.ano);
    assert.ok(res.body.id);
  });
});

describe("GET /vehicles - read", () => {
  it("retorna lista com todos os veículos", async () => {
    await request(app).post(base).send(payload);
    const res = await request(app).get(base);
    assert.equal(res.status, 200);
    assert.equal(res.body.length, 1);
    assert.equal(res.body[0].placa, payload.placa);
  });

  it("retorna um veículo pelo id", async () => {
    const created = await request(app).post(base).send(payload);
    const id: number = created.body.id as number;
    const res = await request(app).get(`${base}/${id}`);
    assert.equal(res.status, 200);
    assert.equal(res.body.id, id);
    assert.equal(res.body.placa, payload.placa);
  });

  it("retorna 404 para id inexistente", async () => {
    const res = await request(app).get(`${base}/9999`);
    assert.equal(res.status, 404);
  });
});

describe("PUT /vehicles/:id - update", () => {
  it("atualiza os dados do veículo", async () => {
    const created = await request(app).post(base).send(payload);
    const id: number = created.body.id as number;
    const res = await request(app)
      .put(`${base}/${id}`)
      .send({ ...payload, modelo: "Corolla", marca: "Toyota", ano: 2023 });
    assert.equal(res.status, 200);
    assert.equal(res.body.modelo, "Corolla");
    assert.equal(res.body.marca, "Toyota");
    assert.equal(res.body.ano, 2023);
  });

  it("retorna 404 ao atualizar id inexistente", async () => {
    const res = await request(app).put(`${base}/9999`).send(payload);
    assert.equal(res.status, 404);
  });
});

describe("DELETE /vehicles/:id - delete", () => {
  it("remove o veículo e retorna 204", async () => {
    const created = await request(app).post(base).send(payload);
    const id: number = created.body.id as number;
    const del = await request(app).delete(`${base}/${id}`);
    assert.equal(del.status, 204);
    const get = await request(app).get(`${base}/${id}`);
    assert.equal(get.status, 404);
  });

  it("retorna 404 ao remover id inexistente", async () => {
    const res = await request(app).delete(`${base}/9999`);
    assert.equal(res.status, 404);
  });
});
