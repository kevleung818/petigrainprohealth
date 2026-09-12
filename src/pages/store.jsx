import React, { useMemo, useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PrimaryButton from '../components/PrimaryButton';
import { fetchProducts } from '../lib/apiClient';

export default function StorePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [cart, setCart] = useState([]);
  const [checkoutMessage, setCheckoutMessage] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoadError('');
    fetchProducts()
      .then((p) => {
        if (mounted) setProducts(p);
      })
      .catch((err) => {
        if (mounted) setLoadError(err.message || 'Unable to load the store catalog.');
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [loadAttempt]);

  const categories = useMemo(() => ['All', ...new Set(products.map((item) => item.category))], [products]);

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((item) => {
      const matchesText = [item.title, item.category, item.price].join(' ').toLowerCase().includes(query.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
      return matchesText && matchesCategory;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'price') {
        return Number(String(a.price).replace(/[^\d.]/g, '')) - Number(String(b.price).replace(/[^\d.]/g, ''));
      }
      return 0;
    });
  }, [products, query, categoryFilter, sortBy]);

  const addToCart = (item) => {
    setCart((current) => [...current, item]);
    setCheckoutMessage(`${item.title} added to your scene collection.`);
  };

  const removeFromCart = (index) => {
    setCart((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const checkout = () => {
    setCheckoutMessage(cart.length ? `Checkout staged for ${cart.length} item${cart.length === 1 ? '' : 's'}. Payment provider setup is required to place the order.` : 'Add an item before checkout.');
  };

  return (
    <Layout>
      <div className="space-y-10 p-8">
        <section className="mx-auto max-w-[1200px] rounded-4xl border border-white/10 bg-cyberPanel/95 p-8 shadow-glow">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberGray">Store</p>
              <h1 className="mt-3 text-4xl font-black text-white">Official Roleverse merchandise for creators and fans.</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-cyberGray">Shop exclusive apparel, collectibles, and drops designed to complete your avatar identity and scene presence.</p>
            </div>
            <PrimaryButton className="inline-flex h-14 px-6" variant="accent" icon="shop" onClick={checkout}>
              Checkout {cart.length ? `(${cart.length})` : ''}
            </PrimaryButton>
          </div>
        </section>

        {checkoutMessage ? <p role="status" className="rounded-2xl border border-cyberTeal/20 bg-cyberTeal/10 px-4 py-3 text-sm text-cyberTeal">{checkoutMessage}</p> : null}

        {cart.length ? (
          <section className="rounded-4xl border border-cyberYellow/20 bg-cyberYellow/10 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-3xs font-black uppercase tracking-mega-xl text-cyberYellow">Scene collection</p>
                <h2 className="mt-2 text-xl font-black text-white">Your trackable items</h2>
              </div>
              <PrimaryButton variant="accent" icon="shop" onClick={checkout}>Stage checkout</PrimaryButton>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {cart.map((item, index) => (
                <button key={`${item.id}-${index}`} type="button" onClick={() => removeFromCart(index)} className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs text-white transition hover:border-cyberYellow/50">
                  {item.title} <span className="ml-2 text-cyberYellow">Remove</span>
                </button>
              ))}
            </div>
          </section>
        ) : null}

        <section className="rounded-4xl border border-white/10 bg-white/5 p-6 shadow-glow">
          <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr_1fr]">
            <div className="space-y-2">
              <label className="text-2xs uppercase tracking-wider text-cyberGray">Search merch</label>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title or category"
                className="w-full rounded-2xl border border-white/10 bg-cyberBlack/20 px-4 py-3 text-sm text-white outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-2xs uppercase tracking-wider text-cyberGray">Category</label>
              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-cyberBlack/20 px-4 py-3 text-sm text-white outline-none"
              >
                {categories.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-2xs uppercase tracking-wider text-cyberGray">Sort</label>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-cyberBlack/20 px-4 py-3 text-sm text-white outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price">Price: Low to High</option>
              </select>
            </div>
          </div>
        </section>

        {loadError && (
          <div role="alert" className="rounded-4xl border border-red-400/20 bg-red-400/10 p-6 text-sm text-red-200">
            <p className="font-black text-white">The store catalog could not load.</p>
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

        {!loadError && <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {loading ? (
            <div className="text-cyberGray">Loading...</div>
          ) : (
            visibleProducts.map((item) => (
              <div key={item.id} className="space-y-4 overflow-hidden rounded-3xl border border-white/10 bg-cyberPanelDeep p-6 shadow-glow-sm">
                <div className="flex h-44 items-end rounded-3xl border border-white/10 bg-gradient-to-br from-cyberPurple/40 to-cyberTeal/20 p-4">
                  <div className="rounded-full bg-black/20 px-3 py-1 text-2xs uppercase tracking-wider text-white">{item.category}</div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg font-black text-white">{item.title}</h2>
                  <p className="text-lg font-black text-cyberYellow">{item.price}</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <PrimaryButton className="w-full sm:w-auto btn-small" variant="primary" icon="shop" onClick={() => addToCart(item)}>
                    Add to cart
                  </PrimaryButton>
                  <PrimaryButton className="w-full sm:w-auto btn-small" variant="secondary" icon="search" onClick={() => setCheckoutMessage(`${item.title}: ${item.category} linked to the selected scene collection.`)}>
                    Details
                  </PrimaryButton>
                </div>
              </div>
            ))
          )}
        </section>}
      </div>
    </Layout>
  );
}
