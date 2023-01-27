import '../styles/globals.css'
import Head from "next/head"
import { AuthProvider } from '../src/contexts/AuthContext'

export default function MyApp({ Component, pageProps }) {
  return(
    <>
      <Head>
        <title> Dashboard | Matteo De Pauw</title>
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </> 
  )
}