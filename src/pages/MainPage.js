import React from "react";
import styled from "styled-components";
import Image from "../assets/Planter.png";
import Imageio from "../assets/PlanterIo.png";

const Root = styled.div`
  
 
  width: 100%;
  max-width:1770px;

  margin:50px auto;
  @media (max-width: 425px) {
    margin:0px auto;
}
  }
  @media (min-width: 426px) and (max-width: 768px) {
    margin:0px auto;

  }
`;


const ImgHolder = styled.div`
  background-color: #acacac;
  border-radius: 10px;

`;
const ImgMain = styled.img`
width: 70%;
margin:0 auto;
display:block;
@media (max-width: 425px) {
  width: 100%;
}
}
@media (min-width: 426px) and (max-width: 768px) {
  width: 100%;

}
`;

const SectionFlex = styled.div`
  background-color: #354f41;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  border-radius: 10px;
  flex-direction: column;
  @media (max-width: 425px) {
    flex-direction: column;
    flex-wrap: wrap;
}
  }
  @media (min-width: 426px) and (max-width: 768px) {
    flex-direction: column;
    flex-wrap: wrap;

  }
`;
const SectionText = styled.div`
  background-color: #354f41;
  border-radius: 10px;
  margin: 40px auto;
  max-width: 70%;

  width: 100%;

  @media (max-width: 425px) {
    max-width: unset;
    width: unset;
    border-radius: 0px;
    margin: 0px auto;
    padding:40px 20px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    max-width: unset;
    width: unset;
    border-radius: 0px;
    margin: 0px auto;
  }
`;
const SectionImage = styled.div`
  min-width: 50%;
  max-width: 50%;
  width: 100%;
  background: #354f41;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  border-radius: 10px;
  @media (max-width: 425px) {
    max-width: unset;

    width: unset;
    background-size: 100% cover;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    max-width: unset;
    background-size: 100% cover;
  }
`;
const Heading = styled.h1`
color:#A7C957;
margin: 0px;

`;
const CardHeading = styled.h1`

margin: 0px;
`;

const HeadingSub = styled.h1`
margin: 0px;
color:white;

`;
const Text = styled.p`
margin: 0px;
color:white;

`;

const SectionCard = styled.div`

  width: 100%;

  flex-wrap: wrap;

  display: flex;
  padding-top: 40px;
  justify-content: center;
  @media (max-width: 425px) {
    flex-direction: column;
    flex-wrap: wrap;
    height:unset;
}
  
  @media (min-width: 426px) and (max-width: 768px) {
    flex-direction: column;
    flex-wrap: wrap;
    height:unset;
  }
`;

const Card = styled.div`
  background-color: white;
  max-width:calc(100% / 3 - 80px);
  width: 100%;
  margin:20px;

  border-radius: 5px;
  padding: 20px;

  height: fit-content;
  @media (max-width: 425px) {
    max-width: unset;
    width: unset;
    margin-bottom: 45px;
}
  
  @media (min-width: 426px) and (max-width: 768px) {
    max-width: unset;
    width: unset;
    margin-bottom: 45px;
  }
`;
const MainPage = () => {
  return (
    <Root>
      <SectionFlex>
        <SectionText>
          <Heading>Real Time</Heading>
          <HeadingSub>Garden Monitoring</HeadingSub>

          <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae elementum libero. Donec congue, ipsum nec tempus semper, orci tortor porttitor urna, at scelerisque odio dui dictum tortor. Nunc tristique luctus mauris vel imperdiet. 
          </Text>

        </SectionText>
        <SectionImage>
          <img src={Image} width="100%"/>
        </SectionImage>
        <SectionCard>
      <Card>
        <CardHeading>
        24 / 7 Monitoring
        </CardHeading>
        <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae elementum libero. Donec congue, ipsum nec tempus semper, orci tortor porttitor urna, at scelerisque odio dui dictum tortor. Nunc tristique luctus mauris vel imperdiet. 
        </div>
      </Card>
      <Card>
        <CardHeading>
        Hourly Updates
        </CardHeading>
        <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae elementum libero. Donec congue, ipsum nec tempus semper, orci tortor porttitor urna, at scelerisque odio dui dictum tortor. Nunc tristique luctus mauris vel imperdiet. 
        </div>
      </Card>
      <Card>
        <CardHeading>
        Enviroment Tracker
        </CardHeading>
        <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae elementum libero. Donec congue, ipsum nec tempus semper, orci tortor porttitor urna, at scelerisque odio dui dictum tortor. Nunc tristique luctus mauris vel imperdiet. 
        </div>
      </Card>
      </SectionCard>
<ImgHolder>
        <ImgMain src={Imageio} width="100%"/>
        </ImgHolder>
      </SectionFlex>
     
    </Root>
  );
};

export default MainPage;
