import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import PrimaryButton from '../../components/PrimaryButton';
import { PRODUCTS } from '../products';

export default function ProductDetailPage() {
  const router = useRouter();
  const product = PRODUCTS.find((item) => item.slug === router.query.slug);

  if (!router.isReady || !product) {
    return <Layout><div className="py-20 text-center text-cyberGray">找不到此產品。</div></Layout>;
  }

  return (
    <Layout>
      <div className="pb-12">
        <Link href="/products" className="inline-flex py-6 text-sm font-bold text-cyberPurple hover:text-cyberPurpleSoft">
          ← 返回全部產品
        </Link>
        <section className={`border-l-8 border-y border-r border-cyberBorder bg-white ${product.colour}`}>
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <div className="flex min-h-[320px] flex-col justify-center bg-cyberPanelSoft px-7 py-12 sm:px-12">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyberGray">{product.english}</p>
              <h1 className="mt-3 text-5xl font-extrabold tracking-tight text-cyberBlack">{product.name}</h1>
              <p className="mt-5 inline-flex self-start bg-cyberBlack px-4 py-2 text-base font-bold text-white">{product.strapline}</p>
              <p className="mt-8 text-sm font-bold text-cyberGray">容量 {product.capacity}</p>
            </div>
            <div className="px-7 py-10 sm:px-12 sm:py-14">
              <p className="inline-flex bg-cyberPanelSoft px-3 py-1 text-sm font-bold text-cyberBlack">產品簡介</p>
              <p className="mt-5 text-base leading-8 text-cyberGray">{product.description}</p>
              <div className="mt-8 border-t border-cyberBorder pt-7">
                <h2 className="text-xl font-bold text-cyberBlack">{product.badge}</h2>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-cyberGray">
                  {product.benefits.map((benefit) => <li key={benefit}>★ {benefit}</li>)}
                </ul>
              </div>
            </div>
          </div>
          <div className="grid gap-8 border-t border-cyberBorder px-7 py-9 sm:px-12 lg:grid-cols-3">
            <div><h2 className="font-bold text-cyberBlack">適合範圍</h2><p className="mt-2 text-sm leading-7 text-cyberGray">{product.suitable}</p></div>
            <div><h2 className="font-bold text-cyberBlack">主要成分</h2><p className="mt-2 text-sm leading-7 text-cyberGray">{product.ingredients}</p></div>
            <div><h2 className="font-bold text-cyberBlack">使用方法</h2><p className="mt-2 text-sm leading-7 text-cyberGray">{product.usage}</p><p className="mt-3 text-xs leading-5 text-cyberGrayMuted">{product.note}</p></div>
          </div>
        </section>
        <div className="mt-8 flex flex-wrap gap-3">
          <PrimaryButton href="/#contact" variant="primary">查詢產品</PrimaryButton>
          <Link href="/products" className="inline-flex min-h-[3rem] items-center justify-center border border-cyberBorder bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-cyberBlack hover:border-cyberPurple hover:text-cyberPurple">瀏覽全部產品</Link>
        </div>
      </div>
    </Layout>
  );
}
