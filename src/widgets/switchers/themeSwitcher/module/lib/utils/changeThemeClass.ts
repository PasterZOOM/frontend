import { ETheme } from '../../enum'

export const changeThemeClass = (value: ETheme): void => {
  if (
    value === ETheme.DARK ||
    (value === ETheme.AUTO && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
