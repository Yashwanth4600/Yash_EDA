"use client";

import Image from 'next/image';
import { useCart } from '../../store/cart';

export type Product = {
	id: string;
	name: string;
	description?: string | null;
	image?: string | null;
	price: number;
	category: string;
};

export function ProductCard({ product }: { product: Product }) {
	const { add } = useCart();
	return (
		<div className="group overflow-hidden rounded-xl border">
			{product.image && (
				<div className="relative aspect-square">
					<Image src={product.image} alt={product.name} fill className="object-cover transition group-hover:scale-105" />
				</div>
			)}
			<div className="space-y-1 p-3">
				<div className="line-clamp-1 font-medium">{product.name}</div>
				<div className="text-sm text-muted-foreground">₹{product.price / 100}</div>
				<button
					onClick={() => add({ productId: product.id, name: product.name, price: product.price, image: product.image ?? undefined })}
					className="mt-2 w-full rounded-md bg-primary px-3 py-2 text-sm text-white"
				>
					Add to cart
				</button>
			</div>
		</div>
	);
}