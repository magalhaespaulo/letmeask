import Link from 'next/link'
import Image from 'next/image'
import { HTMLAttributes, ReactNode } from 'react'

import logoImg from '../../public/images/logo.svg'

type HeaderProps = HTMLAttributes<HTMLElement> & { children: ReactNode }

export const Header = (props: HeaderProps) => {
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
        <div className="flex items-center gap-4">{props.children}</div>
      </div>
    </header>
  )
}
