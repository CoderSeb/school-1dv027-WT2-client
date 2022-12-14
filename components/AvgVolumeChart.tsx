import dynamic from 'next/dynamic'
import React from 'react'
import { BucketData } from '../pages'
import styles from './styles/AvgVolumeChart.module.css'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

/**
 * Chart component to show Average Volume Traded since year 2000.
 *
 * @param context any props passed to the component.
 * @returns {JSX.Element} as the component.
 */
function AvgVolumeChart({ chartData }: { chartData: BucketData }) {
  const [avgVolData, setAvgVolData] = React.useState<Object[]>([])
  const [volTraded, setVolTraded] = React.useState<ApexAxisChartSeries>([])
  const [optAvgVol, setOptAvgVol] = React.useState<ApexCharts.ApexOptions>({})
  React.useEffect(() => {
    if (chartData) {
      setAvgVolData(chartData.buckets)
    }
  }, [])

  React.useEffect(() => {
    if (avgVolData.length > 0) {
      let tradedVolume: ApexAxisChartSeries = []
      let symbols: string[] = []
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
