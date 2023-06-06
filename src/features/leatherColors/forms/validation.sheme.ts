import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Schema } from 'yup'

import { MIN_TITLE_LENGTH, REQUIRED_MESSAGE } from 'constants/forms/validate'
import { CreateLeatherColorFormType } from 'features/leatherColors/forms/type'

const validate: Partial<Record<keyof CreateLeatherColorFormType, Schema>> = {
  title: yup
    .string()
    .min(MIN_TITLE_LENGTH, 'Должно быть более 6 символов')
    .required(REQUIRED_MESSAGE),
  articleId: yup.string().required(REQUIRED_MESSAGE),
  code: yup.string().required(REQUIRED_MESSAGE),
  photo: yup.string().required(REQUIRED_MESSAGE),
}

export const resolver = yupResolver(yup.object(validate).required())
