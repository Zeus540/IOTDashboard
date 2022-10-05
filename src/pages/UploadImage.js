import React, { useState } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";


const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding:20px
`;

const SubmitBtn = styled.button`
margin:20px 0px;
`;

const GalleryHolder = styled.div`
  display: flex;
  flex-direction: column;
`;

const UploadImage = () => {

    const videoConstraints = {
        width: 1280,
        height: 720,
       facingMode: { exact: "environment" },
         // facingMode: "user",
      };

  const webcamRef = React.useRef(null);

  const [imgData, setImgData] = useState("");

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log("imageSrc", imageSrc);
    setImgData(imageSrc);
  }, [webcamRef]);

  return (
    <Root>
        Use Our Ai to Analyze Your Plants Healty
      <>
        <Webcam
          audio={false}
          height="100%"
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width="100%"
          videoConstraints={videoConstraints}
        />
        <SubmitBtn onClick={capture}>Capture photo</SubmitBtn>
      </>

     <GalleryHolder>
        <img src={imgData} width="100%"/>
     </GalleryHolder>
    </Root>
  );
};

export default UploadImage;
