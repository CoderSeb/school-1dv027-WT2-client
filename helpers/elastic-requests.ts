import { Client } from "@elastic/elasticsearch"
import { loadClient } from "./elastic-helpers"
import requests from './req-list'


export const getSumVolume = async () => {
  const client: Client = loadClient()
  const reqBody = requests.sumVolume

  try {
    type SearchOptions = {
      index: string
      body: any
    }

    const searchOptions: SearchOptions = {
      index: 'stocksdata',
      body: reqBody
    }
    const result: any = await client.search(searchOptions)
    if (result) {
      return result.aggregations['0'].buckets
    }
    
  } catch (err) {
    throw new Error('Ops! Something went wrong, please try again later.')
  }
}

export const getAvgVolume = async () => {
  const client: Client = loadClient()
  const reqBody = requests.avgVolume

  try {
    type SearchOptions = {
      index: string
      body: any
    }

    const searchOptions: SearchOptions = {
      index: 'stocksdata',
      body: reqBody
    }
    const result: any = await client.search(searchOptions)
    if (result) {
      return result.aggregations['0'].buckets
    }
    
  } catch (err) {
    throw new Error('Ops! Something went wrong, please try again later.')
  }
}
