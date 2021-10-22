import Image from 'next/image'

import { HTMLAttributes } from 'react'

import likeImg from '../../public/images/like.svg'

export type QuestionProps = HTMLAttributes<HTMLElement> & {
  content: string
  author: {
    name: string
    avatar: string
  }
  isHighLighted: boolean
  isAnswered: boolean
}

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
              overflow-hidden
              flex items-center justify-center
              mr-2 w-8 h-8
              bg-gray-light rounded-full"
          >
            <img src={props.author.avatar} alt={props.author.name} />
          </div>
          <div className="text-gray-dark text-sm">{props.author.name}</div>
        </div>

        <footer className="flex items-end">
          <div className="text-gray-dark font-poppins">16</div>
          <button
            className="
              flex items-center justify-center
              w-10 h-8
              hover-animation"
          >
            <Image src={likeImg} alt="Like" />
          </button>
        </footer>
      </div>
    </article>
  )
}
