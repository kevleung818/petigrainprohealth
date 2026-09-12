import React from 'react';
import Layout from '../components/Layout';

const PRINCIPLES = [
  ['天然植物，科學驗方', '品牌採用嚴格篩選的天然植物萃取，結合現代生物科學研發，確保每款產品具備最高的安全性與功效。全系列均不含人工防腐劑、合成香料及有害化學物質，獨立滴管設計保障每次使用的衛生標準，讓毛孩以最溫和的方式獲得最有效的護理。'],
  ['科研實證，信賴品質', '寵悅康 Petigrain 的產品經過嚴格大學科研測試與實際案例驗證，涵蓋眼部、肝臟、腎臟、免疫力及耳部等多個護理領域。每個成功個案都是我們持續進步的動力，更是家長對品牌信任的最佳見證，讓科學數據說話，為毛孩健康護航。'],
  ['專業研發，精準護理', '創辦人 Dr. Lai 親自踏足毛孩收容中心，接觸數百隻亞健康和生病毛孩，因應毛孩特定生理需求，針對性開發具強力實證天然抗氧化活性驗方，提供穩固免疫力及精準對應不同生理護理需求，全方位優化毛孩健康品質。']
];

export default function HomePage() {
  return (
    <Layout>
      <div className="space-y-20 pb-0">
        <section className="grid overflow-hidden bg-cyberPanelSoft lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex items-center px-7 py-16 sm:px-12 lg:px-16 lg:py-24">
            <div className="max-w-xl">
              <p className="text-sm font-bold tracking-widest text-cyberPurple">關於品牌・天然科學護理</p>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight text-cyberBlack sm:text-5xl">每一份關愛，<br />源自科學。</h1>
              <p className="mt-6 max-w-lg text-base leading-8 text-cyberGray">Petigrain 創辦人 Dr. Lai，自 2007 年起研發天然植物萃取物結合現代科研實證，開拓安全有效的整全天然健康護理系列。</p>
            </div>
          </div>
          <img className="h-full min-h-[380px] w-full object-cover" src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85" alt="被安心照顧的狗狗" />
        </section>

        <section id="story" className="grid gap-10 px-2 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-sm font-bold tracking-widest text-cyberPurple">品牌故事</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-cyberBlack sm:text-4xl">創立初心，<br />使命驅動</h2>
          </div>
          <div className="border-l-2 border-cyberPurple pl-6 text-base leading-8 text-cyberGray sm:pl-8">
            <p>寵悅康 Petigrain 的創立，源於創辦人對毛孩深切的愛護之情，她深信每一隻毛孩都應享有高品質、安全有效、不含副作用的天然護理。</p>
            <p className="mt-5">多年來，創辦人堅守使命，持續以實證科學研發純天然草本抗氧化驗方，為無數毛孩家庭帶來真實改變，守護毛孩的健康生活。</p>
          </div>
        </section>

        <section className="bg-cyberPanelDeep px-7 py-14 sm:px-12 lg:px-16">
          <p className="text-sm font-bold tracking-widest text-cyberPurple">NATURAL SCIENCE CARE</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight text-cyberBlack sm:text-4xl">天然與科學，成為牠最穩定的支持。</h2>
          <div className="mt-10 grid gap-0 border-t border-cyberBorder md:grid-cols-3">
            {PRINCIPLES.map(([title, text], index) => (
              <article key={title} className="border-b border-cyberBorder py-8 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0">
                <span className="text-sm font-bold text-cyberPurple">0{index + 1}</span>
                <h3 className="mt-3 text-xl font-bold text-cyberBlack">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-cyberGray">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="cases" className="grid overflow-hidden bg-cyberPanelSoft lg:grid-cols-2">
          <img className="h-72 w-full object-cover lg:h-full" src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1000&q=85" alt="接受悉心護理的小狗" />
          <div className="px-7 py-14 sm:px-12 lg:px-16">
            <p className="text-sm font-bold tracking-widest text-cyberPurple">品牌承諾</p>
            <h2 className="mt-3 text-3xl font-extrabold text-cyberBlack">寵悅康 Petigrain<sup className="text-xs">TM</sup></h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-cyberGray">寵悅康 Petigrain 致力以天然科學護理，守護每一隻毛孩的健康生活，為毛孩與家庭帶來真實而持久的改變。</p>
          </div>
        </section>

        <footer id="contact" className="bg-cyberBlack px-7 py-12 text-white sm:px-12 lg:px-16">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-sm font-bold tracking-widest text-cyberYellowSoft">購買渠道</p>
              <ol className="mt-5 max-w-3xl space-y-3 text-sm leading-7 text-white/75">
                <li>1. 香港各大授權代理商及指定寵物用品店均有銷售，請認明官方授權標誌，確保購買正品。</li>
                <li>2. 官方網站提供網上訂購及查詢服務，全港配送，快捷方便。</li>
                <li>3. 全港多間獸醫診所及寵物護理中心提供產品及專業使用諮詢服務。</li>
              </ol>
            </div>
            <div>
              <p className="text-lg font-bold">寵悅康 Petigrain<sup className="text-2xs">TM</sup></p>
              <p className="mt-4 text-sm leading-7 text-white/75">健維康科技有限公司<br />Healthy-Bird Technology Co., Ltd.<br />Room 408, 4/F, No. 61 Mody Road, TST East, Kowloon, HK<br />香港九龍尖東麼地道 61 號冠華中心 4 樓 408B 室<br />+852 2868 0085</p>
            </div>
          </div>
          <div className="mt-10 border-t border-white/20 pt-5 text-xs text-white/55">2026 健維康科技有限公司 Healthy-Bird Technology Co., Ltd. All rights reserved.　私隱政策　使用條款</div>
        </footer>
      </div>
    </Layout>
  );
}
