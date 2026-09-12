import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { getSafeNextPath, isMemberMode, setMemberMode, setMemberToken } from '../lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isMemberMode()) {
      router.replace('/dashboard');
    }
  }, [router]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Please enter your email and password to continue.');
      return;
    }

    const normalizedEmail = String(email).trim();
    if (!normalizedEmail.includes('@') || !normalizedEmail.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    try {
      const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001').replace(/\/$/, '');
      const res = await fetch(`${backendUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, password: String(password), name: normalizedEmail.split('@')[0] || 'Member' })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Login failed.');
      }

      if (!data.token) {
        throw new Error('Sign-in did not return a valid session. Please try again.');
      }

      setMemberMode(true, {
        name: data.user?.name || normalizedEmail.split('@')[0] || 'Member',
        email: data.user?.email || normalizedEmail,
      });
      setMemberToken(data.token || '');
      router.push(getSafeNextPath(router.query.next));
    } catch (loginError) {
      setError(loginError.message || 'Unable to sign in right now.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto flex max-w-2xl flex-col gap-6 rounded-[2.5rem] border border-white/10 bg-cyberPanel/95 p-8 shadow-glow-lg">
        <div>
          <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Member access</p>
          <h1 className="mt-3 text-4xl font-black text-white">Welcome back</h1>
          <p className="mt-3 text-sm leading-7 text-cyberGray">Sign in to jump into the member dashboard, your campaign workspace, and your creator community.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="mb-2 block text-sm font-black uppercase tracking-wider text-cyberGray">Email</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyberTeal/40"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="mb-2 block text-sm font-black uppercase tracking-wider text-cyberGray">Password</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyberTeal/40"
              placeholder="••••••••"
            />
          </div>
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <button type="submit" disabled={submitting} className="w-full rounded-2xl bg-cyberPurple px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-cyberPurpleSoft disabled:cursor-wait disabled:opacity-60">
            {submitting ? 'Signing in...' : 'Enter member dashboard'}
          </button>
        </form>

        <p className="text-sm text-cyberGray">No account yet? <a href="/signup" className="font-black text-cyberTeal">Create one here</a>.</p>
      </div>
    </Layout>
  );
}
