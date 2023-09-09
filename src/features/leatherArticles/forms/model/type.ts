import { InferType } from 'yup'

import { schema } from './validation.sheme'

export type CreateLeatherArticleFormType = InferType<typeof schema>
