import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { FormEvent, useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { database } from '../../services/firebase'
import { onValue, push, ref } from 'firebase/database'

import { Button } from '../../components/Button'

import logoImg from '../../../public/images/logo.svg'
import likeImg from '../../../public/images/like.svg'
import { RoomCode } from '../../components/RoomCode'

type FirebaseQuestions = Record<
  string,
  {
    content: string
    author: {
      name: string
      avatar: string
    }
    isHighLighted: boolean
    isAnswered: boolean
  }
>

type Question = {
  id: string
  content: string
  author: {
    name: string
    avatar: string
  }
  isHighLighted: boolean
  isAnswered: boolean
}

const Room: NextPage = () => {
  const { user } = useAuth()
  const router = useRouter()
  const { id } = router.query
  const [newQuestion, setNewQuestion] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [title, setTitle] = useState('')

  const roomId = id as string

  useEffect(() => {
    if (!roomId) {
      return
    }

    const roomDatabaseRef = ref(database, `rooms/${roomId}`)

    const unsubscribe = onValue(roomDatabaseRef, (snapshot) => {
      if (!snapshot.exists()) {
        return
      }

      const databaseRoom = snapshot.val()
      setTitle(databaseRoom.title)

      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions
      if (!firebaseQuestions) {
        return
      }

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighLighted: value.isHighLighted,
            isAnswered: value.isAnswered,
          }
        }
      )

      setQuestions(parsedQuestions)
    })

    return () => {
      unsubscribe()
    }
  }, [roomId])

  const handleSendQuestion = async (event: FormEvent) => {
    event.preventDefault()

    const content = newQuestion.trim()

    if (content === '') {
      return
    }

    if (!user) {
      throw new Error('You must be logged in')
    }

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

        <form onSubmit={handleSendQuestion}>
          <textarea
            className="resize-none p-5 w-full h-36 bg-white rounded-lg shadow"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <footer className="mt-4 mb-6 flex items-center justify-between">
            {user ? (
              <div className="flex items-center">
                <div className="flex items-center justify-center overflow-hidden mr-2 w-8 h-8 bg-gray-light rounded-full">
                  <img src={user.avatar} alt={user.name} />
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
              Enviar pergunta
            </Button>
          </footer>
        </form>

        {questions.map((question) => {
          return (
            <article
              key={question.id}
              className="mb-4 p-6 bg-white rounded-lg shadow"
            >
              {question.content}

              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex items-center justify-center overflow-hidden mr-2 w-8 h-8 bg-gray-light rounded-full">
                    <img
                      src={question.author.avatar}
                      alt={question.author.name}
                    />
                  </div>
                  <div className="text-gray-dark text-sm">
                    {question.author.name}
                  </div>
                </div>
                <div className="flex items-end">
                  <div className="text-gray-dark font-poppins">16</div>
                  <button className="flex items-center justify-center w-10 h-8 hover-animation">
                    <Image src={likeImg} alt="Like" />
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </main>
    </>
  )
}

export default Room
