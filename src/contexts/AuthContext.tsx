import { AuthContextType, User } from '../types'

import { createContext, ReactNode, useEffect, useState } from 'react'
import { GoogleAuthProvider, signInWithPopup, signOut } from '@firebase/auth'
import { auth } from '../services/firebase'

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export const AuthContextProvider = (props: AuthContextProviderProps) => {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
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
    return () => {
      unsubscribe()
    }
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

  const signOutWithGoogle = async () => {
    await signOut(auth)
    setUser(undefined)
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOutWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  )
}
