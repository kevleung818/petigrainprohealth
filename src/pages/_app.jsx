import '../styles/global.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>寵悅康 Petigrain | 天然科學護理</title>
        <meta name="description" content="寵悅康 Petigrain 以天然植物萃取結合科研實證，為香港毛孩提供安全有效的全方位健康護理產品及專業資訊。" />
        <meta name="keywords" content="寵悅康, Petigrain, 毛孩健康, 寵物護理, 天然草本, 天然植物萃取, 寵物眼睛護理, 寵物耳部護理, 香港寵物用品" />
        <meta name="author" content="寵悅康 Petigrain" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="theme-color" content="#FFFDF8" />
        <meta property="og:title" content="寵悅康 Petigrain | 天然科學護理" />
        <meta property="og:description" content="以天然植物萃取結合科研實證，守護香港毛孩的健康生活。" />
        <meta property="og:site_name" content="寵悅康 Petigrain" />
        <meta property="og:locale" content="zh_HK" />
        <meta property="og:image" content="/demo/demo-featured-1.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="寵悅康 Petigrain | 天然科學護理" />
        <meta name="twitter:description" content="以天然植物萃取結合科研實證，守護香港毛孩的健康生活。" />
        <meta name="twitter:image" content="/demo/demo-featured-1.jpg" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
