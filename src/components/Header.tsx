import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { HTMLAttributes, ReactNode } from 'react'

import { useAuth } from '../hooks/useAuth'

import logoImg from '../../public/images/logo.svg'

type HeaderProps = HTMLAttributes<HTMLElement> & { children: ReactNode }

export const Header = (props: HeaderProps) => {
  const router = useRouter()
  const { user, signOutWithGoogle } = useAuth()

  const handleSignOut = async () => {
    await signOutWithGoogle()
    router.push('/')
  }

  return (
    <header className="border-b border-gray-light border-solid">
      <div
        className={`
          px-4 max-w-7xl mx-auto
          h-28
          flex items-center justify-between
          ${props.className || ''}`}
      >
        <Link href="/">
          <a>
            <Image
              src={logoImg}
              alt="Logotipo Let Me Ask"
              width={100}
              height={50}
            />
          </a>
        </Link>
        <div className="flex items-center gap-4">
          {props.children}
          {user && (
            <button className="hover-animation" onClick={handleSignOut}>
              Sair
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
