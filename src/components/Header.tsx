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
            <button
              className="
                flex items-center justify-center
                -ml-2
                w-10 h-10
                text-gray-dark
                hover-animation hover:text-pink"
              onClick={handleSignOut}
            >
              <svg
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 21 20"
                width={21}
                height={20}
              >
                <path
                  d="M9 17.5H5.667A1.667 1.667 0 014 15.833V4.167A1.667 1.667 0 015.667 2.5H9m4.833 11.667L18 10l-4.167-4.167M18 10H8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
