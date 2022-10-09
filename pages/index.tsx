import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <meta
          name="description"
          content="Gana dinero compartiendo tus apuntes, y descarga los de tu clase de forma rápida y sencilla."
        />
        <meta name="keyword" content="Apuntes" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://test-wuolah.netlify.app" />
        <meta property="og:title" content="Wuolah" />
        <meta
          property="og:description"
          content="Gana dinero compartiendo tus apuntes, y descarga los de tu clase de forma rápida y sencilla."
        />
        <meta
          property="og:image"
          content="https://test-wuolah.netlify.app/wuolahLogo.png"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Go to universities!</h1>

        <div className={styles.grid}>
          <Link href={`/universities/`}>
            <a className={styles.card}>Universities</a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
