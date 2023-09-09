import { InferType } from 'yup'

import { schema } from './validation.sheme'

export type CreateBasicProductFormType = InferType<typeof schema>
