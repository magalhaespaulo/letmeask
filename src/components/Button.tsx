import { PointerEventHandler, ReactNode } from 'react'

type ButtonProps = {
  children?: ReactNode
  click?: PointerEventHandler
  className?: string
  ariaLabel?: string
}

export const Button = (props: ButtonProps): JSX.Element => {
  return (
    <button
      className={`flex items-center justify-center
                  px-4 py-2
                  bg-gray-100 rounded
                  text-black font-medium
                  cursor-pointer select-none
                  ${props.className || ''}`
        .replace(/\s+/g, ' ')
        .trim()}
      aria-label={props.ariaLabel}
      onPointerDown={props.click || (() => alert('Click undefined'))}
    >
      {props.children || 'Children undefined'}
    </button>
  )
}
