import React from 'react';
import WeatherBackground from '../components/Weather/WeatherBackground'
import WeatherLeft from '../components/Weather/WeatherLeft';
import WeatherRight from '../components/Weather/WeatherRight';


// 得到未来六天星期名字
const getDay = () => {
  const today = new Date().getUTCDay()
  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
  const dayList = days.slice(today).concat(days.slice(0)) // concat连接两个list
  const  arrayDayList = [
    {"DayName":dayList[0]},
    {"DayName":dayList[1]},
    {"DayName":dayList[2]},
    {"DayName":dayList[3]},
    {"DayName":dayList[4]},
    {"DayName":dayList[5]}
  ]
  // console.log(arrayDayList)
  return(arrayDayList)
}

function WeatherPage (props)  {
  const{currentCity,todayTime,todayInfo,sixDayInfo} = props
  const arrayDayList = getDay()

  // object spread operator {...} 合并两个Array
  // obj = {...Array1,...Array2} //obj = >{Array1,Array2}  

  // 1. 给每一个map的key都添加一条星期的value,再传给WeatherRight
  if(sixDayInfo.length!==0){
    for(let i=0; i<6; i+=1) {
      sixDayInfo[i] = {...arrayDayList[i],...sixDayInfo[i]}  // 给每一个map的key都添加一条星期的value
    }
  }

  return(
    <>
      <div className="weatherPage__Background">
        <WeatherBackground />
      </div>

      <div className="weatherPage__LeftDetail">
        <WeatherLeft 
          inputCity={currentCity}
          todayInfo={todayInfo}
          todayTime={todayTime}
        />
      </div>

      <div className="weather__RightDetail">
        <WeatherRight
          sixDayInfo={sixDayInfo}
        />
      </div>
    </>
  )
}

export default WeatherPage