import React from "react";
import styled from "styled-components";
import BannerImg from "../assets/back3d.jpg";
import Prod from "../assets/cheeseAuto.jpg";
import Banana from "../assets/Banana-OG.jpg";
import Mango from "../assets/strain-3.png";
import TCookies from "../assets/strain-37.png";
import SBanana from "../assets/strain-19.png";
import Brownies from "../assets/brownies.jpg";

import Wraps from "../assets/honey-puff-wild-cherry.jpg";
import { useNavigate } from "react-router-dom";


const Root = styled.div`
  
 
  width: 100%;
 

  margin:0px auto;
  @media (max-width: 425px) {
    margin:0px auto;
}
  }
  @media (min-width: 426px) and (max-width: 768px) {
    margin:0px auto;

  }
`;



const ImgMain = styled.img`
width: 70%;
margin:0 auto;
display:block;

`;

const SectionFlex = styled.div`
  background-color: #ededed;

  width: 100%;

  border-radius: 10px;
 
 
  padding-bottom: 5px;
`;

const BannerImageSection = styled.div`

  width: 100%;
  
  color: white;
  font-size: 80px;
  font-weight: 600;
  text-align: center;
  background-color: #00000080;
  background-blend-mode: overlay;
  background-position: 100% 50%;
  filter: drop-shadow(0px 0px 6px #00000080);
  background-image: url(${BannerImg});
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  border-radius:  0px 0px 10px 10px;
  padding: 180px 0px;
  @media (max-width: 425px) {
    max-width: unset;
    font-size: 60px;
    width: unset;
    background-size: 100% cover;
    border-radius: 0px 0px 10px  10px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    max-width: unset;
    background-size: 100% cover;
  }
`;


const  ProductCardSection = styled.div`
display:flex;
flex-wrap: wrap;
justify-content: center;

`

const ProductCard = styled.div`
  background-color: white;
  max-width:calc(100% / 5 - 80px);
  width: 100%;
  margin:20px;
  cursor: pointer;
  border-radius: 5px 5px 0px 0px;
  height: fit-content;
  transition: all 0.25s ease-in;
  &:hover {
    transform: scale(1.02);
  
  }
  @media (min-width: 0px) and (max-width: 546px) {
    min-width: calc(100% / 1 - 40px);
    width: unset;
    max-width:unset;
    margin: 20px;
  }

  @media (min-width: 547px) and (max-width: 800px) {
    min-width: calc(100% / 2 - 40px);
    width: unset;
    max-width:unset;
    margin: 20px;
  }
  @media (min-width: 801px) and (max-width: 1200px) {
    min-width: calc(100% / 3 - 40px);
    width: unset;
    max-width:unset;
    margin: 20px;
  }
`;

const ProductCardImage = styled.div`
transition: all 0.1s ease-in;
height: 350px;
background-position: center;
background-size: cover;
border-radius: 5px 5px 0px 0px;


`;




const ProductCardTextHolder = styled.div`
padding: 20px;
background: #345153;
border-radius: 0px 0px 5px 5px;
color: white;
`;
const ProductCardTitle = styled.div`
color: #8bab50;
font-size: 20px;
`;
const ProductCardSlug = styled.sup`
background: #8bab50;
width: fit-content;
color: #ffffff;
font-size: 12px;
border-radius: 10px;
padding: 0px 10px;

`;
const ProductCardSub = styled.span`

font-size: 15px;
`;
const ProductCardPrice = styled.div`
font-size: 20px;

`;

const ProductCardSaleBadge = styled.div`
background: #8bab50;
border-radius: 50%;
width: 20px;
    padding: 15px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    float: right;
    margin: 10px;
    font-weight: bold;
`;

