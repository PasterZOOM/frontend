import { FC } from 'react'

import { Form, Formik } from 'formik'

import { CreateLeatherArticleParamsType } from '@/api/crm/leatherArticlesApi/types'
import { FieldWrapper } from '@/components/common/forms/fieldWrapper'
import { FormikInput } from '@/components/common/forms/formikInput'
import { FormikSelect } from '@/components/common/forms/formikSelect'
import { CreateButton } from '@/components/common/ui/buttons/createButton'
import { H5 } from '@/components/common/ui/headers/h5'
import { ECreateLeatherArticleParams } from '@/enums/crm/leatherArticle'
import { useCreateLeatherArticle } from '@/hooks/crm/leatherArticles/useCreateLeatherArticle'
import { useGetAllLeatherFactories } from '@/hooks/crm/leatherFactories/useGetAllLeatherFactories'

export const AddLeatherArticleForm: FC = () => {
  const factories = useGetAllLeatherFactories()
  const createArticle = useCreateLeatherArticle()

  const initialValues: CreateLeatherArticleParamsType = {
    [ECreateLeatherArticleParams.FACTORY_ID]: factories[0]?._id || '',
    [ECreateLeatherArticleParams.DESCRIPTION]: '',
    [ECreateLeatherArticleParams.NAME]: '',
  }

  const onSubmit = async (values: CreateLeatherArticleParamsType): Promise<void> => {
    await createArticle(values)
  }

  return (
    <div>
      <H5 className="mb-4 font-bold">Создать артикул</H5>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values }) => (
          <Form className="space-y-3">
            <FieldWrapper name={ECreateLeatherArticleParams.NAME} title="Название артикула:">
              {name => <FormikInput name={name} />}
            </FieldWrapper>

            <FieldWrapper name={ECreateLeatherArticleParams.FACTORY_ID} title="Фабрика:">
              {name => <FormikSelect name={name} items={factories} valueField="_id" />}
            </FieldWrapper>

            <FieldWrapper name={ECreateLeatherArticleParams.DESCRIPTION} title="Описание:">
              {name => <FormikInput name={name} />}
            </FieldWrapper>

            <CreateButton
              onConfirm={() => onSubmit(values)}
              modalChildren={
                // TODO вынести в отдельную компоненту
                <div className="space-y-2">
                  <div>
                    Вы уверены что хотите создать артикул для фабрики{' '}
                    {
                      factories.find(f => f._id === values[ECreateLeatherArticleParams.FACTORY_ID])
                        ?.name
                    }
                    ?
                  </div>
                  <div>Название артикула: {values[ECreateLeatherArticleParams.NAME]}</div>
                  <div>Описание: {values[ECreateLeatherArticleParams.DESCRIPTION]}</div>
                </div>
              }
            />
          </Form>
        )}
      </Formik>
    </div>
  )
}
