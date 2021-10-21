import Image from 'next/image'

import { ButtonHTMLAttributes } from 'react'

import copyImg from '../../public/images/copy.svg'

type RoomCodeProps = {
  code: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const RoomCode = (props: RoomCodeProps) => {
  const copyRoomCodeToClipboard = () => {
    navigator.clipboard.writeText(props.code)
  }

  return (
    <button
      {...props}
      className={`
        flex items-center
        overflow-hidden rounded-lg
        border boder-solid border-purple
        hover-animation
        ${props.className || ''}`}
      onClick={copyRoomCodeToClipboard}
    >
      <div className="flex items-center justify-center w-11 h-10 bg-purple">
        <Image src={copyImg} alt="Copy room code" />
      </div>
      <span className="pl-3 pr-4 font-medium">Sala #{props.code}</span>
    </button>
  )
}
