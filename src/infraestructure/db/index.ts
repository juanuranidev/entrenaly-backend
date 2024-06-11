import ENVS from "../../config/envs/envs";
import * as schema from "./schemas/index";
import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const client = new Client({
  connectionString: ENVS.POSTGRESQL_URL,
});

client.connect();

export const db = drizzle(client, { schema });
