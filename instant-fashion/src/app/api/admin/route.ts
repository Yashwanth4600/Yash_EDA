import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';

export async function GET() {
	const session = await getServerSession(authOptions);
	if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	const me = await prisma.user.findUnique({ where: { email: session.user.email } });
	if (me?.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
	const [users, orders] = await Promise.all([
		prisma.user.findMany({ select: { id: true, email: true, name: true, role: true, createdAt: true } }),
		prisma.order.findMany({ include: { items: { include: { product: true } }, user: true }, orderBy: { createdAt: 'desc' } })
	]);
	return NextResponse.json({ users, orders });
}

export async function PATCH(request: Request) {
	const session = await getServerSession(authOptions);
	if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	const me = await prisma.user.findUnique({ where: { email: session.user.email } });
	if (me?.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
	const { orderId, status } = await request.json();
	const order = await prisma.order.update({ where: { id: orderId }, data: { status }, include: { user: true } });
	try {
		const { sendOrderEmail, sendOrderSMS } = await import('../../../lib/notifications');
		await sendOrderEmail(order.user.email, 'Order Update', `<p>Your order ${order.id} is now ${status}.</p>`);
		if (order.user.phone) await sendOrderSMS(order.user.phone, `Order ${order.id} is now ${status}`);
	} catch {}
	return NextResponse.json({ order });
}