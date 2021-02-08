import React from 'react';
import './Scss/HomeBackground/HomeBackground.css'

import video from "../../video/2.mp4"
// import video from "../../video/3.mp4"
// import video from "../../video/4.mp4"


const HomePageBackground = ({videoPlay}) => {
  let playVideo
  if(videoPlay) {
    playVideo = "" // 如果离开主页，把视频关闭省内存
  }else{
    playVideo = video
  }
  return(
    <>
      <div className="homePage__background--image" />
      
      <div className="homePage__player-wrapper">
        <video autoPlay muted loop id="homePage__myVideo">
          <source src={playVideo} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </div>
    </>
  )
  }

export default HomePageBackground