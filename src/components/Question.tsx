import Image from 'next/image'

import { HTMLAttributes, PropsWithChildren } from 'react'

export type QuestionProps = HTMLAttributes<HTMLElement> &
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
      className={`p-6 bg-white rounded-lg shadow ${props.className || ''}`}
    >
      {props.content}

      <div
        className="
          flex items-center justify-between
          mt-8"
      >
        <div className="flex items-center">
          <div
            className="
              relative overflow-hidden
              flex items-center justify-center
              mr-2 w-8 h-8
              bg-gray-light rounded-full"
          >
            <Image
              src={props.author.avatar}
              alt={props.author.name}
              layout="fill"
            />
          </div>
          <div className="text-gray-dark text-sm">{props.author.name}</div>
        </div>
        {props.children}
      </div>
    </article>
  )
}
