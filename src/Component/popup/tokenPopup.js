import React  from 'react';
import styled from 'styled-components';
import Modal from '../modal';
// icon images
import CoinIco01 from '../../Assets/images/coinicon-uniswap.png'
import CoinIco02 from '../../Assets/images/coinicon-defiswap.png'
import CoinIco03 from '../../Assets/images/coinicon-miniswap.png'
import CoinIco04 from '../../Assets/images/coinicon-pancakeswap.png'
import CoinIco05 from '../../Assets/images/coinicon-sushiswap.png'


 

export default function  TokenPopup (props) { 
  
    const [grid, setShow] = React.useState(); 

    return (
      

        <Modal isOpen={props.isOpen} dismiss={props.dismiss}> 
            <PopupSearchbar>
              <SearchBox01>
                <PopSearchIcon><i className="fas fa-search"></i></PopSearchIcon>
                <PopInput placeholder="Search by symbol or token name" />
              </SearchBox01>
              <SearchBox02>
                <FilterBTN className={`${grid ? '' : 'active'}`} onClick={() => setShow(false)}> <i className="fas fa-square"></i> </FilterBTN>
                <FilterBTN className={`${grid ? 'active' : ''}`}  onClick={() => setShow(true)}><i className="fas fa-th-list"></i></FilterBTN>
              </SearchBox02> 
            </PopupSearchbar>

            <PopupCenterBox  className={`${grid ? 'listView' : ''}`}>

              <TokenMbox> 
                <TokenInnerBox href='#'> 
                <ImgBox> <img src={CoinIco01} alt='' /> </ImgBox>
                Uni swap
                </TokenInnerBox>  
              </TokenMbox>

              <TokenMbox> 
                <TokenInnerBox href='#'> 
                <ImgBox> <img src={CoinIco02} alt='' /> </ImgBox>
                Defi swap
                </TokenInnerBox>  
              </TokenMbox>

              <TokenMbox> 
                <TokenInnerBox href='#'> 
                <ImgBox> <img src={CoinIco03} alt='' /> </ImgBox>
                Mini swap
                </TokenInnerBox>  
              </TokenMbox>

              <TokenMbox> 
                <TokenInnerBox href='#'> 
                <ImgBox> <img src={CoinIco04} alt='' /> </ImgBox>
                Pancake swap
                </TokenInnerBox>  
              </TokenMbox>

              <TokenMbox> 
                <TokenInnerBox href='#'> 
                <ImgBox> <img src={CoinIco05} alt='' /> </ImgBox>
                Sushi swap
                </TokenInnerBox>  
              </TokenMbox>

              <TokenMbox> 
                <TokenInnerBox href='#'>  
                Add your DEX
                </TokenInnerBox>  
              </TokenMbox>
 
            </PopupCenterBox> 
        </Modal>
        
    );
}




const PopupSearchbar = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin:50px 15px 50px 0; 
`;

const SearchBox01 = styled.div`
    width: 80%;
    position: relative;
`;

const SearchBox02 = styled.div`
    width: 20%;
    text-align: right;
`;
const PopSearchIcon = styled.span` 
  position: absolute;
  top: 5px;
  left: 0px;
  color: #fff;
  font-size: 24px; 

`;

const PopInput = styled.input`
 
    font-weight: 700;
    font-size: 24px;
    color: #ffffff;
    line-height: normal;
    background-color: transparent;
    border: none;
    width: 100%;
    padding-left: 60px;

`;

const FilterBTN = styled.button`
    color: #fff;
    font-size: 14px;
    margin: 0px 8px;
    padding: 0px;
    background-color: transparent;
    border: none;
    cursor: pointer; 
    & :hover, &.active{ color:#8be05a; }  
`;

const PopupCenterBox = styled.div`

    display: flex;
    flex-wrap: wrap;

`;

const TokenMbox = styled.div` 
    width: 25%;
    text-align: center;
    display: flex; 

    ${PopupCenterBox}.listView & {
      width:100%;
      text-align: left;
    }
`;
const TokenInnerBox = styled.a`
    background-color: #2c2f36;
    border-radius: 10px;
    transition: 0.5s ease all;
    box-shadow: 0px 0px 15px 5px rgb(0 0 0 / 5%);
    margin: 0px 18px 30px 18px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 35px; color: #fff;
    font-size: 18px;
    flex-direction:column;

    ${PopupCenterBox}.listView & {

    padding: 20px 25px;
    justify-content: flex-start; flex-direction:row;
    border-radius: 0px;
    margin-bottom: 0px;
    box-shadow: none;
    border-bottom: 1px solid #393d46;
    :hover{  background-color: #1a1c21; } 
    }
    
    :hover{ box-shadow: 0px 0px 15px 5px rgb(254 187 0 / 40%);  } 
 
`;

const ImgBox = styled.div`
  max-width: 110px; max-height:110px; text-align: center; margin-bottom: 30px; 
  ${PopupCenterBox}.listView & {
    max-width:30px; max-height:none;  margin-bottom: 0; margin-right: 20px;
  } 
  img { max-width:100%; height:auto;} 
`;




 