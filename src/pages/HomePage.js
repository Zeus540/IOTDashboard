import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import BannerImg from '../assets/back352.jpg'
import Wave from '../assets/wave2.svg'
import Back from '../assets/back352.jpg'

import { DiaryContext } from "../context/diary_context";
import { NavLink } from "react-router-dom";
import PlaceHolder from "../assets/placeholder.png";

const Root = styled.div`

background:url(${BannerImg});
background-attachment: fixed;
background-position: 100% 6%;
background-size: cover;
//background-color: #5858588c;
background-blend-mode: overlay;
@media (max-width: 425px) {
  background-position: 32% 100%;
}
@media (min-width: 426px) and (max-width: 768px) {
  background-position: 32% 100%;
}
@media (min-width: 769px) and (max-width: 1770px) {
  background-position: 32% 100%;
}
`

const Inner = styled.div`



  padding-top: 0px;

  @media (max-width: 425px) {
    margin: 0px;
    padding-top: 0px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    margin: 0px;
    padding-top: 0px;
  }
  @media (min-width: 769px) and (max-width: 1770px) {
    margin: 0px;
  }

`;

const HeroBanner = styled.div`
min-height:40vh;

flex-direction: column;

display: flex;
justify-content: center;
align-items: center;
padding: 80px 20px;
@media (max-width: 425px) {
    margin: 0px 0px;
    padding: 40px 20px;
    min-height:30vh;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    margin: 0px 0px;
    padding: 40px 40px;
  }
`;
const HeroText = styled.p`
padding:10px

`;
const HeroTextBig = styled.p`

line-height: 50px;

text-align: center;
    font-size: 50px;
    font-family: baloonB!important;
`;

const HeroTextBigSpan = styled.span`


color:#8bab50;
text-align: center;
    font-size: 50px;
    font-family: baloonB!important;
`;

const HeroTextBigSup = styled.sup`


color:#8bab50;
text-align: center;
    font-size: 40px;
    font-family: baloonB!important;
`;

const Section = styled.div`
text-align: center;
  padding:20px;
  position: relative;
  //overflow: hidden;
  @media (max-width: 425px) {
    padding:0px;
    padding-bottom:40px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    padding:0px;
    padding-bottom:40px;
  }
`;
const FeatureSection = styled.div`
text-align: center;
  padding:40px 0px;
  position: relative;
  background: #354f41;

  @media (max-width: 425px) {
    padding:20px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    padding:20px;
  }
`;

const WaveImg = styled.img`
position: absolute;
bottom: 0px;
    left: 0;
    right: 0;
    @media (max-width: 425px) {
        bottom: 0px;
      }
      @media (min-width: 426px) and (max-width: 768px) {
      margin: 0px auto;
      }
`;
const WaveImgTop = styled.img`
position: absolute;
top: 0px;
    left: 0;
    right: 0;
    @media (max-width: 425px) {
      top: 0px;
      }
      @media (min-width: 426px) and (max-width: 768px) {
      margin: 0px auto;
      }
`;

const SectionInner = styled.div`
  display: flex;
  flex-wrap: wrap;

  justify-content: center;
`;
const SectionInnerTop = styled.div`
position: relative;
z-index: 1;
background: white;
border-radius: 10px;
max-width: 1770px;
margin: 40px auto;
box-shadow: 0px 0px 20px 0px #5968765e;
padding-bottom: 40px;
margin-top: -65px;
padding: 10px;
    @media (max-width: 425px) {
        margin: 0px 20px;
        
      }
      @media (min-width: 426px) and (max-width: 768px) {
        margin: 0px  40px;
      }
`;

const FeatureItem = styled.div`
display: flex;
flex-direction: column;
align-items: center;
text-align: center;
width: calc(100% / 3 );
margin:10px;

  @media (min-width: 0px) and (max-width: 768px) {
    width: calc(100% / 1 );

  }
`;

