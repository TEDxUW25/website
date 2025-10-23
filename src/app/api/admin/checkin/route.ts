import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    // Check admin authentication
    const cookieStore = await cookies()
    const adminSession = cookieStore.get('admin-session')

    if (!adminSession || adminSession.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { ticketId, email, action = 'checkin' } = body

    if (!ticketId && !email) {
      return NextResponse.json({ error: 'Ticket ID or email is required' }, { status: 400 })
    }

    let ticketQuery = supabaseAdmin.from('tickets').select('*')

    // If email is provided, find ticket by email
    if (email) {
      ticketQuery = ticketQuery.eq('attendee_email', email)
    } else {
      // If ticketId is provided, find ticket by ID
      ticketQuery = ticketQuery.eq('id', ticketId)
    }

    const { data: tickets, error: fetchError } = await ticketQuery

    if (fetchError) {
      console.error('Database error:', fetchError)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    if (!tickets || tickets.length === 0) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 })
    }

    // Handle multiple tickets for the same email
    if (tickets.length > 1) {
      // Check if all tickets are already checked in
      const allCheckedIn = tickets.every(ticket => ticket.checked_in)
      if (allCheckedIn) {
        return NextResponse.json({ 
          error: 'All tickets for this email are already checked in',
          tickets: tickets 
        }, { status: 400 })
      }

      // Check if some tickets are checked in
      const checkedInTickets = tickets.filter(ticket => ticket.checked_in)
      const uncheckedTickets = tickets.filter(ticket => !ticket.checked_in)

      // Always return tickets for selection when there are multiple tickets
      return NextResponse.json({ 
        error: 'Multiple tickets found for this email',
        tickets: tickets, // Return all tickets so user can see status
        uncheckedTickets: uncheckedTickets, // Available for check-in
        checkedInTickets: checkedInTickets, // Already checked in
        message: uncheckedTickets.length > 0 
          ? `Found ${tickets.length} tickets. ${checkedInTickets.length} already checked in, ${uncheckedTickets.length} available for check-in.`
          : 'All tickets are already checked in.'
      }, { status: 400 })
    }

    // Single ticket found
    const ticket = tickets[0]

    // Handle check-in vs check-out
    if (action === 'checkin') {
      if (ticket.checked_in) {
        return NextResponse.json({ error: 'Ticket already checked in' }, { status: 400 })
      }

      // Update ticket as checked in
      const { data: updatedTicket, error: updateError } = await supabaseAdmin
        .from('tickets')
        .update({
          checked_in: true,
          checked_in_at: new Date().toISOString()
        })
        .eq('id', ticket.id)
        .select()
        .single()

      if (updateError) {
        console.error('Database error:', updateError)
        return NextResponse.json({ error: 'Failed to update ticket' }, { status: 500 })
      }

      return NextResponse.json({ ticket: updatedTicket, action: 'checkin' })
    } else if (action === 'checkout') {
      if (!ticket.checked_in) {
        return NextResponse.json({ error: 'Ticket is not checked in' }, { status: 400 })
      }

      // Update ticket as checked out
      const { data: updatedTicket, error: updateError } = await supabaseAdmin
        .from('tickets')
        .update({
          checked_in: false,
          checked_in_at: null
        })
        .eq('id', ticket.id)
        .select()
        .single()

      if (updateError) {
        console.error('Database error:', updateError)
        return NextResponse.json({ error: 'Failed to update ticket' }, { status: 500 })
      }

      return NextResponse.json({ ticket: updatedTicket, action: 'checkout' })
    } else {
      return NextResponse.json({ error: 'Invalid action. Use "checkin" or "checkout"' }, { status: 400 })
    }
  } catch (error) {
    console.error('Check-in error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
