import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { FormEvent, useState } from 'react'

import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import { child, get, ref } from 'firebase/database'

import { Button } from '../components/Button'

import illustrationImg from '../../public/images/illustration.svg'
import logoImg from '../../public/images/logo.svg'
import googleIconImg from '../../public/images/google-icon.svg'
import loginIconImg from '../../public/images/login.svg'

const Home: NextPage = () => {
  const router = useRouter()
  const { user, signInWithGoogle } = useAuth()

  const [roomCode, setRoomCode] = useState('')

  const signIn = async () => {
    if (!user) {
      await signInWithGoogle()
    }
    router.push('/new-room')
  }

  const handleJoinRoom = async (event: FormEvent) => {
    event.preventDefault()

    const id = roomCode.trim()

    if (id === '') {
      return
    }

    const snapshot = await get(child(ref(database), `rooms/${id}`))

    if (!snapshot.exists()) {
      console.log('Room does not exists.')
      return
    }

    router.push(`/room/${id}`)
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
          <div className="relative w-full h-44 lg:h-96">
            <Image
              src={illustrationImg}
              alt="illustration"
              layout="fill"
              objectFit="contain"
              objectPosition="left"
            />
          </div>
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
          <Image src={logoImg} alt="Logotipo Let Me Ask" />

          <Button
            className="mt-7 lg:mt-14 bg-[#EA4335]"
            onClick={(e) => {
              e.preventDefault(), signIn()
            }}
          >
            <Image
              src={googleIconImg}
              alt="Logotipo do Google"
              width={24}
              height={24}
            />
            <span className="ml-2">Crie sua sala com o Google</span>
          </Button>

          <span className="flex items-center my-8">
            <span className="flex-1 h-px bg-gray-medium"></span>
            <span className="flex-none mb-1 mx-5 text-gray-medium text-sm">
              ou entre em uma sala
            </span>
            <span className="flex-1 h-px bg-gray-medium"></span>
          </span>

          <form className="flex flex-col" onSubmit={handleJoinRoom}>
            <input
              className="
                px-6 h-14
                bg-white rounded-lg
                border border-gray-medium
                text-black"
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button className="mt-5" type="submit">
              <Image
                src={loginIconImg}
                alt="Icone de entrada"
                width={24}
                height={24}
              />
              <span className="ml-2">Entrar na sala</span>
            </Button>
          </form>
        </section>
      </main>
    </div>
  )
}

export default Home
