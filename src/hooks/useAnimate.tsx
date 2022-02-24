import { useEffect, useState } from 'react'

export const useAnimate = () => {
  const [animate, setAnimate] = useState('')

  useEffect(() => {
    if (animate === '') {
      return
    }

    const timeoutID = setTimeout(() => {
      setAnimate('')
    }, 1000)

    return () => {
      clearTimeout(timeoutID)
    }
  }, [animate])

  return { animate, setAnimate }
}
