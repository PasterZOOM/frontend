import { ECreateLeatherArticleParams } from '@/enums/crm/leatherArticle'

export type LeatherArticleType = {
  _id: string
  colors: { _id: string; title: string }[]
  description: string
  factory: { _id: string; name: string }
  name: string
}
export type CreateLeatherArticleParamsType = Record<ECreateLeatherArticleParams, string>
