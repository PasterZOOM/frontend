import { ECreateLeatherArticleParams } from '@/enums/crm/leatherArticle'

export type LeatherArticleType = {
  _id: string
  colors: string[]
  description: string
  factory: string
  name: string
}
export type CreateLeatherArticleParamsType = Record<ECreateLeatherArticleParams, string>
