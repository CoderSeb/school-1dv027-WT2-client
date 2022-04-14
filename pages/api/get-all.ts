import type { NextApiRequest, NextApiResponse } from 'next'
import { getData } from '../../helpers/elastic-requests'

type Data = {
  message?: string
  data?: Object
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const data = await getData()
    res.status(200).json({data})
  } catch (e: any) {
    res.status(500).json({ message: e.message } as Data)
  }
}