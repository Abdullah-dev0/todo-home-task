import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = ["/signin", "/signup"];

export async function middleware(request: NextRequest) {
	const cookieStore = await cookies();
	const authToken = cookieStore.get("auth_token");
	const { pathname } = request.nextUrl;

	console.log(authToken, pathname);

	if (authToken && authRoutes.includes(pathname)) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	if (!authToken && pathname.startsWith("/dashboard")) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/login", "/signup", "/dashboard/:path*"],
};
