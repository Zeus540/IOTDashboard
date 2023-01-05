import React from "react";
import styled from "styled-components";

const LightBoxInnerClose = styled.div`
  background: #596876;
  color: white;
  padding: 10px 15px;
  display: flex;
  border-radius: 0px 5px 0px 5px;
  justify-content: space-between;
  font-size: 18px;
  justify-content: end;
  align-items: center;
  position: absolute;
  right:0px;
  @media (max-width: 425px) {
    font-size: 16px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    font-size: 16px;
  }
`;

const LightBoxClose = styled.div`
  color: #f44336;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  @media (max-width: 425px) {
    font-size: 14px;
    
  }
  @media (min-width: 426px) and (max-width: 768px) {
    font-size: 14px;
  }
`;

const LightBoxImage = styled.img`
  border-radius: 5px;
`;
const LightBoxImageHolder = styled.div`
  border-radius: 5px;
  border-radius: 5px;
  max-height: 50vh;
  overflow: auto;
  line-height: 0px;
`;

const LightBoxHolder = styled.div`
background: #121b1cc4;
max-height:100vh;
min-width:100vw;
position: fixed;
z-index: 50;
    top: 0;
    bottom:0;
    display: flex;
    backdrop-filter: blur(5px);
    justify-content: center;
    align-items: center;

   
}
`;

const LightBoxInner = styled.div`
padding:40px 0px;
  width: 40%;
  position: relative;

  max-width: unset;
  @media (max-width: 425px) {
    width: unset;
    margin: 10px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    width: unset;
  }
`;

const GalleryImageOverlay = styled.div`
  
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  top: 0;
  z-index: 40;
  color: white;
  padding: 10px;
  font-size: 14px;
  border-radius: 5px 5px  0px 0px;
  justify-content: end;
`;
const Svg = styled.svg`
width: 14px;
fill: #f44336;
`;

const SvgW = styled.svg`
width: 14px;
fill: white;
`;

const LightBox = (props) => {
  return (
    <LightBoxHolder>
      <LightBoxInner>
             <GalleryImageOverlay>
          
                    <LightBoxClose
            onClick={() => {
              props.close(false);
            }}
          >
          <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></Svg>
          </LightBoxClose>
                 
                     </GalleryImageOverlay>

        <LightBoxImageHolder>
        <LightBoxImage src={props.image} width="100%"  />
        </LightBoxImageHolder>
   
      </LightBoxInner>
    </LightBoxHolder>
  );
};

export default LightBox;
