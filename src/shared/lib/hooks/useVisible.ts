import { useEffect } from 'react'

import { selectSetIsVisible, useAppStore } from '@/store/useAppStore'

export const useVisible = (): void => {
  const setIsVisible = useAppStore(selectSetIsVisible)

  useEffect(() => {
    let oldScrollTopPosition = 0

    window.onscroll = () => {
      const scrollTopPosition = document.documentElement.scrollTop

      if (oldScrollTopPosition !== 0) {
        if (oldScrollTopPosition < scrollTopPosition) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
      }
      oldScrollTopPosition = scrollTopPosition
    }
  })
}
