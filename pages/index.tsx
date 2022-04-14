import Head from 'next/head'
import React from 'react'
import AvgClosingChart from '../components/AvgClosingChart'
import AvgVolumeChart from '../components/AvgVolumeChart'
import SumVolumeChart from '../components/SumVolumeChart'
import styles from '../styles/Home.module.css'

type AggResponse = {
  data: object
}

type ChartData = {
  avg_volume: object
  sum_volume: object
  avg_closing_price: object
}

function Home() {
  const [loaded, setLoaded] = React.useState(false)
  const [data, setData] = React.useState<ChartData | undefined>(undefined)
  const [noData, setNoData] = React.useState(false)
  React.useEffect(() => {
    if (!loaded) {
      const loadData = async () => {
        const response: Response = await fetch('/api/get-all')
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
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Stock market analysis</h1>
        <h3>View in full screen mode</h3>
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
        <p>&copy; Sebastian Åkerblom 2022</p>
      </main>
    </div>
  )
}

export default Home
