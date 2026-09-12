import '../styles/global.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>寵悅康 Petigrain | 天然科學護理</title>
        <meta name="description" content="寵悅康 Petigrain 以天然植物萃取結合科研實證，為毛孩提供安全有效的全方位健康護理。" />
        <meta name="theme-color" content="#FFFDF8" />
        <meta property="og:title" content="寵悅康 Petigrain | 天然科學護理" />
        <meta property="og:description" content="以天然植物萃取結合科研實證，守護毛孩的健康生活。" />
        <meta property="og:image" content="/demo/demo-featured-1.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="寵悅康 Petigrain | 天然科學護理" />
        <meta name="twitter:description" content="以天然植物萃取結合科研實證，守護毛孩的健康生活。" />
        <meta name="twitter:image" content="/demo/demo-featured-1.jpg" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
