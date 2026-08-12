import { auth } from "@/lib/auth";
import type { NextRequest } from "next/server";

const neonMiddleware = auth.middleware({ loginUrl: "/admin/login" });

export async function proxy(request: NextRequest) {
  if (request.method === "POST" && request.headers.has("next-action")) {
    return;
  }
  return neonMiddleware(request);
}

export const config = {
  matcher: ["/admin/:path*"],
};
