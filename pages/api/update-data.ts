import type { NextApiRequest, NextApiResponse } from 'next'
import { getSumVolume } from '../../helpers/elastic-requests'

type Data = {
  data?: any
  message?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const result = await getSumVolume()
    res.status(200).json(result)
  } catch (e) {
    res.status(500).json({ message: "Something went wrong on our end, please try again later." })
  }
}