const FeatureItemSvg = styled.svg`

width: 80px;

`;
const FeatureItemHeading = styled.h3`
color: white!important;

`;
const FeatureItemText = styled.p`
color: white!important;

`;
const TestimonialItem = styled.div`
display: flex;
flex-direction: column;
align-items: center;
text-align: center;
width: calc(100% / 3 );
margin:10px
`;

const PricingItem = styled.div`
display: flex;
flex-direction: column;
align-items: center;
text-align: center;
width: calc(100% / 3 );
margin:10px;

  @media (min-width: 0px) and (max-width: 768px) {
    width: calc(100% / 1 );

  }
`;

const MenuLink = styled(NavLink)`
text-decoration: unset;
padding: 8px 25px;
width: fit-content;
border: none;
background: #fff0;
color: #8bab50 ;
border-radius: 5px;
cursor: pointer;
border: 1px #8bab50 solid;

`;

const MenuLinkHolder = styled.div`

display: flex;
justify-content: center;

    padding-top: 20px;
position: relative;
z-index: 1;
`;

const HeroBannerTextHolder = styled.div`


`;

const Diary = styled(NavLink)`
cursor: pointer;
width: calc(100% / 6 - 20px);
margin: 10px;
border-radius: 5px;

text-decoration: none;
color: #354f41;
@media (max-width: 425px) {
  min-width: calc(100% / 1 - 20px);
  width: 100%;
  margin: 10px 10px;
  border-radius: 0px;
}
@media (min-width: 426px) and (max-width: 699px) {
  min-width: calc(100% / 2 - 20px);
  margin: 10px;
}
  @media (min-width: 700px) and (max-width: 940px) {
    min-width: calc(100% / 2 - 20px);
  }
  @media (min-width: 941px) and (max-width: 1330px) {
    min-width: calc(100% / 4 - 20px);
  }
`;


const DiaryHolder = styled.div`
  display: flex;
  overflow: auto;
  padding:0px ;
  margin: 40px 0px;

  @media (max-width: 425px) {
    padding:0px ;
    overflow: auto;
    flex-direction: row;
    flex-wrap: unset;
  }
  @media (min-width: 426px) and (max-width: 699px) {
    padding:0px ;
    overflow: auto;
    flex-direction: row;
    flex-wrap: unset;
  }
`;

const DiaryImageHolder = styled.div`
  border-radius: 5px 5px 0px 0px;
  cursor: pointer;
  line-height: 0px;
  border-radius: 5px;
  min-height: 190px;
  background-position: center!important;
  background-size: cover!important;
  @media (max-width: 425px) {

    border-radius: 5px;
  }
`;
const DiaryTextHolder = styled.div`
padding: 5px 0px;
overflow: auto;
`;

const Tag = styled.sup`

text-align: left;

  padding: 0px 0px;
  font-size: 11px;
  display: block;


`;

const DiaryText = styled.p`
font-size: 14px;
padding-bottom: 5px;
white-space: nowrap;
font-weight: bold;
margin: 0px;

text-align: left;

`;

const PricingSection = styled.div`
background: white;
padding: 40px 0px;
`;

const PricingSectionHeading = styled.h2`
text-align: center;
margin: 0;
margin-bottom: 20px;
font-size: 40px;

`;
const PricingSectionHeadingW = styled.h2`
text-align: center;
margin: 0;
margin-bottom: 20px;
font-size: 40px;
color:  white!important;
`;

const Ul = styled.ul`
list-style: none;
padding: 0px;
`;

