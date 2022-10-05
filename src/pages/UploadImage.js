import React, { useState } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";


const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin:20px
  
`;

const Inner = styled.div`
  box-shadow: 2px 16px 20px 4px #a9a9a966;
  max-width: 1770px;
  border-radius: 5px;

  background: #d6d0bb;
  padding: 20px 20px;
  @media (max-width: 425px) {
    margin: 0px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    margin: 0px;
  }
`;
const SubmitBtn = styled.button`
margin:20px 0px;
`;

const GalleryHolder = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainHeading = styled.div`
 
 margin: 20px 0px;
 font-size: 18px;
 margin-top:0px;
`   ;
const UploadImage = () => {

    const videoConstraints = {
        width: 1920,
        height: 1080,
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
        <Inner>
            <MainHeading>
        Use Our Ai to Analyze Your Plants Healty
        </MainHeading>
      <>
        <Webcam
          audio={false}
       
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
     </Inner>
    </Root>
  );
};

export default UploadImage;
