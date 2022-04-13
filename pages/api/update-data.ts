import type { NextApiRequest, NextApiResponse } from 'next'
import { getAvgVolume, getSumVolume } from '../../helpers/elastic-requests'

type Data = {
  sumVolume?: Object
  avgVolume?: Object
  message?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const sumVolume = await getSumVolume()
    const avgVolume = await getAvgVolume()
    res.status(200).json({
      sumVolume: sumVolume,
      avgVolume: avgVolume,
    })
  } catch (e) {
    res.status(500).json({ message: "Something went wrong on our end, please try again later." })
  }
}