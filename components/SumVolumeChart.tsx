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
  const [optSumVol, setOptSumVol] = React.useState<ApexCharts.ApexOptions>({
    chart: {
      id: 'Traded volume since 2000'
    },
    theme: {
      palette: 'palette1' // upto palette10
    },
    yaxis: {
      labels: {
        formatter: function (value: any) {
          return value + '$'
        }
      }
    },
    xaxis: {
      type: 'category',
      categories: []
    }
  })

  React.useEffect(() => {
    if (context.chartData) {
      setSumVolData(context.chartData.buckets)
    }
  }, [])

  React.useEffect(() => {
    if (sumVolData.length > 0) {
      let tradedVolume: any = []
      let symbols: any = []
      sumVolData.forEach((item: any) => {
        tradedVolume.push((item['1'].buckets[0]['2'].value / 1000).toFixed(0))
        symbols.push(item.key)
      })

      setVolTraded([{ name: 'Traded volume', data: tradedVolume }])
      setOptSumVol((prevOptions: any) => {
        return {
          ...prevOptions,
          theme: {
            palette: 'palette6'
          },
          yaxis: {
            labels: {
              formatter: function (value: any) {
                return value + 'k'
              }
            }
          },
          xaxis: {
            type: 'category',
            categories: symbols
          }
        }
      })
    }
  }, [sumVolData])
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Stocks total traded volume since 2000</h3>
      {sumVolData && (
        <Chart options={optSumVol} series={volTraded} type='bar' />
      )}
    </div>
  )
}

export default SumVolumeChart
