'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SellerLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('orchard@gogateproducts.com');
  const [step, setStep] = useState<'ENTER_EMAIL' | 'ENTER_OTP'>('ENTER_EMAIL');
  const [otp, setOtp] = useState('');
  const [demoOtp, setDemoOtp] = useState<string | null>(null);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoOtp('738192');
    setStep('ENTER_OTP');
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-emerald-950 flex items-center justify-center p-4">
      <div className="bg-emerald-900/90 text-white rounded-3xl border border-emerald-800 p-8 sm:p-10 shadow-2xl max-w-md w-full space-y-6 backdrop-blur-sm">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-xl bg-amber-500 flex items-center justify-center text-2xl font-bold text-emerald-950">
            🌱
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Seller Studio Login</h1>
          <p className="text-xs text-emerald-300">Secure Merchant Access via Email OTP</p>
        </div>

        {demoOtp && step === 'ENTER_OTP' && (
          <div className="p-3 bg-amber-400/20 border border-amber-400/40 rounded-xl text-xs text-amber-200 text-center">
            ✉️ Verification code sent! Demo OTP: <strong className="font-mono text-sm">{demoOtp}</strong>
          </div>
        )}

        {step === 'ENTER_EMAIL' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-emerald-200 uppercase mb-1">
                Store Registered Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-sm border border-emerald-700 bg-emerald-950 rounded-xl p-3 focus:ring-2 focus:ring-amber-400 outline-none text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold rounded-xl text-sm transition"
            >
              Send Merchant OTP ➔
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-emerald-200 uppercase mb-1">
                Enter 6-Digit Merchant OTP
              </label>
              <input
                type="text"
                required
                autoFocus
                maxLength={6}
                placeholder="• • • • • •"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full text-center text-xl font-mono font-bold tracking-widest border border-emerald-700 bg-emerald-950 rounded-xl p-3 focus:ring-2 focus:ring-amber-400 outline-none text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold rounded-xl text-sm transition"
            >
              Verify OTP & Open Studio
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
