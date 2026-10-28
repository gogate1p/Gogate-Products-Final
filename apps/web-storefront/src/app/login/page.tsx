'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Mail, ArrowLeft } from 'lucide-react';

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
    <div className="min-h-[75vh] grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden card">
      {/* Visual panel */}
      <div className="relative hidden lg:block bg-forest-950">
        <Image src="https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1200" alt="" fill sizes="50vw" className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent" />
        <div className="absolute bottom-0 p-12 text-white space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mango-300">Gogate Products</p>
          <p className="font-display text-4xl font-semibold leading-tight">Farm-fresh from Ratnagiri, delivered to your door.</p>
          <p className="text-sm text-white/70">Track orders, manage addresses and reorder your favourites.</p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-sm space-y-7">
          <div className="space-y-2">
            <h1 className="heading-display text-3xl">
              {step === 'ENTER_EMAIL' ? 'Welcome back' : 'Check your inbox'}
            </h1>
            <p className="text-sm text-stone-500">
              {step === 'ENTER_EMAIL'
                ? 'Sign in or create an account with a one-time code. No password needed.'
                : <>We sent a 6-digit code to <span className="font-medium text-forest-950">{email}</span>.</>}
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-sm text-rose-800">{errorMsg}</div>
          )}

          {demoOtp && step === 'ENTER_OTP' && (
            <div className="p-3 bg-mango-50 border border-mango-100 rounded-xl text-sm text-forest-900">
              Demo code: <strong className="font-mono tracking-widest">{demoOtp}</strong>
            </div>
          )}

          {step === 'ENTER_EMAIL' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <label className="block">
                <span className="block text-sm font-medium text-forest-950 mb-1.5">Email address</span>
                <span className="relative block">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    autoFocus
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input pl-11"
                  />
                </span>
              </label>
              <button type="submit" disabled={isSending} className="btn-primary w-full py-3.5">
                {isSending ? 'Sending code…' : <>Continue <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <label className="block">
                <span className="block text-sm font-medium text-forest-950 mb-1.5">Verification code</span>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  autoFocus
                  maxLength={6}
                  placeholder="••••••"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="input text-center text-2xl font-mono tracking-[0.5em]"
                />
              </label>
              <button type="submit" className="btn-primary w-full py-3.5">Verify & sign in</button>
              <button type="button" onClick={() => { setStep('ENTER_EMAIL'); setOtp(''); setErrorMsg(null); }} className="w-full inline-flex items-center justify-center gap-1.5 text-sm text-stone-500 hover:text-forest-900">
                <ArrowLeft className="w-4 h-4" /> Use a different email
              </button>
            </form>
          )}

          <p className="text-xs text-stone-500 leading-relaxed">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="underline underline-offset-2 hover:text-forest-900">Terms</Link> and{' '}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-forest-900">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
