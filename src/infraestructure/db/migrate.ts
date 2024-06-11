import ENVS from "../../config/envs/envs";
import { Pool } from "pg";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schemas/index";

const pool = new Pool({
  connectionString: ENVS.POSTGRESQL_URL,
});

const db = drizzle(pool, { schema });

async function main() {
  try {
    console.log("Migrations started ⚠️");
    await migrate(db, {
      migrationsFolder: "src/infraestructure/db/migrations",
      migrationsTable: "migrations",
    });

    console.log("Migrations ended correctly ✅");
    process.exit();
  } catch (error) {
    console.log("Error in migrations 🚫:", error);
  }
}

main();
