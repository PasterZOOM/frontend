import { LeatherArticleEntity } from './interfaces/leatherArticle.entity'
import { LeatherArticleService } from './leatherArticle.service'

import { LeatherColorService } from '@/entities/leatherColor'
import { LeatherFactoryService } from '@/entities/leatherFactory'
import { LeatherArticleType } from '@/features/leatherArticles/api/types'
import { LocaleFieldEntity } from '@/shared/entities/localeFieldEntity'

export class LeatherArticleController {
  private readonly leatherColorService

  private readonly leatherArticleService

  private readonly leatherFactoryService

  constructor() {
    this.leatherColorService = new LeatherColorService()
    this.leatherArticleService = new LeatherArticleService()
    this.leatherFactoryService = new LeatherFactoryService()
  }

  async findAll({ locale }: { locale: keyof LocaleFieldEntity }): Promise<LeatherArticleType[]> {
    const articles = await this.leatherArticleService.findAll()

    return Promise.all(articles.map(article => this.generateResponseArticle({ locale, article })))
  }

  async findOne({
    locale,
    id,
  }: {
    id: string
    locale: keyof LocaleFieldEntity
  }): Promise<LeatherArticleType> {
    const article = await this.leatherArticleService.findOne(id)

    if (!article) {
      throw new Error('not found')
    }

    return this.generateResponseArticle({ locale, article })
  }

  async generateResponseArticle({
    locale,
    article,
  }: GenerateResponseArticleParams): Promise<LeatherArticleType> {
    const factory = await this.leatherFactoryService.findOne(article.factory)

    const colors = (
      await this.leatherColorService.findAll({ article: article._id }, { title: true })
    ).map(({ _id, title }) => {
      return { _id: _id.toString(), title: title[locale] }
    })

    return {
      ...article,
      colors,
      _id: article._id.toString(),
      title: article.title[locale],
      description: article.description[locale],
      factory: { _id: factory!._id.toString(), title: factory!.title[locale] },
    }
  }
}

type GenerateResponseArticleParams = {
  article: LeatherArticleEntity
  locale: keyof LocaleFieldEntity
}
