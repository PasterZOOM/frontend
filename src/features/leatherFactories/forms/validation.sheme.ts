import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Schema } from 'yup'

import { MIN_TITLE_LENGTH, REQUIRED_MESSAGE } from 'constants/forms/validate'
import { CreateLeatherFactoryFormType } from 'features/leatherFactories/forms/type'

const validate: Partial<Record<keyof CreateLeatherFactoryFormType, Schema>> = {
  title: yup
    .string()
    .min(MIN_TITLE_LENGTH, 'Должно быть более 6 символов')
    .required(REQUIRED_MESSAGE),
}

export const resolver = yupResolver(yup.object(validate).required())
