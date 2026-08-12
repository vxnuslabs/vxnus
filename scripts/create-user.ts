async function main() {
  const email = process.argv[2];
  const password = process.argv[3];
  const name = process.argv[4] || "Admin";

  if (!email || !password) {
    console.error("Usage: npm run user:create <email> <password> [name]");
    process.exit(1);
  }

  const baseUrl = process.env.NEON_AUTH_BASE_URL;
  if (!baseUrl) {
    console.error("Error: NEON_AUTH_BASE_URL is not set in the environment. Make sure you pass --env-file=.env.local if running directly.");
    process.exit(1);
  }

  console.log(`Creating user ${email}...`);

  try {
    const res = await fetch(`${baseUrl}/sign-up/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": "http://localhost:3000",
      },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Error creating user:", data.message || data);
      process.exit(1);
    }

    console.log("User created successfully:", data.user);
  } catch (err) {
    console.error("Failed:", err);
    process.exit(1);
  }
}

main();
