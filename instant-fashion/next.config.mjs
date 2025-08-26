/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			'images.unsplash.com',
			'lh3.googleusercontent.com',
			'avatars.githubusercontent.com'
		]
	},
	i18n: {
		locales: ['en', 'hi', 'es'],
		defaultLocale: 'en'
	},
	experimental: {
		serverActions: {
			allowedOrigins: ['*']
		}
	}
};

export default nextConfig;