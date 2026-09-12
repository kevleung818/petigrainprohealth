import React, { useMemo, useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PrimaryButton from '../components/PrimaryButton';
import { fetchCampaigns, fetchProducts, saveCampaign as persistCampaign } from '../lib/apiClient';

const CAMPAIGN_MILESTONES = [
  { title: 'Open the gate', detail: 'Reach 500 campaign points', pct: '72%' },
  { title: 'Unlock neon drop', detail: 'Complete 2 scene casts', pct: '48%' },
  { title: 'Community spotlight', detail: 'Trigger 3 creator votes', pct: '24%' }
];

const CAMPAIGN_STATS = [
  { label: 'Points needed', value: '1,820' },
  { label: 'Days remaining', value: '6' },
  { label: 'Active teams', value: '14' }
];

export default function CampaignsPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [selectedTab, setSelectedTab] = useState('management');

  // Make campaign lists mutable state so create/edit updates the UI
  const [currentCampaigns, setCurrentCampaigns] = useState([
    { id: 'cmp-001', title: 'Neon Frontier Launch', status: 'Active', progress: 72, points: 3820, members: [{ name: 'Ava Chen', role: 'Director' }], assets: [] },
    { id: 'cmp-002', title: 'Velvet Runway Drop', status: 'Active', progress: 49, points: 1900, members: [{ name: 'Liam Park', role: 'DP' }], assets: [] }
  ]);

  const [pastCampaigns, setPastCampaigns] = useState([
    { id: 'cmp-000', title: 'Shadowstrike Teaser', status: 'Completed', progress: 100, points: 8200, members: [], assets: [] }
  ]);

  const [activeList, setActiveList] = useState('current'); // or 'past'
  const [selectedCampaign, setSelectedCampaign] = useState(currentCampaigns[0]);
  const [workflowState, setWorkflowState] = useState({});

  // UI state for create/edit
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ id: '', title: '', status: 'Draft', progress: 0, points: 0, members: [], assets: [] });
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('');
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoadError('');
    Promise.all([fetchCampaigns(), fetchProducts()])
      .then(([campaigns, products]) => {
        if (!mounted) return;
        setLeaderboard(campaigns);
        setProducts(products);
        if (campaigns.length) {
          setCurrentCampaigns(campaigns.filter((campaign) => campaign.status !== 'Completed'));
          setPastCampaigns(campaigns.filter((campaign) => campaign.status === 'Completed'));
          setSelectedCampaign(campaigns[0]);
        }
      })
      .catch((err) => {
        if (mounted) setLoadError(err.message || 'Unable to load campaign data.');
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [loadAttempt]);

  useEffect(() => {
    // initialize workflow steps for the selected campaign if not present
    if (!selectedCampaign) return;
    const key = selectedCampaign.id;
    setWorkflowState((prev) => {
      if (prev[key]) return prev;
      return {
        ...prev,
        [key]: {
          steps: [
            { id: 'research', label: 'Research', done: false },
            { id: 'storyboard', label: 'Storyboard', done: false },
            { id: 'audition', label: 'Audition & casting', done: false },
            { id: 'costume', label: 'Costume & props images', done: false },
            { id: 'set', label: 'Set design', done: false },
            { id: 'shooting', label: 'Shooting program', done: false },
            { id: 'sound', label: 'Sound & fx', done: false },
            { id: 'lighting', label: 'Lighting details', done: false },
            { id: 'editing', label: 'Editing & color', done: false },
            { id: 'publish', label: 'Final publish', done: false },
            { id: 'copyright', label: 'Copyright clearance', done: false, note: 'If third-party assets are used, get owner permission.' }
          ]
        }
      };
    });
  }, [selectedCampaign]);

  const featuredReward = useMemo(() => products[0], [products]);

  const toggleStep = (campaignId, stepId) => {
    setWorkflowState((prev) => {
      const cw = prev[campaignId];
      if (!cw) return prev;
      return {
        ...prev,
        [campaignId]: {
          ...cw,
          steps: cw.steps.map((s) => (s.id === stepId ? { ...s, done: !s.done } : s))
        }
      };
    });
  };

  const requestCopyright = (campaignId) => {
    // demo behaviour: mark copyright step as pending approval (simulate request)
    setWorkflowState((prev) => {
      const cw = prev[campaignId];
      if (!cw) return prev;
      return {
        ...prev,
        [campaignId]: {
          ...cw,
          steps: cw.steps.map((s) => (s.id === 'copyright' ? { ...s, note: 'Permission requested — awaiting owner approval' } : s))
        }
      };
    });
  };

  // Create / Edit helpers
  const openCreate = () => {
    setForm({ id: `cmp-${Date.now()}`, title: '', status: 'Draft', progress: 0, points: 0, members: [], assets: [] });
    setNewMemberName('');
    setNewMemberRole('');
    setIsCreating(true);
    setIsEditing(false);
  };

  const openEdit = (campaign) => {
    setForm({ ...campaign });
    setNewMemberName('');
    setNewMemberRole('');
    setIsCreating(false);
    setIsEditing(true);
  };

  const saveCampaign = async () => {
    setSaveError('');
    try {
      const persisted = await persistCampaign(form);
      setForm(persisted);
    } catch (error) {
      setSaveError(error.message || 'Campaign could not be saved.');
      return;
    }
    if (isCreating) {
      setCurrentCampaigns((prev) => [form, ...prev]);
      setSelectedCampaign(form);
      setIsCreating(false);
    } else if (isEditing) {
      setCurrentCampaigns((prev) => prev.map((c) => (c.id === form.id ? form : c)));
      // also update in past list if present
      setPastCampaigns((prev) => prev.map((c) => (c.id === form.id ? form : c)));
      setSelectedCampaign(form);
      setIsEditing(false);
    }
  };

  const cancelEdit = () => {
    setIsCreating(false);
    setIsEditing(false);
  };

  // Team management
  const addTeamMember = () => {
    if (!newMemberName) return;
    setForm((f) => ({ ...f, members: [...(f.members || []), { name: newMemberName, role: newMemberRole || 'Member' }] }));
    setNewMemberName('');
    setNewMemberRole('');
  };

  const removeTeamMember = (idx) => {
    setForm((f) => ({ ...f, members: (f.members || []).filter((_, i) => i !== idx) }));
  };

  // Asset uploads (client-only demo)
  const onFilesPicked = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const mapped = files.map((file) => ({ file, url: URL.createObjectURL(file), name: file.name, type: file.type }));
    setForm((f) => ({ ...f, assets: [...(f.assets || []), ...mapped] }));
    // reset input
    e.target.value = '';
  };

  const removeAsset = (idx) => {
    setForm((f) => ({ ...f, assets: (f.assets || []).filter((_, i) => i !== idx) }));
  };

  return (
    <Layout>
      <div className="space-y-10 p-8">
        <section className="mx-auto max-w-[1200px] rounded-4xl border border-white/10 bg-cyberPanel/95 p-8 shadow-glow">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Campaigns</p>
              <h1 className="mt-3 text-4xl font-black text-white">Manage campaigns & production workflows</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-cyberGray">Track current campaigns, review past efforts, and run the production workflow from research to publish. Copyright-sensitive items require owner permissions before publishing.</p>
            </div>
            <div className="flex items-center gap-3">
              <PrimaryButton className="h-14" variant="secondary" onClick={openCreate} icon="plus">New campaign</PrimaryButton>
              <PrimaryButton href="/workflow" variant="secondary" className="h-14" icon="play">Open campaign builder</PrimaryButton>
            </div>
          </div>
        </section>

        {loadError && (
          <div role="alert" className="rounded-4xl border border-red-400/20 bg-red-400/10 p-6 text-sm text-red-200">
            <p className="font-black text-white">Campaign data could not load.</p>
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

        <section className="rounded-4xl border border-white/10 bg-cyberPanel/95 p-6 shadow-glow">
          <div className="flex gap-3 mb-4">
            <button className={`rounded-full px-4 py-2 text-2xs font-black uppercase tracking-wider ${activeList === 'current' ? 'bg-cyberPurple text-white' : 'border border-white/10 bg-white/5 text-cyberGray'}`} onClick={() => { setActiveList('current'); setSelectedCampaign(currentCampaigns[0]); }}>
              Current campaigns
            </button>
            <button className={`rounded-full px-4 py-2 text-2xs font-black uppercase tracking-wider ${activeList === 'past' ? 'bg-cyberPurple text-white' : 'border border-white/10 bg-white/5 text-cyberGray'}`} onClick={() => { setActiveList('past'); setSelectedCampaign(pastCampaigns[0]); }}>
              Past campaigns
            </button>
            <div className="ml-auto flex items-center gap-3">
              <PrimaryButton href="/explore" variant="primary" icon="search">Discover scenes</PrimaryButton>
            </div>
          </div>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="space-y-3">
                {(activeList === 'current' ? currentCampaigns : pastCampaigns).map((c) => (
                  <div key={c.id} className={`rounded-2xl border p-4 ${selectedCampaign?.id === c.id ? 'border-cyberTeal bg-white/5' : 'border-white/10 bg-cyberPanelDeep'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-black text-white">{c.title}</p>
                        <p className="mt-1 text-xs text-cyberGray">Status: {c.status} • {c.points || c.points === 0 ? `${c.points} pts` : ''}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <PrimaryButton className="px-3 py-2 text-2xs" variant="secondary" onClick={() => { setSelectedCampaign(c); openEdit(c); }}>
                          Edit
                        </PrimaryButton>
                        <PrimaryButton className="px-3 py-2 text-2xs" onClick={() => setSelectedCampaign(c)} variant="secondary">
                          Manage
                        </PrimaryButton>
                        <PrimaryButton className="px-3 py-2 text-2xs" href={`/campaigns/${c.id}`} variant="secondary">
                          Open
                        </PrimaryButton>
                      </div>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white/10">
                      <div className="h-2 rounded-full bg-cyberPurple" style={{ width: `${c.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {isCreating || isEditing ? (
                <div className="space-y-4">
                  <div className="rounded-3xl border border-white/10 bg-cyberPanelDeep p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">{isCreating ? 'Create campaign' : 'Edit campaign'}</p>
                        <h2 className="mt-2 text-2xl font-black text-white">{form.title || (isCreating ? 'New Campaign' : selectedCampaign?.title)}</h2>
                      </div>
                      <div className="text-right">
                        <PrimaryButton className="px-4 py-2 mr-2" variant="secondary" onClick={cancelEdit}>Cancel</PrimaryButton>
                        <PrimaryButton className="px-4 py-2" variant="primary" onClick={saveCampaign}>Save</PrimaryButton>
                      </div>
                    </div>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <label className="flex flex-col text-sm text-cyberGray">
                        Title
                        <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="mt-2 rounded-md border bg-transparent px-3 py-2 text-white" />
                      </label>
                      <label className="flex flex-col text-sm text-cyberGray">
                        Status
                        <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} className="mt-2 rounded-md border bg-transparent px-3 py-2 text-white">
                          <option>Draft</option>
                          <option>Active</option>
                          <option>Completed</option>
                        </select>
                      </label>
                      <label className="flex flex-col text-sm text-cyberGray">
                        Progress
                        <input type="range" min="0" max="100" value={form.progress} onChange={(e) => setForm((f) => ({ ...f, progress: Number(e.target.value) }))} className="mt-2" />
                      </label>
                      <label className="flex flex-col text-sm text-cyberGray">
                        Points
                        <input type="number" value={form.points} onChange={(e) => setForm((f) => ({ ...f, points: Number(e.target.value) }))} className="mt-2 rounded-md border bg-transparent px-3 py-2 text-white" />
                      </label>
                    </div>
                    {saveError ? <p role="alert" className="mt-4 text-sm text-red-300">{saveError}</p> : null}
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Team members</p>
                    <div className="mt-3 space-y-3">
                      {(form.members || []).map((m, idx) => (
                        <div key={`${m.name}-${idx}`} className="flex items-center justify-between rounded-2xl border border-white/10 bg-cyberPanelDeep px-3 py-2">
                          <div>
                            <p className="text-sm font-black text-white">{m.name}</p>
                            <p className="mt-1 text-xs text-cyberGray">{m.role}</p>
                          </div>
                          <div>
                            <button onClick={() => removeTeamMember(idx)} className="rounded-full px-3 py-2 text-2xs font-black uppercase border border-white/10 bg-white/5 text-cyberGray">Remove</button>
                          </div>
                        </div>
                      ))}

                      <div className="grid gap-2 sm:grid-cols-[1fr_120px]">
                        <input placeholder="Member name" value={newMemberName} onChange={(e) => setNewMemberName(e.target.value)} className="rounded-md border bg-transparent px-3 py-2 text-white" />
                        <div className="flex gap-2">
                          <input placeholder="Role" value={newMemberRole} onChange={(e) => setNewMemberRole(e.target.value)} className="rounded-md border bg-transparent px-3 py-2 text-white flex-1" />
                          <PrimaryButton className="px-3" variant="secondary" onClick={addTeamMember}>Add</PrimaryButton>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-cyberPanel/95 p-6">
                    <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Assets (references & uploads)</p>
                    <div className="mt-3 space-y-3">
                      <div className="flex items-center gap-3">
                        <input type="file" multiple onChange={onFilesPicked} className="text-sm text-cyberGray" />
                        <p className="text-sm text-cyberGray">Upload reference images, costume sketches, or short video clips. Files are stored in-memory for this demo.</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {(form.assets || []).map((a, idx) => (
                          <div key={a.url} className="rounded-2xl border border-white/10 bg-cyberPanelDeep p-3">
                            {a.type.startsWith('image') ? (
                              <img src={a.url} alt={a.name} className="h-28 w-full rounded object-cover" />
                            ) : (
                              <div className="h-28 w-full rounded bg-white/5 flex items-center justify-center text-sm text-cyberGray">{a.name}</div>
                            )}
                            <div className="mt-2 flex items-center justify-between">
                              <p className="text-xs text-white">{a.name}</p>
                              <button onClick={() => removeAsset(idx)} className="text-2xs font-black uppercase text-cyberPurple">Remove</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedCampaign ? (
                <div className="space-y-4">
                  <div className="rounded-3xl border border-white/10 bg-cyberPanelDeep p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Campaign</p>
                        <h2 className="mt-2 text-2xl font-black text-white">{selectedCampaign.title}</h2>
                        <p className="mt-2 text-sm text-cyberGray">Status: {selectedCampaign.status} • Progress: {selectedCampaign.progress}%</p>
                      </div>
                      <div className="text-right">
                        <PrimaryButton className="px-4 py-2 mr-2" variant="secondary" onClick={() => openEdit(selectedCampaign)}>Edit</PrimaryButton>
                        <PrimaryButton className="px-4 py-2" variant="primary">Open builder</PrimaryButton>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Production workflow</p>
                    <div className="mt-4 space-y-3">
                      {(workflowState[selectedCampaign.id]?.steps || []).map((step) => (
                        <div key={step.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-cyberPanelDeep px-4 py-3">
                          <div>
                            <p className="text-sm font-black text-white">{step.label}</p>
                            {step.note ? <p className="mt-1 text-xs text-cyberGray">{step.note}</p> : null}
                          </div>
                          <div className="flex items-center gap-2">
                            {step.id === 'copyright' ? (
                              <>
                                <PrimaryButton className="px-3 py-2 text-2xs" variant="secondary" onClick={() => requestCopyright(selectedCampaign.id)}>Request permission</PrimaryButton>
                                <button onClick={() => toggleStep(selectedCampaign.id, step.id)} className={`rounded-full px-3 py-2 text-2xs font-black uppercase ${step.done ? 'bg-cyberPurple text-white' : 'border border-white/10 bg-white/5 text-cyberGray'}`}>{step.done ? 'Cleared' : 'Mark cleared'}</button>
                              </>
                            ) : (
                              <button onClick={() => toggleStep(selectedCampaign.id, step.id)} className={`rounded-full px-3 py-2 text-2xs font-black uppercase ${step.done ? 'bg-cyberPurple text-white' : 'border border-white/10 bg-white/5 text-cyberGray'}`}>{step.done ? 'Done' : 'Mark done'}</button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-cyberPanel/95 p-6">
                    <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Team & resources</p>
                    <div className="mt-3 text-sm text-cyberGray">Assign crew, upload references for costumes, sets, sound design, and keep a single source of truth for production assets.</div>
                    <div className="mt-4 grid gap-3">
                      {(selectedCampaign.members || []).map((m, i) => (
                        <div key={`${m.name}-${i}`} className="rounded-2xl border p-3 bg-cyberPanelDeep flex items-center justify-between">
                          <div>
                            <p className="text-sm font-black text-white">{m.name}</p>
                            <p className="text-xs text-cyberGray">{m.role}</p>
                          </div>
                        </div>
                      ))}
                      <div className="text-xs text-cyberGray">{(selectedCampaign.assets || []).length} assets attached</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <p className="text-sm text-cyberGray">Select a campaign to view its production workflow and management tools.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
