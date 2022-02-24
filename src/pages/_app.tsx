import '../styles/globals.css'

import type { AppProps } from 'next/app'

import { ThemeProvider } from 'next-themes'
import { AuthContextProvider } from '../contexts/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="purple">
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </ThemeProvider>
  )
}
export default MyApp
