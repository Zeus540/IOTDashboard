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
`;
const SectionText = styled.div`
  background-color: #344e41;
  
  max-width: 50%;
  width: 100%;
  padding:60px 80px;
`;
const SectionImage = styled.div`
  min-width: 50%;
  max-width: 50%;
  width: 100%;
  background-image: url(${Image});
  background-size: 100%;
  height: 60vh;
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
  height: 60vh;
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  background-color: white;
  max-width: calc(100% / 5 - 20px);
  width: 100%;
  margin:10px;
  margin-top: -20px;
  border-radius: 5px;
  padding: 20px;
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
        Pest Control
        </CardHeading>
        <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae elementum libero. Donec congue, ipsum nec tempus semper, orci tortor porttitor urna, at scelerisque odio dui dictum tortor. Nunc tristique luctus mauris vel imperdiet. 
        </div>
      </Card>
      <Card>
        <CardHeading>
        Nutrient Tracker
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
