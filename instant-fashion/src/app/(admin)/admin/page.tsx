"use client";

import useSWR, { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AdminPage() {
	const { data } = useSWR('/api/admin', fetcher);
	const updateStatus = async (orderId: string, status: string) => {
		await fetch('/api/admin', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ orderId, status }) });
		mutate('/api/admin');
	};
	return (
		<div className="mx-auto max-w-5xl px-4 py-12">
			<h1 className="text-2xl font-semibold">Admin Dashboard</h1>
			<div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
				<div className="rounded-md border p-4">
					<h2 className="mb-3 text-lg font-medium">Users</h2>
					<div className="space-y-2 text-sm">
						{data?.users?.map((u: any) => (
							<div key={u.id} className="flex items-center justify-between">
								<div>
									<div className="font-medium">{u.email}</div>
									<div className="text-xs text-muted-foreground">{u.name || '—'} · {u.role}</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="rounded-md border p-4">
					<h2 className="mb-3 text-lg font-medium">Orders</h2>
					<div className="space-y-2 text-sm">
						{data?.orders?.map((o: any) => (
							<div key={o.id} className="rounded-md border p-2">
								<div className="flex items-center justify-between">
									<div>#{o.id.slice(0, 6)} · {o.user?.email}</div>
									<select className="rounded border p-1 text-xs" value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)}>
										<option value="PENDING">Pending</option>
										<option value="OUT_FOR_DELIVERY">Out for Delivery</option>
										<option value="COMPLETED">Completed</option>
										<option value="CANCELLED">Cancelled</option>
									</select>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}