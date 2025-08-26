import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import crypto from 'crypto';

export async function POST(request: Request) {
	try {
		const { email } = await request.json();
		if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) return NextResponse.json({ ok: true });
		const token = crypto.randomBytes(32).toString('hex');
		const expiresAt = new Date(Date.now() + 1000 * 60 * 30);
		await prisma.passwordResetToken.create({ data: { email, token, expiresAt } });
		// TODO: send email via SendGrid
		return NextResponse.json({ ok: true });
	} catch (e) {
		return NextResponse.json({ error: 'Server error' }, { status: 500 });
	}
}