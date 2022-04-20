import jwt from 'jsonwebtoken'
import Head from 'next/head'
import React from 'react'
import AvgClosingChart from '../components/AvgClosingChart'
import AvgVolumeChart from '../components/AvgVolumeChart'
import SumVolumeChart from '../components/SumVolumeChart'
import styles from '../styles/Home.module.css'

// Type declaration for data response from the api.
type AggResponse = {
  data: ChartData
}

// Type declaration for ChartData in AggResponse object.
type ChartData = {
  avg_volume: object
  sum_volume: object
  avg_closing_price: object
}

/**
 * Home page function.
 *
 * @returns {JSX.Element}
 */
function Home({ reqToken }: { reqToken: string }): JSX.Element {
  const [loaded, setLoaded] = React.useState(false)
  const [data, setData] = React.useState<ChartData | undefined>(undefined)
  const [noData, setNoData] = React.useState(false)
  React.useEffect(() => {
    if (!loaded) {
      const loadData = async () => {
        const response: Response = await fetch('/api/get-all', {
          headers: {
            Authorization: `Bearer ${reqToken}`
          }
        })
        if (response.status !== 200) {
          setNoData(true)
          return
        }
        const dataResp: AggResponse = await response.json()
        setData(dataResp.data as ChartData)
        setLoaded(true)
      }
      loadData()
    }
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>Sebs Stock Data</title>
        <meta name='description' content='Stock data, just for LNU teachers.' />
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}>Stock market analysis</h1>
        <p>View in full screen mode for best experience</p>
      </header>

      <main className={styles.main}>
        {!noData && data && data.avg_volume && (
          <>
            <AvgClosingChart chartData={data.avg_closing_price} />
            <AvgVolumeChart chartData={data.avg_volume} />
            <SumVolumeChart chartData={data.sum_volume} />
          </>
        )}

        {noData && (
          <>
            <h1>Problem reaching elastic... No data found</h1>
          </>
        )}
      </main>
      <footer className={styles.footer}>
        <p>&copy; Sebastian Åkerblom 2022</p>
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  const secret: string = process.env.JWT_SECRET!
  const token = jwt.sign(
    { message: 'To be used as token for internal api. Only for client.' },
    secret,
    {
      expiresIn: '30s'
    }
  )
  return {
    props: {
      reqToken: token
    }
  }
}

export default Home
