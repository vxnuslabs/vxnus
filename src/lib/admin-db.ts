import { createDb, type Database } from "@/db";

export function getAdminDatabase(): Database {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set in this environment.");
  }

  return createDb(connectionString);
}
