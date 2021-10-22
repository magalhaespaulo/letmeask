import { useEffect, useState } from 'react'

import { useAuth } from './useAuth'

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
    likes: Record<
      string,
      {
        authorId: string
      }
    >
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
  likeCount: number
  // hasLiked: boolean
  likeId: string | undefined
}

export const useRoom = (roomId: string) => {
  const { user } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
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

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
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
              ([key, like]) => like.authorId === user?.id
            )?.[0],
          }
        }
      )

      if (databaseRoom.authorId === user?.id) {
        setIsAdmin(true)
      }

      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })

    return () => {
      unsubscribe()
    }
  }, [roomId, user?.id])

  return { questions, title, isAdmin }
}
