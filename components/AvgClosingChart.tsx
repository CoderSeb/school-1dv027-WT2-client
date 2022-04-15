import dynamic from 'next/dynamic'
import React from 'react'
import styles from './styles/AvgClosingChart.module.css'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
function AvgClosingChart(context: any) {
  const [avgClosingData, setAvgClosingData] = React.useState([])
  const [series, setSeries] = React.useState<any>([])

  const [options, setOptions] = React.useState<ApexCharts.ApexOptions>({
    chart: {
      id: 'Average closing per month since 2000'
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      x: {
        format: 'MMM yyyy'
      }
    },
    yaxis: {
      labels: {
        formatter: function (value: any) {
          return value + '$'
        }
      }
    },
    xaxis: {
      type: 'datetime',
      categories: []
    }
  })

  React.useEffect(() => {
    if (context.chartData) {
      setAvgClosingData(context.chartData.buckets)
    }
  }, [])

  React.useEffect(() => {
    if (avgClosingData.length > 0) {
      let closingPrices: any = {}
      let datesArray: any = []
      avgClosingData.forEach((item: any) => {
        item['1'].buckets.forEach((obj: any) => {
          let price = [item.key, obj['2'].value.toFixed(2)]
          let symbol = obj.key
          if (closingPrices[symbol]) {
            closingPrices[symbol].data.push(price)
          } else {
            closingPrices[symbol] = {
              name: symbol,
              data: [price]
            }
          }
        })
        datesArray.push(item.key)
      })
      for (let key in closingPrices) {
        series.push(closingPrices[key])
      }

      setOptions((prevOptions: any) => {
        return {
          ...prevOptions,
          xaxis: {
            type: 'datetime',
            categories: datesArray
          }
        }
      })
    }
  }, [avgClosingData])
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Average closing price by month since 2000
      </h3>
      {series.length > 2 && (
        <Chart options={options} series={series} type='area' />
      )}
    </div>
  )
}

export default AvgClosingChart
