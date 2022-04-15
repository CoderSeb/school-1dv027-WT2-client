import { Client } from "@elastic/elasticsearch"
import fs from 'fs-extra'

export const loadClient = () => {
  let options: Object
  if (process.env.PROD_MODE) {
    options = {
      node: process.env.ELASTIC_PRODUCTION_URL!,
      auth: {
        username: process.env.ELASTIC_PROD_USER!,
        password: process.env.ELASTIC_PROD_PASS!
      }
    }
  } else {
    options = {
      node: process.env.ELASTIC_DEVELOPMENT_URL!,
      auth: {
        username: process.env.ELASTIC_USERNAME!,
        password: process.env.ELASTIC_PASSWORD!
      },
      tls: {
        ca: fs.readFileSync(process.env.CERT_PATH!),
        rejectUnauthorized: false
      }
    }
  }

  const client: Client = new Client(options)
  return client
}