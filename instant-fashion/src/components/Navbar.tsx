"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
	const [coords, setCoords] = useState<string>("");
	useEffect(() => {
		if (typeof window !== 'undefined' && navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((pos) => {
				setCoords(`${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)}`);
			});
		}
	}, []);
	return (
		<header className="border-b border-gray-200 dark:border-gray-800">
			<div className="container-page h-16 flex items-center justify-between">
				<Link href="/" className="font-extrabold text-xl">IF</Link>
				<div className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">{coords || 'Locating...'}</div>
				<nav className="flex items-center gap-4">
					<Link href="/login" className="hover:underline">Login</Link>
					<Link href="/settings" className="hover:underline">Settings</Link>
				</nav>
			</div>
		</header>
	);
}