import '../styles/globals.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'

import { ThemeProvider } from 'next-themes'
import { AuthContextProvider } from '../contexts/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Let Me Ask</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider defaultTheme="purple">
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </ThemeProvider>
    </>
  )
}
export default MyApp
