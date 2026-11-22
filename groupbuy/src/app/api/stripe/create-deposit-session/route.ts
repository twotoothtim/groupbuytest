import { NextRequest, NextResponse } from 'next/server';

// This endpoint creates a Stripe Checkout session for the $20 deposit.
// In production, replace STRIPE_SECRET_KEY with your env var.
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';
const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder';

export async function POST(req: NextRequest) {
  try {
    const { buyId, userId, kitCount } = await req.json();

    // In production, fetch buy details from DB here.
    const unitPrice = 120; // placeholder — normally from buy record
    const shippingCost = kitCount * 10;
    const totalAmount = (kitCount * unitPrice) + shippingCost - 20; // deposit already paid

    // Create Stripe Checkout session via API
    const response = await fetch(
      `https://api.stripe.com/v1/checkout/sessions`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${STRIPE_SECRET_KEY}` },
        body: JSON.stringify({
          line_items: [
            { price_data: { currency: 'usd', product_data: { name: `${buyId} — Deposit Payment` }, unit_amount: 2000 }, quantity: 1 } // $20 deposit
          ],
          mode: 'payment',
          success_url: `https://yourdomain.com/deposit/success?session_id={CHECKOUT_SESSION_ID}&buy_id=${buyId}`,
          cancel_url: `https://yourdomain.com/deposit/cancel?buy_id=${buyId}`,
          customer_creation: 'automatic', // or use existing Stripe Customer ID if you have one
        }),
      }
    );

    const session = await response.json();
    if (!session.id) {
      throw new Error('Stripe returned no session ID');
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Deposit session creation failed:', error);
    return NextResponse.json(
      { error: 'Failed to create deposit payment' },
      { status: 500 }
    );
  }
}
