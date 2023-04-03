import { useGetAllLeatherFactories } from '@/features/leatherFactories/hooks/useGetAllLeatherFactories'
import { EFilterKeys, FilterType } from '@/mocks/filters'

export const useGetAllLeatherFactoriesForSelect: UseGetAllLeatherFactoriesForSelectType = () => {
  return useGetAllLeatherFactories().map(({ title, _id }) => ({
    _id,
    title,
    value: title,
  }))
}

type UseGetAllLeatherFactoriesForSelectType = () => FilterType<string, EFilterKeys>[]
