import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { email, sessionId } = await req.json()

    if (!email && !sessionId) {
      return NextResponse.json({ error: 'Email or session ID is required' }, { status: 400 })
    }

    let query = supabaseAdmin
      .from('tickets')
      .select('*')

    if (email) {
      query = query.eq('attendee_email', email)
    } else if (sessionId) {
      query = query.eq('stripe_session_id', sessionId)
    }

    const { data: tickets, error } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    if (!tickets || tickets.length === 0) {
      return NextResponse.json({ error: 'No ticket found with the provided information' }, { status: 404 })
    }

    // Return the most recent ticket if multiple found
    const ticket = tickets.sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    })[0]

    return NextResponse.json({ ticket })
  } catch (error) {
    console.error('Lookup error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
