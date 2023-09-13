import url from 'url'

import { NextRequest, NextResponse } from 'next/server'

import { BasicProductsController } from 'entities/basicProduct'
import { BasicProductResponseType } from 'features/basicProducts/api/types'
import { LocaleFieldEntity } from 'shared/entities/localeFieldEntity'
import { StatusCode } from 'shared/enums/statusCode'
import dbConnect from 'shared/lib/db/dbConnect'
import { LOCALES } from 'shared/types/localeType'
import { FiltersType } from 'store/useBasicProductsFilterStore'

const basicProductsController = new BasicProductsController()

export async function GET(
  request: NextRequest
): Promise<NextResponse<BasicProductResponseType | { success: boolean }>> {
  const { query } = url.parse(request.url, true)
  const locale = (request.headers.get('x-accept-language') || LOCALES.RU) as keyof LocaleFieldEntity

  try {
    await dbConnect()
    const data = await basicProductsController.findAll({ query: query as FiltersType, locale })

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ success: false }, { status: StatusCode.BAD_REQUEST })
  }
}
