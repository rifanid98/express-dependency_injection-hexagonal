// Update with your config settings.
import * as path from "path";
import * as dotenv from "dotenv";

require("ts-node/register");

dotenv.config();

const configs = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME_DEVELOPMENT,
      user: process.env.DATABASE_USER_DEVELOPMENT,
      password: process.env.DATABASE_PASSWORD_DEVELOPMENT,
    },
    pool: {
      min: Number(process.env.DATABASE_POOL_MIN),
      max: Number(process.env.DATABASE_POOL_MAX),
    },
    migrations: {
      tableName: process.env.DATABASE_MIGRATION_TABLE,
      directory: path.join(
        __dirname,
        "./src/infrastructure/persistence/postgresql/knex/migrations"
      ),
    },
    seeders: {
      directory: path.join(__dirname, "./seeds"),
    },
  },

  staging: {},

  production: {},
};

const environment = process.env.ENVIRONMENT || "development";
const config = configs[environment];
export default config;
