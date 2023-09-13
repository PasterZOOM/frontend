import { NextRequest, NextResponse } from 'next/server'

import { LeatherArticleController } from 'entities/leatherArticle'
import { LeatherArticleType } from 'features/leatherArticles/api/types'
import { LocaleFieldEntity } from 'shared/entities/localeFieldEntity'
import { StatusCode } from 'shared/enums/statusCode'
import dbConnect from 'shared/lib/db/dbConnect'
import { LOCALES } from 'shared/types/localeType'

const leatherArticleController = new LeatherArticleController()

export async function GET(
  request: NextRequest
): Promise<NextResponse<LeatherArticleType[] | { success: boolean }>> {
  const locale = (request.headers.get('x-accept-language') || LOCALES.RU) as keyof LocaleFieldEntity

  try {
    await dbConnect()
    const data = await leatherArticleController.findAll({ locale })

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ success: false }, { status: StatusCode.BAD_REQUEST })
  }
}
