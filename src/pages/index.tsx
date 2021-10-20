import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'

import illustrationImg from '../../public/images/illustration.svg'
import logoImg from '../../public/images/logo.svg'
import googleIconImg from '../../public/images/google-icon.svg'
import loginIconImg from '../../public/images/login.svg'

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../services/firebase'

const Home: NextPage = () => {
  const router = useRouter()

  const signIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential!.accessToken
        // The signed-in user info.
        const user = result.user
        // ...
        console.log(token, user)
        router.push('/new-room')
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
      })
  }

  return (
    <div className="flex flex-col lg:flex-row bg-background min-h-screen">
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

          <button
            onPointerDown={(e) => {
              e.preventDefault(), signIn()
            }}
            className="
              flex items-center justify-center
              mt-7 lg:mt-14
              px-6 h-14
              bg-[#EA4335] rounded-lg
              text-white font-medium
              transition transform motion-reduce:transform-none
              hover:scale-105 hover:brightness-110
              disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 disabled:hover:brightness-100"
          >
            <Image
              src={googleIconImg}
              alt="Logotipo do Google"
              width={24}
              height={24}
            />
            <span className="ml-2">Crie sua sala com o Google</span>
          </button>

          <span className="flex items-center my-8">
            <span className="flex-1 h-px bg-gray-medium"></span>
            <span className="flex-none mb-1 mx-5 text-gray-medium text-sm">
              ou entre em uma sala
            </span>
            <span className="flex-1 h-px bg-gray-medium"></span>
          </span>

          <form className="flex flex-col">
            <input
              type="text"
              placeholder="Digite o código da sala"
              className="
                px-6 h-14
                bg-white rounded-lg
                border border-gray-medium
                text-black"
            />
            <button
              type="submit"
              className="
                flex items-center justify-center
                mt-5 px-6 h-14
                bg-purple rounded-lg
                text-white font-medium
                transition transform motion-reduce:transform-none
                hover:scale-105 hover:brightness-110
                disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 disabled:hover:brightness-100"
            >
              <Image
                src={loginIconImg}
                alt="Icone de entrada"
                width={24}
                height={24}
              />
              <span className="ml-2">Entrar na sala</span>
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}

export default Home
