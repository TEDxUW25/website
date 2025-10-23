"use client";
import { useState } from 'react';
import { generateQRCodeImage } from '@/lib/qr-code';

interface Ticket {
  id: string;
  ticket_type: 'event' | 'event_afterparty';
  attendee_name: string;
  attendee_email: string;
  price: number;
  checked_in: boolean;
  checked_in_at: string | null;
  created_at: string;
  qr_code_data: string;
}

export default function TicketLookupPage() {
  const [form, setForm] = useState({
    email: '',
    sessionId: ''
  });
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTicket(null);
    setQrCodeImage(null);

    try {
      const response = await fetch('/api/ticket/lookup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to find ticket');
      }

      setTicket(data.ticket);
      
      // Generate QR code image
      if (data.ticket.qr_code_data) {
        const qrImage = await generateQRCodeImage(data.ticket.qr_code_data);
        setQrCodeImage(qrImage);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = () => {
    if (qrCodeImage) {
      const link = document.createElement('a');
      link.href = qrCodeImage;
      link.download = `tedx-ticket-${ticket?.id}.png`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Retrieve Your Ticket</h1>
        
        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-lg p-6 mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-black text-white border border-white/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your email address"
                required
              />
            </div>
            
            <div className="text-center text-gray-400">OR</div>
            
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Order ID (Session ID)
              </label>
              <input
                type="text"
                value={form.sessionId}
                onChange={(e) => setForm({ ...form, sessionId: e.target.value })}
                className="w-full bg-black text-white border border-white/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your order/session ID"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading || (!form.email && !form.sessionId)}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              {loading ? 'Searching...' : 'Find My Ticket'}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-900 border border-red-500 text-red-100 px-4 py-3 rounded-lg mb-8">
            {error}
          </div>
        )}

        {ticket && (
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Your Ticket</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Ticket Details</h3>
                <div className="space-y-2 text-gray-300">
                  <p><span className="text-white font-medium">Name:</span> {ticket.attendee_name}</p>
                  <p><span className="text-white font-medium">Email:</span> {ticket.attendee_email}</p>
                  <p><span className="text-white font-medium">Type:</span> {ticket.ticket_type === 'event' ? 'Event Only' : 'Event + After Party'}</p>
                  <p><span className="text-white font-medium">Price:</span> ${ticket.price}</p>
                  <p><span className="text-white font-medium">Status:</span> 
                    <span className={`ml-2 ${ticket.checked_in ? 'text-green-400' : 'text-yellow-400'}`}>
                      {ticket.checked_in ? 'Checked In' : 'Not Checked In'}
                    </span>
                  </p>
                  {ticket.checked_in_at && (
                    <p><span className="text-white font-medium">Checked In At:</span> {new Date(ticket.checked_in_at).toLocaleString()}</p>
                  )}
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-4">QR Code</h3>
                {qrCodeImage ? (
                  <div>
                    <img 
                      src={qrCodeImage} 
                      alt="QR Code" 
                      className="mx-auto mb-4 border border-white/20 rounded-lg"
                    />
                    <button
                      onClick={downloadQRCode}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                      Download QR Code
                    </button>
                  </div>
                ) : (
                  <div className="text-gray-400">Loading QR code...</div>
                )}
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <h4 className="text-white font-semibold mb-2">Important Information</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Present this QR code at the event entrance</li>
                <li>• Arrive 30 minutes before the event starts</li>
                <li>• Bring a valid ID for verification</li>
                <li>• Keep this QR code safe</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
