import { useGetAllLeatherArticles } from '@/features/leatherArticles/hooks/useGetAllLeatherArticles'
import { EFilterKeys, FilterType } from '@/mocks/filters'

export const useGetArticlesForSelect = (): FilterType<string, EFilterKeys.LEATHERS>[] => {
  return useGetAllLeatherArticles().map(({ title, _id }) => ({
    _id,
    title,
    value: title,
    filterKey: EFilterKeys.LEATHERS,
  }))
}
