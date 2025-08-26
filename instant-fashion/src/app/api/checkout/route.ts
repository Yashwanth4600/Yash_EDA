import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';

export async function POST(request: Request) {
	const session = await getServerSession(authOptions);
	if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	const body = await request.json();
	// TODO: Integrate Stripe/Razorpay. For now, return mock payment secret/id
	return NextResponse.json({ clientSecret: 'mock_secret', orderId: body.orderId || null });
}