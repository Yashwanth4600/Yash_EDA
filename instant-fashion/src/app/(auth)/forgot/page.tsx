"use client";

import { useState } from 'react';

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState('');
	return (
		<div className="mx-auto max-w-md px-4 py-16">
			<h1 className="mb-6 text-2xl font-semibold">Reset password</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					fetch('/api/auth/forgot', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ email })
					});
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
				<button className="w-full rounded-md bg-primary px-4 py-2 text-white">Send reset link</button>
			</form>
		</div>
	);
}