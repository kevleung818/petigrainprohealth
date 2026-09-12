import React, { useEffect, useMemo, useState } from 'react';
import Layout from '../components/Layout';

const DEFAULT_STATS = [
  { label: 'Avatars created', value: '24' },
  { label: 'Scenes joined', value: '18' },
  { label: 'Campaigns backed', value: '7' },
  { label: 'Community votes', value: '3.2k' }
];

export default function ProfilePage() {
  const [sessionUser, setSessionUser] = useState(null);
  const [selectedScene, setSelectedScene] = useState(null);
  const [avatarConcept, setAvatarConcept] = useState(null);
  const [generatedCut, setGeneratedCut] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const rawSession = window.localStorage.getItem('vekai-member-session');
      const rawAvatar = window.localStorage.getItem('vekai.avatar');
      const rawScene = window.localStorage.getItem('vekai.selectedScene');
      const rawCut = window.localStorage.getItem('vekai.generatedCut');

      if (rawSession) setSessionUser(JSON.parse(rawSession));
      if (rawAvatar) setAvatarConcept(JSON.parse(rawAvatar));
      if (rawScene) setSelectedScene(JSON.parse(rawScene));
      if (rawCut) setGeneratedCut(JSON.parse(rawCut));
    } catch (error) {
      console.error('Failed to restore profile state', error);
    }
  }, []);

  const projects = useMemo(() => {
    const items = [
      { title: 'Echoes of the Hollow City', status: 'In production' },
      { title: 'Orchid Protocol', status: 'Storyboard ready' }
    ];

    if (selectedScene) {
      items.unshift({ title: `Scene focus: ${selectedScene.title}`, status: 'Selected for launch' });
    }
    if (generatedCut) {
      items.unshift({ title: generatedCut.title || 'Generated campaign cut', status: 'Ready to publish' });
    }
    if (avatarConcept?.avatar?.name) {
      items.unshift({ title: `Avatar: ${avatarConcept.avatar.name}`, status: 'Saved and ready' });
    }

    return items.slice(0, 4);
  }, [selectedScene, avatarConcept, generatedCut]);

  const stats = useMemo(() => {
    const base = [...DEFAULT_STATS];
    if (generatedCut) {
      base[0] = { label: 'Generated cuts', value: '1' };
    }
    if (selectedScene) {
      base[1] = { label: 'Scenes selected', value: '1' };
    }
    return base;
  }, [generatedCut, selectedScene]);

  const displayName = sessionUser?.name || 'Ari Voss';
  const profileRole = sessionUser?.email ? 'Creator • Story architect' : 'Director • Worldbuilder • Story architect';

  return (
    <Layout>
      <div className="space-y-8 p-8">
        <section className="rounded-4xl border border-white/10 bg-cyberPanel/95 p-8 shadow-glow">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Creator profile</p>
              <h1 className="mt-3 text-4xl font-black text-white">Your identity hub for avatars, stories, and community momentum.</h1>
              <p className="mt-4 text-sm leading-7 text-cyberGray">Track your creations, showcase your projects, and keep your followers connected to your latest story worlds.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-black uppercase tracking-wide text-cyberTeal">
              {generatedCut ? 'Campaign ready • published concept' : 'Active creator • 2 new collaborations'}
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-4xl border border-white/10 bg-cyberPanel/95 p-6 shadow-glow">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyberPurple to-cyberTeal text-xl font-black text-cyberSurface">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-black text-white">{displayName}</h2>
                <p className="mt-1 text-sm text-cyberGray">{profileRole}</p>
                {sessionUser?.email && <p className="mt-1 text-xs text-cyberGray">{sessionUser.email}</p>}
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-wider text-cyberGray">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-4xl border border-white/10 bg-cyberPanel/95 p-6 shadow-glow">
            <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Featured projects</p>
            <div className="mt-5 space-y-3">
              {projects.map((project) => (
                <div key={project.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-white">{project.title}</p>
                      <p className="mt-1 text-xs text-cyberGray">{project.status}</p>
                    </div>
                    <span className="rounded-full bg-cyberTeal/10 px-3 py-1 text-2xs font-black uppercase tracking-wider text-cyberTeal">Open</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
