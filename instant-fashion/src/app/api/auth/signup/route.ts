import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
	try {
		const { name, email, password } = await request.json();
		if (!email || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
		const exists = await prisma.user.findUnique({ where: { email } });
		if (exists) return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
		const hash = await bcrypt.hash(password, 10);
		await prisma.user.create({ data: { name, email, password: hash } });
		return NextResponse.json({ ok: true });
	} catch (e) {
		return NextResponse.json({ error: 'Server error' }, { status: 500 });
	}
}