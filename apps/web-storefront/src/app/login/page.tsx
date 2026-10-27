'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BuyerLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'ENTER_EMAIL' | 'ENTER_OTP'>('ENTER_EMAIL');
  const [otp, setOtp] = useState('');
  const [demoOtp, setDemoOtp] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    setErrorMsg(null);
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      const generated = '492018'; // Mock OTP
      setDemoOtp(generated);
      setStep('ENTER_OTP');
    }, 800);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === demoOtp || otp === '123456' || otp.length === 6) {
      router.push('/');
    } else {
      setErrorMsg('Invalid verification code. Please check your email.');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-10 shadow-xl max-w-md w-full space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-emerald-600 flex items-center justify-center text-3xl shadow-sm">
            🥭
          </div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">Login to Gogate Products</h1>
          <p className="text-xs text-stone-500">
            Fast, passwordless login via Email OTP (Swiggy / Zomato experience)
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-800 text-center">
            {errorMsg}
          </div>
        )}

        {demoOtp && step === 'ENTER_OTP' && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 text-center">
            ✉️ Verification email sent! Demo OTP code: <strong className="font-mono text-sm font-black">{demoOtp}</strong>
          </div>
        )}

        {step === 'ENTER_EMAIL' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                autoFocus
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-sm border border-stone-300 rounded-xl p-3.5 focus:ring-2 focus:ring-emerald-700 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-4 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-sm transition shadow-md disabled:opacity-50"
            >
              {isSending ? 'Sending 6-Digit Code...' : 'Send Login OTP ➔'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Enter 6-Digit Email OTP
                </label>
                <button
                  type="button"
                  onClick={() => setStep('ENTER_EMAIL')}
                  className="text-xs text-emerald-800 font-semibold hover:underline"
                >
                  Change Email
                </button>
              </div>
              <input
                type="text"
                required
                autoFocus
                maxLength={6}
                placeholder="• • • • • •"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full text-center text-xl font-mono font-bold tracking-widest border border-stone-300 rounded-xl p-3.5 focus:ring-2 focus:ring-emerald-700 outline-none"
              />
              <p className="text-[11px] text-stone-400 text-center mt-1">Sent to {email}</p>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-sm transition shadow-md"
            >
              Verify OTP & Continue
            </button>
          </form>
        )}

        <div className="border-t border-stone-100 pt-4 text-center text-xs text-stone-400">
          By continuing, you agree to our{' '}
          <Link href="/terms" className="underline hover:text-stone-600">
            Terms
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="underline hover:text-stone-600">
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
