import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  small?: boolean
  outline?: boolean
  danger?: boolean
  google?: boolean
}

export const Button = ({
  className = '',
  small,
  outline,
  danger,
  google,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={`
        flex items-center justify-center
        rounded-lg
        font-medium
        animate-hover
        ${small ? 'px-3 lg:px-6 h-10' : 'px-6 h-14'}
        ${outline && 'bg-transparent border border-solid'}
        ${danger && (outline ? `text-red border-red` : 'text-white bg-red')}
        ${google && (outline ? 'text-google border-google' : 'text-white bg-google')}
        ${!danger && !google && (outline ? 'text-primary border-primary' : 'text-white bg-primary')}
        ${className}
      `}
    />
  )
}
