import React,{useState} from 'react'
import Webcam from "react-webcam";
const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: { exact: "environment" }
  };
  
  const UploadImage = () => {
    const webcamRef = React.useRef(null);

    const [imgData, setImgData] = useState("")

    const capture = React.useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log("imageSrc",imageSrc)
        setImgData(imageSrc)
      },
      [webcamRef]
    );

    return (
      <>
   
        <Webcam
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width="100%"
          videoConstraints={videoConstraints}
        />
        <button onClick={capture}>Capture photo</button>
        <img src={imgData}  />
      </>
    );
  };

export default UploadImage