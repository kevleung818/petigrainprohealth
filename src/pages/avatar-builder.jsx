import React, { useEffect, useMemo, useState } from 'react';
import Layout from '../components/Layout';
import PrimaryButton from '../components/PrimaryButton';

const STYLE_PRESETS = [
  {
    name: 'Neon Guardian',
    mood: 'Bold & cinematic',
    tone: 'Cinematic neon',
    presence: 'Any / fluid',
    species: 'Human + mythic blend',
    role: 'Hero • Protector',
    sceneFit: 'Fantasy / cinematic',
    energy: 'Electric',
    aura: 'Radiant'
  },
  {
    name: 'Dream Drift',
    mood: 'Soft & surreal',
    tone: 'Moonlit dreamscape',
    presence: 'Androgynous',
    species: 'Dream-born hybrid',
    role: 'Narrator • Explorer',
    sceneFit: 'Dreamscape / art house',
    energy: 'Gentle',
    aura: 'Luminous'
  },
  {
    name: 'Rogue Echo',
    mood: 'Dark & futuristic',
    tone: 'Night-shift synth',
    presence: 'Non-binary',
    species: 'Cyber mythic',
    role: 'Outlaw • Strategist',
    sceneFit: 'Sci-fi / noir',
    energy: 'Razor-sharp',
    aura: 'Shadowed'
  }
];

const CHARACTER_PRESETS = [
  {
    name: 'Nova Spark',
    tagline: 'Bright-hearted sky hero',
    accent: 'from-cyan-400 via-blue-500 to-violet-600',
    presence: 'Young adult woman',
    species: 'Cartoon human hero',
    tone: 'Bold cel-shaded comic',
    role: 'Sky Guardian • Leader',
    sceneFit: 'Superhero / animated',
    energy: 'Solar lightning',
    aura: 'Electric blue',
    style: 'Nova Spark'
  },
  {
    name: 'Luna Dash',
    tagline: 'Playful moonlight runner',
    accent: 'from-fuchsia-400 via-purple-500 to-indigo-700',
    presence: 'Young adult woman',
    species: 'Cartoon lunar runner',
    tone: 'Playful graphic novel',
    role: 'Speedster • Scout',
    sceneFit: 'Superhero / city chase',
    energy: 'Moonbeam momentum',
    aura: 'Violet glow',
    style: 'Luna Dash'
  },
  {
    name: 'Ember Vale',
    tagline: 'Fearless fire tactician',
    accent: 'from-amber-300 via-orange-500 to-rose-600',
    presence: 'Young adult woman',
    species: 'Cartoon elemental hero',
    tone: 'Warm comic-book ink',
    role: 'Firestarter • Protector',
    sceneFit: 'Superhero / action',
    energy: 'Phoenix flame',
    aura: 'Golden ember',
    style: 'Ember Vale'
  },
  {
    name: 'Pixel Bloom',
    tagline: 'Inventive tech heroine',
    accent: 'from-lime-300 via-emerald-400 to-teal-600',
    presence: 'Young adult woman',
    species: 'Cartoon cyber hero',
    tone: 'Colorful arcade animation',
    role: 'Inventor • Defender',
    sceneFit: 'Superhero / sci-fi',
    energy: 'Holographic pulse',
    aura: 'Neon green',
    style: 'Pixel Bloom'
  }
];

const BUILD_STEPS = [
  { label: 'Identity', done: true },
  { label: 'Style layer', done: true },
  { label: 'Scene fit', done: false }
];

const AVATAR_KEY = 'vekai.avatar';
const MAX_PREVIEW_BYTES = 5 * 1024 * 1024;

