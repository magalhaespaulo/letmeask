import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { useRoom } from '../../../hooks/useRoom'

import { Button } from '../../../components/Button'
import { RoomCode } from '../../../components/RoomCode'
import { Question } from '../../../components/Question'

import logoImg from '../../../../public/images/logo.svg'

const AdminRoom: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const roomId = id as string

  const { title, questions } = useRoom(roomId)

  return (
    <>
      <header className="border-b border-gray-light border-solid">
        <div
          className="
            px-4 max-w-7xl mx-auto
            h-28
            flex items-center justify-between"
        >
          <Link href="/">
            <a>
              <Image
                src={logoImg}
                alt="Logotipo Let Me Ask"
                width={100}
                height={50}
              />
            </a>
          </Link>
          <div className="flex items-center gap-4">
            <RoomCode code={roomId} />
            <Button className="h-10 text-purple bg-white border border-purple border-solid">
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main className="px-4 max-w-4xl mx-auto">
        <header className="my-10 flex items-center">
          <h1 className="text-2xl font-poppins font-bold">Sala {title}</h1>
          {questions.length > 0 && (
            <span className="ml-4 px-4 py-2 rounded-full text-white text-sm font-medium bg-pink-dark">
              {questions.length} Pergunta
              {questions.length > 1 && 's'}
            </span>
          )}
        </header>

        {questions.map((question) => {
          return (
            <Question
              key={question.id}
              className="mb-4 last:mb-0"
              content={question.content}
              author={question.author}
              isHighLighted={question.isHighLighted}
              isAnswered={question.isAnswered}
            />
          )
        })}
      </main>
    </>
  )
}

export default AdminRoom
