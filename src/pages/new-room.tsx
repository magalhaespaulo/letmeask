import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { FormEvent, useState } from 'react'

import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import { push, ref } from 'firebase/database'

import { Button } from '../components/Button'

import illustrationImg from '../../public/images/illustration.svg'
import logoImg from '../../public/images/logo.svg'

const NewRoom: NextPage = () => {
  const router = useRouter()
  const { user } = useAuth()

  const [newRoom, setNewRoom] = useState('')

  const handleCreateRoom = async (event: FormEvent) => {
    event.preventDefault()

    const title = newRoom.trim()
    if (title === '') {
      return
    }

    const roomData = {
      title,
      authorId: user?.id,
    }

    const roomsDatabaseRef = ref(database, 'rooms')

    const roomKey = await push(roomsDatabaseRef, roomData).key

    router.push(`/room/${roomKey}`)
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

          <h2 className="mt-14 mb-7 text-2xl text-center font-poppins font-bold">
            {user?.name ? (
              <div className="text-gray-dark text-base font-normal">
                Olá, {user?.name}
              </div>
            ) : (
              <div className="text-gray-dark text-base font-normal">
                Vamos começar?
              </div>
            )}
            Crie uma nova sala
          </h2>

          <form className="flex flex-col" onSubmit={handleCreateRoom}>
            <input
              className="
                px-6 h-14
                bg-white rounded-lg
                border border-gray-medium
                text-black"
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button className="mt-5" type="submit">
              Criar sala
            </Button>
          </form>
          <p className="mt-3 text-sm text-gray-dark text-center">
            Quer entrar em uma sala já existente?
            <Link href="/">
              <a className="link-css ml-1 text-pink-dark border-pink-dark">
                Clique aqui
              </a>
            </Link>
          </p>
        </section>
      </main>
    </div>
  )
}

export default NewRoom
