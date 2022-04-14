import { Client } from "@elastic/elasticsearch"
import { loadClient } from "./elastic-helpers"
import queryBody from './req-list'

export const getData = async () => {
  const client: Client = loadClient()
  try {
    type SearchOptions = {
      index: string
      body: any
    }

    const searchOptions: SearchOptions = {
      index: 'stocksdata',
      body: queryBody
    }
    const result: any = await client.search(searchOptions)
    if (result) {
      return result.aggregations
    }
    
  } catch (err: any) {
    throw new Error(err.message)
  }
}
