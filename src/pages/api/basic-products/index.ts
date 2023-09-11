import { NextApiRequest, NextApiResponse } from 'next'

import { BasicProductsController } from 'entities/basicProduct'
import { StatusCode } from 'shared/enums/statusCode'
import dbConnect from 'shared/lib/db/dbConnect'

const basicProductsController = new BasicProductsController()

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const data = await basicProductsController.findAll(req)

        res.status(StatusCode.SUCCESS).json(data)
      } catch (error) {
        res.status(StatusCode.BAD_REQUEST).json({ success: false })
      }
      break
    default:
      res.status(StatusCode.BAD_REQUEST).json({ success: false })
      break
  }
}