const HomePage = () => {
  const { diariesPublic, getPublic, loading } = useContext(DiaryContext);

  useEffect(() => {
    getPublic()
  }, [])
  
  return (
    <Root>
        <Inner>
        <HeroBanner>
       
            <HeroBannerTextHolder>
        <HeroTextBig>Welcome to <br/> Sweet<HeroTextBigSpan>Leaf</HeroTextBigSpan>   <HeroTextBigSup>&#174;</HeroTextBigSup>	</HeroTextBig>  

        <MenuLinkHolder>
           
        
            </MenuLinkHolder>
            </HeroBannerTextHolder>
			</HeroBanner>

		<Section class="hero">
    


			<SectionInnerTop class="hero-content">
			
                
      <HeroText>With Sweet Leaf Grow Journals, our users have a powerful tool that enables them to track their progress, analyze their results, and share their knowledge with the community.</HeroText>

      <HeroText>The platform is designed to be user-friendly, flexible, and customizable, allowing growers to tailor it to their unique needs.</HeroText>

<HeroText>Our users have documented their grow journey in a variety of ways, from photos to detailed notes and tips.<br/> You'll find diaries covering a wide range of topics, including indoor and outdoor grows, hydroponics, soil, and more.</HeroText>
      {diariesPublic.length > 0 &&
            <>
              <DiaryHolder>
                {diariesPublic?.map((d) => {
                  return (
                    <Diary
                    to={`/public-journals/overview/${d.DiaryId}`}
                    >
                      <DiaryImageHolder style={{ background: `url(${d?.ThumbNail == "" ? PlaceHolder : d?.ThumbNail})` }}>


                      </DiaryImageHolder>

                      <DiaryTextHolder>

                        <DiaryText>{d?.Title} </DiaryText>
                        <Tag> {d?.UserName}</Tag>
                        <Tag> {d?.Strain}</Tag>



                        {/* <Tag> {d?.Start_Date?.split("T")[0]}</Tag> */}

                      </DiaryTextHolder>

                    </Diary>
                  );
                })}
              </DiaryHolder>
            </>}




                
                {/* <HeroText>So come on in and explore our collection of grow diaries.<br/> We're sure you'll find something that will inspire you to take your own grow journey to the next level.</HeroText> */}



                
			</SectionInnerTop>

       
            <WaveImg src={Wave}  />

       
		</Section>

		<FeatureSection>
    <PricingSectionHeadingW>Features</PricingSectionHeadingW>
            <SectionInner >
			<FeatureItem>
		
      <FeatureItemSvg xmlns="http://www.w3.org/2000/svg"  width="100%" height="100%" viewBox="0 0 32 32"><path fill="white" d="M26 13a4.005 4.005 0 0 0 4-4V6h-3a3.979 3.979 0 0 0-2.747 1.106A6.004 6.004 0 0 0 19 4h-3v3a6.007 6.007 0 0 0 6 6h1v13H11v-5h1a4.005 4.005 0 0 0 4-4v-3h-3a3.979 3.979 0 0 0-2.747 1.106A6.004 6.004 0 0 0 5 12H2v3a6.007 6.007 0 0 0 6 6h1v5H2v2h28v-2h-5V13Zm-1-3a2.002 2.002 0 0 1 2-2h1v1a2.002 2.002 0 0 1-2 2h-1Zm-14 8a2.002 2.002 0 0 1 2-2h1v1a2.002 2.002 0 0 1-2 2h-1Zm-2 1H8a4.005 4.005 0 0 1-4-4v-1h1a4.005 4.005 0 0 1 4 4Zm14-8h-1a4.005 4.005 0 0 1-4-4V6h1a4.005 4.005 0 0 1 4 4Z"/></FeatureItemSvg>
				<FeatureItemHeading>Track your Grow</FeatureItemHeading>
				<FeatureItemText>Record and track every step of your grow, from germination to harvest, with our easy-to-use interface.</FeatureItemText>
			</FeatureItem>
		
			<FeatureItem>
      <FeatureItemSvg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="white" d="M6 21q-.425 0-.713-.288T5 20v-1H3q-.825 0-1.413-.588T1 17V6q0-.825.588-1.413T3 4h18q.825 0 1.413.588T23 6v11q0 .825-.588 1.413T21 19h-2v1q0 .425-.288.713T18 21H6Zm-3-4h18V6H3v11Zm2-2h14l-4.5-6l-3.5 4.5l-2.5-3L5 15Zm-2 2V6v11Z"/></FeatureItemSvg>
				<FeatureItemHeading>Take Progress Photos</FeatureItemHeading>
				<FeatureItemText>Take and upload photos of your plants to see their progress over time and share with the Sweet Leaf community.</FeatureItemText>
			</FeatureItem>

            <FeatureItem>
            <FeatureItemSvg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 20"><path fill="white" d="M8.75 3.75a2.75 2.75 0 1 0-5.5 0a2.75 2.75 0 0 0 5.5 0Zm-4.5 0a1.75 1.75 0 1 1 3.5 0a1.75 1.75 0 0 1-3.5 0ZM2.5 7.5h4.183c-.164.31-.286.646-.358 1H2.5A.5.5 0 0 0 2 9v.5c0 1.26 1.099 2.614 3.096 2.93c-.322.22-.59.513-.781.854C2.205 12.713 1 11.087 1 9.5V9a1.5 1.5 0 0 1 1.5-1.5Zm5.379 0c.504-.61 1.267-1 2.121-1a2.744 2.744 0 0 1 2.646 2a2.753 2.753 0 0 1-3.893 3.202A2.75 2.75 0 0 1 7.88 7.5Zm.54 1a1.75 1.75 0 1 0 3.164 1.5a1.75 1.75 0 0 0-3.165-1.5Zm7.266 4.784a2.513 2.513 0 0 0-.781-.853C16.9 12.114 18 10.759 18 9.5V9a.5.5 0 0 0-.5-.5h-3.825a3.726 3.726 0 0 0-.357-1H17.5A1.5 1.5 0 0 1 19 9v.5c0 1.587-1.206 3.212-3.315 3.784Zm-1.198.087A1.493 1.493 0 0 0 13.5 13h-7A1.496 1.496 0 0 0 5 14.5v.5c0 1.971 1.86 4 5 4c3.14 0 5-2.029 5-4v-.5c0-.45-.198-.854-.513-1.13ZM6 14.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v.5c0 1.438-1.432 3-4 3s-4-1.562-4-3v-.5ZM14 1a2.75 2.75 0 1 1 0 5.5A2.75 2.75 0 0 1 14 1Zm0 1a1.75 1.75 0 1 0 0 3.5A1.75 1.75 0 0 0 14 2Z"/></FeatureItemSvg>
                <FeatureItemHeading>Sharing with Community</FeatureItemHeading>
                <FeatureItemText>Share your grow diary with the Sweet Leaf community to get feedback, advice, and support from fellow growers.</FeatureItemText>
			</FeatureItem>
            </SectionInner >
		</FeatureSection>

		<PricingSection >
			<PricingSectionHeading>Pricing</PricingSectionHeading>
            <SectionInner >
			<PricingItem class="pricing-item">
				<h3>Free</h3>
				<p>$0/month</p>
				<Ul>
					<li>3 Grow Journals</li>
					{/* <li>Limited Support</li> */}
				</Ul>
        <MenuLink to="/sign-up">
                Get Started
            </MenuLink>
			</PricingItem>
			<PricingItem class="pricing-item">
				<h3>Premium</h3>
				<p>$9.99/month</p>
				<Ul>
					<li>Unlimited Grow Journals</li>
					{/* <li>Premium Support</li> */}
				</Ul>
        <MenuLink to="/">
                Coming Soon
            </MenuLink>
        </PricingItem>
        </SectionInner>
    </PricingSection> 

		{/* <Section>
			<h2>What Our Growers Say</h2>
            <SectionInner >
			<TestimonialItem >
				
				<p>"Sweet Leaf has been a game changer for my grow. I can easily track my progress and make adjustments as needed. Highly recommend!"</p>
				<h3>Zeus</h3>
				<h4>Grower</h4>
			</TestimonialItem>
			<TestimonialItem >
			
				<p>"The customization options are amazing. I can set up each plant with its own unique grow plan and have seen incredible results."</p>
				<h3>Bonnie</h3>
				<h4>Grower</h4>
			</TestimonialItem>
            </SectionInner>
            
		</Section> */}
	</Inner>
    </Root>
  )
}

export default HomePage