export default function AvatarBuilderPage() {
  const [avatar, setAvatar] = useState({
    name: 'Aurora Vey',
    presence: 'Any / fluid',
    species: 'Human + mythic blend',
    tone: 'Cinematic neon',
    role: 'Hero • Protector',
    sceneFit: 'Fantasy / cinematic',
    energy: 'Electric',
    aura: 'Radiant',
    style: 'Neon Guardian'
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [saved, setSaved] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [selectedScene, setSelectedScene] = useState(null);

  useEffect(() => {
    try {
      const savedAvatar = window.localStorage.getItem(AVATAR_KEY);
      if (savedAvatar) {
        const parsed = JSON.parse(savedAvatar);
        setAvatar((current) => ({ ...current, ...parsed.avatar }));
        setPreviewImage(parsed.previewImage || null);
        setSaved(true);
      }

      const savedScene = window.localStorage.getItem('vekai.selectedScene');
      if (savedScene) {
        setSelectedScene(JSON.parse(savedScene));
      }
    } catch (err) {
      console.error('Failed to restore avatar concept', err);
    }
  }, []);

  const handleInput = (field) => (event) => {
    setAvatar((current) => ({ ...current, [field]: event.target.value }));
  };

  const applyPreset = (preset) => {
    setAvatar((current) => ({ ...current, ...preset }));
  };

  const selectedCharacter = CHARACTER_PRESETS.find((preset) => preset.name === avatar.style);

  const handleUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFeedback('');
    if (!file.type.startsWith('image/')) {
      setFeedback('Please choose an image file.');
      event.target.value = '';
      return;
    }
    if (file.size > MAX_PREVIEW_BYTES) {
      setFeedback('Please choose an image smaller than 5 MB.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setPreviewImage(reader.result);
    reader.onerror = () => setFeedback('The image could not be read. Please try again.');
    reader.readAsDataURL(file);
  };

  const saveConcept = () => {
    try {
      const payload = {
        avatar,
        previewImage,
        selectedScene,
        savedAt: new Date().toISOString()
      };
      window.localStorage.setItem(AVATAR_KEY, JSON.stringify(payload));
      setSaved(true);
      setFeedback(selectedScene ? `Concept saved for ${selectedScene.title}.` : 'Concept saved locally.');
    } catch (err) {
      setFeedback('This image is too large to save in the browser. Use a smaller image and try again.');
    }
  };

  const progress = useMemo(() => {
    const doneCount = BUILD_STEPS.filter((step) => step.done).length;
    return `${Math.round((doneCount / BUILD_STEPS.length) * 100)}%`;
  }, []);

  return (
    <Layout>
      <div className="space-y-8 p-8">
        <section className="rounded-4xl border border-white/10 bg-cyberPanel/95 p-8 shadow-glow">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-2xl">
              <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Avatar Studio</p>
              <h1 className="mt-3 text-4xl font-black text-white">Shape your identity, then place it inside any story.</h1>
              <p className="mt-4 text-sm leading-7 text-cyberGray">Create avatars with limitless identity options, style presets, and role-based traits that can be reused across scenes, campaigns, and projects.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="rounded-3xl border border-cyberTeal/20 bg-cyberTeal/10 px-4 py-3 text-sm font-black uppercase tracking-wide text-cyberTeal">
                Ready for scene casting
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-black uppercase tracking-wide text-cyberGray">
                Build progress {progress}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.94fr_1.06fr]">
          <div className="rounded-4xl border border-white/10 bg-cyberPanel/95 p-6 shadow-glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Live preview</p>
                <h2 className="mt-2 text-xl font-black text-white">Current avatar concept</h2>
              </div>
              <span className="rounded-full bg-cyberPurple/10 px-3 py-1 text-2xs font-black uppercase tracking-wider text-cyberPurpleLight">{saved ? 'Saved' : 'Draft'}</span>
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-cyberPanelDeep p-6">
              <label className="flex h-64 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border border-dashed border-white/15 bg-gradient-to-br from-cyberPurple/20 via-cyberSurface to-cyberTeal/20 text-center text-sm text-cyberGray transition hover:border-cyberPurple/50">
                {previewImage ? (
                  <img src={previewImage} alt="Avatar preview" className="h-full w-full object-cover" />
                ) : (
                  <div className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br ${selectedCharacter?.accent || 'from-cyberPurple/30 via-cyberSurface to-cyberTeal/20'} p-6 text-center`}>
                    <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/20 blur-2xl" />
                    <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-white/70 bg-black/20 shadow-2xl">
                      <span className="text-4xl font-black tracking-tight text-white drop-shadow-lg">
                        {selectedCharacter ? selectedCharacter.name.split(' ').map((part) => part[0]).join('') : 'AV'}
                      </span>
                    </div>
                    <p className="relative mt-4 text-lg font-black text-white">{selectedCharacter?.name || avatar.name}</p>
                    <p className="relative mt-1 max-w-xs text-xs font-bold uppercase tracking-wider text-white/75">
                      {selectedCharacter?.tagline || 'Upload a visual reference to personalize this hero'}
                    </p>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
              </label>
              {feedback && <p role="status" className="mt-3 text-sm text-cyberYellow">{feedback}</p>}

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  <span className="text-sm text-cyberGray">Identity</span>
                  <span className="font-black text-white">{avatar.name}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  <span className="text-sm text-cyberGray">Role</span>
                  <span className="font-black text-white">{avatar.role}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  <span className="text-sm text-cyberGray">Scene fit</span>
                  <span className="font-black text-cyberTeal">{avatar.sceneFit}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  <span className="text-sm text-cyberGray">Selected scene</span>
                  <span className="font-black text-white">{selectedScene?.title || 'None yet'}</span>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <PrimaryButton variant="primary" className="w-full" icon="cast" onClick={saveConcept}>
                  Save concept
                </PrimaryButton>
                <PrimaryButton variant="secondary" className="w-full" icon="search" onClick={() => setPreviewImage(null)}>
                  Clear preview
                </PrimaryButton>
              </div>
              {selectedScene && (
                <div className="mt-4 rounded-2xl border border-cyberPurple/20 bg-cyberPurple/10 p-3 text-sm text-cyberPurpleLight">
                  Ready to cast into <span className="font-black">{selectedScene.title}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-4xl border border-white/10 bg-cyberPanel/95 p-6 shadow-glow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Identity controls</p>
                  <h2 className="mt-2 text-lg font-black text-white">Fine-tune the character details</h2>
                </div>
                <span className="text-sm text-cyberGray">Live update</span>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <label className="text-sm text-cyberGray">
                  <span className="mb-2 block text-2xs font-black uppercase tracking-wider text-cyberGrayMuted">Avatar name</span>
                  <input className="w-full rounded-2xl border border-white/10 bg-cyberBlack/20 px-4 py-3 text-sm text-white outline-none" value={avatar.name} onChange={handleInput('name')} />
                </label>
                <label className="text-sm text-cyberGray">
                  <span className="mb-2 block text-2xs font-black uppercase tracking-wider text-cyberGrayMuted">Gender / presence</span>
                  <input className="w-full rounded-2xl border border-white/10 bg-cyberBlack/20 px-4 py-3 text-sm text-white outline-none" value={avatar.presence} onChange={handleInput('presence')} />
                </label>
                <label className="text-sm text-cyberGray">
                  <span className="mb-2 block text-2xs font-black uppercase tracking-wider text-cyberGrayMuted">Species / archetype</span>
                  <input className="w-full rounded-2xl border border-white/10 bg-cyberBlack/20 px-4 py-3 text-sm text-white outline-none" value={avatar.species} onChange={handleInput('species')} />
                </label>
                <label className="text-sm text-cyberGray">
                  <span className="mb-2 block text-2xs font-black uppercase tracking-wider text-cyberGrayMuted">Visual tone</span>
                  <input className="w-full rounded-2xl border border-white/10 bg-cyberBlack/20 px-4 py-3 text-sm text-white outline-none" value={avatar.tone} onChange={handleInput('tone')} />
                </label>
                <label className="text-sm text-cyberGray">
                  <span className="mb-2 block text-2xs font-black uppercase tracking-wider text-cyberGrayMuted">Energy</span>
                  <input className="w-full rounded-2xl border border-white/10 bg-cyberBlack/20 px-4 py-3 text-sm text-white outline-none" value={avatar.energy} onChange={handleInput('energy')} />
                </label>
                <label className="text-sm text-cyberGray">
                  <span className="mb-2 block text-2xs font-black uppercase tracking-wider text-cyberGrayMuted">Aura</span>
                  <input className="w-full rounded-2xl border border-white/10 bg-cyberBlack/20 px-4 py-3 text-sm text-white outline-none" value={avatar.aura} onChange={handleInput('aura')} />
                </label>
              </div>
            </div>

            <div className="rounded-4xl border border-white/10 bg-cyberPanel/95 p-6 shadow-glow">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Character library</p>
                  <h2 className="mt-2 text-lg font-black text-white">Start with a cartoon superhero</h2>
                </div>
                <span className="text-sm text-cyberGray">Choose, then remix</span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {CHARACTER_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    aria-pressed={avatar.style === preset.name}
                    className={`group overflow-hidden rounded-2xl border text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyberTeal ${avatar.style === preset.name ? 'border-cyberTeal/70 bg-cyberTeal/10' : 'border-white/10 bg-white/5 hover:border-cyberTeal/50'}`}
                  >
                    <div className={`flex h-24 items-end bg-gradient-to-br ${preset.accent} p-3`}>
                      <span className="text-3xl font-black tracking-tight text-white drop-shadow-lg">{preset.name.split(' ').map((part) => part[0]).join('')}</span>
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-black text-white">{preset.name}</p>
                      <p className="mt-1 text-xs text-cyberGray">{preset.tagline}</p>
                      <span className="mt-3 inline-flex rounded-full bg-white/10 px-2 py-1 text-2xs font-black uppercase tracking-wider text-cyberTeal">{preset.role.split(' • ')[0]}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-4xl border border-white/10 bg-cyberPanel/95 p-6 shadow-glow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Style presets</p>
                  <h2 className="mt-2 text-lg font-black text-white">Choose a starting point</h2>
                </div>
                <span className="text-sm text-cyberGray">Fast build</span>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {STYLE_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className={`rounded-2xl border p-4 text-left transition ${avatar.style === preset.name ? 'border-cyberPurple/60 bg-cyberPurple/10' : 'border-white/10 bg-white/5 hover:border-cyberPurple/40'}`}
                  >
                    <p className="text-sm font-black text-white">{preset.name}</p>
                    <p className="mt-2 text-xs text-cyberGray">{preset.mood}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-4xl border border-white/10 bg-cyberPanel/95 p-6 shadow-glow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Build checklist</p>
                  <h2 className="mt-2 text-lg font-black text-white">Keep the concept moving</h2>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {BUILD_STEPS.map((step) => (
                  <div key={step.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <span className="text-sm text-white">{step.label}</span>
                    <span className={`text-xs font-black uppercase tracking-wider ${step.done ? 'text-cyberTeal' : 'text-cyberGray'}`}>
                      {step.done ? 'Complete' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
