import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../src/db/schema";
import "dotenv/config";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function main() {
  console.log("Seeding database...");
  await db.insert(schema.studioProfile).values({
    name: "Vxnus Studio",
    positioning: "Design and Engineering",
    introduction: "Welcome to Vxnus",
    principles: ["Simplicity", "Clarity"],
    areasOfWork: ["Web", "Systems"],
  });
  console.log("Seeding complete.");
}

main().catch((err) => {
  console.error("Failed to seed database:", err);
  process.exit(1);
});
