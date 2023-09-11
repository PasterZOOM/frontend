import { yupResolver } from '@hookform/resolvers/yup'
import { array, number, object, Schema, string } from 'yup'

import { ECreateBasicProductParams } from './paramsKeys'

import { MIN_TITLE_LENGTH, REQUIRED_MESSAGE } from 'shared/consts/forms/validate'
import { EProductAssignment } from 'shared/enums/product'

type FormData = Record<ECreateBasicProductParams, Schema>

const formData: FormData = {
  leatherArticle: string().required(REQUIRED_MESSAGE),
  title: string().required(REQUIRED_MESSAGE).min(MIN_TITLE_LENGTH, 'Должно быть более 6 символов'),
  assignments: array()
    .min(1, 'Минимум одно назначение')
    .test(
      'valid-assignment',
      data =>
        `Не существует назначения ${data.value.filter((el: string) =>
          Object.values(EProductAssignment).every(assignment => assignment !== el)
        )}`,
      values => values?.every(value => Object.values(EProductAssignment).includes(value))
    ),
  cost: number().required(REQUIRED_MESSAGE).moreThan(0, 'Цена должна быть больше 0'),
  description: string(),
  category: string(),
  punchPitch: string(),
  size: string(),
}

export const schema = object(formData).required()
export const resolver = yupResolver(schema)
