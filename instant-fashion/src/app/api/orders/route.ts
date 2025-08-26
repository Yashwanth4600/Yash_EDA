import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';

export async function GET() {
	const session = await getServerSession(authOptions);
	if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	const orders = await prisma.order.findMany({
		where: { user: { email: session.user.email } },
		include: { items: { include: { product: true } }, address: true },
		orderBy: { createdAt: 'desc' }
	});
	return NextResponse.json({ orders });
}

export async function POST(request: Request) {
	const session = await getServerSession(authOptions);
	if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	const body = await request.json();
	// expected: items [{productId, quantity}], addressId?, lat?, lng?
	const user = await prisma.user.findUnique({ where: { email: session.user.email } });
	if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	const products = await prisma.product.findMany({ where: { id: { in: body.items.map((i: any) => i.productId) } } });
	const items = body.items.map((i: any) => {
		const p = products.find((pp) => pp.id === i.productId)!;
		return { productId: p.id, quantity: i.quantity, price: p.price };
	});
	const totalAmount = items.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0);
	const order = await prisma.order.create({
		data: {
			userId: user.id,
			addressId: body.addressId ?? null,
			lat: body.lat ?? null,
			lng: body.lng ?? null,
			totalAmount,
			items: { create: items }
		},
		include: { items: { include: { product: true } }, user: true }
	});
	try {
		// Log to Google Sheets
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const { logOrderToSheet } = await import('../../../lib/sheets');
		await logOrderToSheet([
			order.id,
			order.user.name || '',
			order.user.email,
			order.user.phone || '',
			order.items.map((i) => i.product.name).join(', '),
			totalAmount / 100,
			`${order.lat ?? ''}, ${order.lng ?? ''}`,
			order.status,
			new Date(order.createdAt).toISOString()
		]);
		// Send notification stubs
		const { sendOrderEmail, sendOrderSMS } = await import('../../../lib/notifications');
		await sendOrderEmail(order.user.email, 'Order Confirmation', `<p>Order ${order.id} confirmed.</p>`);
		if (order.user.phone) await sendOrderSMS(order.user.phone, `Order ${order.id} confirmed`);
	} catch {}
	return NextResponse.json({ order });
}