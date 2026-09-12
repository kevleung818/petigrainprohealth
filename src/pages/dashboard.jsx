import React, { useEffect, useMemo, useState } from 'react';
import Layout from '../components/Layout';
import PrimaryButton from '../components/PrimaryButton';
import Tag from '../components/Tag';

const MESSAGES = [
  { title: 'New scene review request', detail: 'Mina wants a final pass on the opening cut.', time: '12m ago', level: 'Urgent' },
  { title: 'Campaign milestone approved', detail: 'Your reward unlock tier passed review.', time: '1h ago', level: 'Ready' },
  { title: 'Community poll closing soon', detail: 'Vote to decide the next story direction.', time: '3h ago', level: 'Watch' }
];

const AVATAR_STATS = [
  { label: 'Active avatars', value: '18', change: '+3 this week' },
  { label: 'Avg. completion', value: '84%', change: '+7% from last cycle' },
  { label: 'Preset reuse', value: '62%', change: 'Most used in campaigns' }
];

const SCENE_STATUS = [
  { name: 'Shadowstrike teaser', status: 'In review', progress: 78, feature: 'Cinematic lighting' },
  { name: 'Neon dreamscape', status: 'Approved', progress: 100, feature: 'Adaptive character motion' },
  { name: 'Studio loop', status: 'Draft', progress: 41, feature: 'Loop-friendly transitions' }
];

const TRANSACTIONS = [
  { label: 'Revenue this month', value: '$12,840', delta: '+18.2%' },
  { label: 'Pending payouts', value: '$2,350', delta: '4 items' },
  { label: 'Refund risk', value: '2', delta: 'Needs review' }
];

const RECENT_TRANSACTIONS = [
  { title: 'Scene pack unlock', amount: '$680', state: 'Collected' },
  { title: 'Merch bundle', amount: '$320', state: 'Pending' },
  { title: 'Campaign sponsorship', amount: '$1,200', state: 'Paid' }
];

const ATTENTION_ITEMS = [
  { item: 'Reward tier B asset', note: 'Missing final image export' },
  { item: 'Community FAQ copy', note: 'Needs approval before launch' }
];

const STORE_STATS = [
  { label: 'Products live', value: '24', change: '8 new this week' },
  { label: 'Store conversion', value: '6.8%', change: '+1.1% from last week' },
  { label: 'Best seller', value: 'Neon Hoodie', change: '126 sold' }
];

const STORE_ITEMS = [
  { title: 'Neon Hoodie', type: 'Merch', sales: '126 sold' },
  { title: 'Scene pass bundle', type: 'Service', sales: '48 active' },
  { title: 'Creator kit', type: 'Product', sales: '21 reserved' }
];

const CAMPAIGN_STATUS = [
  { title: 'Launch trailer', status: 'Ready', percent: 84 },
  { title: 'Community teaser', status: 'Queued', percent: 64 },
  { title: 'Reward unlock', status: 'Review', percent: 45 }
];

const COMMUNITY_STATUS = [
  { title: 'Weekly poll', value: '81% engaged' },
  { title: 'New followers', value: '+192 this week' },
  { title: 'Hot discussion', value: 'Scene pacing' }
];

const DASHBOARD_CHARTS = [
  { title: 'Weekly reach', value: '18.2k', detail: 'Impressions this week', bars: [40, 58, 52, 76, 84, 72, 94], color: 'cyberTeal' },
  { title: 'Community pulse', value: '81%', detail: 'Engagement rate', bars: [30, 44, 62, 78, 70, 83, 88], color: 'cyberPurple' },
  { title: 'Store conversions', value: '6.8%', detail: 'Conversion trend', bars: [22, 34, 48, 60, 56, 66, 74], color: 'cyberYellow' }
];

const MEDIA_GALLERY = [
  { src: '/demo/demo-thumb-1.jpg', label: 'Moodboard drop' },
  { src: '/demo/demo-thumb-2.jpg', label: 'Set design inspo' },
  { src: '/demo/demo-thumb-3.jpg', label: 'Talent storyboard' }
];

const NEWS_ITEMS = [
  { title: 'New scene presets dropped', detail: 'Use the updated cinematic and surreal packs for faster production.', tag: 'New' },
  { title: 'Creator analytics refreshed', detail: 'See clearer engagement trends across campaigns and scenes.', tag: 'Update' }
];

