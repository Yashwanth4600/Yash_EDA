import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
	const url = new URL(req.url);
	if (url.pathname.startsWith('/admin')) {
		// Let NextAuth handle auth; client-side will check role. Keep open for SSR APIs only.
	}
	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};