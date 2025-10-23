import QRCode from 'qrcode'
import crypto from 'crypto'

const SECRET_KEY = process.env.QR_SECRET_KEY || 'default-secret-key-change-in-production'

export interface QRCodeData {
  ticketId: string
  timestamp: number
  signature: string
}

/**
 * Generate encrypted QR code data for a ticket
 */
export function generateQRCodeData(ticketId: string): string {
  const timestamp = Date.now()
  const data = `${ticketId}:${timestamp}`
  const signature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(data)
    .digest('hex')
  
  const qrData: QRCodeData = {
    ticketId,
    timestamp,
    signature
  }
  
  return Buffer.from(JSON.stringify(qrData)).toString('base64')
}

/**
 * Verify QR code data and extract ticket ID
 */
export function verifyQRCodeData(qrData: string): string | null {
  try {
    const decoded = Buffer.from(qrData, 'base64').toString('utf-8')
    const parsed: QRCodeData = JSON.parse(decoded)
    
    // Verify signature
    const data = `${parsed.ticketId}:${parsed.timestamp}`
    const expectedSignature = crypto
      .createHmac('sha256', SECRET_KEY)
      .update(data)
      .digest('hex')
    
    if (parsed.signature !== expectedSignature) {
      return null
    }
    
    // Check if QR code is not too old (24 hours)
    const age = Date.now() - parsed.timestamp
    if (age > 24 * 60 * 60 * 1000) {
      return null
    }
    
    return parsed.ticketId
  } catch (_error) { // eslint-disable-line @typescript-eslint/no-unused-vars
    return null
  }
}

/**
 * Generate QR code image as base64 string
 */
export async function generateQRCodeImage(qrData: string): Promise<string> {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(qrData, {
      width: 256,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    })
    return qrCodeDataURL
  } catch (_error) { // eslint-disable-line @typescript-eslint/no-unused-vars
    throw new Error('Failed to generate QR code image')
  }
}

/**
 * Generate QR code image as buffer for email attachments
 */
export async function generateQRCodeBuffer(qrData: string): Promise<Buffer> {
  try {
    const qrCodeBuffer = await QRCode.toBuffer(qrData, {
      width: 256,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    })
    return qrCodeBuffer
  } catch (_error) { // eslint-disable-line @typescript-eslint/no-unused-vars
    throw new Error('Failed to generate QR code buffer')
  }
}
