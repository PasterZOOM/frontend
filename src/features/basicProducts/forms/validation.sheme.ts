import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Schema } from 'yup'

import { ECreateBasicProductParams } from 'features/basicProducts/enums/paramsKeys'
import { MIN_TITLE_LENGTH, REQUIRED_MESSAGE } from 'shared/constants/forms/validate'
import { EProductAssignment } from 'shared/enums/product'

const validate: Record<ECreateBasicProductParams, Schema> = {
  leatherArticle: yup.string().required(REQUIRED_MESSAGE),
  title: yup
    .string()
    .required(REQUIRED_MESSAGE)
    .min(MIN_TITLE_LENGTH, 'Должно быть более 6 символов'),
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
    ),
  cost: yup.number().required(REQUIRED_MESSAGE).moreThan(0, 'Цена должна быть больше 0'),
  description: yup.string(),
  category: yup.string(),
  punchPitch: yup.string(),
  size: yup.string(),
}

export const resolver = yupResolver(yup.object(validate).required())
