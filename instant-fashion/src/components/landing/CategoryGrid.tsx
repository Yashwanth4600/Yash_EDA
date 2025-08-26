import Link from 'next/link';

const categories = [
	{ key: 'clothing', label: 'Clothing' },
	{ key: 'footwear', label: 'Footwear' },
	{ key: 'accessories', label: 'Accessories' },
	{ key: 'beauty', label: 'Beauty' },
	{ key: 'lifestyle', label: 'Lifestyle' }
];

export function CategoryGrid() {
	return (
		<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
			{categories.map((c) => (
				<Link
					key={c.key}
					href={`/category/${c.key}`}
					className="group rounded-xl border p-6 transition hover:shadow-lg"
				>
					<div className="text-lg font-semibold">{c.label}</div>
					<div className="mt-2 text-sm text-muted-foreground">Shop now →</div>
				</Link>
			))}
		</div>
	);
}