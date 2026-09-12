import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function CommunicationPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/community');
  }, [router]);

  return (
    <Layout>
      <div className="space-y-8 p-8">
        <section className="rounded-4xl border border-white/10 bg-cyberPanel/95 p-8 shadow-glow">
          <div className="max-w-2xl">
            <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Redirecting</p>
            <h1 className="mt-3 text-4xl font-black text-white">Taking you to the Community Hub.</h1>
            <p className="mt-4 text-sm leading-7 text-cyberGray">The communication experience now lives inside Community so your social updates, feedback, and collaboration stay in one place.</p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
