import 'dotenv/config';

async function main() {
  const url = process.env.NEON_AUTH_BASE_URL + "/sign-up/email";
  console.log("Fetching", url);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Origin": "http://localhost:3000"
    },
    body: JSON.stringify({
      email: "direct@example.com",
      password: "password123",
      name: "Direct"
    })
  });
  const data = await res.json();
  console.log(res.status, data);
}
main();
