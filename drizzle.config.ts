import "dotenv/config";
import ENVS from "./src/config/envs/envs";

export default {
  schema: "src/infraestructure/db/schemas/index.ts",
  out: "src/infraestructure/db/migrations",
  driver: "pg",
  dbCredentials: {
    host: ENVS.POSTGRESQL_HOST,
    user: ENVS.POSTGRESQL_USER,
    password: ENVS.POSTGRESQL_PASSWORD,
    database: ENVS.POSTGRESQL_DB,
  },
};
