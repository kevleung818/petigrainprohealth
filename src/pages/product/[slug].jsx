import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { PRODUCTS } from '../products';

const SUCCESS_STORY_CREDIT = '圖片由義工領養人提供';

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
              <h1 className="mt-3 text-5xl font-extrabold tracking-tight text-cyberBlack">{product.name}{product.slug === 'bri-sol' || product.slug === 'oti-dor' ? '™' : ''}</h1>
              {product.note ? <p className="mt-3 text-lg font-black text-cyberGray">發明專利 {product.note.replace(/^.*?發明專利\s*/, '').trim()}</p> : null}
              <p className="mt-5 inline-flex self-start bg-cyberBlack px-4 py-2 text-lg font-bold text-white">{product.strapline}</p>
              <p className="mt-8 text-base font-bold text-cyberGray">容量 {product.capacity}</p>
            </div>
            <div className="px-7 py-10 sm:px-12 sm:py-14">
              <p className="inline-flex bg-cyberPanelSoft px-4 py-2 text-base font-bold text-cyberBlack">產品簡介</p>
              <p className="mt-5 text-base leading-8 text-cyberGray">{product.description}</p>
              <div className="mt-8 border-t border-cyberBorder pt-7">
                <h2 className="text-2xl font-bold text-cyberBlack">{product.badge}</h2>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-cyberGray">
                  {product.benefits.map((benefit) => <li key={benefit}>★ {benefit}</li>)}
                </ul>
              </div>
            </div>
          </div>
          <div className="grid gap-8 border-t border-cyberBorder px-7 py-9 sm:px-12 lg:grid-cols-3">
            <div><h2 className="font-bold text-cyberBlack">適合範圍</h2><p className="mt-2 text-sm leading-7 text-cyberGray">{product.suitable}</p></div>
            <div><h2 className="font-bold text-cyberBlack">主要成分</h2><p className="mt-2 text-sm leading-7 text-cyberGray">{product.ingredients}</p></div>
            <div><h2 className="font-bold text-cyberBlack">使用方法</h2><p className="mt-2 text-sm leading-7 text-cyberGray">{product.usage}</p></div>
          </div>
        </section>
        {product.slug === 'bri-sol' ? (
          <div>
          <section className="mt-8 overflow-hidden border border-cyberBorder bg-white">
            <div className="border-b border-cyberBorder px-7 py-7 sm:px-10">
              <p className="text-xs font-bold tracking-[0.2em] text-cyberPurple">BRI-SOL · DOG SUCCESS STORY</p>
              <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-cyberBlack">30天改善個案</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-cyberGray">這個案例記錄狗狗在持續使用添麗輝30天後</p>
                </div>
                <div className="border border-cyberPurple/30 bg-cyberPurple/10 px-5 py-3 text-center">
                  <p className="text-xs font-bold text-cyberGray">滴用時間</p>
                  <p className="mt-1 text-2xl font-black text-cyberPurple">30 天</p>
                </div>
              </div>
            </div>
            <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-8">
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/Brisol dog before.png" alt="狗狗滴用添麗輝前" className="h-72 w-full object-cover sm:h-80" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">第1天 - 當時狀况</figcaption>
              </figure>
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/Brisol dog 30 days.png" alt="狗狗滴用添麗輝 30 天後" className="h-72 w-full object-cover sm:h-80" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">第30天 - 護理後狀況</figcaption>
              </figure>
            </div>
            <p className="px-7 pb-7 text-xs leading-6 text-cyberGrayMuted sm:px-10">{SUCCESS_STORY_CREDIT}<br />個案圖片只作護理前後記錄參考，不能代替獸醫診斷或治療；如有持續或嚴重眼部症狀，請先諮詢獸醫。</p>
          </section>
          <section className="mt-8 overflow-hidden border border-cyberBorder bg-white">
            <div className="border-b border-cyberBorder px-7 py-7 sm:px-10">
              <p className="text-xs font-bold tracking-[0.2em] text-cyberPurple">BRI-SOL · SUCCESS CASE 04</p>
              <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-cyberBlack">7天改善個案</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-cyberGray">這個案例記錄狗狗在持續使用添麗輝 7天後</p>
                </div>
                <div className="border border-cyberPurple/30 bg-cyberPurple/10 px-5 py-3 text-center">
                  <p className="text-xs font-bold text-cyberGray">護理時間</p>
                  <p className="mt-1 text-2xl font-black text-cyberPurple">7 天</p>
                </div>
              </div>
            </div>
            <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-8">
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/bri-sol-dog-eye-case-day-1-seven-days.png" alt="添麗輝狗狗眼部個案滴用前" className="h-72 w-full object-cover sm:h-80" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">第1天 - 當時狀况</figcaption>
              </figure>
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/bri-sol-dog-eye-case-day-7.png" alt="添麗輝狗狗眼部個案 7 days treatment" className="h-72 w-full object-cover sm:h-80" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">第7天 - 護理後狀況</figcaption>
              </figure>
            </div>
            <p className="px-7 pb-7 text-xs leading-6 text-cyberGrayMuted sm:px-10">{SUCCESS_STORY_CREDIT}<br />個案圖片只作護理前後記錄參考，不能代替獸醫診斷或治療；如有持續或嚴重眼部症狀，請先諮詢獸醫。</p>
          </section>
          <section className="mt-8 overflow-hidden border border-cyberBorder bg-white">
            <div className="border-b border-cyberBorder px-7 py-7 sm:px-10">
              <p className="text-xs font-bold tracking-[0.2em] text-cyberPurple">BRI-SOL · SUCCESS CASE 05</p>
              <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-cyberBlack">21 天改善個案</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-cyberGray">這個案例記錄狗狗在持續使用添麗輝 21天後</p>
                </div>
                <div className="border border-cyberPurple/30 bg-cyberPurple/10 px-5 py-3 text-center">
                  <p className="text-xs font-bold text-cyberGray">滴用時間</p>
                  <p className="mt-1 text-2xl font-black text-cyberPurple">21 天</p>
                </div>
              </div>
            </div>
            <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-8">
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/Brisol case before -2.png" alt="添麗輝貓咪個案滴用前" className="h-72 w-full object-cover sm:h-80" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">第1天 - 當時狀况</figcaption>
              </figure>
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/Brisol case 21.png" alt="添麗輝貓咪個案滴用 21 天後" className="h-72 w-full object-cover sm:h-80" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">第21天 - 護理後狀況</figcaption>
              </figure>
            </div>
            <p className="px-7 pb-7 text-xs leading-6 text-cyberGrayMuted sm:px-10">{SUCCESS_STORY_CREDIT}<br />個案圖片只作食用前後記錄參考，不能代替獸醫診斷或治療；如有持續或嚴重眼部症狀，請先諮詢獸醫。</p>
          </section>
          <section className="mt-8 overflow-hidden border border-cyberBorder bg-white">
            <div className="border-b border-cyberBorder px-7 py-7 sm:px-10">
              <p className="text-xs font-bold tracking-[0.2em] text-cyberPurple">BRI-SOL · SUCCESS CASE 06</p>
              <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-cyberBlack">70天改善個案</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-cyberGray">持續使用添麗輝70天，記錄眼睛由結膜白化至清晰明亮的改善過程。</p>
                </div>
                <div className="border border-cyberPurple/30 bg-cyberPurple/10 px-5 py-3 text-center">
                  <p className="text-xs font-bold text-cyberGray">使用時間</p>
                  <p className="mt-1 text-2xl font-black text-cyberPurple">70 天</p>
                </div>
              </div>
            </div>
            <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-8 lg:grid-cols-5">
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/使用前，結膜白化.jpeg" alt="使用前，結膜白化" className="h-72 w-full object-cover sm:h-80 lg:h-64" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">使用前，結膜白化</figcaption>
              </figure>
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/使用30天.jpeg" alt="使用30天" className="h-72 w-full object-cover sm:h-80 lg:h-64" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">使用30天</figcaption>
              </figure>
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/使用60天.jpeg" alt="使用60天" className="h-72 w-full object-cover sm:h-80 lg:h-64" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">使用60天</figcaption>
              </figure>
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/使用70天.jpeg" alt="使用70天" className="h-72 w-full object-cover sm:h-80 lg:h-64" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">使用70天</figcaption>
              </figure>
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/及後眼睛清晰明亮.jpeg" alt="及後眼睛清晰明亮" className="h-72 w-full object-cover sm:h-80 lg:h-64" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">及後眼睛清晰明亮</figcaption>
              </figure>
            </div>
            <p className="px-7 pb-7 text-xs leading-6 text-cyberGrayMuted sm:px-10">{SUCCESS_STORY_CREDIT}<br />個案圖片只作護理前後記錄參考，不能代替獸醫診斷或治療；如有持續或嚴重眼部症狀，請先諮詢獸醫。</p>
          </section>
          <section className="mt-8 overflow-hidden border border-cyberBorder bg-white">
            <div className="border-b border-cyberBorder px-7 py-7 sm:px-10">
              <p className="text-xs font-bold tracking-[0.2em] text-cyberPurple">BRI-SOL · SUCCESS CASE 07</p>
              <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-cyberBlack">4天改善個案</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-cyberGray">持續使用添麗輝4天，記錄眼部狀況的改善過程。</p>
                </div>
                <div className="border border-cyberPurple/30 bg-cyberPurple/10 px-5 py-3 text-center">
                  <p className="text-xs font-bold text-cyberGray">使用時間</p>
                  <p className="mt-1 text-2xl font-black text-cyberPurple">4 天</p>
                </div>
              </div>
            </div>
            <div className="p-5 sm:p-8">
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/WhatsApp Image 2026-09-17 at 18.03.14.jpeg" alt="添麗輝4天改善個案第1天及第4天" className="mx-auto h-auto max-h-[32rem] w-full object-contain" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">第1天至第4天 - 改善記錄</figcaption>
              </figure>
            </div>
            <p className="px-7 pb-7 text-xs leading-6 text-cyberGrayMuted sm:px-10">{SUCCESS_STORY_CREDIT}<br />個案圖片只作護理前後記錄參考，不能代替獸醫診斷或治療；如有持續或嚴重眼部症狀，請先諮詢獸醫。</p>
          </section>
          <section className="mt-8 overflow-hidden border border-cyberBorder bg-white">
            <div className="border-b border-cyberBorder px-7 py-7 sm:px-10">
              <p className="text-xs font-bold tracking-[0.2em] text-cyberPurple">BRI-SOL · SUCCESS CASE 08</p>
              <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-cyberBlack">30天改善個案</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-cyberGray">持續使用添麗輝30天，記錄眼部狀況的改善過程。</p>
                </div>
                <div className="border border-cyberPurple/30 bg-cyberPurple/10 px-5 py-3 text-center">
                  <p className="text-xs font-bold text-cyberGray">使用時間</p>
                  <p className="mt-1 text-2xl font-black text-cyberPurple">30 天</p>
                </div>
              </div>
            </div>
            <div className="p-5 sm:p-8">
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/bristol-30-day.jpeg" alt="添麗輝30天改善個案第1天及第30天" className="mx-auto h-auto max-h-[32rem] w-full object-contain" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">第1天至第30天 - 改善記錄</figcaption>
              </figure>
            </div>
            <p className="px-7 pb-7 text-xs leading-6 text-cyberGrayMuted sm:px-10">{SUCCESS_STORY_CREDIT}<br />個案圖片只作護理前後記錄參考，不能代替獸醫診斷或治療；如有持續或嚴重眼部症狀，請先諮詢獸醫。</p>
          </section>
          </div>
        ) : null}
        {product.slug === 'oti-dor' ? (
          <section className="mt-10 overflow-hidden border border-cyberBorder bg-white">
            <div className="border-b border-cyberBorder px-7 py-7 sm:px-10">
              <p className="text-xs font-bold tracking-[0.2em] text-cyberPurple">OTI-DOR · SUCCESS CASE</p>
              <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-cyberBlack">耳部護理十九天成功個案</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-cyberGray">個案記錄毛孩使用朵清新前後的耳部狀況，展示連續塗用 19 天期間由 4 May 至 23 May 的改善進程。</p>
                </div>
                <div className="border border-cyberPurple/30 bg-cyberPurple/10 px-5 py-3 text-center">
                  <p className="text-xs font-bold text-cyberGray">塗用時間</p>
                  <p className="mt-1 text-2xl font-black text-cyberPurple">19 天</p>
                </div>
              </div>
            </div>
            <div className="grid gap-5 p-5 sm:grid-cols-3 sm:p-8">
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/Oti 1.png" alt="朵清新個案 4 May 塗用前" className="h-72 w-full object-cover sm:h-80" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">4 May · 塗用前</figcaption>
              </figure>
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/Oti 2.png" alt="朵清新個案 12 May 塗用第 8 天" className="h-72 w-full object-cover sm:h-80" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">12 May · 塗用第 8 天</figcaption>
              </figure>
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/Oti 3.png" alt="朵清新個案 23 May 塗用第 19 天" className="h-72 w-full object-cover sm:h-80" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">23 May · 塗用第 19 天</figcaption>
              </figure>
            </div>
            <p className="px-7 pb-7 text-xs leading-6 text-cyberGrayMuted sm:px-10">{SUCCESS_STORY_CREDIT}<br />個案圖片只作耳部護理進程記錄參考，不能代替獸醫診斷或治療；如有耳部紅腫、異味、分泌物或持續搔癢，請先諮詢獸醫。</p>
          </section>
        ) : null}
        {product.slug === 'immu-guard' ? (
          <section className="mt-10 overflow-hidden border border-cyberBorder bg-white">
            <div className="border-b border-cyberBorder px-7 py-7 sm:px-10">
              <p className="text-xs font-bold tracking-[0.2em] text-cyberPurple">{product.english} · SUCCESS CASE</p>
              <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-cyberBlack">二十天皮膚護理改善個案</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-cyberGray">個案記錄使用 {product.name} 前後的皮膚狀況，展示開始護理、5 天後及 20 天後的恢復進程。</p>
                </div>
                <div className="border border-cyberPurple/30 bg-cyberPurple/10 px-5 py-3 text-center">
                  <p className="text-xs font-bold text-cyberGray">護理時間</p>
                  <p className="mt-1 text-2xl font-black text-cyberPurple">20 天</p>
                </div>
              </div>
            </div>
            <div className="grid gap-5 p-5 sm:grid-cols-3 sm:p-8">
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/immune-oti-case-before.png" alt={`${product.name} 個案護理前`} className="h-72 w-full object-cover sm:h-80" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">Before · 開始護理</figcaption>
              </figure>
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/immune-oti-case-day-5.png" alt={`${product.name} 個案 5 days later`} className="h-72 w-full object-cover sm:h-80" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">5 days later · 五天後</figcaption>
              </figure>
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/immune-oti-case-day-20.png" alt={`${product.name} 個案 20 days later`} className="h-72 w-full object-cover sm:h-80" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">20 days later · 二十天後</figcaption>
              </figure>
            </div>
            <p className="px-7 pb-7 text-xs leading-6 text-cyberGrayMuted sm:px-10">{SUCCESS_STORY_CREDIT}<br />個案圖片只作護理前後記錄參考，不能代替獸醫診斷或治療；如有持續或嚴重皮膚問題，請先諮詢獸醫。</p>
          </section>
        ) : null}
        {product.slug === 'immu-guard' ? (
          <section className="mt-8 overflow-hidden border border-cyberBorder bg-white">
            <div className="border-b border-cyberBorder px-7 py-7 sm:px-10">
              <p className="text-xs font-bold tracking-[0.2em] text-cyberPurple">IMMU GUARD · SUCCESS CASE 02</p>
              <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-cyberBlack">狗仔腳趾感染發炎改善個案</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-cyberGray">狗仔腳趾受感染發炎，服用健體素 11 天後，可見腳趾表皮結痂修復中；到 34 天，腳趾清晰長回。</p>
                </div>
                <div className="border border-cyberPurple/30 bg-cyberPurple/10 px-5 py-3 text-center">
                  <p className="text-xs font-bold text-cyberGray">觀察時間</p>
                  <p className="mt-1 text-2xl font-black text-cyberPurple">34 天</p>
                </div>
              </div>
            </div>
            <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-8">
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/immu-guard-paw-before-and-day-11.png" alt="健體素狗仔腳趾感染發炎，服用前及 11 天後對比" className="h-72 w-full object-cover sm:h-80" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">服用前及 11 天後 · 表皮結痂修復中</figcaption>
              </figure>
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/immu-guard-paw-day-11.png" alt="健體素狗仔腳趾服用 11 天後" className="h-72 w-full object-cover sm:h-80" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">11 天後 · 腳趾表皮結痂修復中</figcaption>
              </figure>
            </div>
            <div className="grid gap-3 border-t border-cyberBorder px-7 py-6 sm:grid-cols-2 sm:px-10">
              <div className="border border-cyberBorder bg-cyberPanelSoft px-4 py-3"><p className="text-xs text-cyberGray">11 天</p><p className="mt-1 font-bold text-cyberBlack">腳趾表皮結痂修復中</p></div>
              <div className="border border-cyberBorder bg-cyberPanelSoft px-4 py-3"><p className="text-xs text-cyberGray">34 天</p><p className="mt-1 font-bold text-cyberBlack">腳趾清晰長回</p></div>
            </div>
            <p className="px-7 pb-7 text-xs leading-6 text-cyberGrayMuted sm:px-10">{SUCCESS_STORY_CREDIT}<br />個案圖片只作護理進程記錄參考，不能代替獸醫診斷或治療；如有腳趾感染、發炎或傷口問題，請先諮詢獸醫。</p>
          </section>
        ) : null}
        {product.slug === 'hepa-guard' ? (
          <div>
          <section className="mt-10 overflow-hidden border border-cyberBorder bg-white">
            <div className="border-b border-cyberBorder px-7 py-7 sm:px-10">
              <p className="text-xs font-bold tracking-[0.2em] text-cyberPurple">HEPA GUARD · SUCCESS CASE</p>
              <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-cyberBlack">嚴重皮膚問題六十天改善個案</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-cyberGray">個案初期出現嚴重皮炎、脫毛及皮膚粗糙和乾硬；服用「健肝素」60 天後，毛毛重新長毛。</p>
                </div>
                <div className="border border-cyberPurple/30 bg-cyberPurple/10 px-5 py-3 text-center">
                  <p className="text-xs font-bold text-cyberGray">服用時間</p>
                  <p className="mt-1 text-2xl font-black text-cyberPurple">60 天</p>
                </div>
              </div>
            </div>
            <div className="grid gap-5 p-5 sm:grid-cols-3 sm:p-8">
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/hepa-guard-before-60-days-1.png" alt="健肝素個案服用前，嚴重皮炎及脫毛" className="h-72 w-full object-cover sm:h-80" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">服用前 · 嚴重皮炎及脫毛</figcaption>
              </figure>
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/hepa-guard-before-60-days-2.png" alt="健肝素個案服用前，皮膚粗糙和乾硬" className="h-72 w-full object-cover sm:h-80" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">服用前 · 皮膚粗糙和乾硬</figcaption>
              </figure>
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/hepa-guard-after-60-days.png" alt="健肝素服用 60 天後，毛毛重新長毛" className="h-72 w-full object-cover sm:h-80" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">服用 60 天後 · 毛毛重新長毛</figcaption>
              </figure>
            </div>
            <p className="px-7 pb-7 text-xs leading-6 text-cyberGrayMuted sm:px-10">{SUCCESS_STORY_CREDIT}<br />個案圖片只作護理前後記錄參考，不能代替獸醫診斷或治療；如有嚴重皮炎、脫毛或皮膚異常，請先諮詢獸醫。</p>
          </section>
          <section className="mt-8 overflow-hidden border border-cyberBorder bg-white">
            <div className="border-b border-cyberBorder px-7 py-7 sm:px-10">
              <p className="text-xs font-bold tracking-[0.2em] text-cyberPurple">HEPA GUARD · SUCCESS CASE 02</p>
              <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-cyberBlack">皮膚護理三十天改善個案</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-cyberGray">個案記錄狗狗服用「健肝素」前後的皮膚狀況，展示開始使用與服用 30 天後的外觀變化。</p>
                </div>
                <div className="border border-cyberPurple/30 bg-cyberPurple/10 px-5 py-3 text-center">
                  <p className="text-xs font-bold text-cyberGray">服用時間</p>
                  <p className="mt-1 text-2xl font-black text-cyberPurple">30 天</p>
                </div>
              </div>
            </div>
            <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-8">
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/hepa-guard-before-30-days.png" alt="健肝素個案服用前的皮膚狀況" className="h-72 w-full object-cover sm:h-80" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">服用前 · 皮膚狀況</figcaption>
              </figure>
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/hepa-guard-after-30-days.png" alt="健肝素服用 30 天後的皮膚狀況" className="h-72 w-full object-cover sm:h-80" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">服用 30 天後 · 改善記錄</figcaption>
              </figure>
            </div>
            <p className="px-7 pb-7 text-xs leading-6 text-cyberGrayMuted sm:px-10">{SUCCESS_STORY_CREDIT}<br />個案圖片只作護理前後記錄參考，不能代替獸醫診斷或治療；如有持續皮膚問題，請先諮詢獸醫。</p>
          </section>
          <section className="mt-8 overflow-hidden border border-cyberBorder bg-white">
            <div className="border-b border-cyberBorder px-7 py-7 sm:px-10">
              <p className="text-xs font-bold tracking-[0.2em] text-cyberPurple">HEPA GUARD · SUCCESS CASE 03</p>
              <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-cyberBlack">皮膚狀況四十五天護理個案</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-cyberGray">這個個案記錄狗狗服用「健肝素」前後的皮膚狀況，展示服用 45 天後的改善記錄。</p>
                </div>
                <div className="border border-cyberPurple/30 bg-cyberPurple/10 px-5 py-3 text-center">
                  <p className="text-xs font-bold text-cyberGray">服用時間</p>
                  <p className="mt-1 text-2xl font-black text-cyberPurple">45 天</p>
                </div>
              </div>
            </div>
            <div className="grid gap-5 p-5 sm:grid-cols-3 sm:p-8">
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/Screenshot 2026-09-24 at 12.36.44.png" alt="健肝素狗狗個案服用前，皮膚狀況參考一" className="h-72 w-full object-cover sm:h-80" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">服用前參考一 · 皮膚狀況</figcaption>
              </figure>
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/Hepa Dog before 2.png" alt="健肝素狗狗個案服用前，皮膚狀況參考二" className="h-72 w-full object-cover sm:h-80" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">服用前參考二 · 皮膚狀況</figcaption>
              </figure>
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/hepa-guard-after-45-days.png" alt="健肝素服用 45 天後的皮膚狀況" className="h-72 w-full object-cover sm:h-80" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">服用 45 天後 · 改善記錄</figcaption>
              </figure>
            </div>
            <p className="px-7 pb-7 text-xs leading-6 text-cyberGrayMuted sm:px-10">個案圖片只作護理前後記錄參考，不能代替獸醫診斷或治療；如有持續皮膚問題，請先諮詢獸醫。</p>
          </section>
          </div>
        ) : null}
        {product.slug === 'urol-guard' ? (
          <section className="mt-10 overflow-hidden border border-cyberBorder bg-white">
            <div className="border-b border-cyberBorder px-7 py-7 sm:px-10">
              <p className="text-xs font-bold tracking-[0.2em] text-cyberPurple">UROL GUARD · SUCCESS CASE</p>
              <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-cyberBlack">中風後狗狗 11 天改善個案</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-cyberGray">狗狗因中風導致活動不便，持續食用健腎素 11 天後，主人觀察到活動能力及精神狀況有所改善。</p>
                </div>
                <div className="border border-cyberPurple/30 bg-cyberPurple/10 px-5 py-3 text-center">
                  <p className="text-xs font-bold text-cyberGray">食用時間</p>
                  <p className="mt-1 text-2xl font-black text-cyberPurple">11 天</p>
                </div>
              </div>
            </div>
            <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-8">
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/urol before .png" alt="健腎素中風狗狗個案食用前" className="h-72 w-full object-cover sm:h-80" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">食用前 · 中風後活動狀況</figcaption>
              </figure>
              <figure className="overflow-hidden border border-cyberBorder bg-cyberPanelSoft">
                <img src="/demo/urol 11days.png" alt="健腎素中風狗狗個案食用 11 天後" className="h-72 w-full object-cover sm:h-80" />
                <figcaption className="px-4 py-3 text-sm font-black text-cyberBlack">食用 11 天後 · 活動狀況改善</figcaption>
              </figure>
            </div>
            <blockquote className="mx-7 mb-7 border-l-2 border-cyberPurple px-5 text-base font-bold leading-8 text-cyberBlack sm:mx-10">「狗狗中風後活動不便，持續食用 11 天後，精神及活動狀況都有改善。」</blockquote>
            <p className="px-7 pb-7 text-xs leading-6 text-cyberGrayMuted sm:px-10">{SUCCESS_STORY_CREDIT}<br />個案圖片及描述只作觀察記錄參考，不能代替獸醫診斷或治療；中風後或出現持續行動異常時，請先諮詢獸醫。</p>
          </section>
        ) : null}
      </div>
    </Layout>
  );
}
