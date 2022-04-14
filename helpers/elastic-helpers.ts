import { Client } from "@elastic/elasticsearch"

export const loadClient = () => {
  // const devOps: Object = {
  //   node: process.env.ELASTIC_DEVELOPMENT_URL!,
  //   auth: {
  //     username: process.env.ELASTIC_USERNAME!,
  //     password: process.env.ELASTIC_PASSWORD!
  //   },
  //   tls: {
  //     ca: fs.readFileSync(process.env.CERT_PATH!),
  //     rejectUnauthorized: false
  //   }
  // }

  const prodOps: Object  = {
    node: process.env.ELASTIC_PRODUCTION_URL!,
    auth: {
      username: process.env.ELASTIC_PROD_USER!,
      password: process.env.ELASTIC_PROD_PASS!
    }
  }

  const options: Object = prodOps

  const client: Client = new Client(options)
  return client
}