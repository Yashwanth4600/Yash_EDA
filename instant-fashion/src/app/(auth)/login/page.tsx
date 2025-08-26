"use client";

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	return (
		<div className="mx-auto max-w-md px-4 py-16">
			<h1 className="mb-6 text-2xl font-semibold">Login</h1>
			<button
				onClick={() => signIn('google')}
				className="mb-4 w-full rounded-md border px-4 py-2"
			>
				Continue with Google
			</button>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					signIn('credentials', { email, password, callbackUrl: '/' });
				}}
				className="space-y-3"
			>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					className="w-full rounded-md border px-4 py-2"
				/>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					className="w-full rounded-md border px-4 py-2"
				/>
				<button className="w-full rounded-md bg-primary px-4 py-2 text-white">Login</button>
			</form>
			<div className="mt-4 text-sm">
				<Link href="/signup" className="underline">
					Create an account
				</Link>
				<span className="mx-2">·</span>
				<Link href="/forgot" className="underline">
					Forgot password
				</Link>
			</div>
		</div>
	);
}