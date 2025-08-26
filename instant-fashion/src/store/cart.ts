import { create } from 'zustand';

export type CartItem = { productId: string; name: string; price: number; image?: string; quantity: number };

type CartState = {
	items: CartItem[];
	add: (item: Omit<CartItem, 'quantity'>, qty?: number) => void;
	remove: (productId: string) => void;
	update: (productId: string, quantity: number) => void;
	clear: () => void;
};

export const useCart = create<CartState>((set, get) => ({
	items: [],
	add: (item, qty = 1) => {
		const exists = get().items.find((i) => i.productId === item.productId);
		if (exists) {
			set({ items: get().items.map((i) => (i.productId === item.productId ? { ...i, quantity: i.quantity + qty } : i)) });
		} else {
			set({ items: [...get().items, { ...item, quantity: qty }] });
		}
	},
	remove: (productId) => set({ items: get().items.filter((i) => i.productId !== productId) }),
	update: (productId, quantity) => set({ items: get().items.map((i) => (i.productId === productId ? { ...i, quantity } : i)) }),
	clear: () => set({ items: [] })
}));