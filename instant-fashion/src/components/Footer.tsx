export default function Footer() {
	return (
		<footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
			<div className="container-page py-8 text-sm text-gray-500">
				<p>© {new Date().getFullYear()} Instant Fashion. All rights reserved.</p>
			</div>
		</footer>
	);
}