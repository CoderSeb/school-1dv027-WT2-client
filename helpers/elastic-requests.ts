import { Client } from "@elastic/elasticsearch"
import { loadClient } from "./elastic-helpers"
import queryBody from './req-list'

/**
 * Performs a search query on elasticsearch.
 *
 * @returns {any} as the aggregations response from Elasticsearch.
 */
export const getData = async (): Promise<any> => {
  const client: Client = loadClient()
  try {
    type SearchOptions = {
      index: string
      body: Object
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
