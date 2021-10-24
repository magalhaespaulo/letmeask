import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren<{
    small?: string
    outline?: string
    danger?: string
    google?: string
  }>

export const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={`
        flex items-center justify-center
        rounded-lg
        font-medium
        animate-hover
        ${props.small ? 'px-3 lg:px-6 h-10' : 'px-6 h-14'}
        ${props.outline && 'bg-transparent border border-solid'}
        ${
          props.danger &&
          (props.outline ? `text-red border-red` : 'text-white bg-red')
        }
        ${
          props.google &&
          (props.outline ? 'text-google border-google' : 'text-white bg-google')
        }
        ${
          // default
          !props.danger &&
          !props.google &&
          (props.outline
            ? 'text-primary border-primary'
            : 'text-white bg-primary')
        }
        ${props.className || ''}`}
    >
      {props.children || 'Children undefined'}
    </button>
  )
}
