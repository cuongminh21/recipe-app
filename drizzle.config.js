import { ENV } from "./src/config/env.js";
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: "./src/db/schema.js",
    out: "./src/db/migrations",             
    dialect: "postgresql",
    dbCredentials: {
        url: ENV.DATABASE_URL,
    },
    breakpoints: true,
    verbose: true,
})