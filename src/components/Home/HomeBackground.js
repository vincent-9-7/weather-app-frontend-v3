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
        <video 
          preload="auto" 
          laysinline 
          autoPlay 
          muted 
          loop 
          id="homePage__myVideo"
        >
          <source src={playVideo} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

        {/* <video 
          className="video-react-video" 
          preload="auto" 
          muted
          loop
          playsinline 
          autoPlay
          poster="//sf3-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/video-poster_1576231362701.png" 
          src="//sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/gongquhunjian_1080.min.mp4" 
          tabIndex="-1"
        >
        </video> */}

      </div>
    </>
  )
  }

export default HomePageBackground