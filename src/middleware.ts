import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose"; // Use jose for JWT verification
import { LoginResponse } from "./interface";
interface JwtPayload {
  email: string;
  roleId: {
    id: number;
    name: string;
  };
  name: string;
  image?: string;
  id: number;
}
export async function middleware(req: NextRequest) {
  // Debug: Log environment variable

  // Get token from cookies, headers, or Authorization header
  const token =
    req.cookies.get("token")?.value ||
    req.headers.get("token") ||
    req.headers.get("Authorization")?.split(" ")[1];

  // Debug: Log the token received

  if (!token) {
    return NextResponse.json(
      { msg: "Unauthorized - No Token Provided" },
      { status: 401 }
    );
  }

  try {
    // Verify the token using jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const userPayload =  payload as unknown as JwtPayload;
    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/seller") && userPayload.roleId.name !== "ADMIN") {
      return NextResponse.redirect(new URL("/seller-only", req.url));
    }
    // Set user data in headers
    const res = NextResponse.next();
    res.headers.set("user-data", JSON.stringify(payload));

    return res;
  } catch (error) {
    console.error("Token Verification Error:", error);
    return NextResponse.json(
      { msg: "Invalid or Expired Token" },
      { status: 401 }
    );
  }
}

// Matcher for specific routes
export const config = {
  matcher: [
    "/api/about/seller/:path*",
    "/api/profile",
    "/api/address/:path*",
    "/api/seller/:path*",
    "/api/super/:path*",

    //frontend routes
     "/seller/:path*",
  ],
};
