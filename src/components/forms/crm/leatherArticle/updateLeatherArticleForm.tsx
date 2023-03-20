import { FC } from 'react'

import { Form, Formik } from 'formik'

import {
  LeatherArticleType,
  UpdateLeatherArticleParamsType,
} from '@/api/crm/leatherArticlesApi/types'
import { UpdateButton } from '@/components/common/ui/buttons/updateButton'
import { FieldWrapper } from '@/components/forms/fieldWrapper'
import { FormikInput } from '@/components/forms/formikInput'
import { LeatherArticleUpdateConfirmModalBody } from '@/components/modals/crm/leatherArticle/confirm/leatherArticleUpdateConfirmModalBody'
import { EUpdateLeatherArticleParams } from '@/enums/crm/leatherArticle'
import { useUpdateLeatherArticle } from '@/hooks/crm/leatherArticles/useUpdateLeatherArticle'

type PropsType = {
  article: LeatherArticleType
}

export const UpdateLeatherArticleForm: FC<PropsType> = ({ article }) => {
  // const factories = useGetAllLeatherFactories()
  const updateArticle = useUpdateLeatherArticle()

  const initialValues: UpdateLeatherArticleParamsType = {
    [EUpdateLeatherArticleParams.DESCRIPTION]: article.description,
    [EUpdateLeatherArticleParams.NAME]: article.name,
    [EUpdateLeatherArticleParams.ID]: article._id,
    // [EUpdateLeatherArticleParams.FACTORY_ID]: article.factory._id,
  }

  const onSubmit = async (values: UpdateLeatherArticleParamsType): Promise<void> => {
    await updateArticle(values)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values }) => (
        <Form className="w-full space-y-3">
          <FieldWrapper name={EUpdateLeatherArticleParams.NAME} title="Название артикула:">
            {name => <FormikInput name={name} />}
          </FieldWrapper>

          {/* TODO раскомментировать когда появится возможность изменять фабрику у артикула */}
          {/* <FieldWrapper */}
          {/*  name={EUpdateLeatherArticleParams.FACTORY_ID} */}
          {/*  title="Страна в которой расположена фабрика:" */}
          {/* > */}
          {/*  {name => <FormikSelect name={name} items={factories} valueField="_id" />} */}
          {/* </FieldWrapper> */}

          <FieldWrapper name={EUpdateLeatherArticleParams.DESCRIPTION} title="Описание:">
            {name => <FormikInput name={name} />}
          </FieldWrapper>

          <UpdateButton
            onConfirm={() => onSubmit(values)}
            modalChildren={<LeatherArticleUpdateConfirmModalBody values={values} />}
          />
        </Form>
      )}
    </Formik>
  )
}
