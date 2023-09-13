import { NextRequest, NextResponse } from 'next/server'

import { LeatherArticleController } from 'entities/leatherArticle'
import { LeatherArticleType } from 'features/leatherArticles/api/types'
import { LocaleFieldEntity } from 'shared/entities/localeFieldEntity'
import { StatusCode } from 'shared/enums/statusCode'
import dbConnect from 'shared/lib/db/dbConnect'
import { LOCALES } from 'shared/types/localeType'

const leatherArticleController = new LeatherArticleController()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<LeatherArticleType | { success: boolean } | null>> {
  const locale = (request.headers.get('x-accept-language') || LOCALES.RU) as keyof LocaleFieldEntity

  try {
    await dbConnect()
    const data = await leatherArticleController.findOne({ id: params.id, locale })

    return NextResponse.json(data)
  } catch (e) {
    const error = e as Error

    if (error.message === 'not found') {
      return NextResponse.json({ success: false }, { status: StatusCode.NOT_FOUND })
    }

    return NextResponse.json({ success: false }, { status: StatusCode.BAD_REQUEST })
  }
}
