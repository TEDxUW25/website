'use client';
import Countdown from 'react-countdown';

const renderPaymentUI = () => {
  return null
  // When the countdown is complete, the payment UI can go here I guess (Whoever has Payement UI ticket)
};

const renderer = ({ days, hours, minutes, seconds, completed }: { days: number, hours: number, minutes: number, seconds: number, completed: boolean }) => {
  if (completed) {
    return renderPaymentUI();
  } else {
    return (
      <div className="flex gap-10 justify-center items-center text-white mt-8 mb-12">
        <div className="flex flex-col items-center">
          <span className="text-8xl font-extrabold font-Inter text-white px-8 py-4 rounded">{String(days).padStart(2, '0')}</span>
          <span className="mt-4 text-lg uppercase tracking-widest text-white">days</span>
        </div>
        <span className="text-8xl font-extrabold font-Inter text-white">:</span>
        <div className="flex flex-col items-center">
          <span className="text-8xl font-extrabold font-Inter text-white px-8 py-4 rounded">{String(hours).padStart(2, '0')}</span>
          <span className="mt-4 text-lg uppercase tracking-widest text-white">hours</span>
        </div>
        <span className="text-8xl font-extrabold font-Inter text-white">:</span>
        <div className="flex flex-col items-center">
          <span className="text-8xl font-extrabold font-Inter text-white px-8 py-4 rounded">{String(minutes).padStart(2, '0')}</span>
          <span className="mt-4 text-lg uppercase tracking-widest text-white">minutes</span>
        </div>
        <span className="text-8xl font-extrabold font-Inter text-white">:</span>
        <div className="flex flex-col items-center">
          <span className="text-8xl font-extrabold font-Inter text-white px-8 py-4 rounded">{String(seconds).padStart(2, '0')}</span>
          <span className="mt-4 text-lg uppercase tracking-widest text-white">seconds</span>
        </div>
      </div>
    );
  }
};

export default function BuyTicketPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-black bg-opacity-80 px-4 mt-32" style={{ fontFamily: 'var(--font-sans)' }}>
      <h2 className="text-5xl font-normal font-Inter text-white mb-12 mt-12">Ticket Sales Open In</h2>
      <Countdown
        date={new Date('2025-09-01T00:00:00')}
        renderer={renderer}
      />
      <div className="mt-16 text-center text-white text-lg max-w-2xl">
        Please note that payments are non-refundable. Spots are limited!<br />
        Please act swiftly if you wish to be part of this experience.
      </div>
    </div>
  );
}
