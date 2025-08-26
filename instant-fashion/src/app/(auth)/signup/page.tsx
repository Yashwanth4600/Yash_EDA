"use client";

import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignupPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	return (
		<div className="mx-auto max-w-md px-4 py-16">
			<h1 className="mb-6 text-2xl font-semibold">Create account</h1>
			<button
				onClick={() => signIn('google')}
				className="mb-4 w-full rounded-md border px-4 py-2"
			>
				Continue with Google
			</button>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					// Will submit to credentials signup API
					fetch('/api/auth/signup', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ name, email, password })
					}).then(() => signIn('credentials', { email, password, callbackUrl: '/' }));
				}}
				className="space-y-3"
			>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Full name"
					className="w-full rounded-md border px-4 py-2"
				/>
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
				<button className="w-full rounded-md bg-primary px-4 py-2 text-white">Sign up</button>
			</form>
			<div className="mt-4 text-sm">
				<Link href="/login" className="underline">
					Already have an account? Login
				</Link>
			</div>
		</div>
	);
}