"use client";

import useSWR from 'swr';
import { MapWidget } from '../../../components/map/MapWidget';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function OrdersPage() {
	const { data } = useSWR('/api/orders', fetcher);
	return (
		<div className="mx-auto max-w-4xl px-4 py-12">
			<h1 className="text-2xl font-semibold">Your Orders</h1>
			<p className="mt-2 text-muted-foreground">Track your past and active orders.</p>
			<div className="mt-4">
				<MapWidget />
			</div>
			<div className="mt-6 space-y-3">
				{data?.orders?.map((o: any) => (
					<div key={o.id} className="rounded-md border p-3 text-sm">
						<div className="flex items-center justify-between">
							<div>Order #{o.id.slice(0, 6)}</div>
							<div className="text-xs">{o.status}</div>
						</div>
						<div className="text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleString()}</div>
					</div>
				))}
			</div>
		</div>
	);
}