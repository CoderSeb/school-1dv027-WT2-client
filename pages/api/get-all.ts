import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getData } from '../../helpers/elastic-requests'

type Data = {
  message?: string
  data?: Object
}

/**
 * Api hander, calling getData function to retrieve data from elasticsearch.
 *
 * @export
 * @param {NextApiRequest} req
 * @param {NextApiResponse<Data>} res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method !== 'GET') {
      res.status(405).json({ message: 'Method not allowed' })
    }
    if (!req.headers.authorization || req.headers.host !== process.env.HOST) {
      res.status(404).json({ message: 'Not found.' })
    } else {
      const token: string = req.headers.authorization.split(' ')[1]
      const secret: string = process.env.JWT_SECRET!
      jwt.verify(token, secret)

      const data = await getData()

      res.status(200).json({ data })
    }
  } catch (e: any) {
    if (e.name !== 'JsonWebTokenError') {
      res.status(500).json({ message: e.message } as Data)
    }
    console.log('Here!')
    res.status(403).json({ message: 'Invalid token' } as Data)
  }
}
