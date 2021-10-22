import { useEffect, useState } from 'react'

import { database } from '../services/firebase'
import { onValue, ref } from 'firebase/database'

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

type QuestionType = {
  id: string
  content: string
  author: {
    name: string
    avatar: string
  }
  isHighLighted: boolean
  isAnswered: boolean
}

export const useRoom = (roomId: string) => {
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

  return { questions, title }
}
