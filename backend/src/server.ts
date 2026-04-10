import "reflect-metadata";
import { config } from "dotenv";
config();

import { AppDataSource } from "./database/data-source.js";
import { setDataSource } from "./database/data-source.connection.js";
import app from "./app.js";

const PORT = Number(process.env["PORT"] ?? 3000);

AppDataSource.initialize()
  .then(() => {
    setDataSource(AppDataSource);
    console.log("Banco de dados conectado.");
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err: unknown) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });
