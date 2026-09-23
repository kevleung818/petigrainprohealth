import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { clearMemberMode, getAuthRedirectTarget, getMemberSession, getMemberToken, isMemberMode, MEMBER_ONLY_PATHS } from '../lib/auth';

const NAV = [
  { key: 'story', label: '品牌故事', href: '/#story' },
  { key: 'products', label: '產品資料', href: '/products' }
];
const PRODUCT_LINKS = [
  { label: '添麗輝 Bri-Sol', href: '/product/bri-sol' },
  { label: '朵清新 Oti-Dor', href: '/product/oti-dor' },
  { label: '健體素 Immu Guard', href: '/product/immu-guard' },
  { label: '健肝素 Hepa Guard', href: '/product/hepa-guard' },
  { label: '健腎素 Urol Guard', href: '/product/urol-guard' }
];
const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || 'v0.1.0-alpha.1';

export default function Layout({ children }) {
  const router = useRouter();
  const activePath = router.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [memberSession, setMemberSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const isMemberOnlyPath = MEMBER_ONLY_PATHS.includes(activePath);

  useEffect(() => {
    let cancelled = false;

    setMobileMenuOpen(false);
    setCheckingSession(true);

    const validateSession = async () => {
      const memberMode = isMemberMode();
      const session = getMemberSession();
      const token = getMemberToken();

      if (!memberMode || !session || !token) {
        if (cancelled) return;
        setIsMember(false);
        setMemberSession(null);
        setCheckingSession(false);
        if (router.isReady && isMemberOnlyPath) {
          router.replace(getAuthRedirectTarget(router.asPath, '/dashboard'));
        }
        return;
      }

      try {
        const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001').replace(/\/$/, '');
        const response = await fetch(`${backendUrl}/api/auth/session`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
          throw new Error('Session is no longer valid.');
        }

        const data = await response.json();
        if (cancelled) return;
        setIsMember(true);
        setMemberSession(data.user || session);
      } catch {
        if (cancelled) return;
        clearMemberMode();
        setIsMember(false);
        setMemberSession(null);
        if (router.isReady && isMemberOnlyPath) {
          router.replace(getAuthRedirectTarget(router.asPath, '/dashboard'));
        }
      } finally {
        if (!cancelled) setCheckingSession(false);
      }
    };

    if (router.isReady) validateSession();
    return () => { cancelled = true; };
  }, [activePath, isMemberOnlyPath, router, router.isReady, router.asPath]);

  const handleLogout = async () => {
    const token = getMemberToken();
    try {
      if (token) {
        const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001').replace(/\/$/, '');
        await fetch(`${backendUrl}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.warn('Logout request failed, clearing local session anyway.', error);
    } finally {
      clearMemberMode();
      setIsMember(false);
      setMemberSession(null);
      router.push('/');
    }
  };

  const navItems = NAV;

  if (checkingSession || (isMemberOnlyPath && !isMember)) {
    return <div className="min-h-screen bg-cyberSurface" aria-busy="true" />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-cyberSurface text-cyberBlack font-sans">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-cyberBorder bg-cyberSurface/95 px-4 py-4 backdrop-blur-sm sm:px-6 lg:px-8">
        <div className="mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Link href="/" className="text-lg font-extrabold tracking-wide text-cyberBlack">寵悅康<sup className="text-2xs">TM</sup></Link>
              <span className="text-lg font-semibold tracking-wide text-cyberPurple">PETIGRAIN</span>
            </div>
            <nav aria-label="Primary site navigation" className="hidden items-center gap-5 text-3xs uppercase tracking-wider md:flex">
              {NAV.map((item) => item.key === 'products' ? (
                <div key={item.key} className="group relative py-2">
                  <Link href={item.href} className={`transition-colors ${activePath === item.href || activePath.startsWith('/product/') ? 'font-bold text-cyberPurple' : 'font-medium text-cyberGray hover:text-cyberPurple'}`}>
                    {item.label}
                  </Link>
                  <div className="invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 translate-y-2 border border-cyberBorder bg-white p-2 opacity-0 shadow-glow-sm transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    {PRODUCT_LINKS.map((product) => <Link key={product.href} href={product.href} className="block px-3 py-2 text-xs font-bold text-cyberGray hover:bg-cyberPanelSoft hover:text-cyberPurple">{product.label}</Link>)}
                  </div>
                </div>
              ) : (
                <Link key={item.key} href={item.href} className={`transition-colors ${activePath === item.href ? 'text-cyberPurple font-bold' : 'text-cyberGray hover:text-cyberPurple font-medium'}`}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
                className="border border-cyberBorder bg-white px-4 py-2 text-sm font-bold text-cyberBlack transition hover:border-cyberPurple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyberPurple md:hidden"
            >
              {mobileMenuOpen ? 'Close' : '產品資料'}
            </button>
            {isMember ? (
              <div className="hidden items-center gap-3 sm:flex">
                <span className="text-xs font-bold tracking-wide text-cyberGray">
                  {memberSession?.name || 'Member'}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="border border-cyberBorder bg-white px-4 py-2 text-sm font-bold text-cyberBlack transition hover:border-cyberPurple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyberPurple"
                >
                  Log Out
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <div
          id="mobile-menu"
          aria-hidden={!mobileMenuOpen}
          inert={!mobileMenuOpen ? '' : undefined}
          className={`fixed inset-x-0 top-[5.5rem] z-40 overflow-hidden border-b border-cyberBorder bg-cyberSurface/95 transition-all duration-300 md:hidden ${mobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <nav aria-label="Mobile primary navigation" className="mx-auto flex max-w-[1480px] flex-col gap-2 px-4 py-4">
            {navItems.map((item) => item.key === 'products' ? (
              <div key={item.key} className="border border-cyberBorder bg-white">
                <Link href={item.href} onClick={() => setMobileMenuOpen(false)} className={`block px-3 py-3 text-left text-sm font-bold tracking-wide ${activePath === item.href ? 'bg-cyberPanelSoft text-cyberPurple' : 'text-cyberGray'}`}>
                  {item.label}
                </Link>
                <div className="border-t border-cyberBorder px-3 py-2">
                  {PRODUCT_LINKS.map((product) => <Link key={product.href} href={product.href} onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-medium text-cyberGray hover:text-cyberPurple">{product.label}</Link>)}
                </div>
              </div>
            ) : (
              <Link key={item.key} href={item.href} onClick={() => setMobileMenuOpen(false)} className={`px-3 py-3 text-left text-sm font-medium tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyberPurple ${activePath === item.href ? 'bg-cyberPanelSoft text-cyberPurple' : 'border border-cyberBorder bg-white text-cyberGray hover:border-cyberPurple hover:text-cyberPurple'}`}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="pt-24">
        <div className="mx-auto flex w-full max-w-[1480px] gap-6 px-4 pb-12 sm:px-6 lg:px-8">
          {/* No sidebar — keep the layout full width */}
          {/* Previously the sidebar showed member navigation; the header nav now contains the primary entries */}

          <main className="flex-1 min-h-[calc(100vh-6rem)]">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
