export type LeatherArticleType = {
  _id: string
  colors: { _id: string; title: string }[]
  description: string
  factory: { _id: string; title: string }
  title: string
}
export type CreateLeatherArticleParamsType = {
  title: string
  description: string
}
export type UpdateLeatherArticleParamsType = Partial<CreateLeatherArticleParamsType>
