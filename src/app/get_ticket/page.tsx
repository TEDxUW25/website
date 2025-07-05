"use client";
import { useState } from 'react';

const TICKETS = {
  regular: {
    name: 'Regular',
    price: 49,
    benefits: [
      'Access to all talks',
      'TEDx swag bag',
      'Networking session',
    ],
  },
  vip: {
    name: 'VIP',
    price: 129,
    benefits: [
      'All Regular benefits',
      'Front row seating',
      'VIP lounge access',
      'Meet & greet with speakers',
    ],
  },
};

export default function GetTicketPage() {
  const [ticketType, setTicketType] = useState<'regular' | 'vip'>('regular');
  const [form, setForm] = useState({
    name: '',
    email: '',
    card: '',
    expiry: '',
    cvc: '',
  });

  const ticket = TICKETS[ticketType];

  return (
    <div className="min-h-screen bg-black flex flex-col items-center py-12 px-2 md:px-8">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 bg-black rounded-2xl shadow-2xl p-0 md:p-8">
        {/* Left: Ticket selection, info, form */}
        <div className="w-full md:w-1/2 flex flex-col justify-between p-6 md:p-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 text-left tracking-tight">Buy Your Ticket</h1>
            <h2 className="text-xl text-red-600 font-bold mb-8 text-left">TEDx Event 2025</h2>
            {/* Ticket Type Selector */}
            <div className="flex gap-6 mb-8">
              {Object.entries(TICKETS).map(([key, t]) => (
                <div
                  key={key}
                  className={`flex-1 cursor-pointer rounded-xl border-2 transition-all duration-200 px-0 py-0 select-none
                    ${ticketType === key
                      ? 'border-red-600 bg-gradient-to-b from-red-900/60 to-black shadow-lg scale-105'
                      : 'border-white/30 bg-black hover:border-red-600'}
                  `}
                  onClick={() => setTicketType(key as 'regular' | 'vip')}
                >
                  <div className={`text-2xl font-bold text-center py-4 ${ticketType === key ? 'text-red-500' : 'text-white'}`}>{t.name}</div>
                  <div className="text-center text-white text-lg pb-4">${t.price}</div>
                </div>
              ))}
            </div>
            {/* Ticket Info */}
            <div className="mb-8 text-left">
              <div className="text-3xl font-extrabold text-white mb-2">${ticket.price}</div>
              <ul className="text-white/80 mb-2">
                {ticket.benefits.map((b, i) => (
                  <li key={i} className="mb-1">• {b}</li>
                ))}
              </ul>
            </div>
            {/* Payment Form */}
            <form className="mb-8 grid grid-cols-1 gap-4">
              <input
                className="bg-black text-white border border-white/30 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-[0_0_0_3px_rgba(255,0,0,0.7),0_0_0_6px_rgba(255,255,255,0.5)] transition-shadow"
                placeholder="Full Name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
              <input
                className="bg-black text-white border border-white/30 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-[0_0_0_3px_rgba(255,0,0,0.7),0_0_0_6px_rgba(255,255,255,0.5)] transition-shadow"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
              <input
                className="bg-black text-white border border-white/30 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-[0_0_0_3px_rgba(255,0,0,0.7),0_0_0_6px_rgba(255,255,255,0.5)] transition-shadow"
                placeholder="Card Number"
                value={form.card}
                onChange={e => setForm(f => ({ ...f, card: e.target.value }))}
              />
              <div className="flex gap-4">
                <input
                  className="bg-black text-white border border-white/30 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-[0_0_0_3px_rgba(255,0,0,0.7),0_0_0_6px_rgba(255,255,255,0.5)] transition-shadow w-1/2"
                  placeholder="MM/YY"
                  value={form.expiry}
                  onChange={e => setForm(f => ({ ...f, expiry: e.target.value }))}
                />
                <input
                  className="bg-black text-white border border-white/30 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-[0_0_0_3px_rgba(255,0,0,0.7),0_0_0_6px_rgba(255,255,255,0.5)] transition-shadow w-1/2"
                  placeholder="CVC"
                  value={form.cvc}
                  onChange={e => setForm(f => ({ ...f, cvc: e.target.value }))}
                />
              </div>
            </form>
            {/* PayPal Button */}
            <div className="flex justify-center mb-8">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-lg flex items-center gap-2 shadow-md">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#003087" d="M21.8 7.2c-.2-1.6-1.7-2.7-3.3-2.7H8.7c-.5 0-.9.3-1 .8l-2.7 13.2c-.1.4.2.8.6.8h3.2l.7-3.5v.1c.1-.5.5-.8 1-.8h1.7c3.2 0 5.7-1.3 6.4-5.1.2-1.1.2-2.1.2-2.8z"/><path fill="#3086C8" d="M20.6 7.2c-.2-1.6-1.7-2.7-3.3-2.7H7.5c-.5 0-.9.3-1 .8l-2.7 13.2c-.1.4.2.8.6.8h3.2l.7-3.5v.1c.1-.5.5-.8 1-.8h1.7c3.2 0 5.7-1.3 6.4-5.1.2-1.1.2-2.1.2-2.8z"/><path fill="#fff" d="M8.7 4.5c-.5 0-.9.3-1 .8l-2.7 13.2c-.1.4.2.8.6.8h3.2l.7-3.5v.1c.1-.5.5-.8 1-.8h1.7c3.2 0 5.7-1.3 6.4-5.1.2-1.1.2-2.1.2-2.8-.2-1.6-1.7-2.7-3.3-2.7H8.7z"/></svg>
                Pay with PayPal
              </button>
            </div>
          </div>
        </div>
        {/* Right: Order Summary */}
        <div className="w-full md:w-1/2 flex flex-col justify-center bg-black rounded-2xl border border-white/10 p-6 md:p-8">
          <div className="bg-black rounded-lg p-6 border border-white/20">
            <h3 className="text-lg font-bold mb-2 text-white">Order Summary</h3>
            <div className="flex justify-between mb-1 text-white/90">
              <span>Ticket Type</span>
              <span className="font-bold text-red-500">{ticket.name}</span>
            </div>
            <div className="flex justify-between mb-1 text-white/90">
              <span>Price</span>
              <span>${ticket.price}</span>
            </div>
            <div className="flex justify-between font-bold text-white text-lg mt-2">
              <span>Total</span>
              <span className="text-red-500">${ticket.price}</span>
            </div>
          </div>
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg text-xl shadow-lg transition-all duration-200 mt-8">Make Payment</button>
          <div className="text-xs text-white/60 text-center mt-2">3 day money-back guarantee. Cancel anytime.</div>
        </div>
      </div>
    </div>
  );
} 