import axios from 'axios'
import dynamic from 'next/dynamic'
import React from 'react'
import styles from './styles/AvgVolumeChart.module.css'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
function AvgVolumeChart(context: any) {
  const [avgVolData, setAvgVolData] = React.useState([])
  const [volTraded, setVolTraded] = React.useState([])
  const [optAvgVol, setOptAvgVol] = React.useState({})

  React.useEffect(() => {
    const loadSumVol = async () => {
      const sumVolDataResponse: any = await axios.get(`/api/update-data`)
      setAvgVolData(sumVolDataResponse.data.avgVolume)
    }
    if (avgVolData.length === 0) {
      try {
        loadSumVol()
      } catch (e) {
        console.log(e)
      }
    }
  }, [])

  React.useEffect(() => {
    if (avgVolData.length > 0) {
      let tradedVolume: any = []
      let symbols: any = []
      avgVolData.forEach((item: any) => {
        tradedVolume.push(item['1'].value)
        symbols.push(item.key)
      })

      setVolTraded(tradedVolume)
      setOptAvgVol({
        labels: symbols
      })
    }
  }, [avgVolData])
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Stocks average traded volume since 2000</h3>
      {avgVolData && (
        <Chart options={optAvgVol} series={volTraded} type='pie' />
      )}
    </div>
  )
}

export default AvgVolumeChart
