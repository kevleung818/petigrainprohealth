import React, { useEffect, useMemo, useState } from 'react';
import Layout from '../components/Layout';
import PrimaryButton from '../components/PrimaryButton';

const STAGES = [
  { title: 'Brief', text: 'Define the campaign story, audience, and release window.' },
  { title: 'Assets', text: 'Prepare avatar variants, scene beats, and support visuals.' },
  { title: 'Review', text: 'Collect feedback, fine-tune timing, and lock the final cut.' },
  { title: 'Launch', text: 'Publish the reel, track community reactions, and ship follow-ups.' }
];

export default function WorkflowPage() {
  const [selectedScene, setSelectedScene] = useState(null);
  const [avatarConcept, setAvatarConcept] = useState(null);
  const [generatedCut, setGeneratedCut] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const savedScene = window.localStorage.getItem('vekai.selectedScene');
      const savedAvatar = window.localStorage.getItem('vekai.avatar');
      const savedCut = window.localStorage.getItem('vekai.generatedCut');

      if (savedScene) setSelectedScene(JSON.parse(savedScene));
      if (savedAvatar) setAvatarConcept(JSON.parse(savedAvatar));
      if (savedCut) setGeneratedCut(JSON.parse(savedCut));
    } catch (error) {
      console.error('Failed to restore workflow context', error);
    }
  }, []);

  const checklist = useMemo(() => {
    const base = [
      'Final scene order approved',
      'Avatar presets exported for social',
      'Launch copy and CTA ready',
      'Community poll scheduled for day-of-release'
    ];

    if (selectedScene) {
      base[0] = `Scene selected: ${selectedScene.title}`;
    }
    if (avatarConcept?.avatar?.name) {
      base[1] = `Avatar ready: ${avatarConcept.avatar.name}`;
    }
    if (generatedCut) {
      base[2] = 'Generated cut is ready for publishing';
    }

    return base;
  }, [selectedScene, avatarConcept, generatedCut]);

  const nextUp = useMemo(() => {
    if (generatedCut) {
      return [
        { label: 'Review the generated cut', detail: generatedCut.title || 'Ready for community review' },
        { label: 'Publish to Community', detail: 'Share the cut with the campaign crew and fans' },
        { label: 'Prepare reward unlock', detail: 'Reward panel and badges are staged for launch' }
      ];
    }

    return [
      { label: 'Select a scene for the campaign', detail: selectedScene ? selectedScene.title : 'Browse the scene library to lock the creative angle' },
      { label: 'Refine the avatar concept', detail: avatarConcept?.avatar?.name || 'Open the Avatar Builder to shape the main character' },
      { label: 'Prep reward unlock', detail: 'Badge and reward panel are already staged' }
    ];
  }, [generatedCut, selectedScene, avatarConcept]);

  const statusText = generatedCut ? 'Cut ready for launch' : selectedScene ? 'Scene selected and ready' : 'Draft ready for review';

  return (
    <Layout>
      <div className="space-y-8 p-8">
        <section className="rounded-4xl border border-white/10 bg-cyberPanel/95 p-8 shadow-glow">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Campaign builder</p>
              <h1 className="mt-3 text-4xl font-black text-white">Turn creation into a launch-ready production flow.</h1>
              <p className="mt-4 text-sm leading-7 text-cyberGray">Use this workspace to shape the campaign, hand off assets, review feedback, and prep the community rollout from one place.</p>
            </div>
            <div className="rounded-2xl border border-cyberTeal/20 bg-cyberTeal/10 px-4 py-3 text-sm text-cyberTeal">
              <p className="font-black uppercase tracking-wider">Status</p>
              <p className="mt-1 text-white">{statusText}</p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-4xl border border-white/10 bg-cyberPanel/95 p-6 shadow-glow">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Production stages</p>
                  <h2 className="mt-2 text-xl font-black text-white">Build the campaign in order</h2>
                </div>
                <span className="rounded-full border border-cyberPurple/20 bg-cyberPurple/10 px-3 py-1 text-2xs font-black uppercase tracking-wider text-cyberPurple">
                  {generatedCut ? '100%' : selectedScene ? '80%' : '72%'} complete
                </span>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {STAGES.map((stage) => (
                  <div key={stage.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-black text-white">{stage.title}</p>
                    <p className="mt-2 text-sm leading-6 text-cyberGray">{stage.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-4xl border border-white/10 bg-cyberPanel/95 p-6 shadow-glow">
              <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Launch checklist</p>
              <div className="mt-5 space-y-3">
                {checklist.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-cyberTeal/20 text-xs font-black text-cyberTeal">✓</span>
                    <span className="text-sm text-cyberGray">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-4xl border border-white/10 bg-cyberPanel/95 p-6 shadow-glow">
            <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">What happens next</p>
            <div className="mt-5 space-y-4">
              {nextUp.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-black text-white">{item.label}</p>
                  <p className="mt-2 text-sm text-cyberGray">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 rounded-2xl border border-cyberPurple/20 bg-cyberPurple/10 p-4">
              <p className="text-sm font-black uppercase tracking-wider text-cyberPurple">Suggested handoff</p>
              <p className="text-sm leading-6 text-cyberGray">Route the final cut to Community, then open Campaigns for the reward and milestone flow.</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <PrimaryButton href="/explore" variant="primary" icon="search">Open scenes</PrimaryButton>
                <PrimaryButton href="/avatar-builder" variant="secondary" icon="cast">Update avatar</PrimaryButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
