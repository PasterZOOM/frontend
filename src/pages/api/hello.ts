// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}
const responseOk = 200
const handler = (req: NextApiRequest, res: NextApiResponse<Data>): void => {
  res.status(responseOk).json({ name: 'John Doe' })
}

export default handler
