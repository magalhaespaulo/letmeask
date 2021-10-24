import Image from 'next/image'

import { HTMLAttributes, PropsWithChildren } from 'react'

type QuestionProps = HTMLAttributes<HTMLElement> &
  PropsWithChildren<{
    content: string
    author: {
      name: string
      avatar: string
    }
    isHighLighted: boolean
    isAnswered: boolean
  }>

export const Question = (props: QuestionProps) => {
  return (
    <article
      className={`
        relative overflow-hidden
        p-6
        bg-light-dark-alt
        shadow rounded-lg
        ${props.isHighLighted && 'border border-primary borde-solid'}
        ${props.isAnswered && !props.isHighLighted && 'opacity-50'}
        ${props.className || ''}`}
    >
      <span
        className={`
          ${
            props.isHighLighted &&
            'pointer-events-none absolute inset-0 bg-primary opacity-10'
          }
        `}
      ></span>
      {props.content}

      <div
        className="
          flex items-center justify-between gap-4
          mt-8"
      >
        <div className="flex items-center gap-3">
          <div
            className="
              overflow-hidden
              flex-none
              flex items-center justify-center
              w-8 h-8
              bg-gray-light rounded-full"
          >
            <Image
              src={props.author.avatar}
              alt={props.author.name}
              width={32}
              height={32}
            />
          </div>
          <div className="text-gray-dark text-sm">{props.author.name}</div>
        </div>

        <div className="flex-none">{props.children}</div>
      </div>
    </article>
  )
}
