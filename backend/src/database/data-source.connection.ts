import type { DataSource } from "typeorm";

let _dataSource: DataSource;

export function setDataSource(ds: DataSource): void {
  _dataSource = ds;
}

export function getDataSource(): DataSource {
  if (!_dataSource) throw new Error("DataSource não inicializado.");
  return _dataSource;
}
