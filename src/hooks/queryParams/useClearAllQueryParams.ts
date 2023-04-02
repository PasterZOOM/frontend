import { useRouter } from 'next/router'

export const useClearAllQueryParams = (): (() => Promise<void>) => {
  const { replace, pathname } = useRouter()

  return async () => {
    await replace(pathname, undefined, { shallow: true })
  }
}
