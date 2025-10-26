import { Stripe } from 'stripe';

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

export async function POST(request: Request) {
  const stripe = getStripe();
  try {
    const { ticketType, attendeeName, accessibilityAccommodations, referralCode } = await request.json();

    // Map ticket types to Stripe product IDs (LIVE MODE)
    const productMap = {
      'event': 'prod_THSpwsA6QvdAof', // Event Only (Live)
      'event_afterparty': 'prod_THSpcwfLSNVi7N' // Event + After Party (Live)
    };

    const stripeProductId = productMap[ticketType as keyof typeof productMap];

    if (!stripeProductId) {
      return new Response(JSON.stringify({ error: 'Invalid ticket type' }), { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product: stripeProductId,
            unit_amount: ticketType === 'event' ? 1000 : 2500, // $10 or $25 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin') || 'http://localhost:3000'}/ticket/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin') || 'http://localhost:3000'}/buy_ticket?canceled=true`,
      // Add custom fields for attendee name, accessibility and referral code
      custom_fields: [
        {
          key: 'attendee_name',
          label: {
            type: 'custom',
            custom: 'Attendee Name'
          },
          type: 'text',
          optional: false
        },
        {
          key: 'accessibility_accommodations',
          label: {
            type: 'custom',
            custom: 'Accessibility Accommodations (Optional)'
          },
          type: 'text',
          optional: true
        },
        {
          key: 'referral_code',
          label: {
            type: 'custom',
            custom: 'Referral Code (Optional)'
          },
          type: 'text',
          optional: true
        }
      ],
      metadata: { 
        ticketType: ticketType,
        attendeeName: attendeeName || '',
        accessibilityAccommodations: accessibilityAccommodations || '',
        referralCode: referralCode || ''
      }
    });

    return new Response(JSON.stringify({ 
      sessionId: session.id,
      checkoutUrl: session.url 
    }), { status: 200 });
  } catch (err) {
    console.error(err);
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
}