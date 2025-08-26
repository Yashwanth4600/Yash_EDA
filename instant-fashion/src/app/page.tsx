import Link from 'next/link';
import { MotionHero } from '../components/landing/MotionHero';
import { CategoryGrid } from '../components/landing/CategoryGrid';

export default function HomePage() {
	return (
		<main className="min-h-screen">
			<section className="relative overflow-hidden">
				<MotionHero />
				<div className="mx-auto max-w-6xl px-4 py-10">
					<div className="flex flex-wrap items-center justify-center gap-4">
											<Link href="/catalog" className="rounded-full bg-primary px-6 py-3 text-white">
						Shop Now
					</Link>
						<Link href="/login" className="rounded-full border px-6 py-3">
							Login
						</Link>
						<a href="#download" className="rounded-full bg-foreground px-6 py-3 text-background">
							Download App
						</a>
					</div>
				</div>
			</section>
			<section className="mx-auto max-w-6xl px-4 py-12">
				<h2 className="mb-6 text-2xl font-semibold">Categories</h2>
				<CategoryGrid />
			</section>
		</main>
	);
}