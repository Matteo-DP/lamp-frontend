import '../styles/globals.css'
import Head from "next/head"

export default function MyApp({ Component, pageProps }) {
  return
    <>
      <Head>
        <title>Lamp Dashboard | Matteo De Pauw</title>
      </Head>
      <Component {...pageProps} />
    </> 
}