import dynamic from 'next/dynamic'
import React from 'react'
import styles from './styles/AvgVolumeChart.module.css'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

function AvgVolumeChart(context: any) {
  const [avgVolData, setAvgVolData] = React.useState<object[]>([])
  const [volTraded, setVolTraded] = React.useState<number[]>([])
  const [optAvgVol, setOptAvgVol] = React.useState<ApexCharts.ApexOptions>({})
  React.useEffect(() => {
    if (context.chartData) {
      setAvgVolData(context.chartData.buckets)
    }
  }, [])

  React.useEffect(() => {
    if (avgVolData.length > 0) {
      let tradedVolume: number[] = []
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
