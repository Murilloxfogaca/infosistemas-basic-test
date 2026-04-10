<<<<<<< HEAD
# Web

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
=======
# info-tec

Aplicação de cadastro de veículos com Angular (frontend) e Express + SQLite (backend).

## Pré-requisitos

- [Node.js](https://nodejs.org) v18+
- npm

## Configuração

### Backend

```bash
cd backend
cp .env.example .env
npm install
```

### Frontend

```bash
cd web
npm install
```

## Rodando em desenvolvimento

Abra dois terminais:

**Terminal 1 — backend** (porta 3000)
```bash
cd backend
npm run dev
```

**Terminal 2 — frontend** (porta 4200)
```bash
cd web
npm start
```

Acesse: [http://localhost:4200](http://localhost:4200)

## Estrutura

```
info-tec/
├── backend/                  # API REST (Express + TypeORM + SQLite)
│   ├── src/
│   │   ├── controllers/      # vehicle.controller.ts
│   │   ├── entities/         # vehicle.entity.ts
│   │   ├── routes/           # vehicle.routes.ts
│   │   ├── database/         # data-source.ts, data-source.connection.ts
│   │   └── test/             # vehicle.test.ts
│   ├── .env                  # variáveis de ambiente (não versionado)
│   └── .env.example          # modelo de variáveis de ambiente
│
└── web/                      # SPA Angular
    └── src/app/
        ├── core/services/    # vehicle.service.ts
        └── features/
            └── vehicles/
                ├── vehicle-list/   # listagem com ações
                ├── vehicle-form/   # formulário criar/editar
                └── vehicle.model.ts
```

## Variáveis de ambiente (backend)

| Variável        | Padrão                  | Descrição                    |
|-----------------|-------------------------|------------------------------|
| `PORT`          | `3000`                  | Porta do servidor            |
| `DB_DATABASE`   | `database.sqlite`       | Caminho do arquivo SQLite    |
| `DB_SYNCHRONIZE`| `true`                  | Sincroniza schema ao iniciar |
| `DB_LOGGING`    | `false`                 | Ativa logs SQL               |
| `CORS_ORIGIN`   | `http://localhost:4200` | Origem permitida pelo CORS   |

## Testes

```bash
cd backend
npm test
```
# infosistemas-basic-test
# infosistemas-basic-test
>>>>>>> 1e89867 (first commit)
# infosistemas-basic-test
