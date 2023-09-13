import { NextRequest, NextResponse } from 'next/server'

import { LeatherFactoryController } from 'entities/leatherFactory'
import { LeatherFactoryType } from 'features/leatherFactories/api/types'
import { LocaleFieldEntity } from 'shared/entities/localeFieldEntity'
import { StatusCode } from 'shared/enums/statusCode'
import dbConnect from 'shared/lib/db/dbConnect'
import { LOCALES } from 'shared/types/localeType'

const leatherFactoryController = new LeatherFactoryController()

export async function GET(
  request: NextRequest
): Promise<NextResponse<LeatherFactoryType[] | { success: boolean }>> {
  const locale = (request.headers.get('x-accept-language') || LOCALES.RU) as keyof LocaleFieldEntity

  try {
    await dbConnect()
    const data = await leatherFactoryController.findAll({ locale })

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ success: false }, { status: StatusCode.BAD_REQUEST })
  }
}
