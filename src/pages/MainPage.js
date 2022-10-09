import React from "react";
import styled from "styled-components";
import Image from "../assets/mainback.jpg";
const Root = styled.div`
  background-color: white;
 
  width: 100%;
  height: 60vh;
`;

const SectionFlex = styled.div`
  background-color: #344e41;
  display: flex;
  width: 100%;



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
  background-color: #344e41;
  
  max-width: 50%;
  width: 100%;
  padding:60px 80px;
  @media (max-width: 425px) {
    max-width: unset;
    width: unset;
    padding:60px 20px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    max-width: unset;
    width: unset;

  }
`;
const SectionImage = styled.div`
  min-width: 50%;
  max-width: 50%;
  width: 100%;
  background-image: url(${Image});
  background-size: cover;
  height: 60vh;
  @media (max-width: 425px) {
    max-width: unset;
    height: 30vh;
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
color:white
`;
const Text = styled.p`
margin: 0px;
color:white
`;

const SectionCard = styled.div`
  background-color: #F5F5F5;
  width: 100%;
height:400px;
  display: flex;
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
  max-width: calc(100% / 5 - 20px);
  width: 100%;
  margin:20px;
  margin-top: -20px;
  border-radius: 5px;
  padding: 20px;
  @media (max-width: 425px) {
    max-width: unset;
    width: unset;
    margin-bottom: 55px;
}
  
  @media (min-width: 426px) and (max-width: 768px) {
    max-width: unset;
    width: unset;
    margin-bottom: 55px;
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
        <SectionImage></SectionImage>
      </SectionFlex>
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
    </Root>
  );
};

export default MainPage;
