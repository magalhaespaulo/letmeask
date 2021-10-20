import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'

import { createContext, useEffect, useState } from 'react'
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth'
import { auth } from '../services/firebase'

type User = {
  id: string
  name: string
  avatar: string
}
type AuthContextType = {
  user: User | undefined
  signInWithGoogle: () => Promise<void>
}
export const AuthContext = createContext({} as AuthContextType)

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        })
      }
    })
  }, [])

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()

    const result = await signInWithPopup(auth, provider)
    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      })
    }
  }

  return (
    <>
      <Head>
        <title>Let Me Ask</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthContext.Provider value={{ user, signInWithGoogle }}>
        <Component {...pageProps} />
      </AuthContext.Provider>
    </>
  )
}
export default MyApp
