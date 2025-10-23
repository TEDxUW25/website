import { Resend } from 'resend'
import { generateQRCodeBuffer } from './qr-code'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface TicketEmailData {
  attendeeName: string
  attendeeEmail: string
  ticketType: 'event' | 'event_afterparty'
  price: number
  qrCodeData: string
  ticketId: string
  accessibilityAccommodations?: string
  referralCode?: string
}

export async function sendTicketEmail(data: TicketEmailData) {
  try {
    // Generate QR code image
    const qrCodeBuffer = await generateQRCodeBuffer(data.qrCodeData)
    
    // Determine ticket type display name
    const ticketTypeName = data.ticketType === 'event' ? 'Event Only' : 'Event + After Party'
    
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your TEDx Ticket</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #E50609; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .ticket-info { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #E50609; }
            .qr-code { text-align: center; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            .highlight { color: #E50609; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>TEDx Event 2025</h1>
              <h2>Your Ticket is Ready!</h2>
            </div>
            
            <div class="content">
              <p>Hi <span class="highlight">${data.attendeeName}</span>,</p>
              
              <p>Thank you for purchasing your ticket to TEDxUW 2025! Your ticket details are below:</p>
              
              <div class="ticket-info">
                <h3>Ticket Information</h3>
                <p><strong>Name:</strong> ${data.attendeeName}</p>
                <p><strong>Email:</strong> ${data.attendeeEmail}</p>
                <p><strong>Ticket Type:</strong> <span class="highlight">${ticketTypeName}</span></p>
                <p><strong>Price:</strong> $${data.price}</p>
                <p><strong>Event Date:</strong> November 2nd, 2025</p>
                <p><strong>Ticket ID:</strong> ${data.ticketId}</p>
                ${data.referralCode ? `<p><strong>Referral Code:</strong> ${data.referralCode}</p>` : ''}
              </div>
              
              ${data.accessibilityAccommodations ? `
              <div class="ticket-info">
                <h3>Accessibility Accommodations</h3>
                <p>We have noted your accessibility requirements:</p>
                <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; border-left: 4px solid #0066cc; margin: 10px 0;">
                  ${data.accessibilityAccommodations}
                </div>
                <p><em>Our team will ensure these accommodations are provided at the event.</em></p>
              </div>
              ` : ''}
              
              <div class="qr-code">
                <h3>Your QR Code Ticket</h3>
                <p>Present this QR code at the event entrance:</p>
                <img src="cid:qrcode" alt="QR Code" style="max-width: 256px; height: auto;" />
              </div>
              
              <div class="ticket-info">
                <h3>Important Information</h3>
                <ul>
                  <li>Please arrive 30 minutes before the event starts</li>
                  <li>Bring a valid ID for verification</li>
                  <li>Keep this email and QR code safe</li>
                  <li>If you lose this email, you can retrieve your ticket at: <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://your-site.com'}/ticket/lookup">Ticket Lookup</a></li>
                </ul>
              </div>
            </div>
            
            <div class="footer">
              <p>Questions? Contact us at tedxuw@gmail.com</p>
              <p>This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `
    
    const result = await resend.emails.send({
      from: 'TEDxUW <tickets@tedxuw.ca>', // Using tedxuw.ca domain
      to: [data.attendeeEmail],
      subject: `Your TEDx Event 2025 Ticket - ${ticketTypeName}`,
      html: emailHtml,
      attachments: [
        {
          filename: 'ticket-qr-code.png',
          content: qrCodeBuffer,
          cid: 'qrcode'
        } as { filename: string; content: Buffer; cid: string }
      ]
    })
    
    return result
  } catch (error) {
    console.error('Failed to send ticket email:', error)
    throw new Error('Failed to send ticket email')
  }
}
