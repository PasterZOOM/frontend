import { InferType } from 'yup'

import { schema } from './validation.sheme'

export type CreateLeatherColorFormType = InferType<typeof schema>
