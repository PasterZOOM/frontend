import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Schema } from 'yup'

import { MIN_TITLE_LENGTH, REQUIRED_MESSAGE } from 'constants/forms/validate'
import { CreateLeatherArticleFormType } from 'features/leatherArticles/forms/type'

const validate: Partial<Record<keyof CreateLeatherArticleFormType, Schema>> = {
  title: yup
    .string()
    .min(MIN_TITLE_LENGTH, 'Должно быть более 6 символов')
    .required(REQUIRED_MESSAGE),
  factoryId: yup.string().required(REQUIRED_MESSAGE),
  value: yup.string().required(REQUIRED_MESSAGE),
}

export const resolver = yupResolver(yup.object(validate).required())
