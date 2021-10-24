import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { FormEvent, useState } from 'react'

import { database } from '../services/firebase'
import { child, get, ref } from 'firebase/database'

import { useAuth } from '../hooks/useAuth'
import { useAnimate } from '../hooks/useAnimate'

import { Button } from '../components/Button'
import { LogotypeSVG } from '../components/svg/LogotypeSVG'
import { IllustrationSVG } from '../components/svg/IllustrationSVG'
import { SpinnerSVG } from '../components/svg/SpinnerSVG'
import { SignInSVG } from '../components/svg/SignInSVG'
import { GoogleIconSVG } from '../components/svg/GoogleIconSVG'

const Home: NextPage = () => {
  const router = useRouter()
  const { user, signInWithGoogle } = useAuth()

  const [roomCode, setRoomCode] = useState('')

  const { animate, setAnimate } = useAnimate()
  const [loadingJoinRoom, setLoadingJoinRoom] = useState(false)
  const [loadingGoogle, setLoadingGoogle] = useState(false)

  const signIn = async () => {
    setLoadingGoogle(true)

    if (!user) {
      await signInWithGoogle()
    }

    await router.push('/room/new')
    setLoadingGoogle(false)
  }

  const handleJoinRoom = async (event: FormEvent) => {
    event.preventDefault()

    const id = roomCode.trim()

    if (id === '') {
      setAnimate('animate-shake')
      return
    }

    setLoadingJoinRoom(true)

    const snapshot = await get(child(ref(database), `rooms/${id}`))

    if (!snapshot.exists()) {
      setAnimate('animate-shake')
      setLoadingJoinRoom(false)
      return
    }

    await router.push(`/room/${id}`)
    setLoadingJoinRoom(false)
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <aside
        className="
          flex-6
          flex items-center justify-center
          p-5
          bg-purple"
      >
        <section
          className="
            flex flex-col items-start justify-center
            max-w-lg"
        >
          <IllustrationSVG />
          <h1
            className="
              text-2xl lg:text-4xl
              text-white
              lg:leading-[42px]
              font-poppins font-bold"
          >
            Crie salas de perguntas e respostas ao vivo
          </h1>
          <p
            className="
              mt-2 lg:mt-6
              opacity-70 text-white
              text-base lg:text-2xl"
          >
            Tire dúvidas da sua audiência em tempo real
          </p>
        </section>
      </aside>

      <main
        className="
          flex-7
          flex items-center justify-center
          p-5"
      >
        <section
          className="
            flex-1
            flex flex-col
            max-w-xs"
        >
          <div className="flex items-center justify-center">
            <LogotypeSVG />
          </div>

          <Button google className="mt-7 lg:mt-14" onClick={signIn}>
            {loadingGoogle ? <SpinnerSVG /> : <GoogleIconSVG />}
            <span className="ml-2">Crie sua sala com o Google</span>
          </Button>

          <span className="flex items-center my-8">
            <span className="flex-1 h-px bg-gray"></span>
            <span className="flex-none mb-1 mx-5 text-gray text-sm">
              ou entre em uma sala
            </span>
            <span className="flex-1 h-px bg-gray"></span>
          </span>

          <form className="flex flex-col" onSubmit={handleJoinRoom}>
            <input
              className={animate}
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button className="mt-5" type="submit">
              {loadingJoinRoom ? <SpinnerSVG /> : <SignInSVG />}
              <span className="ml-2">Entrar na sala</span>
            </Button>
          </form>
        </section>
      </main>
    </div>
  )
}

export default Home
