import { NextRequest, NextResponse } from 'next/server';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';

export async function POST(req: NextRequest) {
  try {
    const { depositId, amountCents } = await req.json(); // amount in cents (e.g., $118.00 → 11800)

    const response = await fetch(
      `https://api.stripe.com/v1/checkout/sessions`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${STRIPE_SECRET_KEY}` },
        body: JSON.stringify({
          line_items: [
            { price_data: { currency: 'usd', product_data: { name: 'Final Payment — Group Buy' } }, unit_amount: amountCents, quantity: 1 }
          ],
          mode: 'payment',
          success_url: `https://yourdomain.com/final-payment/success?session_id={CHECKOUT_SESSION_ID}&deposit_id=${depositId}`,
          cancel_url: `https://yourdomain.com/final-payment/cancel?deposit_id=${depositId}`,
          customer_creation: 'automatic',
        }),
      }
    );

    const session = await response.json();
    if (!session.id) {
      throw new Error('Stripe returned no session ID');
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Final payment session creation failed:', error);
    return NextResponse.json(
      { error: 'Failed to create final payment' },
      { status: 500 }
    );
  }
}
