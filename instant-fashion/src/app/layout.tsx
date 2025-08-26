import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '../components/providers/Providers';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';

export const metadata: Metadata = {
	title: 'Instant Fashion — Your Style, Delivered in 15 Minutes',
	description: 'Fast, trendy, urban fashion delivered ultra-fast. Clothing, footwear, accessories, beauty, lifestyle.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<Providers>
					<div className="flex min-h-screen flex-col">
						<Navbar />
						<div className="flex-1">{children}</div>
						<Footer />
					</div>
				</Providers>
			</body>
		</html>
	);
}