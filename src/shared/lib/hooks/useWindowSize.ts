import { useEffect, useState } from 'react'

export const useWindowSize: UseWindowSizeType = () => {
  const [windowSize, setWindowSize] = useState<Size>({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    const handleResize = (): void => {
      const newWindowSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      }

      setWindowSize(newWindowSize)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

type Size = {
  height: number
  width: number
}
type UseWindowSizeType = () => Size
