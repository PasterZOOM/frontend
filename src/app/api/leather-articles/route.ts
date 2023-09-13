import { NextRequest, NextResponse } from 'next/server'

import { LeatherArticleController } from 'entities/leatherArticle'
import { LeatherArticleType } from 'features/leatherArticles/api/types'
import { StatusCode } from 'shared/enums/statusCode'
import dbConnect from 'shared/lib/db/dbConnect'

const leatherArticleController = new LeatherArticleController()

export async function GET(
  request: NextRequest
): Promise<NextResponse<LeatherArticleType[] | { success: boolean }>> {
  try {
    await dbConnect()
    const data = await leatherArticleController.findAll(request)

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ success: false }, { status: StatusCode.BAD_REQUEST })
  }
}
