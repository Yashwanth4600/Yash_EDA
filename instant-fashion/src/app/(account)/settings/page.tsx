"use client";

import { useState } from 'react';

export default function SettingsPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [dark, setDark] = useState(false);
	const [notif, setNotif] = useState(true);
	return (
		<div className="mx-auto max-w-3xl px-4 py-12">
			<h1 className="text-2xl font-semibold">Settings</h1>
			<div className="mt-6 grid gap-6 md:grid-cols-2">
				<div className="rounded-md border p-4">
					<h2 className="mb-3 text-lg font-medium">Profile</h2>
					<div className="space-y-2 text-sm">
						<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full rounded-md border px-3 py-2" />
						<input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-md border px-3 py-2" />
						<input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full rounded-md border px-3 py-2" />
						<button className="w-full rounded-md bg-primary px-3 py-2 text-white">Save</button>
					</div>
				</div>
				<div className="rounded-md border p-4">
					<h2 className="mb-3 text-lg font-medium">Preferences</h2>
					<div className="space-y-3 text-sm">
						<label className="flex items-center gap-2"><input type="checkbox" checked={dark} onChange={(e) => setDark(e.target.checked)} />Dark mode</label>
						<label className="flex items-center gap-2"><input type="checkbox" checked={notif} onChange={(e) => setNotif(e.target.checked)} />Notifications</label>
					</div>
				</div>
			</div>
		</div>
	);
}