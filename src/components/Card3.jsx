import React from 'react'
import styled from 'styled-components';

const Text = styled.p`

margin-top: 0px;

`;

const Holder = styled.div`
background: #5c5c5c;
padding: 20px;
border-radius: 5px;
width:calc(100%/3 - 55px);
overflow: hidden;
position:relative;
margin:0px 0px;
margin-bottom:20px;
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
height: 100%;
width:100%;
position:absolute;
bottom:0;
left:0;
background: linear-gradient(${(props) => props.theme.tc});
`;

const Wave = styled.div`
background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/85486/wave.svg) repeat-x; 
position: absolute;
top: -198px;
width: 6400px;
animation: wave 7s cubic-bezier( 0.36, 0.45, 0.63, 0.53) infinite;
transform: translate3d(0, 0, 0);
`;

function Card3(props) {

  return (
    <Holder>
     

      <>
        <Ocean>
          <Wave></Wave>
          <Wave></Wave>
        </Ocean>

        <TextHolder>
    
        <Text>{props?.heading}</Text>
        {props.data?.map((d,index)=>{
            if (index + 1 === props.data.length) {
              return(
                <>
           

                {d?.Temp}&#8451;

                </>
              )
            } 

        })}
   
       

       </TextHolder>
      </>
      
      </Holder>
  )
}

export default Card3