import "./App.css"
import StockData from "./data"
import { useEffect, useState } from "react"
import dayjs from "dayjs"

const REAL_START_TIME = dayjs("2023-10-06 24:00:00")
const DISPLAY_START_TIME = "2023-10-08 12:00:00"
const TIME_TICK = 1000 * 60 * 3

export default function App() {
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0)
  const [displayTime, setDisplayTime] = useState("")

  useEffect(() => {
    setTimes()
    setInterval(() => {
      setTimes()
    }, 1000)
  }, [])

  function setTimes() {
    const timeGap = dayjs().diff(REAL_START_TIME)
    var timeIndex = timeGap / TIME_TICK

    if (timeIndex > 10) {
      timeIndex = 10
    }
    setCurrentTimeIndex(Math.floor(timeIndex))

    const displayTimeDate = dayjs(DISPLAY_START_TIME).add(timeGap)
    setDisplayTime(`${displayTimeDate.format("HH:mm:ss")}`)
  }

  function getRow(stockName, priceList) {
    var beforePrice = 0
    var currentPrice = priceList[currentTimeIndex]
    if (currentTimeIndex === 0) {
      beforePrice = currentPrice
    } else {
      beforePrice = priceList[currentTimeIndex - 1]
    }
    const priceGap = currentPrice - beforePrice

    return (
      <div className="table-row">
        <div className="table-cell">{stockName}</div>
        <div className="table-cell">{currentPrice}</div>
        <div
          className={`table-cell ${
            priceGap > 0 ? "up" : priceGap === 0 ? "" : "down"
          }`}
        >
          {priceGap > 0 ? "↑" : priceGap < 0 ? "↓" : ""}
          {Math.abs(priceGap)}
        </div>
      </div>
    )
  }

  return (
    <div className="root">
      <div className="title">폭풍의 주식 시장 </div>
      <div className="timer">{displayTime}</div>

      <div className="table">
        {Object.entries(StockData).map(([key, value]) => getRow(key, value))}
      </div>
    </div>
  )
}
