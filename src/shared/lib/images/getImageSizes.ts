import { SCREEN } from '@/shared/enums/screen'

export const getImageSizes = (
  sizes: Partial<Record<keyof typeof SCREEN, string>> & { DEFAULT: string }
): string => {
  const res: string[] = []

  Object.entries(sizes)
    .reverse()
    .forEach(([key, value]) => {
      if (key === 'DEFAULT') res.push(value)
      else {
        res.unshift(`(max-width: ${SCREEN[key as keyof typeof SCREEN]}px) ${value}`)
      }
    })

  return res.join(', ')
}
