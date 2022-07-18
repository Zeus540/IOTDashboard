import React from 'react'
import styled from "styled-components";

const LightBoxInnerClose = styled.div`
  background: #dad7cd;
  padding: 10px 15px;
  display: flex;
  border-radius: 10px 10px 0px 0px;
  justify-content: space-between;
  font-size: 18px;
  align-items: center;
  @media(max-width:425px){
    font-size: 16px;
  }
  @media(min-width:426px) and (max-width:768px){
    font-size: 16px;
  }
`;

const LightBoxClose = styled.div`
  font-size: 22px;
  font-weight: bold;
  @media(max-width:425px){
    font-size: 16px;
  }
  @media(min-width:426px) and (max-width:768px){
    font-size: 16px;
  }
`;

const LightBoxImage = styled.img`
  border-radius: 0px 0px 10px 10px;
`;

const LightBoxHolder = styled.div`
background: #000000ab;
max-height:100vh;
min-width:100vw;
position: fixed;
    top: 0;
    bottom:0;
    display: flex;
    backdrop-filter: blur(6px);
    justify-content: center;
    align-items: center;
}
`;

const LightBoxInner = styled.div`
  max-height: 100vh;
  width: 50%;
  padding-top: 20px;

      max-width: unset;
      @media(max-width:425px){
        width: unset;
        margin:20px
      }
      @media(min-width:426px) and (max-width:768px){
        width: unset;
      }
`;

const LightBox = (props) => {
  return (
    <LightBoxHolder>
    <LightBoxInner>
      <LightBoxInnerClose>
        <div>{props.data?.Start_Date}</div>
        <LightBoxClose
          onClick={() => {
            props.close(false);
          }}
        >
          {" "}
          X
        </LightBoxClose>
      </LightBoxInnerClose>
      <LightBoxImage src={props.image} width="100%" height="100%" />
    </LightBoxInner>
  </LightBoxHolder>
  )
}

export default LightBox