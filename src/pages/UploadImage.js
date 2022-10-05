import React from 'react'

const UploadImage = () => {

  
let video = document.querySelector("#video");

let canvas = document.querySelector("#canvas");





const handelStart = async() =>{
    let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    console.log("stream",stream)
	video.srcObject = stream;
}

const handelPhoto = () =>{
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    let image_data_url = canvas.toDataURL('image/jpeg');

    // data url of the image
    console.log(image_data_url);
}

  return (
   <>
    <div>UploadImage</div>
    <button id="start-camera" onClick={()=>{handelStart()}}>Start Camera</button>
<video id="video" width="320" height="240" autoplay></video>
<button id="click-photo" onClick={()=>{handelPhoto()}}>Click Photo</button>
<canvas id="canvas" width="320" height="240"></canvas>
   </>
  )
}

export default UploadImage