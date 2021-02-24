import React from 'react'
import './Scss/WeatherRight.scss'
/* eslint-disable no-param-reassign */

const WeatherRight = ({sixDayInfo}) => (
  
  <>
    <ul>
      {/* 先slice前五天的Array，在进行map */}
      {sixDayInfo.slice(0,5).map((item) => {
          const {DayName} = item
          const {max,min} = item.temp
          const highTemp = max.toString().split(".")[0]
          const lowTemp = min.toString().split(".")[0]

          const {icon} = item.weather[0]
          const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`

          return(
            <li key={item.dt}>
              <span>{DayName}</span>
              
              <span>{highTemp}</span>
              
              <span>{lowTemp}</span>
              
              <img src={iconUrl} alt="icon" />
            </li>
          )
        })}
    </ul>
  </>
  )

export default WeatherRight