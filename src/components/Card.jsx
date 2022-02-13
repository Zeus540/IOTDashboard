import React from 'react'
import styled from 'styled-components';

const Text = styled.p`

margin-top: 0px;

`;

const Holder = styled.div`
background: #d1e5ff;
padding: 20px;
border-radius: 5px;
margin-bottom:20px;
width:calc(100%/3 - 60px);
overflow: hidden;
position:relative;
margin-right:20px;
@media(max-width:426px){
  width:100%;
  margin-right:0px;
}
`;
const TextHolder = styled.div`
position:relative;
z-index:20px;
`;

const Ocean = styled.div`
height: ${(props) => props.theme.mh};
width:100%;
position:absolute;
bottom:0;
left:0;
background: linear-gradient(${(props) => props.theme.mc});

`;




function Card2(props) {

  return (
    <Holder>
      

      <>
        <Ocean>
      
        </Ocean>

        <TextHolder>
    
        <Text>{props?.heading}</Text>
     
            {props?.data?.pop()?.Moisture? props?.data?.pop()?.Moisture : 0}%
        </TextHolder>
      </>
 
      
      </Holder>
  )
}

export default Card2