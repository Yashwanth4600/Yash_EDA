import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {
	return (
		<main>
			<section className="relative overflow-hidden">
				<div className="container-page py-24">
					<motion.h1 className="text-5xl md:text-6xl font-extrabold tracking-tight"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}>
						Your Style, Delivered in 15 Minutes.
					</motion.h1>
					<p className="mt-6 max-w-2xl text-lg text-gray-500 dark:text-gray-300">
						Fast, trendy, and urban. Fashion essentials at lightning speed.
					</p>
					<div className="mt-10 flex gap-4">
						<Link href="/login" className="px-6 py-3 rounded-md bg-brand.neon text-black font-semibold hover:opacity-90">
							Shop Now
						</Link>
						<Link href="/login" className="px-6 py-3 rounded-md border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-900">
							Login
						</Link>
						<a href="#download" className="px-6 py-3 rounded-md bg-brand.accent text-white font-semibold hover:opacity-90">
							Download App
						</a>
					</div>
				</div>
			</section>
			<section className="container-page py-16">
				<h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
					{['Clothing','Footwear','Accessories','Beauty','Lifestyle'].map((c) => (
						<div key={c} className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition">
							<p className="font-semibold">{c}</p>
						</div>
					))}
				</div>
			</section>
		</main>
	);
}