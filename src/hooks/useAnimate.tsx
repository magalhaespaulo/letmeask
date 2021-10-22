import { useEffect, useState } from 'react'

export const useAnimate = () => {
  const [animate, setAnimate] = useState('')

  useEffect(() => {
    if (animate === '') {
      return
    }

    const time = setTimeout(() => {
      setAnimate('')
      clearTimeout(time)
    }, 1000)

    return () => {
      clearTimeout(time)
    }
  }, [animate])

  return { animate, setAnimate }
}
