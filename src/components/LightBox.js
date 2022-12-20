import React from "react";
import styled from "styled-components";

const LightBoxInnerClose = styled.div`
  background: #234a4c;
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
  color: red;
  font-size: 20px;
  font-weight: bold;
  @media (max-width: 425px) {
    font-size: 16px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    font-size: 16px;
  }
`;

const LightBoxImage = styled.img`
  border-radius: 5px;
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
  border-radius: 5px 5px  0px 0px;
  background: #234a4c;
`;


const LightBox = (props) => {
  return (
    <LightBoxHolder>
      <LightBoxInner>
             <GalleryImageOverlay>
             <div>
                
                      {props.data?.Time && 
                      
                      <div>
                        <div> Time : {props.data?.Time.split(":")[0]}:{props.data?.Time.split(":")[2]} </div>
                        <div> Date : {props.data?.Date} </div>
                      </div>
                      }
                          </div>
                    <LightBoxClose
            onClick={() => {
              props.close(false);
            }}
          >
            {" "}
            X
          </LightBoxClose>
                 
                     </GalleryImageOverlay>

        <LightBoxImage src={props.image} width="100%"  />
   
      </LightBoxInner>
    </LightBoxHolder>
  );
};

export default LightBox;
