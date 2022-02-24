import { SVGAttributes } from 'react'

type SignInSVGProps = SVGAttributes<SVGElement>

export const SignInSVG = ({ className }: SignInSVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 21 20"
      className={className || 'w-6 h-6'}
    >
      <path
        d="M13 2.5h3.333A1.666 1.666 0 0118 4.167v11.666a1.666 1.666 0 01-1.667 1.667H13m-4.167-3.333L13 10 8.833 5.833M13 10H3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
