import React, { useMemo, useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PrimaryButton from '../components/PrimaryButton';
import { fetchCampaigns, fetchCommunityPosts } from '../lib/apiClient';

const COMMUNITY_STATS = [
  { label: 'Live polls', value: '12' },
  { label: 'Creator circles', value: '89' },
  { label: 'Moments today', value: '247' }
];

const POLL_OPTIONS = [
  { label: 'More documentary-style scenes', votes: 64 },
  { label: 'More cinematic action drops', votes: 41 },
  { label: 'More experimental fashion edits', votes: 22 }
];

const COMMUNICATION_CHANNELS = [
  { name: 'Story circle', members: '24 members', active: true },
  { name: 'Scene feedback', members: '12 members', active: false },
  { name: 'Campaign crew', members: '9 members', active: false }
];

const DISCUSSION_ITEMS = [
  { author: 'Mina', text: 'The new avatar mood fits the scene really well.' },
  { author: 'Jules', text: 'Can we add a stronger mythic reference to the opening shot?' },
  { author: 'Ari', text: 'Yes — I’ll update the storyboard and share the next draft tonight.' }
];

export default function CommunityPage() {
  const [cuts, setCuts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [activeTab, setActiveTab] = useState('featured');
  const [followed, setFollowed] = useState([]);
  const [generatedCut, setGeneratedCut] = useState(null);

  useEffect(() => {
    try {
      const savedCut = window.localStorage.getItem('vekai.generatedCut');
      if (savedCut) setGeneratedCut(JSON.parse(savedCut));
    } catch (err) {
      console.error('Failed to restore generated cut', err);
    }

    let mounted = true;
  setLoadError('');
    Promise.all([fetchCampaigns(), fetchCommunityPosts()])
      .then(([campaigns, posts]) => {
        if (!mounted) return;
        setCuts(campaigns);
        setPosts(posts);
      })
      .catch((err) => {
        if (mounted) setLoadError(err.message || 'Unable to load community data.');
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [loadAttempt]);

  const featuredPost = useMemo(() => posts[0], [posts]);

  const toggleFollow = (id) => {
    setFollowed((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const clearGeneratedCut = () => {
    window.localStorage.removeItem('vekai.generatedCut');
    window.localStorage.removeItem('vekai.selectedScene');
    setGeneratedCut(null);
  };

  return (
    <Layout>
      <div className="space-y-10 p-8">
        <section className="mx-auto max-w-[1200px] rounded-4xl border border-white/10 bg-cyberPanel/95 p-8 shadow-glow">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Community</p>
              <h1 className="mt-3 text-4xl font-black text-white">Connect, vote, and celebrate creator moments.</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-cyberGray">Explore official cuts, join live polls, and discover the creators shaping the Roleverse experience.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 sm:items-center">
              <PrimaryButton href="/community" className="w-full sm:w-auto" variant="primary" icon="user">
                Follow creators
              </PrimaryButton>
              <PrimaryButton href="/explore" className="w-full sm:w-auto" variant="secondary" icon="cast">
                Start a cut
              </PrimaryButton>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {COMMUNITY_STATS.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-3xs uppercase tracking-wider text-cyberGray">{stat.label}</p>
                <p className="mt-2 text-xl font-black text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        {loadError && (
          <div role="alert" className="rounded-4xl border border-red-400/20 bg-red-400/10 p-6 text-sm text-red-200">
            <p className="font-black text-white">Community data could not load.</p>
            <p className="mt-2">{loadError}</p>
            <button
              type="button"
              onClick={() => setLoadAttempt((attempt) => attempt + 1)}
              className="mt-4 rounded-full border border-red-300/30 bg-red-300/10 px-4 py-2 text-2xs font-black uppercase tracking-wider text-red-100 transition hover:bg-red-300/20"
            >
              Try again
            </button>
          </div>
        )}

        <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-4xl border border-white/10 bg-cyberPanel/95 p-6 shadow-glow">
            <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Studio channels</p>
            <div className="mt-5 space-y-3">
              {COMMUNICATION_CHANNELS.map((channel) => (
                <div key={channel.name} className={`rounded-2xl border p-4 ${channel.active ? 'border-cyberTeal/30 bg-cyberTeal/10' : 'border-white/10 bg-white/5'}`}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-black text-white">{channel.name}</p>
                    {channel.active && <span className="text-2xs font-black uppercase tracking-wider text-cyberTeal">Live</span>}
                  </div>
                  <p className="mt-2 text-xs text-cyberGray">{channel.members}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-4xl border border-white/10 bg-cyberPanel/95 p-6 shadow-glow">
            <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Latest discussion</p>
            <div className="mt-5 space-y-3">
              {DISCUSSION_ITEMS.map((item) => (
                <div key={item.author + item.text} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-black text-white">{item.author}</p>
                  <p className="mt-2 text-sm leading-6 text-cyberGray">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-dashed border-white/10 p-4 text-sm text-cyberGray">
              Add a note, share a scene revision, or start a new discussion thread.
            </div>
          </div>
        </section>

        <section className="rounded-4xl border border-white/10 bg-cyberPanel/95 p-6 shadow-glow">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('featured')}
              className={`rounded-full px-4 py-2 text-2xs font-black uppercase tracking-wider transition ${activeTab === 'featured' ? 'bg-cyberPurple text-white' : 'border border-white/10 bg-white/5 text-cyberGray'}`}
            >
              Featured
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('feed')}
              className={`rounded-full px-4 py-2 text-2xs font-black uppercase tracking-wider transition ${activeTab === 'feed' ? 'bg-cyberPurple text-white' : 'border border-white/10 bg-white/5 text-cyberGray'}`}
            >
              Feed
            </button>
          </div>

          {activeTab === 'featured' ? (
            <div className="mt-6 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
              {generatedCut && (
                <div className="overflow-hidden rounded-3xl border border-cyberTeal/30 bg-cyberTeal/5 lg:col-span-2">
                  <div className="border-b border-cyberTeal/20 px-6 py-4">
                    <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberTeal">Your latest cut</p>
                    <h2 className="mt-2 text-2xl font-black text-white">{generatedCut.title}</h2>
                    <p className="mt-2 text-sm text-cyberGray">{generatedCut.avatarName} is now part of the Roleverse.</p>
                  </div>
                  <div className="grid gap-6 p-6 lg:grid-cols-[1.3fr_0.7fr]">
                    <video controls playsInline className="aspect-video w-full rounded-2xl bg-black" src={generatedCut.swappedVideoUrl} poster={generatedCut.image} />
                    <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5">
                      <div>
                        <p className="text-sm leading-7 text-cyberGray">Your transformation is ready to share with the community. Keep iterating or start another scene cast from Explore.</p>
                        <div className="mt-5 flex flex-wrap gap-2 text-2xs font-black uppercase tracking-wider text-cyberGrayMuted">
                          <span className="rounded-full bg-cyberPurple/10 px-3 py-2 text-cyberPurpleLight">{generatedCut.category}</span>
                          <span className="rounded-full bg-white/5 px-3 py-2">{generatedCut.session}</span>
                        </div>
                      </div>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <PrimaryButton href="/explore" variant="primary" icon="cast">Cast another scene</PrimaryButton>
                        <button type="button" onClick={clearGeneratedCut} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-2xs font-black uppercase tracking-wider text-cyberGray transition hover:bg-white/10">
                          Start fresh
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-cyberPanelDeep">
                <div className="border-b border-white/10 bg-gradient-to-br from-cyberPurple/20 to-cyberTeal/10 p-6">
                  <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Spotlight</p>
                  <h2 className="mt-3 text-2xl font-black text-white">{featuredPost?.text || 'Community spotlight is loading'}</h2>
                  <p className="mt-4 text-sm leading-7 text-cyberGray">Creators are collaborating in real time as fresh scenes move from draft to launch.</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-2xs uppercase tracking-wider text-cyberGray">Live engagement</span>
                    <PrimaryButton href="/campaigns" variant="secondary" className="rounded-full px-4 py-2 text-2xs" icon="user">
                      Join poll
                    </PrimaryButton>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-cyberGray">
                    <span>♥ {featuredPost?.likes || 0}</span>
                    <span>↻ {featuredPost?.shares || 0}</span>
                    <span>● {followed.length} following</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Live poll</p>
                      <h2 className="mt-3 text-xl font-black text-white">What should the next community cut explore?</h2>
                    </div>
                  </div>
                  <div className="mt-5 space-y-3">
                    {POLL_OPTIONS.map((option) => (
                      <div key={option.label} className="rounded-2xl border border-white/10 bg-cyberPanelDeep px-4 py-3">
                        <div className="flex items-center justify-between gap-3 text-sm text-cyberGray">
                          <span>{option.label}</span>
                          <span className="font-black text-white">{option.votes}%</span>
                        </div>
                        <div className="mt-3 h-2 rounded-full bg-white/10">
                          <div className="h-2 rounded-full bg-cyberPurple" style={{ width: `${option.votes}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Official community cuts</p>
                      <h2 className="mt-3 text-xl font-black text-white">The hottest shared creative drops</h2>
                    </div>
                    <PrimaryButton href="/campaigns" variant="secondary" className="rounded-full px-4 py-2 text-2xs" icon="user">
                      See leaderboard
                    </PrimaryButton>
                  </div>
                  <div className="mt-6 grid gap-4">
                    {loading ? (
                      <div className="text-cyberGray">Loading...</div>
                    ) : (
                      cuts.map((cut) => (
                        <div key={cut.id} className="overflow-hidden rounded-3xl border border-white/10 bg-cyberPanelDeep">
                          <img src={cut.image} alt={cut.title} className="h-32 w-full object-cover" />
                          <div className="p-4">
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <span className="inline-flex rounded-full bg-cyberYellow/10 px-3 py-1 text-2xs font-black uppercase tracking-wider text-cyberYellow">Official Cut</span>
                                <h3 className="mt-3 text-sm font-black text-white">{cut.title}</h3>
                              </div>
                              <button
                                type="button"
                                onClick={() => toggleFollow(cut.id)}
                                className={`rounded-full px-3 py-2 text-2xs font-black uppercase tracking-wider transition ${followed.includes(cut.id) ? 'bg-cyberPurple text-white' : 'border border-white/10 bg-white/5 text-cyberGray'}`}
                              >
                                {followed.includes(cut.id) ? 'Following' : 'Follow'}
                              </button>
                            </div>
                            <p className="mt-2 text-xs uppercase tracking-wide text-cyberGrayMuted">{cut.user}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {loading ? (
                <div className="text-cyberGray">Loading...</div>
              ) : (
                posts.map((item) => (
                  <div key={item.id} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm text-gray-200">{item.text}</p>
                      <button
                        type="button"
                        onClick={() => toggleFollow(item.id)}
                        className={`rounded-full px-3 py-2 text-2xs font-black uppercase tracking-wider transition ${followed.includes(item.id) ? 'bg-cyberPurple text-white' : 'border border-white/10 bg-white/5 text-cyberGray'}`}
                      >
                        {followed.includes(item.id) ? 'Following' : 'Follow'}
                      </button>
                    </div>
                    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-3xs uppercase tracking-wide text-cyberGray">
                      <span>♥ {item.likes}</span>
                      <span>↻ {item.shares}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
