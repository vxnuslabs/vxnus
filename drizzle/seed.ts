import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../src/db/schema";
import "dotenv/config";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function main() {
  console.log("Seeding database...");
  await db.insert(schema.studioProfile).values({
    name: "VXNUS",
    positioning: "Creative Technology Studio",
    introduction: "Trying the untried and finishing the unfinished. We explore the frontiers of technology, focusing on Artificial Intelligence, AI companions, and intelligent characters.",
    principles: [
      "Try the untried.",
      "Finish the unfinished.",
      "Breathe life into digital entities.",
      "Merge imagination with intelligent systems.",
      "Push the boundaries of AI interaction.",
    ],
    areasOfWork: [
      "Research",
      "AI Companions",
      "Intelligent Characters",
      "Interactive Systems",
      "Software/Tools",
      "Experiments",
    ],
  });
  console.log("Seeding complete.");
}

main().catch((err) => {
  console.error("Failed to seed database:", err);
  process.exit(1);
});
