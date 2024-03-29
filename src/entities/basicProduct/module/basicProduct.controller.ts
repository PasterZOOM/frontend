import { BasicProductService } from './basicProduct.service'
import { BasicProductEntity } from './interfaces/basicProduct.entity'

import { LeatherArticleService } from '@/entities/leatherArticle'
import { LeatherColorService } from '@/entities/leatherColor'
import { LeatherFactoryService } from '@/entities/leatherFactory'
import { BasicProductResponseType, BasicProductType } from '@/features/basicProducts/api/types'
import { LocaleFieldEntity } from '@/shared/entities/localeFieldEntity'
import { LOCALES } from '@/shared/types/localeType'
import { FiltersType } from '@/store/useBasicProductsFilterStore'

export class BasicProductsController {
  private readonly basicProductService

  private readonly leatherColorService

  private readonly leatherArticleService

  private readonly leatherFactoryService

  constructor() {
    this.basicProductService = new BasicProductService()
    this.leatherColorService = new LeatherColorService()
    this.leatherArticleService = new LeatherArticleService()
    this.leatherFactoryService = new LeatherFactoryService()
  }

  async findAll({
    locale,
    query,
  }: {
    locale: keyof LocaleFieldEntity
    query: FiltersType
  }): Promise<BasicProductResponseType> {
    const colorIds = query.leatherColors
      ? await this.leatherColorService.findAll(
          { value: { $in: [query.leatherColors].flat() } },
          { _id: true }
        )
      : undefined

    const minPriceInDB = await this.basicProductService.getMinCost()
    const maxPriceInDB = await this.basicProductService.getMaxCost()

    if (query.leatherColors && !colorIds?.length) {
      return {
        data: [],
        maxPrice: maxPriceInDB,
        minPrice: minPriceInDB,
        totalCount: 0,
      }
    }

    const leathersId = query.leathers
      ? await this.leatherArticleService.findAll(
          { value: { $in: [query.leathers].flat() } },
          { _id: true }
        )
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

            if (photos && !colorIds?.some(el => el._id.toString() === colorId)) {
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

  async findOne({
    locale,
    id,
  }: {
    id: string
    locale: keyof LocaleFieldEntity
  }): Promise<BasicProductType> {
    const product = await this.basicProductService.findOne(id)

    if (!product) {
      throw new Error('not found')
    }

    return this.generateResponseProduct({ locale, product })
  }

  async generateResponseProduct({
    locale = LOCALES.RU,
    product,
  }: GenerateResponseProductParams): Promise<BasicProductType> {
    const productColors = (
      await this.leatherColorService.findAll({ _id: { $in: Object.keys(product.photos!) } })
    )
      .map(({ _id, photo, title }) => {
        return { _id: _id.toString(), photo, title: title[locale] }
      })
      .sort((a, b) => (a.title > b.title ? 1 : -1))

    const leatherArticle = await this.leatherArticleService.findOne(product.leather.article, {
      title: true,
    })

    const leatherFactory = await this.leatherFactoryService.findOne(product.leather.factory, {
      title: true,
    })

    const leather = {
      article: {
        _id: leatherArticle!._id.toString(),
        title: leatherArticle!.title[locale],
      },
      factory: { _id: leatherFactory!._id.toString(), title: leatherFactory!.title[locale] },
    }

    return {
      ...product,
      leather,
      productColors,
      _id: product._id.toString(),
      size: product.size[locale],
      title: product.title[locale],
      description: product.description[locale],
    }
  }
}

type GenerateResponseProductParams = {
  locale: keyof LocaleFieldEntity
  product: BasicProductEntity
}
