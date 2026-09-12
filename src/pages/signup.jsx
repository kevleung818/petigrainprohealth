import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { getSafeNextPath, isMemberMode, setMemberMode, setMemberToken } from '../lib/auth';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
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

    if (!name || !email || !password) {
      setError('Please fill in your name, email, and password.');
      return;
    }

    const normalizedEmail = String(email).trim();
    if (!normalizedEmail.includes('@') || !normalizedEmail.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (String(password).length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setSubmitting(true);
    try {
      const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001').replace(/\/$/, '');
      const res = await fetch(`${backendUrl}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, password: String(password), name: String(name).trim() || 'Member' })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Signup failed.');
      }

      if (!data.token) {
        setError('Account created. Check your email to confirm your account, then log in.');
        return;
      }

      setMemberMode(true, {
        name: data.user?.name || String(name).trim() || 'Member',
        email: data.user?.email || normalizedEmail,
      });
      setMemberToken(data.token || '');
      router.push(getSafeNextPath(router.query.next));
    } catch (signupError) {
      setError(signupError.message || 'Unable to create your account right now.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto flex max-w-2xl flex-col gap-6 rounded-[2.5rem] border border-white/10 bg-cyberPanel/95 p-8 shadow-glow-lg">
        <div>
          <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Create your account</p>
          <h1 className="mt-3 text-4xl font-black text-white">Join the member experience</h1>
          <p className="mt-3 text-sm leading-7 text-cyberGray">Start with a free account and unlock the full dashboard for campaigns, community, and publishing workflows.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="signup-name" className="mb-2 block text-sm font-black uppercase tracking-wider text-cyberGray">Name</label>
            <input
              id="signup-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyberTeal/40"
              placeholder="Ari Chen"
            />
          </div>
          <div>
            <label htmlFor="signup-email" className="mb-2 block text-sm font-black uppercase tracking-wider text-cyberGray">Email</label>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyberTeal/40"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="signup-password" className="mb-2 block text-sm font-black uppercase tracking-wider text-cyberGray">Password</label>
            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyberTeal/40"
              placeholder="••••••••"
            />
          </div>
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <button type="submit" disabled={submitting} className="w-full rounded-2xl bg-cyberPurple px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-cyberPurpleSoft disabled:cursor-wait disabled:opacity-60">
            {submitting ? 'Creating account...' : 'Create member account'}
          </button>
        </form>

        <p className="text-sm text-cyberGray">Already have an account? <a href="/login" className="font-black text-cyberTeal">Log in here</a>.</p>
      </div>
    </Layout>
  );
}
