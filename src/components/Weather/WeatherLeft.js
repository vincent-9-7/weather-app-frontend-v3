import React from 'react';
import './Scss/WeatherLeft/WeatherLeft.css'

const WeatherLeft = ({inputCity,todayInfo,todayTime}) => (
  
  <>
    <div className="weatherPage__LeftDetail--left-part">
      <span>{todayInfo[0]}</span>
    </div>

    <div className="weatherPage__LeftDetail--middle-part">
      <span>{inputCity}</span>
      <span>{todayTime}</span>
    </div>

    <div className="weatherPage__LeftDetail--right-part">
      <img src={todayInfo[1]} alt="today" />

      <span>{todayInfo[2]}</span>
    </div>
  </>
)


export default WeatherLeft