import { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={`
        flex items-center justify-center
        px-6 h-14
        bg-purple rounded-lg
        text-white font-medium
        hover-animation
        ${props.className || ''}`}
    >
      {props.children || 'Children undefined'}
    </button>
  )
}
