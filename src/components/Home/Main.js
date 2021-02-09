import React from 'react';
import axios from 'axios';
import WeatherPage from '../../pages/WeatherPage'
import './Scss/MainPage/MainPage.css'
import HomeBackground from "./HomeBackground";
import HomeTitle from "./HomeTitle"
import {getLocationApi,getWeatherApi,getGMTApi,getTimeApi,getTimeApiGMT0} from '../../api/Api'

export const getLocation = (currentCity) => axios.get(getLocationApi(currentCity));
export const getCurrentWeather = (lat,lng) => axios.get(getWeatherApi(lat,lng));
export const getGMT = (lat,lng) => axios.get(getGMTApi(lat,lng));
export const getTime = (GMT) => axios.get(getTimeApi(GMT));
export const getGMT0Time = (GMT) => axios.get(getTimeApiGMT0(GMT));

class MainPage extends React.Component {
  constructor(){
      super()
      this.state={
          searchInput:'',
          finalInput:'',
          todayInfo:[],
          todayTime:'',
          sixDayInfo:[],
          enter:false
      }
  }

  componentDidMount() {

  }

  componentDidUpdate() {
    // const {finalInput} = this.state
    // console.log(finalInput)
  }

  // 提交搜索后，更新今天时间和未来七天天气数据
  handleSubmit = (e) => {
    e.preventDefault()
    const{searchInput} = this.state
    this.setState({
        finalInput:searchInput,
    })

    setTimeout(() => { // 延迟0.1s更新写入数据
        const{finalInput} = this.state
        this.getWeather(finalInput)
        this.currentTime(finalInput)
    },1)
    setTimeout(() => { // 延迟1s刷新主页的display->none
      this.setState({
        enter:true
      })
    }, 1000);
  }

  getWeather = async (currentCity) => {
    // ------------------第1个api函数----------------
    const mapBoxresponse = await (getLocation(currentCity))
    const {center} = mapBoxresponse.data.features[0]// 解构
    const lat = center [1];
    const lng = center [0];

    // ------------------第二个api函数----------------
    const weatherResponse = await (getCurrentWeather(lat,lng))
    // 获取当天的温度 icon description 信息
    const {current:{temp}} = weatherResponse.data;
    const {icon:todayIcon, main} = weatherResponse.data.current.weather[0];
    const todayTemp = temp.toString().split(".")[0];
    const todayWeatherInfoList = [
      todayTemp,
      `https://openweathermap.org/img/wn/${todayIcon}@2x.png`,
      main,
      currentCity]

    const sixWeatherInfoList = weatherResponse.data.daily
    this.setState({
        todayInfo:todayWeatherInfoList,
        sixDayInfo:sixWeatherInfoList
    })
  }  

  // 得到输入地点的实时时间
  currentTime = async (currentCity) => {
    const mapBoxresponse = await (getLocation(currentCity))
    const {center} = mapBoxresponse.data.features[0]// 解构
    const lat = center [1];
    const lng = center [0];

    const gmtResponse = await (getGMT(lat,lng))
    const {timezone} = gmtResponse.data // 解构
    const GMT = timezone/3600
    
    // (UTC) is equal to the local time minus(-) the UTC offset.
    if(GMT===0) {
      const timeResponse = await (getGMT0Time(GMT))
      const {utc_datetime,utc_offset} = timeResponse.data // 解构
      const month = utc_datetime.toString().slice(5,7)
      const date2 = utc_datetime.toString().slice(8,10)
      let hour = Number(utc_datetime.toString().slice(11,13))
      const minute = utc_datetime.toString().slice(13,19)
      hour -= Number(utc_offset.toString().slice(0,3))
      const monthList = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      const getMonth = monthList[month/1-1]
      const timeInformation = `${getMonth}.${date2} ${hour}${minute}`
      this.setState({
        todayTime:timeInformation
      })
      return timeInformation            
    }if(GMT>0){
      const timeResponse = await (getTime(`+${GMT}`))
      const {utc_datetime,utc_offset} = timeResponse.data // 解构
      const month = utc_datetime.toString().slice(5,7)
      const date2 = utc_datetime.toString().slice(8,10)
      let hour = Number(utc_datetime.toString().slice(11,13))
      const minute = utc_datetime.toString().slice(13,19)
      hour -= Number(utc_offset.toString().slice(0,3))
      const monthList = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      const getMonth = monthList[month/1-1]
      const timeInformation = `${getMonth}.${date2} ${hour}${minute}`

      this.setState({
        todayTime:timeInformation
      })
      return timeInformation
    }
    const timeResponse = await (getTime(GMT))
    const {utc_datetime,utc_offset} = timeResponse.data // 解构
    const month = utc_datetime.toString().slice(5,7)
    const date2 = utc_datetime.toString().slice(8,10)
    let hour = Number(utc_datetime.toString().slice(11,13))
    const minute = utc_datetime.toString().slice(13,19)
    hour -= Number(utc_offset.toString().slice(0,3))
    const monthList = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const getMonth = monthList[month/1-1]
    const timeInformation = `${getMonth}.${date2} ${hour}${minute}`
    this.setState({
        todayTime:timeInformation
    })
    return timeInformation 
}


  // 提交搜索后，获取输入的地点信息，更改state
  handleOnChangeCity = (e) => {
        this.setState({
            searchInput : e.target.value
        })
  }
  
  
  render() {
    const { finalInput,todayTime,todayInfo,sixDayInfo } = this.state
    const {enter} = this.state
    
    let playVideo = ''
    if(enter) {
      playVideo = 'not-play' // 判断Home的video是否播放
    }
    return(
      <>
        <div className={enter? "homePage__Background--enter-true" : "homePage__Background--enter-false"}>
          <HomeBackground videoPlay={playVideo} />
        </div>

        <div className={enter? "homePage__webName--enter-true" : "homePage__webName--enter-false"}>
          <HomeTitle />
        </div>
        
        <div className="homePage__SearchBar">
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleOnChangeCity}
                // -false为第一次还没输入的时候的搜索框的样式， -true为点击一次提交后的样子
              className={enter ? "homepage__SeachBar--enter-true":"homepage__SeachBar--enter-false"}
              type="text"
              name="search"
              placeholder="enter your city"
            />
          </form>
        </div>
        
        <div className="weatherPage">
          <WeatherPage 
            currentCity={finalInput} 
            todayInfo={todayInfo} 
            sixDayInfo={sixDayInfo}
            todayTime={todayTime}
          />
        </div>
      </>
    )
  }
}

export default MainPage