"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

export function Navbar() {
	const { data: session } = useSession();
	const [coords, setCoords] = useState<string>('');
	useEffect(() => {
		if (typeof navigator !== 'undefined' && navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((pos) => {
				setCoords(`${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)}`);
			});
		}
	}, []);
	return (
		<header className="sticky top-0 z-40 w-full border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
				<Link href="/" className="font-bold">
					Instant Fashion
				</Link>
				<div className="text-xs text-muted-foreground">{coords || 'Locating…'}</div>
				<div className="flex items-center gap-2">
					<Link href="/orders" className="rounded-md border px-3 py-1.5 text-sm">
						Orders
					</Link>
					{session ? (
						<>
							<Link href="/settings" className="rounded-md border px-3 py-1.5 text-sm">
								Settings
							</Link>
							<button onClick={() => signOut()} className="rounded-md bg-foreground px-3 py-1.5 text-sm text-background">
								Logout
							</button>
						</>
					) : (
						<button onClick={() => signIn()} className="rounded-md bg-primary px-3 py-1.5 text-sm text-white">
							Login
						</button>
					)}
				</div>
			</div>
		</header>
	);
}