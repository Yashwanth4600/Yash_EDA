export function Footer() {
	return (
		<footer className="border-t py-8 text-center text-sm text-muted-foreground">
			<div className="mx-auto max-w-6xl px-4">
				© {new Date().getFullYear()} Instant Fashion. All rights reserved.
			</div>
		</footer>
	);
}