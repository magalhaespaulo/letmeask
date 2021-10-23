import type { NextPage } from 'next'

import Image from 'next/image'
import { useRouter } from 'next/router'

import { FormEvent, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { database } from '../../services/firebase'
import { push, ref, remove, update } from 'firebase/database'

import { useRoom } from '../../hooks/useRoom'
import { useAnimate } from '../../hooks/useAnimate'

import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { RoomCode } from '../../components/RoomCode'
import { Question } from '../../components/Question'

import { SpinnerSVG } from '../../components/svg/SpinnerSVG'

const Room: NextPage = () => {
  const { user, signInWithGoogle } = useAuth()
  const router = useRouter()
  const { id } = router.query
  const roomId = id as string

  const { title, questions, isAdmin, isClosed } = useRoom(roomId)
  const [newQuestion, setNewQuestion] = useState('')

  const { animate, setAnimate } = useAnimate()
  const [loading, setLoading] = useState(false)
  const [loadingGoogle, setLoadingGoogle] = useState(false)

  const signIn = async (event: FormEvent) => {
    event.preventDefault()

    setLoadingGoogle(true)

    if (!user) {
      await signInWithGoogle()
    }
    setLoadingGoogle(false)
  }

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

  //
  // Handles of Admin below
  //

  const handleOpenRoom = async () => {
    await update(ref(database, `rooms/${roomId}`), {
      closedAt: '',
    })
  }

  const handleEndRoom = async () => {
    await update(ref(database, `rooms/${roomId}`), {
      closedAt: new Date(),
    })
  }

  const handleCheckQuestionAnswered = async (
    questionId: string,
    previousValue: boolean
  ) => {
    await update(ref(database, `rooms/${roomId}/questions/${questionId}`), {
      isAnswered: !previousValue,
    })
  }

  const handleHighlightQuestion = async (
    questionId: string,
    previousValue: boolean
  ) => {
    await update(ref(database, `rooms/${roomId}/questions/${questionId}`), {
      isHighLighted: !previousValue,
    })
  }

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await remove(ref(database, `rooms/${roomId}/questions/${questionId}`))
    }
  }

  return (
    <>
      <Header>
        <RoomCode code={roomId} />
        {isAdmin &&
          (isClosed ? (
            <Button className="h-10" onClick={handleOpenRoom}>
              Abrir&nbsp;<span className="hidden lg:inline">sala</span>
            </Button>
          ) : (
            <Button
              className="px-3 lg:px-6 h-10 text-purple bg-transparent border border-purple border-solid"
              onClick={handleEndRoom}
            >
              Encerrar&nbsp;<span className="hidden lg:inline">sala</span>
            </Button>
          ))}
      </Header>

      <main className="px-4 pb-20 max-w-4xl mx-auto">
        {title ? (
          <header className="my-10 flex items-center flex-col lg:flex-row gap-2">
            <h1 className="text-lg font-poppins font-bold">
              Sala {title}
              {isClosed && ' foi encerrada'}
            </h1>

            {questions.length > 0 && (
              <span className="px-4 py-2 rounded-full text-white text-sm font-medium bg-pink">
                {questions.length} Pergunta
                {questions.length > 1 && 's'}
              </span>
            )}
          </header>
        ) : (
          // skeleton
          <header className="animate-pulse my-10 flex items-center flex-col lg:flex-row gap-2">
            <h1 className="text-lg text-gray font-poppins font-bold">
              Carregando
            </h1>
            <span className="px-4 py-2 rounded-full text-transparent text-sm font-medium bg-gray-light">
              0 Perguntas
            </span>
          </header>
        )}

        {title ? (
          !isClosed && (
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
                className={`
                    flex justify-between gap-4
                    mt-4
                ${
                  !user
                    ? 'flex-col lg:flex-row items-end lg:items-center'
                    : 'items-center'
                }`}
              >
                {user ? (
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
                        src={user.avatar}
                        alt={user.name}
                        width={32}
                        height={32}
                      />
                    </div>
                    <div className="text-gray-dark text-sm">{user.name}</div>
                  </div>
                ) : (
                  <span
                    className="
                        flex items-center
                        text-gray-dark text-sm font-medium"
                  >
                    Para enviar uma pergunta,
                    <button
                      className="line-link ml-1 text-purple border-purple font-medium"
                      onClick={(event) => signIn(event)}
                    >
                      faça seu login
                    </button>
                    {loadingGoogle && (
                      <SpinnerSVG className="-ml-r ml-3 text-purple" />
                    )}
                  </span>
                )}
                <Button className="flex-none" type="submit" disabled={!user}>
                  {loading && <SpinnerSVG className="-ml-1 mr-3" />}
                  Enviar pergunta
                </Button>
              </footer>
            </form>
          )
        ) : (
          // skeleton
          <form className="animate-pulse mb-9" onSubmit={handleSendQuestion}>
            <textarea
              disabled
              className="resize-none p-5 w-full h-36 bg-white rounded-lg shadow"
              placeholder="O que você quer perguntar?"
            />
            <footer className="flex justify-between gap-4 mt-4">
              <div className="flex items-center gap-3">
                <div className="overflow-hidden flex-none flex items-center justify-center w-8 h-8 bg-gray-light rounded-full"></div>
                <div className="text-gray-dark text-sm">Carregando</div>
              </div>
              <Button disabled className="flex-none bg-gray text-transparent">
                Enviar pergunta
              </Button>
            </footer>
          </form>
        )}

        {questions.map((question) => {
          return (
            <Question
              key={question.id}
              className="mb-4 last:mb-0 animate-fade"
              content={question.content}
              author={question.author}
              isHighLighted={question.isHighLighted}
              isAnswered={question.isAnswered}
            >
              <div className="flex items-center gap-4">
                <div className="flex items-end gap-2">
                  {question.likeCount > 0 && (
                    <span className="text-gray-dark font-poppins leading-none">
                      {question.likeCount}
                    </span>
                  )}

                  <button
                    className={`
                      animate-hover hover:text-pink disabled:hover:text-gray-dark
                      ${question.likeId ? 'text-purple' : 'text-gray-dark'}`}
                    aria-label="Gostei"
                    onClick={() =>
                      handleLikeQuestion(question.id, question.likeId)
                    }
                    disabled={!user || question.isAnswered || isClosed}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      width="24"
                      height="24"
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
                </div>

                {isAdmin && (
                  <>
                    <button
                      className={`
                        animate-hover hover:text-pink ${
                          question.isAnswered ? 'text-purple' : 'text-gray-dark'
                        }`}
                      arial-label="Marcar como respondida"
                      onClick={() =>
                        handleCheckQuestionAnswered(
                          question.id,
                          question.isAnswered
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="12.0003"
                          cy="11.9998"
                          r="9.00375"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <button
                      className={`
                        animate-hover hover:text-pink ${
                          question.isHighLighted
                            ? 'text-purple'
                            : 'text-gray-dark'
                        }`}
                      arial-label="Destacar pergunta"
                      onClick={() =>
                        handleHighlightQuestion(
                          question.id,
                          question.isHighLighted
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <button
                      className="animate-hover hover:text-pink text-red"
                      arial-label="Apagar pergunta"
                      onClick={() => handleDeleteQuestion(question.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path
                          d="M3 5.99988H5H21"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </>
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
