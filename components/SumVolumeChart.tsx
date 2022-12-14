import dynamic from 'next/dynamic'
import React from 'react'
import { BucketData } from '../pages'
import styles from './styles/SumVolumeChart.module.css'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

/**
 * Chart component to show Total Volume Traded since year 2000.
 *
 * @param context any props passed to the component.
 * @returns {JSX.Element} as the component.
 */
function SumVolumeChart({ chartData }: { chartData: BucketData }) {
  const [sumVolData, setSumVolData] = React.useState<Object[]>([])
  const [volTraded, setVolTraded] = React.useState<ApexAxisChartSeries>([
    {
      name: '',
      data: []
    }
  ])
  const [optSumVol, setOptSumVol] = React.useState<ApexCharts.ApexOptions>({
    chart: {
      id: 'Traded volume since 2000'
    },
    yaxis: {
      labels: {
        formatter: function (value: number) {
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
    if (chartData) {
      setSumVolData(chartData.buckets)
    }
  }, [])

  React.useEffect(() => {
    if (sumVolData.length > 0) {
      let tradedVolume: any = []
      let symbols: string[] = []
      sumVolData.forEach((item: any) => {
        tradedVolume.push(
          (item['1'].buckets[0]['2'].value / 1000000).toFixed(0) // Dividing the value with 1 million to get the volume in millions.
        )
        symbols.push(item.key)
      })

      setVolTraded([{ name: 'Traded volume', data: tradedVolume }])
      setOptSumVol((prevOptions: ApexCharts.ApexOptions) => {
        return {
          ...prevOptions,
          dataLabels: {
            enabled: false
          },
          plotOptions: {
            bar: {
              distributed: true
            }
          },
          yaxis: {
            labels: {
              formatter: function (value: number) {
                return value + ' Million'
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
