import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import PrimaryButton from '../../components/PrimaryButton';
import { CROWN_CUTS } from '../../data/siteData';

export default function CampaignDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const campaign = React.useMemo(
    () => CROWN_CUTS.find((item) => item.id === id) || CROWN_CUTS[0],
    [id]
  );

  if (!campaign) {
    return (
      <Layout>
        <div className="px-8 py-20 text-center text-cyberGray">找不到此活動。</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8 px-6 py-8 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between gap-3">
          <Link href="/campaigns" className="text-sm font-bold text-cyberPurple hover:text-cyberPurpleSoft">
            ← 返回 Campaigns
          </Link>
          <PrimaryButton href="/workflow" variant="secondary" className="h-12 px-5">Open workflow</PrimaryButton>
        </div>

        <section className="overflow-hidden rounded-4xl border border-white/10 bg-cyberPanel/95 shadow-glow">
          <div className="grid lg:grid-cols-[1fr_0.9fr]">
            <img src={campaign.image} alt={campaign.title} className="h-full min-h-[300px] w-full object-cover" />
            <div className="space-y-6 p-7 sm:p-10">
              <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Campaign detail</p>
              <h1 className="text-3xl font-black text-white sm:text-4xl">{campaign.title}</h1>
              <p className="text-sm leading-7 text-cyberGray">This campaign view is included so the production workflow can link to a specific campaign record without breaking the static build.</p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-3xs font-black uppercase tracking-wider text-cyberGray">Owner</p>
                  <p className="mt-2 text-base font-bold text-white">{campaign.user}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-3xs font-black uppercase tracking-wider text-cyberGray">Campaign ID</p>
                  <p className="mt-2 text-base font-bold text-white">{campaign.id}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-cyberPurple/20 bg-cyberPurple/10 p-4 text-sm leading-7 text-cyberGray">
                Production status: Brief approved, scene draft in progress, and approval steps staged for the launch sequence.
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
