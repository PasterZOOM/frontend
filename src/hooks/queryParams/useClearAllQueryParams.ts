import { useRouter } from 'next/router'

export const useClearAllQueryParams: UseClearAllQueryParamsType = () => {
  const { replace, pathname } = useRouter()

  return async () => {
    await replace(pathname, undefined, { shallow: true })
  }
}

type UseClearAllQueryParamsType = () => () => Promise<void>
