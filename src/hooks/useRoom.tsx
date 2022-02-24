import { FirebaseQuestions, QuestionType } from '../types'

import { useEffect, useState } from 'react'

import { useAuth } from './useAuth'

import { database } from '../services/firebase'
import { onValue, ref } from 'firebase/database'

export const useRoom = (roomId: string) => {
  const { user } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isClosed, setIsClosed] = useState(false)
  const [title, setTitle] = useState('')
  const [questions, setQuestions] = useState<QuestionType[]>([])

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
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighLighted: value.isHighLighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          // hasLiked: Object.values(value.likes ?? {}).some(
          //   (like) => like.authorId === user?.id
          // ),
          likeId: Object.entries(value.likes ?? {}).find(
            ([, like]) => like.authorId === user?.id
          )?.[0],
        }
      })

      setIsAdmin(databaseRoom.authorId === user?.id)
      setIsClosed(databaseRoom.closedAt ? true : false)
      setTitle(databaseRoom.title)
      setQuestions(orderQuestions(parsedQuestions))
    })

    return () => {
      unsubscribe()
    }
  }, [roomId, user?.id])

  const orderQuestions = (questions: QuestionType[]): Array<QuestionType> => {
    const questionsWithHighLight: Array<QuestionType> = []
    const questionsWithoutHighLight: Array<QuestionType> = []

    questions.reverse()
    questions.forEach((question) => {
      if (question.isHighLighted) {
        questionsWithHighLight.push(question)
      } else {
        questionsWithoutHighLight.push(question)
      }
    })

    return [...questionsWithHighLight, ...questionsWithoutHighLight]
  }

  return { title, questions, isClosed, isAdmin }
}
