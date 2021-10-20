import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'

import { AuthContextProvider } from '../contexts/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Let Me Ask</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  )
}
export default MyApp