const CategoryText = styled.div`
color: #345153;
font-weight: bold;
font-size: 40px;
text-align: center;
padding: 40px 0px;
`;
const DetailedProduct = () => {

  const Navigate = useNavigate()

  let productList = [
    {
      id:1,
      sku:"TEST_SKU",
      slug:'Feminized',
      title:'Cheese',
      price:'R 70.00 - R 65.00',
      img:Prod,
      discount:'-30'
    },
    {
      id:5,
      sku:"TEST_SK2U",
      slug:'Feminized',
      title:'Strawberry Banana',
      price:'R 70.00 - R 65.00',
      img:SBanana,
      discount:'-30'
    },
    {
      id:2,
      sku:"TEST_SK2U",
      slug:'Feminized',
      title:'Banana OG',
      price:'R 70.00 - R 65.00',
      img:Banana,
      discount:'-30'
    },
    {
      id:3,
      sku:"TEST_SK2U",
      slug:'Feminized',
      title:'Brooklyn Mango',
      price:'R 70.00 - R 65.00',
      img:Mango,
      discount:'-30'
    },
    {
      id:4,
      sku:"TEST_SK2U",
      slug:'Feminized',
      title:'Tropical Cookies',
      price:'R 70.00 - R 65.00',
      img:TCookies,
      discount:'-30'
    },
  
  ]

  let AccesoriesList = [
    {
      id:6,
      sku:"TEST_SK24U",
      slug:'Rolling Paper',
      title:'Honey Puff Flavoured Rolling Paper',
      price:'R 15.00 - R 10.00 ',
      img:Wraps,
      discount:''
    },

  ]
 

  let EdiblesList = [
    {
      id:7,
      sku:"TEST_SK24U",
      slug:'Edibles',
      title:'Brownies',
      price:'R 50.00',
      img:Brownies,
      discount:''
    },

  ]
  const ViewProduct = (product)=>{
console.log(product?.title)
Navigate(`/product/${product?.title.replaceAll(" ", "-").toLowerCase()}/${product.id}`)
  }

  return (
    <Root>
      <SectionFlex>
      <BannerImageSection>
         SHOP NOW
        </BannerImageSection>

        <CategoryText>Feminized Seeds</CategoryText>

        <ProductCardSection>
      
      {productList.map((product,index)=>{
        return(
          <ProductCard onClick={()=>{ViewProduct(product)}} key={index}>
          <ProductCardImage style={{backgroundImage: `url(${product?.img}`}}>
            {product.discount &&  <ProductCardSaleBadge>{product.discount}%</ProductCardSaleBadge>}
          </ProductCardImage>
          <ProductCardTextHolder>
           <ProductCardSlug>
           {product?.slug}
           </ProductCardSlug>
          <ProductCardTitle>
          {product?.title}
          </ProductCardTitle>
          <ProductCardPrice>
          {product?.price} <ProductCardSub> Incl Vat</ProductCardSub>
          </ProductCardPrice>
          </ProductCardTextHolder>
          </ProductCard>
        )
      })}
    

   
       </ProductCardSection>

     <CategoryText>Accessories</CategoryText>

     {AccesoriesList.map((product,index)=>{
        return(
          <ProductCard onClick={()=>{ViewProduct(product)}} key={index}>
          <ProductCardImage style={{backgroundImage: `url(${product?.img}`}}>
            {product.discount &&  <ProductCardSaleBadge>{product.discount}%</ProductCardSaleBadge>}
          </ProductCardImage>
          <ProductCardTextHolder>
           <ProductCardSlug>
           {product?.slug}
           </ProductCardSlug>
          <ProductCardTitle>
          {product?.title}
          </ProductCardTitle>
          <ProductCardPrice>
          {product?.price} <ProductCardSub> Incl Vat</ProductCardSub>
          </ProductCardPrice>
          </ProductCardTextHolder>
          </ProductCard>
        )
      })}
       
       <CategoryText>Edibles</CategoryText>
       {EdiblesList.map((product,index)=>{
        return(
          <ProductCard onClick={()=>{ViewProduct(product)}} key={index}>
          <ProductCardImage style={{backgroundImage: `url(${product?.img}`}}>
            {product.discount &&  <ProductCardSaleBadge>{product.discount}%</ProductCardSaleBadge>}
          </ProductCardImage>
          <ProductCardTextHolder>
           <ProductCardSlug>
           {product?.slug}
           </ProductCardSlug>
          <ProductCardTitle>
          {product?.title}
          </ProductCardTitle>
          <ProductCardPrice>
          {product?.price} <ProductCardSub> Incl Vat</ProductCardSub>
          </ProductCardPrice>
          </ProductCardTextHolder>
          </ProductCard>
        )
      })}
       
      </SectionFlex>
     
    </Root>
  );
};

export default DetailedProduct;
