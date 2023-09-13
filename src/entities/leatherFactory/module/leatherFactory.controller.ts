import { LeatherFactoryEntity } from './interfaces/leatherFactory.entity'
import { LeatherFactoryService } from './leatherFactory.service'

import { LeatherArticleService } from 'entities/leatherArticle'
import { LeatherFactoryType } from 'features/leatherFactories/api/types'
import { LocaleFieldEntity } from 'shared/entities/localeFieldEntity'

export class LeatherFactoryController {
  private readonly leatherArticleService

  private readonly leatherFactoryService

  constructor() {
    this.leatherArticleService = new LeatherArticleService()
    this.leatherFactoryService = new LeatherFactoryService()
  }

  async findAll({ locale }: { locale: keyof LocaleFieldEntity }): Promise<LeatherFactoryType[]> {
    const factories = await this.leatherFactoryService.findAll()

    return Promise.all(factories.map(factory => this.generateResponseFactory({ locale, factory })))
  }

  async findOne({
    locale,
    id,
  }: {
    id: string
    locale: keyof LocaleFieldEntity
  }): Promise<LeatherFactoryType> {
    const factory = await this.leatherFactoryService.findOne(id)

    if (!factory) {
      throw new Error('not found')
    }

    return this.generateResponseFactory({ locale, factory })
  }

  async generateResponseFactory({
    locale,
    factory,
  }: GenerateResponseFactoryParams): Promise<LeatherFactoryType> {
    const articles = (
      await this.leatherArticleService.findAll({ factory: factory._id }, { title: true })
    ).map(({ _id, title }) => ({ _id: _id.toString(), title: title[locale] }))

    return {
      ...factory,
      articles,
      _id: factory._id.toString(),
      title: factory.title[locale],
      description: factory.description[locale],
    }
  }
}

type GenerateResponseFactoryParams = {
  factory: LeatherFactoryEntity
  locale: keyof LocaleFieldEntity
}
