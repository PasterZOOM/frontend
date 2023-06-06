import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Schema } from 'yup'

import { MIN_TITLE_LENGTH, REQUIRED_MESSAGE } from 'constants/forms/validate'
import { EProductAssignment } from 'enums/product'
import { CreateBasicProductFormType } from 'features/basicProducts/forms/type'

const validate: Partial<Record<keyof CreateBasicProductFormType, Schema>> = {
  leather: yup.string().required(REQUIRED_MESSAGE),
  title: yup
    .string()
    .min(MIN_TITLE_LENGTH, 'Должно быть более 6 символов')
    .required(REQUIRED_MESSAGE),
  assignments: yup
    .array()
    .min(1, 'Минимум одно назначение')
    .test(
      'valid-assignment',
      data =>
        `Не существует назначения ${data.value.filter((el: string) =>
          Object.values(EProductAssignment).every(assignment => assignment !== el)
        )}`,
      values => values?.every(value => Object.values(EProductAssignment).includes(value))
    )
    .required(REQUIRED_MESSAGE),
  cost: yup.number().moreThan(0, 'Цена должна быть больше 0').required(REQUIRED_MESSAGE),
}

export const resolver = yupResolver(yup.object(validate).required())
