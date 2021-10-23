import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { FormEvent, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { database } from '../../services/firebase'
import { push, ref, remove } from 'firebase/database'

import { useRoom } from '../../hooks/useRoom'
import { useAnimate } from '../../hooks/useAnimate'

import { Button } from '../../components/Button'
import { RoomCode } from '../../components/RoomCode'
import { Question } from '../../components/Question'

import { SpinnerSVG } from '../../components/SpinnerSVG'
import logoImg from '../../../public/images/logo.svg'

const Room: NextPage = () => {
  const { user } = useAuth()
  const router = useRouter()
  const { id } = router.query
  const roomId = id as string

  const { title, questions } = useRoom(roomId)
  const [newQuestion, setNewQuestion] = useState('')

  const { animate, setAnimate } = useAnimate()
  const [loading, setLoading] = useState(false)

  const handleSendQuestion = async (event: FormEvent) => {
    event.preventDefault()

    const content = newQuestion.trim()

    if (content === '') {
      setAnimate('animate-shake')
      return
    }

    if (!user) {
      throw new Error('You must be logged in')
    }

    setLoading(true)

    const questionData = {
      content,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighLighted: false,
      isAnswered: false,
    }

    const questionsDatabaseRef = ref(database, `rooms/${roomId}/questions`)

    await push(questionsDatabaseRef, questionData)

    setNewQuestion('')
    setLoading(false)
  }

  const handleLikeQuestion = async (questionId: string, likeId?: string) => {
    if (likeId) {
      await remove(
        ref(database, `rooms/${roomId}/questions/${questionId}/likes/${likeId}`)
      )
    } else {
      await push(
        ref(database, `rooms/${roomId}/questions/${questionId}/likes`),
        { authorId: user?.id }
      )
    }
  }

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
          <RoomCode code={roomId} />
        </div>
      </header>

      <main className="px-4 pb-20 max-w-4xl mx-auto">
        <header className="my-10 flex items-center">
          <h1 className="text-2xl font-poppins font-bold">Sala {title}</h1>
          {questions.length > 0 && (
            <span className="ml-4 px-4 py-2 rounded-full text-white text-sm font-medium bg-pink">
              {questions.length} Pergunta
              {questions.length > 1 && 's'}
            </span>
          )}
        </header>

        <form className="mb-9" onSubmit={handleSendQuestion}>
          <textarea
            className={`
              resize-none
              p-5
              w-full h-36
              bg-white rounded-lg shadow
              ${animate}`}
            placeholder="O que você quer perguntar?"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <footer
            className="
              flex items-center justify-between
              mt-4"
          >
            {user ? (
              <div className="flex items-center">
                <div
                  className="
                    relative overflow-hidden
                    flex items-center justify-center
                    mr-2
                    w-8 h-8
                    bg-gray-light rounded-full"
                >
                  <Image src={user.avatar} alt={user.name} layout="fill" />
                </div>
                <div className="text-black text-sm font-medium">
                  {user.name}
                </div>
              </div>
            ) : (
              <span className="text-gray-dark text-sm font-medium">
                Para enviar uma pergunta,
                <button className="line-link ml-1 text-purple border-purple font-medium">
                  faça seu login
                </button>
              </span>
            )}
            <Button type="submit" disabled={!user}>
              {loading && <SpinnerSVG className="-ml-1 mr-3" />}
              Enviar pergunta
            </Button>
          </footer>
        </form>

        {questions.map((question) => {
          return (
            <Question
              key={question.id}
              className="mb-4 last:mb-0"
              content={question.content}
              author={question.author}
              isHighLighted={question.isHighLighted}
              isAnswered={question.isAnswered}
            >
              <div className="flex items-end">
                {question.likeCount > 0 && (
                  <span className="text-gray-dark font-poppins">
                    {question.likeCount}
                  </span>
                )}
                {!question.isAnswered && (
                  <button
                    className={`
                      flex items-center justify-center
                      w-10 h-8
                      hover-animation
                      ${question.likeId ? 'text-purple' : 'text-gray-dark'}`}
                    aria-label="Gostei"
                    onClick={() =>
                      handleLikeQuestion(question.id, question.likeId)
                    }
                  >
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </Question>
          )
        })}
      </main>
    </>
  )
}

export default Room
