import { createNeonAuth } from '@neondatabase/auth/next/server';

if (!process.env.NEON_AUTH_BASE_URL || !process.env.NEON_AUTH_COOKIE_SECRET) {
  console.warn("WARNING: NEON_AUTH_BASE_URL and NEON_AUTH_COOKIE_SECRET are not set in the environment.");
}

export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL || "https://fallback.auth.neon.tech",
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET || "fallback_secret_for_build_time_validation",
  },
});
