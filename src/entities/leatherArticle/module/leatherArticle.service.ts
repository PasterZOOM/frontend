import { FilterQuery, ProjectionType, Types } from 'mongoose'

import { LeatherArticleEntity } from './interfaces/leatherArticle.entity'
import { LeatherArticleModel } from './leatherArticle.model'
import { LeatherArticleDocument } from './leatherArticle.schema'

export class LeatherArticleService {
  private leatherArticleModel

  constructor() {
    this.leatherArticleModel = LeatherArticleModel
  }

  async findAll(
    filters: FilterQuery<LeatherArticleDocument> = {},
    projection: ProjectionType<LeatherArticleDocument> | null = null
  ): Promise<LeatherArticleEntity[]> {
    return (await this.leatherArticleModel.find(filters, projection).sort().exec()).map(article =>
      article.toJSON()
    )
  }

  async findOne(
    id: Types.ObjectId | string,
    projection: ProjectionType<LeatherArticleDocument> | null = null
  ): Promise<LeatherArticleEntity | null> {
    const article = await this.leatherArticleModel.findById(id, projection)

    return article ? article.toJSON() : null
  }
}
