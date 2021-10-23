import Link from 'next/link'
import { HTMLAttributes } from 'react'
import { LogotypeSVG } from './svg/LogotypeSVG'

import { useAuth } from '../hooks/useAuth'

type HeaderProps = HTMLAttributes<HTMLElement>

export const Header = (props: HeaderProps) => {
  const { user, signOutWithGoogle } = useAuth()

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
          <a className="mt-1">
            <LogotypeSVG className="h-[45px]" />
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
                animate-hover hover:text-pink"
              onClick={signOutWithGoogle}
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
