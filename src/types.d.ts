export type User = {
  id: string
  name: string
  avatar: string
}

export type AuthContextType = {
  user: User | undefined
  signInWithGoogle: () => Promise<void>
}

export type QuestionType = {
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

export type FirebaseQuestions = Record<
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
