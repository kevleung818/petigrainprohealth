const MEMBER_MODE_KEY = 'vekai-member-mode';
const MEMBER_SESSION_KEY = 'vekai-member-session';
const MEMBER_TOKEN_KEY = 'vekai-member-token';

export const MEMBER_ONLY_PATHS = ['/dashboard', '/avatar-builder', '/campaigns', '/profile', '/store', '/workflow'];

export function getMemberSession() {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(MEMBER_SESSION_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || !parsed.email) return null;

    return parsed;
  } catch {
    return null;
  }
}

export function isMemberMode() {
  if (typeof window === 'undefined') return false;

  const hasSession = Boolean(getMemberSession());
  const modeValue = window.localStorage.getItem(MEMBER_MODE_KEY);
  return modeValue === 'true' && hasSession;
}

export function setMemberMode(value, user = null) {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(MEMBER_MODE_KEY, String(Boolean(value)));

  if (value) {
    const session = user && typeof user === 'object' ? {
      name: user.name || 'Member',
      email: user.email || '',
      createdAt: user.createdAt || new Date().toISOString(),
    } : {
      name: 'Member',
      email: '',
      createdAt: new Date().toISOString(),
    };

    if (session.email) {
      window.localStorage.setItem(MEMBER_SESSION_KEY, JSON.stringify(session));
      return;
    }
  }

  window.localStorage.removeItem(MEMBER_SESSION_KEY);
}

export function clearMemberMode() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(MEMBER_MODE_KEY);
  window.localStorage.removeItem(MEMBER_SESSION_KEY);
  window.localStorage.removeItem(MEMBER_TOKEN_KEY);
}

export function getMemberToken() {
  if (typeof window === 'undefined') return '';
  return window.localStorage.getItem(MEMBER_TOKEN_KEY) || '';
}

export function setMemberToken(token) {
  if (typeof window === 'undefined') return;
  if (!token) {
    window.localStorage.removeItem(MEMBER_TOKEN_KEY);
    return;
  }

  window.localStorage.setItem(MEMBER_TOKEN_KEY, token);
}

export function getSafeNextPath(value, fallback = '/dashboard') {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//') || value.includes('\\')) {
    return fallback;
  }

  return value;
}

export function getAuthRedirectTarget(currentPath, fallback = '/dashboard') {
  const nextPath = getSafeNextPath(currentPath, fallback);
  return `/login?next=${encodeURIComponent(nextPath)}`;
}
