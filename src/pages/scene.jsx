import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import PrimaryButton from '../components/PrimaryButton';

const SCENE_LIBRARY = [
  { id: 'scene-1', title: 'Neon Streets', tag: 'Cinematic', description: 'Urban night energy with reflective surfaces and electric shadows.', image: '/demo/demo-thumb-1.jpg' },
  { id: 'scene-2', title: 'Moonlit Atelier', tag: 'Dreamscape', description: 'Soft ambient tones for intimate, editorial character frames.', image: '/demo/demo-thumb-2.jpg' },
  { id: 'scene-3', title: 'Glass District', tag: 'Futuristic', description: 'Sharp architectural lines and cool lighting for product storytelling.', image: '/demo/demo-thumb-3.jpg' },
  { id: 'scene-4', title: 'Summit Echo', tag: 'Adventure', description: 'High-contrast hero framing built for dramatic launch moments.', image: '/demo/demo-thumb-4.jpg' }
];

export default function ScenePage() {
  const [selectedSceneId, setSelectedSceneId] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = window.localStorage.getItem('vekai.selectedScene');
      if (!saved) return;
      const parsed = JSON.parse(saved);
      if (parsed?.id) setSelectedSceneId(parsed.id);
    } catch (error) {
      console.error('Failed to restore selected scene', error);
    }
  }, []);

  const handleSelectScene = (scene) => {
    setSelectedSceneId(scene.id);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('vekai.selectedScene', JSON.stringify(scene));
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-6xl space-y-6 p-8">
        <section className="rounded-3xl border border-white/10 bg-cyberPanel/95 p-6 shadow-glow">
          <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Scenes</p>
          <h1 className="mt-2 text-3xl font-black text-white">Scene library and management</h1>
          <p className="mt-3 text-sm text-cyberGray">Choose the scene that will anchor your next avatar cast and campaign flow.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <PrimaryButton href="/explore" variant="primary" icon="search">Explore library</PrimaryButton>
            <PrimaryButton href="/workflow" variant="secondary" icon="play">Open workflow</PrimaryButton>
          </div>
        </section>

        <section className="grid gap-6 sm:grid-cols-2">
          {SCENE_LIBRARY.map((scene) => {
            const isSelected = selectedSceneId === scene.id;

            return (
              <article key={scene.id} className={`overflow-hidden rounded-2xl border p-3 transition ${isSelected ? 'border-cyberPurple/60 bg-cyberPurple/10' : 'border-white/10 bg-cyberPanelDeep'}`}>
                <img src={scene.image} alt={scene.title} className="h-40 w-full object-cover" />
                <div className="mt-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-black text-white">{scene.title}</h3>
                      <p className="mt-1 text-xs text-cyberGray">Key feature: {scene.tag}</p>
                    </div>
                    {isSelected && <span className="rounded-full bg-cyberTeal/15 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-cyberTeal">Selected</span>}
                  </div>
                  <p className="mt-3 text-sm text-cyberGray">{scene.description}</p>
                  <div className="mt-4 flex justify-between gap-3">
                    <PrimaryButton href={`/explore?scene=${scene.id}`} className="px-3 py-2 text-2xs" variant="secondary" icon="cast">Preview</PrimaryButton>
                    <button
                      type="button"
                      onClick={() => handleSelectScene(scene)}
                      className={`rounded-none px-3 py-2 text-2xs font-black uppercase tracking-[0.24em] transition ${isSelected ? 'bg-cyberTeal text-slate-950' : 'border border-white/10 bg-white/5 text-white'}`}
                    >
                      {isSelected ? 'Selected' : 'Use scene'}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </Layout>
  );
}
