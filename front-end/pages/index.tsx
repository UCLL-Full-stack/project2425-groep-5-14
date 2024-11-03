// pages/index.tsx
import Head from "next/head";
import Image from "next/image";
import Link from "next/link"; 
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const Home = () => {
  return (
    <>
      <Head>
        <title>Game Hub</title>
        <meta name="description" content="Welcome to the Game Hub!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.page} ${geistSans.variable}`}>
        <header className={styles.header}>
          <h1 className={styles.title}>Welcome to the Game Hub!</h1>
          <p className={styles.subtitle}>Your portal to endless fun and excitement.</p>
          <Link href="/games">
            <button className={styles.primaryButton}>Explore Games</button>
          </Link>
        </header>
        <main className={styles.main}>
          <Image
            className={styles.logo}
            src="/game.webp"
            alt="Games Image"
            width={600}
            height={400}
            priority
          />
          <section className={styles.features}>
            <h2 className={styles.featuresTitle}>Why Choose Us?</h2>
            <ul className={styles.featureList}>
              <li>🎮 Diverse Game Collection</li>
              <li>🕹️ User-Friendly Interface</li>
              <li>🔄 Regular Updates</li>
              <li>🌐 Community Engagement</li>
            </ul>
          </section>
        </main>
        <footer className={styles.footer}>
          <p>© 2024 Game Hub. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default Home;
