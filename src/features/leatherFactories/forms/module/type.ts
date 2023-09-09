import { InferType } from 'yup'

import { schema } from './validation.sheme'

export type CreateLeatherFactoryFormType = InferType<typeof schema>
