import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import logo from '../public/logo/logo.svg';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Storedash Distributor</title>
        <meta name="description" content="Storedash Distributor Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image src={logo} alt='Logo'></Image>
      <div className={`mx-2 ${styles.heading}`}>
        Storedash Distributor
      </div>



    </div>
  )
}

export default Home
