import { Client } from "@elastic/elasticsearch"
import { AggregationsAggregate } from "@elastic/elasticsearch/lib/api/types"
import { loadClient } from "./elastic-helpers"
import queryBody from './req-list'

/**
 * Performs a search query on elasticsearch.
 *
 * @returns {AggregationsAggregate} as the aggregations response from Elasticsearch.
 */
export const getData = async (): Promise<any> => {

  interface Document { 
    took: number
    timed_out: boolean
    _shards: object
    hits: object
    aggregations: AggregationsAggregate
  }

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
    const result = await client.search<Document>(searchOptions)
    if (result) {
      return result.aggregations
    }
    
  } catch (err) {
    throw new Error("Ops! Couldn't fetch data from Elasticsearch.")
  }
}
