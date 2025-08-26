import { prisma } from '../../../../lib/prisma';
import { ProductCard } from '../../../../components/catalog/ProductCard';

export default async function CategoryPage({ params }: { params: { slug: string } }) {
	const products = await prisma.product.findMany({ where: { active: true, category: params.slug } });
	return (
		<div className="mx-auto max-w-6xl px-4 py-8">
			<h1 className="mb-4 text-2xl font-semibold capitalize">{params.slug}</h1>
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
				{products.map((p) => (
					<ProductCard key={p.id} product={p as any} />
				))}
			</div>
		</div>
	);
}