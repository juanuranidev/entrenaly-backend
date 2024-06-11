import "dotenv/config";
import { get } from "env-var";

const ENVS = {
  PORT: get("PORT").required().asPortNumber(),
  NODE_ENV: get("NODE_ENV").required().asString(),
  POSTGRESQL_USER: get("POSTGRE_USER").required().asString(),
  POSTGRESQL_DB: get("POSTGRESQL_DB").required().asString(),
  POSTGRESQL_HOST: get("POSTGRESQL_HOST").required().asString(),
  POSTGRESQL_PASSWORD: get("POSTGRESQL_PASSWORD").required().asString(),
  POSTGRESQL_URL: get("POSTGRESQL_URL").required().asString(),
};

export default ENVS;
