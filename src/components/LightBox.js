import React from "react";
import styled from "styled-components";

const LightBoxInnerClose = styled.div`
  background: #39595b;
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
background: #000000bf;
max-height:100vh;
min-width:100vw;
position: fixed;
z-index: 50;
    top: 0;
    bottom:0;
    display: flex;
    backdrop-filter: blur(10px);
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

const LightBox = (props) => {
  return (
    <LightBoxHolder>
      <LightBoxInner>
        <LightBoxInnerClose>
          {/* <div>{props.data?.Date?.split("T")[0]} </div> */}
          <LightBoxClose
            onClick={() => {
              props.close(false);
            }}
          >
            {" "}
            X
          </LightBoxClose>
        </LightBoxInnerClose>
        <LightBoxImage src={props.image} width="100%"  />
      </LightBoxInner>
    </LightBoxHolder>
  );
};

export default LightBox;
