import * as url from 'url'

import mongoose from 'mongoose'
import { NextRequest } from 'next/server'

import { BasicProductService } from './basicProduct.service'
import { BasicProductEntity } from './interfaces/basicProduct.entity'

import { BasicProductResponseType, BasicProductType } from 'features/basicProducts/api/types'
import { LeatherArticleType } from 'features/leatherArticles/api/types'
import { LeatherColorType } from 'features/leatherColors/api/types'
import { LeatherFactoryType } from 'features/leatherFactories/api/types'
import { LOCALES } from 'shared/types/localeType'

const LeatherColorSchema = new mongoose.Schema<LeatherColorType>()
const LeatherArticleSchema = new mongoose.Schema<LeatherArticleType>()
const LeatherFactorySchema = new mongoose.Schema<LeatherFactoryType>()

const LeatherColorModel =
  mongoose.models.leathercolors ||
  mongoose.model<LeatherColorType>('LeatherColor', LeatherColorSchema)
const LeatherArticleModel =
  mongoose.models.leatherarticles ||
  mongoose.model<LeatherArticleType>('LeatherArticle', LeatherArticleSchema)
const LeatherFactoryModel =
  mongoose.models.LeatherFactory ||
  mongoose.model<LeatherFactoryType>('LeatherFactory', LeatherFactorySchema)

export class BasicProductsController {
  private readonly basicProductService

  private readonly leatherColorService

  private readonly leatherArticleService

  private readonly leatherFactoryService

  constructor() {
    this.basicProductService = new BasicProductService()
    this.leatherColorService = LeatherColorModel
    this.leatherArticleService = LeatherArticleModel
    this.leatherFactoryService = LeatherFactoryModel
  }

  async findAll(req: NextRequest): Promise<BasicProductResponseType> {
    const { query } = url.parse(req.url, true)

    const locale = (req.headers.get('x-accept-language') || LOCALES.RU) as string

    const colorIds = query.leatherColors
      ? await this.leatherColorService
          .find({ value: { $in: query.leatherColors } }, { _id: true })
          .sort()
          .exec()
      : undefined

    const minPriceInDB = await this.basicProductService.getMinCost()
    const maxPriceInDB = await this.basicProductService.getMaxCost()

    if (query.leatherColors && colorIds?.length) {
      return {
        data: [],
        maxPrice: maxPriceInDB,
        minPrice: minPriceInDB,
        totalCount: 0,
      }
    }

    const leathersId = query.leathers
      ? await this.leatherArticleService.find({ value: { $in: query.leathers } }, { _id: true })
      : undefined

    const regex = new RegExp(query.search as string, 'i')

    const filters = {
      $and: [
        query.categories ? { category: { $in: [query.categories].flat() } } : {},
        query.assignments ? { assignments: { $in: [query.assignments].flat() } } : {},
        leathersId?.length ? { 'leather.article': { $in: leathersId.map(({ _id }) => _id) } } : {},
        colorIds?.length
          ? {
              $or: colorIds.map(color => ({
                [`photos.${color._id.toString()}`]: { $exists: true },
              })),
            }
          : {},
        query.search
          ? {
              $or: [
                { [`title.${locale}`]: { $regex: regex } },
                { [`description.${locale}`]: { $regex: regex } },
              ],
            }
          : {},
        query.minPrice ? { cost: { $gte: +query.minPrice } } : {},
        query.maxPrice ? { cost: { $lte: +query.maxPrice } } : {},
      ],
    }

    const skip = Number(query.page) * Number(query.pageSize) - Number(query.pageSize) || 0

    const basicProducts = await this.basicProductService.findAll(
      filters,
      query.pageSize,
      skip,
      query.sort
    )

    const totalCount: number = await this.basicProductService.countDocuments(filters)

    const data = await Promise.all(
      basicProducts.map(async product => {
        const prod = await this.generateResponseProduct({
          locale,
          product,
        })

        if (query.leatherColors) {
          const { photos } = prod

          const productColors = prod.productColors.filter(color => {
            const colorId = color._id.toString()

            if (photos && colorIds?.some(el => el._id.toString() === colorId)) {
              delete photos[colorId]

              return false
            }

            return true
          })

          return { ...prod, photos, productColors }
        }

        return prod
      })
    )

    return {
      data,
      maxPrice: maxPriceInDB,
      minPrice: minPriceInDB,
      totalCount,
    }
  }

  async generateResponseProduct({
    locale = LOCALES.RU,
    product: productDoc,
  }: GenerateResponseProductParams): Promise<BasicProductType> {
    const product = productDoc.toJSON()

    const productColors = (
      await this.leatherColorService
        .find({ _id: { $in: Object.keys(product.photos!) } })
        .sort()
        .exec()
    )
      .map(color => {
        const { _id, photo, title } = color.toJSON()

        return { _id, photo, title: title[locale] }
      })
      .sort((a, b) => (a.title > b.title ? 1 : -1))

    const leatherArticle = (
      await this.leatherArticleService.findById(product.leather.article, {
        title: true,
      })
    ).toJSON()

    const leatherFactory = (
      await this.leatherFactoryService.findById(product.leather.factory, {
        title: true,
      })
    ).toJSON()

    const leather = {
      article: { _id: leatherArticle._id, title: leatherArticle.title[locale] },
      factory: { _id: leatherFactory._id, title: leatherFactory.title[locale] },
    }

    return {
      ...productDoc.toJSON(),
      leather,
      productColors,
      _id: product._id,
      size: product.size[locale],
      title: product.title[locale],
      description: product.description[locale],
    }
  }
}

type GenerateResponseProductParams = {
  locale: string | undefined
  product: BasicProductEntity
}