const CHART_COLORS = {
  cyberTeal: 'rgba(64, 255, 221, 0.24)',
  cyberPurple: 'rgba(179, 44, 255, 0.24)',
  cyberYellow: 'rgba(255, 204, 72, 0.24)'
};

function MiniBarChart({ bars, color }) {
  return (
    <div className="mt-4 flex items-end gap-2 h-24">
      {bars.map((value, index) => (
        <div key={`${value}-${index}`} className="flex-1 rounded-full" style={{ height: `${value}%`, backgroundColor: CHART_COLORS[color] }} />
      ))}
    </div>
  );
}

export default function DashboardPage() {
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
      console.error('Failed to restore dashboard workflow state', error);
    }
  }, []);

  const activeNarrative = useMemo(() => {
    if (generatedCut?.title) return generatedCut.title;
    if (selectedScene?.title) return selectedScene.title;
    if (avatarConcept?.avatar?.name) return `${avatarConcept.avatar.name} concept`;
    return 'Trending story arc';
  }, [generatedCut, selectedScene, avatarConcept]);

  const primaryMetric = useMemo(() => {
    if (generatedCut) return 'Campaign cut ready';
    if (selectedScene) return `${selectedScene.title}`;
    return '18.2k';
  }, [generatedCut, selectedScene]);

  const primaryMetricDetail = useMemo(() => {
    if (generatedCut) return 'Your generated cut is staged for review';
    if (selectedScene) return 'Scene selected and ready for cast';
    return 'Impressions this week';
  }, [generatedCut, selectedScene]);

  const journeySteps = useMemo(() => ([
    {
      label: 'Join the creator workspace',
      detail: 'Member account active',
      done: true,
      href: '/profile'
    },
    {
      label: 'Build your avatar',
      detail: avatarConcept?.avatar?.name || 'Choose a character preset and shape the identity',
      done: Boolean(avatarConcept?.avatar),
      href: '/avatar-builder'
    },
    {
      label: 'Cast into an AI scene',
      detail: generatedCut?.title || selectedScene?.title || 'Select a scene, then create your cut',
      done: Boolean(generatedCut),
      href: '/explore'
    },
    {
      label: 'Gather the production team',
      detail: 'Assign roles, assets, milestones, and approvals',
      done: false,
      href: '/campaigns'
    },
    {
      label: 'Share, discuss, and sell',
      detail: 'Publish to Community and track scene-linked products',
      done: false,
      href: '/community'
    }
  ]), [avatarConcept, generatedCut, selectedScene]);

  return (
    <Layout>
      <div className="space-y-6">
        <section className="rounded-[2.5rem] border border-white/10 bg-cyberPanel/95 p-8 shadow-glow-lg backdrop-blur-sm">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr] lg:items-end">
            <div className="max-w-2xl">
              <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Dashboard recap</p>
              <h1 className="mt-3 text-4xl font-black text-white">Everything important, in one place.</h1>
              <p className="mt-4 text-sm leading-7 text-cyberGray">Stay on top of messages, avatar progress, scene readiness, transactions, store performance, campaign movement, community momentum, and the latest updates.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-3xs uppercase tracking-wider text-cyberGray">Live insight</p>
                  <p className="mt-2 text-2xl font-black text-white">{activeNarrative}</p>
                  <p className="mt-3 text-sm text-cyberGray">Current creative direction is live across your scene, avatar, and workflow context.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-cyberPanelDeep p-4">
                  <p className="text-3xs uppercase tracking-wider text-cyberGray">Top metric</p>
                  <p className="mt-2 text-3xl font-black text-cyberTeal">{primaryMetric}</p>
                  <p className="mt-1 text-sm text-cyberGray">{primaryMetricDetail}</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <PrimaryButton href="/community" variant="secondary" icon="user">Open community</PrimaryButton>
                <PrimaryButton href="/workflow" variant="primary" icon="play">Go to workflow</PrimaryButton>
              </div>
            </div>
            <div className="space-y-4">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/10 shadow-2xl shadow-black/20">
                <video className="w-full max-h-[300px] object-cover" src="/demo/demo-video.mp4" autoPlay muted loop playsInline />
                <div className="bg-black/60 p-4 text-white">
                  <p className="text-2xs uppercase tracking-wider text-cyberGray">Media spotlight</p>
                  <p className="mt-2 text-lg font-black">{generatedCut ? generatedCut.title : 'Demo film cut preview'}</p>
                  <p className="mt-2 text-sm text-cyberGray">{generatedCut ? 'Launch-ready story cut is ready for review.' : 'A quick visual sample of your latest campaign mood and scene flow.'}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {MEDIA_GALLERY.map((media) => (
                  <div key={media.src} className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                    <img src={media.src} alt={media.label} className="h-24 w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          {DASHBOARD_CHARTS.map((chart) => (
            <div key={chart.title} className="rounded-4xl border border-white/10 bg-cyberPanel/95 p-6 shadow-glow">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">{chart.title}</p>
                  <p className="mt-3 text-3xl font-black text-white">{chart.value}</p>
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-2xs font-black uppercase tracking-wider text-cyberGray">{chart.detail}</span>
              </div>
              <MiniBarChart bars={chart.bars} color={chart.color} />
              <p className="mt-4 text-sm text-cyberGray">Trend over the past 7 days. Use this panel to compare media cadence, community buzz, and store lift in one glance.</p>
            </div>
          ))}
        </section>

        <section className="rounded-4xl border border-cyberTeal/20 bg-gradient-to-br from-cyberTeal/10 via-cyberPanel/95 to-cyberPurple/10 p-6 shadow-glow">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberTeal">Your production journey</p>
              <h2 className="mt-2 text-2xl font-black text-white">From first idea to shared release</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-cyberGray">Move through the creative loop, bring collaborators into the campaign, and connect every scene to its community and merchandise story.</p>
            </div>
            <span className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-2xs font-black uppercase tracking-wider text-cyberGray">{journeySteps.filter((step) => step.done).length}/{journeySteps.length} complete</span>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {journeySteps.map((step, index) => (
              <a key={step.label} href={step.href} className={`rounded-2xl border p-4 transition hover:-translate-y-0.5 ${step.done ? 'border-cyberTeal/30 bg-cyberTeal/10' : 'border-white/10 bg-black/10 hover:border-cyberPurple/40'}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black ${step.done ? 'bg-cyberTeal text-cyberBlack' : 'bg-white/10 text-cyberGray'}`}>{step.done ? '✓' : index + 1}</span>
                  <span className="text-2xs font-black uppercase tracking-wider text-cyberGrayMuted">{step.done ? 'Ready' : 'Next'}</span>
                </div>
                <p className="mt-4 text-sm font-black text-white">{step.label}</p>
                <p className="mt-2 text-xs leading-5 text-cyberGray">{step.detail}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-4xl border border-white/10 bg-cyberPanel/95 p-6 shadow-glow">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Important messages</p>
                <h2 className="mt-2 text-2xl font-black text-white">Notifications that need attention</h2>
              </div>
              <span className="rounded-full bg-cyberPurple/10 px-3 py-2 text-2xs font-black uppercase tracking-wider text-cyberPurple">3 new</span>
            </div>
            <div className="mt-5 space-y-3">
              {MESSAGES.map((message) => (
                <div key={message.title} className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/8 to-transparent p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-white">{message.title}</p>
                      <p className="mt-2 text-sm leading-6 text-cyberGray">{message.detail}</p>
                    </div>
                    <span className="rounded-full bg-cyberTeal/10 px-3 py-1 text-2xs font-black uppercase tracking-wider text-cyberTeal">{message.level}</span>
                  </div>
                  <p className="mt-3 text-2xs uppercase tracking-wider text-cyberGrayMuted">{message.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-4xl border border-white/10 bg-cyberPanel/95 p-6 shadow-glow">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Avatar statistics</p>
                <h2 className="mt-2 text-2xl font-black text-white">Studio momentum</h2>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {AVATAR_STATS.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyberPurple/10 to-transparent p-4">
                  <p className="text-3xs uppercase tracking-wider text-cyberGray">{item.label}</p>
                  <p className="mt-2 text-xl font-black text-white">{item.value}</p>
                  <p className="mt-1 text-sm text-cyberGray">{item.change}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-4xl border border-white/10 bg-cyberPanel/95 p-6 shadow-glow">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Scene status</p>
                <h2 className="mt-2 text-2xl font-black text-white">Scene rollout and features</h2>
              </div>
              <PrimaryButton href="/explore" variant="secondary" className="rounded-full px-4 py-2 text-2xs" icon="search">
                Open scenes
              </PrimaryButton>
            </div>
            <div className="mt-5 space-y-4">
              {SCENE_STATUS.map((scene) => (
                <div key={scene.name} className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/8 to-transparent p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-white">{scene.name}</p>
                      <p className="mt-1 text-sm text-cyberGray">{scene.feature}</p>
                    </div>
                    <span className="rounded-full bg-cyberYellow/10 px-3 py-1 text-2xs font-black uppercase tracking-wider text-cyberYellow">{scene.status}</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white/10">
                    <div className="h-2 rounded-full bg-cyberTeal" style={{ width: `${scene.progress}%` }} />
                  </div>
                  <p className="mt-2 text-2xs uppercase tracking-wider text-cyberGrayMuted">{scene.progress}% complete</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-4xl border border-white/10 bg-cyberPanel/95 p-6 shadow-glow">
              <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Transaction statistics</p>
              <div className="mt-5 grid gap-3">
                {TRANSACTIONS.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyberTeal/10 to-transparent p-4">
                    <p className="text-sm font-black text-white">{item.label}</p>
                    <p className="mt-2 text-xl font-black text-cyberTeal">{item.value}</p>
                    <p className="mt-1 text-sm text-cyberGray">{item.delta}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-4xl border border-white/10 bg-cyberPanel/95 p-6 shadow-glow">
              <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Items needing attention</p>
              <div className="mt-5 space-y-3">
                {ATTENTION_ITEMS.map((item) => (
                  <div key={item.item} className="rounded-2xl border border-cyberPurple/20 bg-cyberPurple/10 p-4">
                    <p className="text-sm font-black text-white">{item.item}</p>
                    <p className="mt-2 text-sm text-cyberGray">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-4xl border border-white/10 bg-cyberPanel/95 p-6 shadow-glow">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Store statistics</p>
                <h2 className="mt-2 text-2xl font-black text-white">Recent and featured store activity</h2>
              </div>
              <PrimaryButton href="/store" variant="secondary" className="rounded-full px-4 py-2 text-2xs" icon="shop">
                View store
              </PrimaryButton>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {STORE_STATS.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyberPurple/10 to-transparent p-4">
                  <p className="text-3xs uppercase tracking-wider text-cyberGray">{item.label}</p>
                  <p className="mt-2 text-lg font-black text-white">{item.value}</p>
                  <p className="mt-1 text-sm text-cyberGray">{item.change}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-3">
              {STORE_ITEMS.map((item) => (
                <div key={item.title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div>
                    <p className="text-sm font-black text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-cyberGray">{item.type}</p>
                  </div>
                  <span className="text-sm font-black text-cyberTeal">{item.sales}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-4xl border border-white/10 bg-cyberPanel/95 p-6 shadow-glow">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Recent transactions</p>
                <h2 className="mt-2 text-2xl font-black text-white">Latest movement</h2>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {RECENT_TRANSACTIONS.map((item) => (
                <div key={item.title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div>
                    <p className="text-sm font-black text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-cyberGray">{item.state}</p>
                  </div>
                  <span className="text-sm font-black text-cyberTeal">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_1fr_1fr]">
          <div className="rounded-4xl border border-white/10 bg-cyberPanel/95 p-6 shadow-glow">
            <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Campaign status</p>
            <div className="mt-5 space-y-3">
              {CAMPAIGN_STATUS.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-black text-white">{item.title}</p>
                    <span className="text-2xs font-black uppercase tracking-wider text-cyberTeal">{item.status}</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white/10">
                    <div className="h-2 rounded-full bg-cyberPurple" style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-4xl border border-white/10 bg-cyberPanel/95 p-6 shadow-glow">
            <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Community status</p>
            <div className="mt-5 space-y-3">
              {COMMUNITY_STATUS.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-black text-white">{item.title}</p>
                  <p className="mt-2 text-sm text-cyberGray">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-4xl border border-white/10 bg-cyberPanel/95 p-6 shadow-glow">
            <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">News</p>
            <div className="mt-5 space-y-3">
              {NEWS_ITEMS.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-black text-white">{item.title}</p>
                    <Tag variant="warm">{item.tag}</Tag>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-cyberGray">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
