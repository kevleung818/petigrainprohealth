import { getMemberToken } from './auth';

const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA !== 'false';

function requireProductionApi() {
  throw new Error('Production catalog API is not configured yet. Set NEXT_PUBLIC_USE_MOCK_DATA=true to use the demo data source.');
}

async function fetchJson(url, fallbackMessage) {
  const res = await fetch(url);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const error = new Error(data.error || fallbackMessage);
    error.status = res.status;
    throw error;
  }
  return res.json();
}

export async function getSiteData() {
  if (!USE_MOCK_DATA) {
    requireProductionApi();
  }

  return fetchJson('/api/site-data', 'Failed to fetch site data');
}

export async function fetchScenes(q) {
  if (USE_MOCK_DATA) {
    return fetchScenesMock(q);
  }

  requireProductionApi();
}

export async function fetchCategories() {
  if (USE_MOCK_DATA) {
    return fetchCategoriesMock();
  }

  requireProductionApi();
}

export async function fetchSessions() {
  if (USE_MOCK_DATA) {
    return fetchSessionsMock();
  }

  requireProductionApi();
}

export async function fetchScenesMock(q) {
  const url = q ? `/api/mock/scenes?q=${encodeURIComponent(q)}` : '/api/mock/scenes';
  const { scenes } = await fetchJson(url, 'Failed to fetch mock scenes');
  return scenes || [];
}

export async function fetchCategoriesMock() {
  const { categories } = await fetchJson('/api/mock/categories', 'Failed to fetch mock categories');
  return categories || ['All Categories'];
}

export async function fetchSessionsMock() {
  const { sessions } = await fetchJson('/api/mock/sessions', 'Failed to fetch mock sessions');
  return sessions || ['All Sessions'];
}

export async function fetchCommunityPosts() {
  if (!USE_MOCK_DATA) {
    requireProductionApi();
  }

  const { posts } = await fetchJson('/api/mock/community', 'Failed to fetch community posts');
  return posts || [];
}

export async function fetchCampaigns() {
  const token = getMemberToken();
  const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001').replace(/\/$/, '');
  if (token) {
    const result = await fetchJson(`${backendUrl}/api/campaigns`, 'Failed to fetch campaigns');
    return result.campaigns || [];
  }
  if (!USE_MOCK_DATA) {
    requireProductionApi();
  }

  const { campaigns } = await fetchJson('/api/mock/campaigns', 'Failed to fetch campaigns');
  return campaigns || [];
}

export async function saveCampaign(campaign) {
  const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001').replace(/\/$/, '');
  const token = getMemberToken();
  const res = await fetch(`${backendUrl}/api/campaigns`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(campaign) });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Failed to save campaign');
  }
  return (await res.json()).campaign;
}

export async function fetchProducts() {
  if (!USE_MOCK_DATA) {
    requireProductionApi();
  }

  const { products } = await fetchJson('/api/mock/products', 'Failed to fetch products');
  return products || [];
}

function resolvePublicAssetUrl(value, label) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`Missing ${label}.`);
  }

  if (value.startsWith('data:')) {
    throw new Error('Uploaded avatar images need a public image URL before casting.');
  }

  if (value.startsWith('/')) {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : '');
    if (!appUrl) {
      throw new Error(`Set NEXT_PUBLIC_APP_URL before using the default ${label}.`);
    }
    return new URL(value, appUrl).toString();
  }

  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Unsupported protocol');
    return url.toString();
  } catch {
    throw new Error(`${label} must be a public HTTP or HTTPS URL.`);
  }
}

export async function transformAvatar({ userSelfieUrl, targetVideoUrl }) {
  const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001').replace(/\/$/, '');
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 90000);
  const token = getMemberToken();

  try {
    const publicSelfieUrl = resolvePublicAssetUrl(userSelfieUrl, 'identity image');
    const publicTargetVideoUrl = resolvePublicAssetUrl(targetVideoUrl, 'scene video');
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${backendUrl}/api/transform-avatar`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ userSelfieUrl: publicSelfieUrl, targetVideoUrl: publicTargetVideoUrl }),
      signal: controller.signal
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      const error = new Error(data.error || 'Failed to transform avatar');
      error.status = res.status;
      throw error;
    }

    return res.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Transformation timed out. Please try again.');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
