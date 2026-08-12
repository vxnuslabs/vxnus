import { createAuthClient } from "@neondatabase/auth/next";
const client = createAuthClient();
console.log(Object.keys(client.signIn));
