import { NextResponse } from "next/server";

export function middleware(req) {
  const hostname = req.headers.get("host"); // e.g., school1.localhost:3000
  const url = req.nextUrl.clone();

  const subdomain = hostname.split(".")[0]; // Extract "school1"

  // Add the subdomain info to request headers or cookies
  url.searchParams.set("school", subdomain);

  return NextResponse.rewrite(url);
}
