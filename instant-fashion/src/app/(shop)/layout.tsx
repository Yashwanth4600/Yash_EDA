import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';
import { CartSidebar } from '../../components/cart/CartSidebar';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col">
			<Navbar />
			<div className="flex-1">{children}</div>
			<CartSidebar />
			<Footer />
		</div>
	);
}