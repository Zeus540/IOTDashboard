import React, { useContext, useState } from "react";
import styled from "styled-components";
import { DiaryContext } from "../context/diary_context";
import PlaceHolder from "../assets/placeholder.png";
import { useNavigate } from "react-router-dom";

const Root = styled.div`
  margin-top: 50px;
  padding-bottom: 50px;
  display: flex;
  justify-content: center;
`;

const Inner = styled.div`
  max-width: 1770px;
  border-radius: 5px;
  width: 100%;
  background: #d6d0bb;
  padding: 20px;
  @media (max-width: 425px) {
    margin: 16px;
    padding: 20px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    margin: 16px;
    padding: 20px;
  }
`;

const MainHeading = styled.div`
  margin: 0px 0px;
  font-size: 40px;
  margin-top: 0px;
`;

const DiaryHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Diary = styled.div`
  cursor: pointer;
  background: #f2f2f2;
  width: calc(100% / 4 - 20px);
  margin: 10px;
  border-radius: 5px;
  @media (max-width: 619px) {
    width: calc(100% / 1);
    margin: 10px 0px;
  }
  @media (min-width: 620px) and (max-width: 699px) {
    width: calc(100% / 2 - 20px);
    margin: 10px;
  }
  @media (min-width: 700px) and (max-width: 940px) {
    width: calc(100% / 2 - 20px);
  }
`;

const DiaryImageHolder = styled.div`
  border-radius: 5px 5px 0px 0px;
`;

const DiaryImage = styled.img`
  border-radius: 5px 5px 0px 0px;
`;
const DiaryTextHolder = styled.div`
  padding: 15px 15px;
`;

const Tag = styled.sup`
  margin-right: 10px;
  padding: 3px 10px;
  font-size: 10px;
  display: block;
  border-radius: 50px;
  color: white;
  background: #344e41;
`;

const TagHolder = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Add = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #344e41;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
`;

const PopUpHolder = styled.div`
  background: #000000ad;

  position: fixed;
  bottom: 0px;
  right: 0px;
  height: calc(100% - 74px);
  left: 0px;
  transform: translateY(${(props) => props.popUpOffset}%);
  transition:all 0.5s ease
`;
const PopUpHolderInner = styled.div`
display: flex;
height: 100%;
justify-content: center;
align-items: center;


`;
const PopUpHolderInnerForm = styled.div`
 
  padding: 10px 20px;
  background:white;
`;
const ClosePopUpHolder = styled.div`
  text-align: center;
  padding: 10px;
  font-size: 30px;
  color: #b62a2a;
  cursor: pointer;
`;
const ClosePopUpHolderText = styled.p`
text-align: center;
padding: 5px;
font-size: 30px;
margin: 0 auto;
color: #b62a2a;
width: fit-content;
background: white;
width: 40px;
`;

const Diaries = () => {
  const { diaries } = useContext(DiaryContext);
  const [diaryList, setDiaryList] = useState(diaries);
  const [popUpOffset, setPopUpOffset] = useState(100);
  const navigate = useNavigate();

  const handleClick = (d) => {
    navigate(`/overview/${d.DiaryId}`);
  };

  const handleAddPopUp = (d) => {
    if (popUpOffset == 100) {
      setPopUpOffset(0);
    } else {
      setPopUpOffset(100);
    }
  };

  return (
    <Root>

      <PopUpHolder popUpOffset={popUpOffset}>
        <ClosePopUpHolder  onClick={() => {
              handleAddPopUp();
            }}>
          <ClosePopUpHolderText> X</ClosePopUpHolderText>
        </ClosePopUpHolder>
        <PopUpHolderInner>

          <PopUpHolderInnerForm>
<div>Lets Get Setup</div>
<div>
<input type="text"></input>
</div>
          </PopUpHolderInnerForm>
        </PopUpHolderInner>
      </PopUpHolder>


      <Inner>
        <Add>
          <MainHeading>Diaries</MainHeading>
          <Button
            onClick={() => {
              handleAddPopUp();
            }}
          >
            Add New Diary
          </Button>
        </Add>

        <DiaryHolder>
          {diaries?.map((d) => {
            return (
              <Diary
                onClick={() => {
                  handleClick(d);
                }}
              >
                <DiaryImageHolder>
                  {" "}
                  <DiaryImage
                    src={d?.ThumbNail == "" ? PlaceHolder : d?.ThumbNail}
                    width="100%"
                  />
                </DiaryImageHolder>

                <DiaryTextHolder>
                  <TagHolder>
                    <Tag> {d?.Strain}</Tag>
                    <Tag> {d?.Room_Type}</Tag>{" "}
                    <Tag> {d?.Start_Date?.split("T")[0]}</Tag>
                  </TagHolder>
                  <div>{d?.Title}</div>
                </DiaryTextHolder>
              </Diary>
            );
          })}
        </DiaryHolder>
      </Inner>
    </Root>
  );
};

export default Diaries;
