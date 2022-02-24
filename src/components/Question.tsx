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

export const Question = ({
  className = '',
  children,
  content,
  author,
  isHighLighted,
  isAnswered,
}: QuestionProps) => {
  return (
    <article
      className={`
        relative overflow-hidden
        p-6
        bg-light-dark-alt
        shadow rounded-lg
        ${isHighLighted && 'border border-primary borde-solid'}
        ${isAnswered && !isHighLighted && 'opacity-50'}
        ${className}
      `}
    >
      <span
        className={`
          ${isHighLighted && 'pointer-events-none absolute inset-0 bg-primary opacity-10'}
        `}
      />
      {content}

      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="
              overflow-hidden
              flex-none
              flex items-center justify-center
              w-8 h-8
              bg-gray-light rounded-full
            "
          >
            <img src={author.avatar} alt={author.name} width={32} height={32} />
          </div>
          <div className="text-gray-dark text-sm">{author.name}</div>
        </div>

        <div className="flex-none">{children}</div>
      </div>
    </article>
  )
}
