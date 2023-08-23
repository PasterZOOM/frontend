import { SCREEN } from 'shared/enums/screen'
import { useIsFirstRender } from 'shared/lib/hooks/useFirstRender'
import { useWindowSize } from 'shared/lib/hooks/windowSize/useWindowSize'

export const useDevice = (): {
  is4K: boolean
  isLaptopL: boolean
  isLaptopM: boolean
  isLaptopS: boolean
  isMobileL: boolean
  isMobileM: boolean
  isMobileS: boolean
  isTabletL: boolean
  isTabletM: boolean
  isTouched: boolean
  narrower4K: boolean
  narrowerLaptopL: boolean
  narrowerLaptopM: boolean
  narrowerLaptopS: boolean
  narrowerMobileL: boolean
  narrowerMobileM: boolean
  narrowerMobileS: boolean
  narrowerTabletL: boolean
  narrowerTabletM: boolean
  wider4K: boolean
  widerLaptopL: boolean
  widerLaptopM: boolean
  widerLaptopS: boolean
  widerMobileL: boolean
  widerMobileM: boolean
  widerMobileS: boolean
  widerTabletL: boolean
  widerTabletM: boolean
} => {
  const { width } = useWindowSize()
  const isFirst = useIsFirstRender()
  let isTouched = false

  if (!isFirst) {
    isTouched = !!navigator.maxTouchPoints
  }

  return {
    isMobileS: width === SCREEN.MOBILE_S,
    isMobileM: width === SCREEN.MOBILE_M,
    isMobileL: width === SCREEN.MOBILE_L,
    isTabletM: width === SCREEN.TABLET_M,
    isTabletL: width === SCREEN.TABLET_L,
    isLaptopS: width === SCREEN.LAPTOP_S,
    isLaptopM: width === SCREEN.LAPTOP_M,
    isLaptopL: width === SCREEN.LAPTOP_L,
    is4K: width === SCREEN.$4K,
    narrowerMobileS: width < SCREEN.MOBILE_S,
    narrowerMobileM: width < SCREEN.MOBILE_M,
    narrowerMobileL: width < SCREEN.MOBILE_L,
    narrowerTabletM: width < SCREEN.TABLET_M,
    narrowerTabletL: width < SCREEN.TABLET_L,
    narrowerLaptopS: width < SCREEN.LAPTOP_S,
    narrowerLaptopM: width < SCREEN.LAPTOP_M,
    narrowerLaptopL: width < SCREEN.LAPTOP_L,
    narrower4K: width < SCREEN.$4K,
    widerMobileS: width > SCREEN.MOBILE_S,
    widerMobileM: width > SCREEN.MOBILE_M,
    widerMobileL: width > SCREEN.MOBILE_L,
    widerTabletM: width > SCREEN.TABLET_M,
    widerTabletL: width > SCREEN.TABLET_L,
    widerLaptopS: width > SCREEN.LAPTOP_S,
    widerLaptopM: width > SCREEN.LAPTOP_M,
    widerLaptopL: width > SCREEN.LAPTOP_L,
    wider4K: width > SCREEN.$4K,
    isTouched,
  }
}
