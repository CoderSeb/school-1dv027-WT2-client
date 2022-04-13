import axios from 'axios'
import dynamic from 'next/dynamic'
import React from 'react'
import styles from './styles/SumVolumeChart.module.css'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
function SumVolumeChart(context: any) {
  const [sumVolData, setSumVolData] = React.useState([])
  const [volTraded, setVolTraded] = React.useState([
    {
      name: '',
      data: []
    }
  ])
  const [optSumVol, setOptSumVol] = React.useState({
    chart: {
      id: 'Traded volume since 2000'
    },
    xaxis: {
      categories: []
    }
  })

  React.useEffect(() => {
    const loadSumVol = async () => {
      const sumVolDataResponse: any = await axios.get(`/api/update-data`)
      setSumVolData(sumVolDataResponse.data)
    }
    if (sumVolData.length === 0) {
      try {
        loadSumVol()
      } catch (e) {
        console.log(e)
      }
    }
  }, [])

  React.useEffect(() => {
    if (sumVolData.length > 0) {
      let tradedVolume: any = []
      let symbols: any = []
      sumVolData.forEach((item: any) => {
        tradedVolume.push(item['1'].buckets[0]['2'].value)
        symbols.push(item.key)
      })

      setVolTraded([{ name: 'Traded volume', data: tradedVolume }])
      setOptSumVol((prevOptions: any) => {
        return {
          ...prevOptions,
          xaxis: {
            categories: symbols
          }
        }
      })
    }
  }, [sumVolData])
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Stocks traded volume since 2000</h3>
      {sumVolData && (
        <Chart options={optSumVol} series={volTraded} type='bar' />
      )}
    </div>
  )
}

export default SumVolumeChart
