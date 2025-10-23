import { NextRequest, NextResponse } from 'next/server'
import { Stripe } from 'stripe'
import { supabaseAdmin } from '@/lib/supabase'
import { generateQRCodeData } from '@/lib/qr-code'
import { sendTicketEmail } from '@/lib/resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      
      // Extract ticket type from metadata
      const ticketType = session.metadata?.ticketType as 'event' | 'event_afterparty'
      
      // Get customer information from Stripe
      const customerEmail = session.customer_email || session.customer_details?.email
      const customerName = session.customer_details?.name

      // Extract custom fields from session
      const attendeeName = session.custom_fields?.find(
        field => field.key === 'attendee_name'
      )?.text?.value || session.metadata?.attendeeName || customerName || ''
      
      const accessibilityAccommodations = session.custom_fields?.find(
        field => field.key === 'accessibility_accommodations'
      )?.text?.value || session.metadata?.accessibilityAccommodations || ''
      
      const referralCode = session.custom_fields?.find(
        field => field.key === 'referral_code'
      )?.text?.value || session.metadata?.referralCode || ''

      if (!ticketType || !customerEmail || !attendeeName) {
        console.error('Missing required information:', { attendeeName, ticketType, customerEmail })
        return NextResponse.json({ error: 'Missing required information' }, { status: 400 })
      }

      // Generate unique ticket ID
      const ticketId = `TEDX-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      
      // Generate QR code data
      const qrCodeData = generateQRCodeData(ticketId)

      // Determine price based on ticket type
      const price = ticketType === 'event' ? 10 : 25

      // Store ticket in database
      const { data: _ticket, error: dbError } = await supabaseAdmin // eslint-disable-line @typescript-eslint/no-unused-vars
        .from('tickets')
        .insert({
          stripe_session_id: session.id,
          ticket_type: ticketType,
          attendee_name: attendeeName,
          attendee_email: customerEmail,
          qr_code_data: qrCodeData,
          price: price,
          checked_in: false,
          checked_in_at: null,
          accessibility_accommodations: accessibilityAccommodations,
          referral_code: referralCode
        })
        .select()
        .single()

      if (dbError) {
        console.error('Database error:', dbError)
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
      }

      // Send ticket email
      try {
        await sendTicketEmail({
          attendeeName: attendeeName,
          attendeeEmail: customerEmail,
          ticketType: ticketType,
          price: price,
          qrCodeData: qrCodeData,
          ticketId: ticketId,
          accessibilityAccommodations: accessibilityAccommodations,
          referralCode: referralCode
        })
      } catch (emailError) {
        console.error('Email sending failed:', emailError)
        // Don't fail the webhook if email fails - ticket is still created
      }

      console.log('Ticket created successfully:', ticketId)
      return NextResponse.json({ success: true, ticketId })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }
}
