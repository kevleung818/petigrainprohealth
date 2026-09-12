import React from 'react';
import Layout from '../components/Layout';
import PrimaryButton from '../components/PrimaryButton';

export const PRODUCTS = [
  {
    slug: 'bri-sol',
    name: '添麗輝',
    english: 'Bri-Sol',
    strapline: '抗眼衰老護眼液',
    colour: 'border-sky-400',
    badge: '護理眼睛健康',
    capacity: '10ml',
    description: '添麗輝抗衰老護眼液採用澳洲草本製成，專為眼睛日常保養研發。成份溫和，有助促進眼周微循環，舒緩眼部乾澀、疲勞感與隨年齡產生的沉重負擔，維持雙眼清透晶亮。',
    benefits: ['舒緩眼部乾澀及疲勞', '促進眼周微循環', '維持雙眼清透晶亮'],
    suitable: '結膜炎、眼分泌物、眼乾、紅筋、飛蚊',
    ingredients: '鹽水、甘菊花露、植物甘油、蘆薈、花梨木、甘菊、紅桃金孃、薰衣草、絲柏及迷迭香抗氧化劑',
    usage: '每天使用 2-3 次，每次 2 至 3 滴或按需要調整。',
    note: '發明專利 HK30122362 · 澳洲草本配方'
  },
  {
    slug: 'oti-dor',
    name: '朵清新',
    english: 'Oti-Dor',
    strapline: '耳朵清爽，頭仔不耳搖',
    colour: 'border-amber-300',
    badge: '耳道日常護理',
    capacity: '15ml',
    description: '朵清新專為寵物耳道護理研發，採用天然植物萃取，有效溶解耳道內積聚的耳垢與分泌物，並消除耳部異味。溫和清潔的同時舒緩肌膚不適，適合敏弱耳道使用。',
    benefits: ['耳道深層清潔，溶解耳垢與分泌物', '天然抗菌成分，舒緩耳部炎症及痕癢', '平衡耳道菌叢，減少異常分泌物積聚', '定期護理，預防耳道炎症反覆發作'],
    suitable: '耳道、外耳周圍及肌膚局部保養',
    ingredients: '甜杏油、維他命 E、佛手柑、絲柏、尤加利、茶樹、丁香',
    usage: '塗搽耳道。若毛孩耳部情況嚴重或有異常，請及時諮詢獸醫。',
    note: '天然植物萃取 · 適合敏弱耳道'
  },
  {
    slug: 'immu-guard',
    name: '健體素',
    english: 'IMMU GUARD',
    strapline: '維持免疫力穩態 + 抗氧化防護',
    colour: 'border-emerald-600',
    badge: '全方位守護寵物',
    capacity: '30ml',
    description: '寵物健康的基石從良好免疫力開始。健體素有助穩定關鍵蛋白 GRP78，由內而外維持細胞健康運作，調節生理機能，降低身體負擔。經大學生物測試證明，能協助調節內部生理指標，維持身體健康的防護屏障。',
    benefits: ['機能修復：適合術後、病後或體弱調理', '舒緩皮膚敏感，維持肌膚屏障', '口腔健康護理，維護牙齦及口腔整體健康', '呼吸與腸胃支援，協助腸胃微生態平衡'],
    suitable: '免疫力、皮膚、口腔、呼吸與腸胃健康支援',
    ingredients: '甜杏仁油、酪梨油、小麥胚芽油、墨角蘭、花梨木、絲柏、天竺葵、檀香',
    usage: '按日常需要使用，請遵照專業人士建議。',
    note: '大學生物科研測試 · CN ZL202180061153.5 · HK S01004 · TW I833096'
  },
  {
    slug: 'hepa-guard',
    name: '健肝素',
    english: 'HEPA GUARD',
    strapline: '守護肝臟 + 心血管 + 抗衰老',
    colour: 'border-orange-500',
    badge: '護肝排毒與細胞修復',
    capacity: '30ml',
    description: '健肝素經大學生物科研測試，專利配方含高效天然草本活性護肝成份和植物不飽和脂肪酸 Ω-6 及 Ω-9，能對抗氧化應激引起的肝細胞損害，有效調節並緩解關鍵指標。',
    benefits: ['護肝排毒與細胞修復，提升肝臟整體功能', '心血管保健，降低氧化壓力並促進血液循環', '延緩老化與認知保護，守護神經系統', '深層皮毛滋養，維持毛色光澤柔亮'],
    suitable: '肝臟、心血管、抗氧化及高齡毛孩日常保健',
    ingredients: '甜杏仁油、酪梨油、小麥胚芽油、甘菊、杜松子、牛至、迷迭香',
    usage: '按日常需要使用，請遵照專業人士建議。',
    note: '發明專利 EU3441075 · CN201710217749.5 · TW I733792 · HK1246639'
  },
  {
    slug: 'urol-guard',
    name: '健腎素',
    english: 'UROL GUARD',
    strapline: '腎臟健康 + 平穩情緒 + 手足協調',
    colour: 'border-blue-800',
    badge: '熟齡腎臟健康支援',
    capacity: '30ml',
    description: '隨著毛孩邁入高齡，常出現腎功能低下、異常疲憊、腿無力、焦慮緊張、頻繁吠叫或過度舔毛等狀況。天然草本配方健腎素經大學研究證實，能幫助補充多巴胺前驅物與 GABA 相關營養，協助強化腎功能、促進新陳代謝及維持體液平衡。',
    benefits: ['平穩情緒與認知，減少熟齡焦慮與行為異常', '舒緩身體緊繃，維持身體鬆弛與舒適度', '協助強化腎功能與促進新陳代謝', '維持手足協調及熟齡毛孩生活品質'],
    suitable: '腎臟健康、熟齡情緒、體力與手足協調支援',
    ingredients: '甘菊純露及迷迭香純露',
    usage: '滴在水中飲用。',
    note: '發明專利 CN ZL202180061153.5 · HK S01004 · TW I833096'
  }
];

