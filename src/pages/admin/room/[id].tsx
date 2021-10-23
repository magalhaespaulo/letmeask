import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useRoom } from '../../../hooks/useRoom'

import { Header } from '../../../components/Header'
import { Button } from '../../../components/Button'
import { RoomCode } from '../../../components/RoomCode'
import { Question } from '../../../components/Question'

import { database } from '../../../services/firebase'
import { remove, ref, update } from '@firebase/database'
import { SpinnerSVG } from '../../../components/SpinnerSVG'

const AdminRoom: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const roomId = id as string

  const { title, questions, isAdmin, isClosed } = useRoom(roomId)

  const handleOpenRoom = async () => {
    await update(ref(database, `rooms/${roomId}`), {
      closedAt: '',
    })
    router.reload()
  }

  const handleEndRoom = async () => {
    await update(ref(database, `rooms/${roomId}`), {
      closedAt: new Date(),
    })

    router.push('/')
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

  return !isAdmin ? (
    <main className="flex items-center justify-center w-screen h-screen">
      {!title ? (
        <SpinnerSVG className="text-purple" />
      ) : (
        <h1>Somente o criador pode administrar a sala.</h1>
      )}
    </main>
  ) : (
    <>
      <Header>
        <RoomCode code={roomId} />
        {isClosed ? (
          <Button className="h-10" onClick={handleOpenRoom}>
            Abrir sala
          </Button>
        ) : (
          <Button
            className="h-10 text-purple bg-white border border-purple border-solid"
            onClick={handleEndRoom}
          >
            Encerrar sala
          </Button>
        )}
      </Header>

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
              <div className="flex items-center gap-4">
                <span className="text-gray-dark font-poppins -mb-0.5">
                  {question.likeCount}
                </span>

                <button
                  className={`hover-animation hover:text-pink ${
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
                  className={`hover-animation hover:text-pink ${
                    question.isHighLighted ? 'text-purple' : 'text-gray-dark'
                  }`}
                  arial-label="Destacar pergunta"
                  onClick={() =>
                    handleHighlightQuestion(question.id, question.isHighLighted)
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
                  className="hover-animation hover:text-pink text-red"
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
              </div>
            </Question>
          )
        })}
      </main>
    </>
  )
}

export default AdminRoom
