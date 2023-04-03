import { useGetAllLeatherArticles } from '@/features/leatherArticles/hooks/useGetAllLeatherArticles'
import { EFilterKeys, FilterType } from '@/mocks/filters'

export const useGetAllLeatherArticlesForSelect: UseGetArticlesForSelectType = () => {
  return useGetAllLeatherArticles().map(({ title, _id }) => ({
    _id,
    title,
    value: title,
    filterKey: EFilterKeys.LEATHERS,
  }))
}

type UseGetArticlesForSelectType = () => FilterType<string, EFilterKeys.LEATHERS>[]
