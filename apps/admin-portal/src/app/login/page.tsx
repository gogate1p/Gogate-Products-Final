'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@gogateproducts.com');
  const [step, setStep] = useState<'ENTER_EMAIL' | 'ENTER_OTP'>('ENTER_EMAIL');
  const [otp, setOtp] = useState('');
  const [demoOtp, setDemoOtp] = useState<string | null>(null);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoOtp('840219');
    setStep('ENTER_OTP');
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 text-white rounded-3xl border border-slate-700 p-8 sm:p-10 shadow-2xl max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-600 flex items-center justify-center text-2xl font-bold">
            🥭
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Superadmin Portal</h1>
          <p className="text-xs text-slate-400">Two-Factor Authentication via Email OTP</p>
        </div>

        {demoOtp && step === 'ENTER_OTP' && (
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 text-center">
            ✉️ Verification code sent! Demo OTP: <strong className="font-mono text-sm">{demoOtp}</strong>
          </div>
        )}

        {step === 'ENTER_EMAIL' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Authorized Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-sm border border-slate-700 bg-slate-900 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition"
            >
              Send Security OTP ➔
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Enter 6-Digit Security OTP
              </label>
              <input
                type="text"
                required
                autoFocus
                maxLength={6}
                placeholder="• • • • • •"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full text-center text-xl font-mono font-bold tracking-widest border border-slate-700 bg-slate-900 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition"
            >
              Verify & Enter Command Tower
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
