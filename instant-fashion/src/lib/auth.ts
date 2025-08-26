import { PrismaAdapter } from '@auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	session: { strategy: 'jwt' },
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) return null;
				const user = await prisma.user.findUnique({ where: { email: credentials.email } });
				if (!user || !user.password) return null;
				const isValid = await bcrypt.compare(credentials.password, user.password);
				if (!isValid) return null;
				return { id: user.id, email: user.email, name: user.name, image: user.image, role: user.role } as any;
			}
		})
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.userId = (user as any).id as string;
				token.userRole = (user as any).role ?? 'USER';
			} else if (token?.userId) {
				// refresh role from DB occasionally if needed
			}
			return token;
		},
		async session({ session, token }) {
			if (token?.userId) (session as any).user.id = token.userId;
			if (token?.userRole) (session as any).user.role = token.userRole;
			return session;
		}
	},
	pages: {
		signIn: '/login'
	}
};