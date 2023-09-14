import { SCREEN } from '@/shared/enums/screen'
import { useIsFirstRender } from '@/shared/lib/hooks/useFirstRender'
import { useWindowSize } from '@/shared/lib/hooks/windowSize/useWindowSize'

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
    isMobileS: width === SCREEN.$1_MOBILE_S,
    isMobileM: width === SCREEN.$2_MOBILE_M,
    isMobileL: width === SCREEN.$3_MOBILE_L,
    isTabletM: width === SCREEN.$4_TABLET_M,
    isTabletL: width === SCREEN.$5_TABLET_L,
    isLaptopS: width === SCREEN.$6_LAPTOP_S,
    isLaptopM: width === SCREEN.$7_LAPTOP_M,
    isLaptopL: width === SCREEN.$8_LAPTOP_L,
    is4K: width === SCREEN.$9_4K,
    narrowerMobileS: width < SCREEN.$1_MOBILE_S,
    narrowerMobileM: width < SCREEN.$2_MOBILE_M,
    narrowerMobileL: width < SCREEN.$3_MOBILE_L,
    narrowerTabletM: width < SCREEN.$4_TABLET_M,
    narrowerTabletL: width < SCREEN.$5_TABLET_L,
    narrowerLaptopS: width < SCREEN.$6_LAPTOP_S,
    narrowerLaptopM: width < SCREEN.$7_LAPTOP_M,
    narrowerLaptopL: width < SCREEN.$8_LAPTOP_L,
    narrower4K: width < SCREEN.$9_4K,
    widerMobileS: width > SCREEN.$1_MOBILE_S,
    widerMobileM: width > SCREEN.$2_MOBILE_M,
    widerMobileL: width > SCREEN.$3_MOBILE_L,
    widerTabletM: width > SCREEN.$4_TABLET_M,
    widerTabletL: width > SCREEN.$5_TABLET_L,
    widerLaptopS: width > SCREEN.$6_LAPTOP_S,
    widerLaptopM: width > SCREEN.$7_LAPTOP_M,
    widerLaptopL: width > SCREEN.$8_LAPTOP_L,
    wider4K: width > SCREEN.$9_4K,
    isTouched,
  }
}
