import React, { Component } from 'react';
import styled from 'styled-components';
import exclaim from '../../Assets/images/exclamation.png';
import Modal from '../modal';
import Gs from '../../Theme/globalStyles';
import ReactTooltip from 'react-tooltip';
import { Scrollbars } from 'react-custom-scrollbars';
import Media from '../../Theme/media-breackpoint';

import TokenIco01 from '../../Assets/images/selectTkn-01.png'
import TokenIco02 from '../../Assets/images/selectTkn-02.png'
import TokenIco03 from '../../Assets/images/selectTkn-03.png'
import TokenIco04 from '../../Assets/images/selectTkn-04.png'
import TokenIco05 from '../../Assets/images/selectTkn-05.png'
import TokenIco06 from '../../Assets/images/selectTkn-06.png'
import TokenIco07 from '../../Assets/images/selectTkn-07.png'
import Xbtn from '../../Assets/images/closeBTN.png'
import dexIcon from '../../Assets/images/dexIcon-017.png'


import { coinTOken_array } from "../../Assets/token/conToken";


export default function LoaderPopup(props) {

  // const [grid, setShow] = React.useState(); 

  return (


    <Modal isOpen={props.isOpen} dismiss={props.dismiss}>


      <PPMainBx>

        <PPsBx01>
          <PPstitle01>
            Please wait transaction is processing...
            {/* <PPClosBTN01 onClick={props.dismiss} /> */}
          </PPstitle01>
          <PPstitle02>
            <span></span>
          </PPstitle02>
          
          <ImgBx className="rotate"> <img src={dexIcon} alt='' /> </ImgBx>

        </PPsBx01>


      </PPMainBx>

      <ReactTooltip effect="solid" className="myTip" />
    </Modal>

  );
}

export const SecondAlert = ({ text = '', onClose = () => {} }) => <>
  <Modal dismiss={onClose} isOpen={text}>
  <CloseButton onClick={onClose} />
    <Holder>
        <Container>
            <Line>
                <Ex src={exclaim} alt='' />
            </Line>
            <Box>
                <span style={{color: 'black', fontWeight: '600'}}>{text}</span>
            </Box>
        </Container>
    </Holder>  
  </Modal>    
</>;

const FlexDiv = styled.div`
display: flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

// const PPMainBx = styled.div`
//  width:100%; max-width: 431px; margin:0 auto; background-color:#2c2f36; border:2px solid #000; display:block; border-radius: 10px;
// `;
const PPMainBx = styled.div`
 width:100%; max-width: 431px; margin:0 auto; background-color:transparent; display:block;
 ${Media.xs}{
  margin:0px 15px; max-width:100%; width:auto;
  }
`;

const PPClosBTN01 = styled.button`
 width:20px; height:20px; border:0px; outline:none;  color:#fff; background:url(${Xbtn}) left top no-repeat; position:absolute; right:0px;
 transition: 0.5s ease all;
 :hover{ opacity:0.7; transform: rotate(180deg );} 
`;

// const PPsBx01 = styled(FlexDiv)`
//     width:100%; padding:30px 30px 10px 30px; border-bottom:#3c3f46 1px solid;
// `;
const PPsBx01 = styled(FlexDiv)`
    width:100%; padding:30px 30px 10px 30px;
`;

const PPsBx02 = styled(FlexDiv)`
    width:100%; padding:20px 30px 20px 30px; border-top:#3c3f46 1px solid;

     & button { border:0px; outline:none; background-color:transparent; color:#fff;
    
    :hover{ opacity:0.7;} }
`;

const PPselectTokenBTN = styled(FlexDiv)`
  justify-content: flex-start; width:100%; padding:8px 0;

  button{  display:inline-flex; color:#fff; border-radius:10px; border:1px solid #545861; align-items:center; justify-content:flex-start; padding:4px 10px 4px 6px; margin:0 8px 8px 0;
    
  :hover{ background-color:#545861;}
  
  &.active { background-color:#1f2127; border-color:#1f2127;}
  
  
  }

`;

const PPstitle01 = styled(FlexDiv)`
     align-items: flex-start; justify-content:center; width:100%; font-size:14px; font-weight:700; padding:8px 0 12px 0; position:relative;
`;

const PPstitle02 = styled(PPstitle01)`
     align-items: flex-start; justify-content:space-between; padding:10px 0; width:100%; color:#fff; font-size:12px; font-weight:400;
     &.overFlowHidden{ overflow: hidden;}

    & button { border:0px; outline:none; background-color:transparent; color:#fff;
    
    :hover{ opacity:0.7;} }


`;

const PopInput01 = styled.input` 
    font-weight:400;
    font-size:14px;
    color: #ffffff;
    line-height: normal;
    background-color: transparent;
    border:2px solid #545861;
    width: 100%; padding:11px 8px; border-radius:10px; margin:10px 0; 
`;

const PPListtoken = styled.button` 
     width:100%; display:flex; align-items: center; justify-content:flex-start; font-size: 16px; color: #fff; padding: 15px 30px;

        & i{margin-left:auto;}

     :hover{background-color:#24272C;}
`;

const ImgBx = styled(FlexDiv)`
  width:23px; height:23px; text-align: center; margin-right:12px;    border-radius:15px; overflow:hidden;

  img { max-width:100%; height:auto;} 
&.rotate {
  animation: rotation 2s infinite linear;
}
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }

`;

const Holder = styled.section`
    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
    width: 40vw; height: 20vh; background: #ffffff; border-radius: 25px; z-index: 12;
`;

const Container = styled.div`
    height: fit-content, width: fit-content
`;

const Line = styled.div`
    width: 100%; height: 6vh; background: #8be05a; border-radius: 25px 25px 0 0;
    display: flex; align-items: center; justify-content: center;
`;

const Ex = styled.img`
    height: 75%
`;

const Box = styled.div`
    dispay: flex; padding: 10px; align-items: center; justify-content: center;
    width: 100%; text-align: center; height: fit-content;
`;

const Fox = styled.img`
    height: 30px; width: 30px; transform: translate(0, 30%);
`;

const Link = styled.a`
    position: absolute; bottom: 30px; left: 50%; transform: translate(-50%, 0);
    background: white; color: black; font-weight: 700; padding: 7.5px 15px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; border-radius: 20px;
`;

const CloseButton = styled.button`
    width: 20px; height: 20px; color: #fff; background: url(${Xbtn}) left top no-repeat; 
    position: fixed; right: 50px; top: 50px; transition: 0.5s ease all; cursor: pointer;
    :hover{ opacity:0.7; transform: rotate(180deg );} 
`;