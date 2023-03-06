// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next'

import { EFilterKeys } from '@/mocks/filters'
import { productsMock } from '@/mocks/productsMock'
import { ProductType } from '@/types/productType'

const responseOk = 200
const handler = async (
  req: { query: Record<EFilterKeys, string> },
  res: NextApiResponse<ProductType[]>
): Promise<void> => {
  res.status(responseOk).json(productsMock)
}

export default handler
