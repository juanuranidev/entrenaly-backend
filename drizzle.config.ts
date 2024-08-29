import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import ENVS from "./src/config/envs/envs";

export default defineConfig({
  schema: "./src/infraestructure/db/schemas/index.ts",
  out: "./src/infraestructure/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: ENVS.POSTGRES_PORT,
    user: ENVS.POSTGRES_USER,
    password: ENVS.POSTGRES_PASSWORD,
    database: ENVS.POSTGRES_DB,
  },
});
