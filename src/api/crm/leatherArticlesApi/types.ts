export type LeatherArticleType = {
  _id: string
  colors: { _id: string; title: string }[]
  description: string
  factory: { _id: string; name: string }
  name: string
}
export type CreateLeatherArticleParamsType = {
  name: string
  description: string
}
export type UpdateLeatherArticleParamsType = Partial<CreateLeatherArticleParamsType>
