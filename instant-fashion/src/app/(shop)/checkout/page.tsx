"use client";

import { useCart } from '../../../store/cart';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
	const { items, clear } = useCart();
	const router = useRouter();
	const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
	useEffect(() => {
		navigator.geolocation?.getCurrentPosition((p) => setCoords({ lat: p.coords.latitude, lng: p.coords.longitude }));
	}, []);
	const placeOrder = async () => {
		if (items.length === 0) return;
		const res = await fetch('/api/orders', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
				lat: coords?.lat,
				lng: coords?.lng
			})
		});
		const { order } = await res.json();
		await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ orderId: order.id }) });
		clear();
		router.push('/orders');
	};
	return (
		<div className="mx-auto max-w-3xl px-4 py-8">
			<h1 className="mb-4 text-2xl font-semibold">Checkout</h1>
			<div className="rounded-md border p-4 text-sm">
				<div className="mb-2 font-medium">Delivery</div>
				<div className="text-muted-foreground">Using your live location: {coords ? `${coords.lat.toFixed(3)}, ${coords.lng.toFixed(3)}` : 'Locating…'}</div>
			</div>
			<button disabled={items.length === 0} onClick={placeOrder} className="mt-4 w-full rounded-md bg-primary px-4 py-2 text-white disabled:opacity-50">
				Place Order
			</button>
		</div>
	);
}