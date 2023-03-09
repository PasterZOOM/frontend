import { FC } from 'react'

import { Form, Formik } from 'formik'
import { useQuery } from 'react-query'

import { CreateLeatherArticleParamsType } from '@/api/crm/leatherArticlesApi/types'
import { FormikSelect } from '@/components/common/forms/formikSelect'
import { Button } from '@/components/common/ui/buttons/button'
import { H5 } from '@/components/common/ui/headers/h5'
import { ECreateLeatherArticleParams } from '@/enums/crm/leatherArticle'
import { useSrmServiceStore } from '@/store/crmServises'

const initialValues: CreateLeatherArticleParamsType = {
  [ECreateLeatherArticleParams.FACTORY_ID]: '',
  [ECreateLeatherArticleParams.DESCRIPTION]: '',
  [ECreateLeatherArticleParams.NAME]: '',
}

export const AddLeatherArticleForm: FC = () => {
  const leatherArticlesService = useSrmServiceStore(state => state.leatherArticlesService)
  const leatherFactoryService = useSrmServiceStore(state => state.leatherFactoryService)

  const onSubmit = async (values: CreateLeatherArticleParamsType): Promise<void> => {
    await leatherArticlesService.create(values)
  }
  const { data: factories } = useQuery('getAllFactories', leatherFactoryService.getAll)

  return (
    <div>
      <H5 className="font-bold">Добавить артикул</H5>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {() => (
          <Form>
            <div>
              <div>Название артикула:</div>
              <input type="text" name={ECreateLeatherArticleParams.NAME} className="border" />
            </div>
            <div>
              <div>Фабрика:</div>

              <FormikSelect
                name={ECreateLeatherArticleParams.FACTORY_ID}
                className="border p-2"
                items={factories}
              />
            </div>
            <div>
              <div>Описание:</div>{' '}
              <textarea name={ECreateLeatherArticleParams.DESCRIPTION} className="border" />
            </div>
            <Button type="submit">Создать</Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