function ProductCard({ product }) {
  return (
    <article className={`flex h-full flex-col border-l-8 border-y border-r border-cyberBorder bg-white ${product.colour}`}>
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-cyberBorder px-6 pb-5 pt-6 sm:px-7">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyberGray">{product.english}</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-cyberBlack">{product.name}</h2>
          <p className="mt-2 inline-block bg-cyberBlack px-3 py-1 text-sm font-bold text-white">{product.strapline}</p>
        </div>
        <div className="text-right text-xs font-bold text-cyberGray">
          <span className="block text-cyberPurple">容量</span>
          <span className="mt-1 block text-base text-cyberBlack">{product.capacity}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-6 py-6 sm:px-7">
        <p className="inline-flex self-start bg-cyberPanelSoft px-3 py-1 text-sm font-bold text-cyberBlack">產品簡介</p>
        <p className="mt-4 text-sm leading-7 text-cyberGray">{product.description}</p>

        <div className="mt-6">
          <p className="text-sm font-bold text-cyberBlack">{product.badge}</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-cyberGray">
            {product.benefits.map((benefit) => <li key={benefit}>★ {benefit}</li>)}
          </ul>
        </div>

        <dl className="mt-6 grid gap-4 border-t border-cyberBorder pt-5 text-sm">
          <div>
            <dt className="font-bold text-cyberBlack">適合範圍</dt>
            <dd className="mt-1 leading-6 text-cyberGray">{product.suitable}</dd>
          </div>
          <div>
            <dt className="font-bold text-cyberBlack">主要成分</dt>
            <dd className="mt-1 leading-6 text-cyberGray">{product.ingredients}</dd>
          </div>
        </dl>

        <div className="mt-auto border-t border-cyberBorder pt-5">
          <p className="text-xs font-bold leading-5 text-cyberGray">使用方法：{product.usage}</p>
          <p className="mt-3 text-xs leading-5 text-cyberGrayMuted">{product.note}</p>
          <PrimaryButton href="/#contact" className="mt-5 w-full" variant="primary">查詢產品</PrimaryButton>
        </div>
      </div>
    </article>
  );
}

export default function ProductsPage() {
  return (
    <Layout>
      <div className="pb-10">
        <section className="border-b border-cyberBorder py-12 sm:py-16">
          <p className="text-sm font-bold tracking-widest text-cyberPurple">全天然科學寵物護理</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-extrabold leading-tight text-cyberBlack sm:text-5xl">全方位天然健康產品</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-cyberGray">以天然植物萃取、科研實證及清晰成分為基礎，為毛孩提供眼睛、耳道、免疫、肝臟及腎臟的精準日常護理。</p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs font-bold text-cyberGray">
            <span className="border border-cyberBorder bg-white px-4 py-2">澳洲進口</span>
            <span className="border border-cyberBorder bg-white px-4 py-2">天然植物配方</span>
            <span className="border border-cyberBorder bg-white px-4 py-2">大學生物科研測試</span>
          </div>
        </section>

        <section className="grid gap-6 py-10 lg:grid-cols-2">
          {PRODUCTS.map((product) => <ProductCard key={product.english} product={product} />)}
        </section>

        <section className="border-t border-cyberBorder py-10 text-sm leading-7 text-cyberGray">
          <p className="font-bold text-cyberBlack">使用提示</p>
          <p className="mt-2 max-w-3xl">以上產品資料整理自 Petigrain 官方產品單張。產品屬健康輔助範疇；如毛孩有持續或嚴重症狀，請先諮詢獸醫或合資格專業人士。</p>
        </section>
      </div>
    </Layout>
  );
}