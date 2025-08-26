"use client";

import { useCart } from '../../store/cart';
import Link from 'next/link';

export function CartSidebar() {
	const { items, update, remove, clear } = useCart();
	const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	return (
		<aside className="fixed right-0 top-14 z-40 w-80 border-l bg-background p-4 shadow-lg">
			<h3 className="mb-3 text-lg font-semibold">Your Cart</h3>
			<div className="space-y-3">
				{items.length === 0 && <div className="text-sm text-muted-foreground">No items yet</div>}
				{items.map((item) => (
					<div key={item.productId} className="flex items-center justify-between gap-2">
						<div>
							<div className="text-sm font-medium">{item.name}</div>
							<div className="text-xs text-muted-foreground">₹{item.price / 100}</div>
						</div>
						<div className="flex items-center gap-2">
							<button className="rounded border px-2" onClick={() => update(item.productId, Math.max(1, item.quantity - 1))}>-</button>
							<div className="w-6 text-center text-sm">{item.quantity}</div>
							<button className="rounded border px-2" onClick={() => update(item.productId, item.quantity + 1)}>+</button>
							<button className="rounded border px-2 text-xs" onClick={() => remove(item.productId)}>Remove</button>
						</div>
					</div>
				))}
			</div>
			{items.length > 0 && (
				<div className="mt-4 space-y-3">
					<div className="flex items-center justify-between text-sm">
						<div>Total</div>
						<div className="font-semibold">₹{total / 100}</div>
					</div>
					<div className="flex gap-2">
						<button className="flex-1 rounded-md border px-3 py-2 text-sm" onClick={() => clear()}>Clear</button>
						<Link href="/checkout" className="flex-1 rounded-md bg-primary px-3 py-2 text-center text-sm text-white">Checkout</Link>
					</div>
				</div>
			)}
		</aside>
	);
}