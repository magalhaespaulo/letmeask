import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Room: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>Room: {id}</p>
}

export default Room
