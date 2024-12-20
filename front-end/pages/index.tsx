import Head from "next/head";
import Image from "next/image";
import Link from "next/link"; 
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const Home = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('app.title')}</title>
        <meta name="description" content="Welcome to the Game Hub!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={`${styles.page} ${geistSans.variable}`}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t('welcome.message')}</h1>
          <p className={styles.subtitle}>{t('subtitle.message')}</p>
          <Link href="/games">
            <button className={styles.primaryButton}>{t('explore.button')}</button>
          </Link>
        </header>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common'])),
  },
});

export default Home;