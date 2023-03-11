import { FC } from 'react'

import { Form, Formik } from 'formik'
import { useMutation, useQueryClient } from 'react-query'

import { CreateLeatherArticleParamsType } from '@/api/crm/leatherArticlesApi/types'
import { LeatherFactoryType } from '@/api/crm/leatherFactoryApi/types'
import { FormikInput } from '@/components/common/forms/formikInput'
import { FormikSelect } from '@/components/common/forms/formikSelect'
import { Button } from '@/components/common/ui/buttons/button'
import { H5 } from '@/components/common/ui/headers/h5'
import { ECreateLeatherArticleParams } from '@/enums/crm/leatherArticle'
import { queryKey } from '@/enums/crm/queryKey'
import { useSrmServiceStore } from '@/store/crmServises'

type PropsType = {
  factories: Pick<LeatherFactoryType, 'name' | '_id'>[]
}
export const AddLeatherArticleForm: FC<PropsType> = ({ factories }) => {
  const leatherArticlesService = useSrmServiceStore(state => state.leatherArticlesService)

  const initialValues: CreateLeatherArticleParamsType = {
    [ECreateLeatherArticleParams.FACTORY_ID]: factories[0]?._id,
    [ECreateLeatherArticleParams.DESCRIPTION]: '',
    [ECreateLeatherArticleParams.NAME]: '',
  }

  const queryClient = useQueryClient()
  const { mutateAsync: createArticle } = useMutation(leatherArticlesService.create, {
    onSuccess: async data => {
      await queryClient.invalidateQueries(queryKey.GET_ALL_ARTICLES)
      await queryClient.invalidateQueries(`${queryKey.GET_FACTORY}-${data.factory}`)
    },
  })

  const onSubmit = async (values: CreateLeatherArticleParamsType): Promise<void> => {
    await createArticle(values)
  }

  return (
    <div>
      <H5 className="font-bold">Добавить артикул</H5>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {() => (
          <Form>
            <div>
              <div>Название артикула:</div>
              <FormikInput name={ECreateLeatherArticleParams.NAME} className="border" />
            </div>
            <div>
              <div>Фабрика:</div>

              <FormikSelect
                name={ECreateLeatherArticleParams.FACTORY_ID}
                className="border p-2"
                items={factories}
                valueField="_id"
              />
            </div>
            <div>
              <div>Описание:</div>{' '}
              <FormikInput name={ECreateLeatherArticleParams.DESCRIPTION} className="border" />
            </div>
            <Button type="submit">Создать</Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
