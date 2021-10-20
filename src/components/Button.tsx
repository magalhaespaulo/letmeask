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
        transition transform motion-reduce:transform-none
        hover:scale-105 hover:brightness-110
        disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 disabled:hover:brightness-100
        ${props.className || ''}`}
    >
      {props.children || 'Children undefined'}
    </button>
  )
}
