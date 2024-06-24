import "dotenv/config";
import ENVS from "./src/config/envs/envs";

export default {
  schema: "src/infraestructure/db/schemas/index.ts",
  out: "src/infraestructure/db/migrations",
  driver: "pg",
  dbCredentials: {
    host: ENVS.POSTGRES_PORT,
    user: ENVS.POSTGRES_USER,
    password: ENVS.POSTGRES_PASSWORD,
    database: ENVS.POSTGRES_DB,
  },
};
