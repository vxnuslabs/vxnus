import { createAuthClient } from "@neondatabase/auth/next";
import 'dotenv/config';

const client = createAuthClient({
  baseURL: process.env.NEON_AUTH_BASE_URL
});

async function main() {
  const { data, error } = await client.signUp.email({
    email: "test2@example.com",
    password: "password123",
    name: "Test"
  });
  console.log({ data, error });
}
main();
