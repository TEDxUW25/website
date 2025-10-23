"use client";
import { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { generateQRCodeImage } from '@/lib/qr-code';
import Link from 'next/link';

interface Ticket {
  id: string;
  attendee_name: string;
  attendee_email: string;
  ticket_type: 'event' | 'event_afterparty';
  qr_code_data: string;
  price: number;
  checked_in: boolean;
  created_at: string;
}

function TicketSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);

  const fetchTicket = useCallback(async () => {
    try {
      const response = await fetch('/api/ticket/lookup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: '', sessionId }),
      });

      if (response.ok) {
        const data = await response.json();
        setTicket(data.ticket);
        
        // Generate QR code image
        try {
          const qrImage = await generateQRCodeImage(data.ticket.qr_code_data);
          setQrCodeImage(qrImage);
        } catch (qrError) {
          console.error('Failed to generate QR code image:', qrError);
        }
      } else {
        setError('Ticket not found. Please check your email or contact support.');
      }
    } catch {
      setError('Failed to retrieve ticket. Please check your email or contact support.');
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    if (sessionId) {
      fetchTicket();
    } else {
      setError('No session ID provided');
      setLoading(false);
    }
  }, [sessionId, fetchTicket]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-24">
        <div className="text-white text-xl">Processing your ticket...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-24">
        <div className="max-w-md mx-auto text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <a
            href="/ticket/lookup"
            className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Try Ticket Lookup
          </a>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">No ticket found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-stone-300">Your ticket is ready</p>
        </div>

        {/* QR Code */}
        <div className="bg-stone-900 rounded-lg p-6 mb-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Your QR Code</h2>
          {qrCodeImage ? (
            <div className="bg-white p-6 rounded-lg inline-block">
              <img 
                src={qrCodeImage} 
                alt="QR Code" 
                className="w-64 h-64 mx-auto"
              />
            </div>
          ) : (
            <div className="bg-white p-4 rounded-lg inline-block">
              <div className="text-black text-xs break-all max-w-xs">
                {ticket.qr_code_data}
              </div>
            </div>
          )}
          <p className="text-stone-400 text-sm mt-2">
            Present this QR code at the event entrance
          </p>
        </div>

        {/* Ticket Details */}
        <div className="bg-stone-900 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Ticket Details</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-stone-300">Name:</span>
              <span className="text-white font-medium">{ticket.attendee_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-300">Email:</span>
              <span className="text-white font-medium">{ticket.attendee_email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-300">Ticket Type:</span>
              <span className="text-white font-medium">
                {ticket.ticket_type === 'event' ? 'Event Only' : 'Event + After Party'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-300">Price:</span>
              <span className="text-white font-medium">${ticket.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-300">Event Date:</span>
              <span className="text-white font-medium">November 2nd, 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-300">Ticket ID:</span>
              <span className="text-white font-medium text-sm">{ticket.id}</span>
            </div>
          </div>
        </div>

        {/* Important Info */}
        <div className="bg-stone-900 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Important Information</h2>
          <ul className="text-stone-300 space-y-2">
            <li>• Please arrive 30 minutes before the event starts</li>
            <li>• Bring a valid ID for verification</li>
            <li>• Keep this QR code safe</li>
            <li>• You will also receive this ticket via email</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-center"
          >
            Back to Home
          </Link>
        </div>

        <div className="mt-8 text-sm text-stone-400 text-center">
          <p>Questions? Contact us at tedxuw@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default function TicketSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center pt-24">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <TicketSuccessContent />
    </Suspense>
  );
}
