import React, { Component, useEffect, useState } from 'react';
import styled from 'styled-components';
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


import { coinTOken_array, chain_array } from "../../Assets/token/conToken";

import Web3 from 'web3';
import ERC20 from './../../Assets/Abi/ERC20.json'

import { getDefaultChain, isValidNumber } from '../../helper';
//import BigNumber from 'bignumber.js'

class CustomScrollbars extends Component {
  render() {
    return (
      <Scrollbars
        renderTrackVertical={props => <div {...props} className="track-vertical" />}
        renderThumbVertical={props => <div {...props} className="thumb-vertical" />}
        renderView={props => <div {...props} className="view" />}
        style={this.props.style}>
        {this.props.children}
      </Scrollbars>
    );
  }
}



export default function SelectChainPopup(props) {
  const [tokenList, setSearch] = useState(chain_array);
  useEffect(async () => {
    const chain = await getDefaultChain();
    //console.log(this.state.tokenamountIn,this.state.tokenamountOut,this.state.tokentoAddress,this.state.tokenfromAddress);
    // if (chain === 'bsc') {

    //   coinTOken_array.forEach(async function (item) {
    //     let balance = 0;
    //     balance = await getTokenBalance(item.value, item);
    //   })
    // }   
  }, []);
  const inputChangeHandler = (value) => {
    let filteredData = coinTOken_array.filter(function (token) {
      return token.name.toLowerCase().indexOf(value) != -1; // returns true or false
    });
    setSearch(filteredData);
  }
  const selectToken = (value) => {
    props.tokenValue1(value)
  }

  const getTokenBalance = async (tokenaddresss, item) => {
    if (window?.ethereum) {
      const accounts = await window?.ethereum.request({ method: 'eth_requestAccounts' });
      ///console.log(accounts);
      let userwalletaddresss = accounts[0];
      window.web3 = new Web3(window?.ethereum);
      let balance = new window.web3.eth.Contract(ERC20, tokenaddresss);
      //const balances = await web3.eth.getBalance(this.state.account)
      if (tokenaddresss != '0x0000000000000000000000000000000000000000') {
        balance.methods.balanceOf(userwalletaddresss).call({ from: userwalletaddresss })
          .then((balan) => {
            //balan = (balan / window.web3.utils.toWei('1')).toFixed(5);
            balan = parseFloat(window.web3.utils.fromWei(balan)).toFixed(5);
            item.balance = balan;
            coinTOken_array.sort(function (x, y) {
              return y.balance - x.balance;
            });
          })
          .catch()
      }
      else {
        let balan = await window.web3.eth.getBalance(userwalletaddresss)
        //balan = (balan / window.web3.utils.toWei('1')).toFixed(5);
        balan = parseFloat(window.web3.utils.fromWei(balan)).toFixed(5);
        item.balance = balan;
        coinTOken_array.sort(function (x, y) {
          return y.balance - x.balance;
        });
        //tokenList.push(item);
        //console.log('tokenlist', tokenList)
        //return balan;
      }
    }
  }

  // const [grid, setShow] = React.useState(); 

  return (


    <Modal isOpen={props.isOpen} dismiss={props.dismiss}>


      <PPMainBx>

        <PPsBx01>
          <PPstitle01>
            Select chain <i className="fas helpIco fa-question-circle" data-tip='Content Coming Soon'></i>
            <PPClosBTN01 onClick={props.dismiss} />
          </PPstitle01>
          <PopInput01 onInput={(e) => inputChangeHandler(e.target.value)} placeholder="Search by symbol or chain name" />
          <PPstitle02>
            <span>Common bases<i className="fas helpIco fa-question-circle" data-tip='Content Coming Soon'></i></span>
          </PPstitle02>
          <PPselectTokenBTN>

            {/* <button className="active" onClick={() => props.selectToken('BNB')}> <ImgBx> <img src={TokenIco01} alt='' /> </ImgBx> BNB</button>
            <button onClick={() => props.selectToken('WBNB')}> <ImgBx> <img src={TokenIco02} alt='' /> </ImgBx> WBNB</button>
            <button onClick={() => props.selectToken('BAI')}> <ImgBx> <img src={TokenIco03} alt='' /> </ImgBx> BAI</button>
            <button onClick={() => props.selectToken('USDT')}> <ImgBx> <img src={TokenIco04} alt='' /> </ImgBx> USDT</button>
            <button onClick={() => props.selectToken('BUSD')}> <ImgBx> <img src={TokenIco05} alt='' /> </ImgBx> BUSD</button> */}

            {tokenList.map((item, index) => (<button key={index} onClick={() => props.selectChain(item)}>
              <ImgBx> <img src={item.image} alt='' /> </ImgBx> {item.name}</button>))}
          </PPselectTokenBTN>




          <PPstitle02>
            Chain name  <button><i className="fas fa-arrow-down"></i> </button>
          </PPstitle02>


        </PPsBx01>

        <CustomScrollbars style={{ width: '100%', height: '265px', position: 'relative' }} >

          {/* <PPListtoken onClick={() => props.selectToken('BNB')}> <ImgBx> <img src={TokenIco01} alt='' /> </ImgBx>BNB  <i>-</i> </PPListtoken>
          <PPListtoken onClick={() => props.selectToken('WBNB')}> <ImgBx> <img src={TokenIco02} alt='' /> </ImgBx>WBNB  <i>-</i> </PPListtoken>
          <PPListtoken onClick={() => props.selectToken('7UP')}> <ImgBx> <img src={TokenIco03} alt='' /> </ImgBx>7UP  <i>-</i> </PPListtoken>
          <PPListtoken onClick={() => props.selectToken('ADA')}> <ImgBx> <img src={TokenIco04} alt='' /> </ImgBx>ADA  <i>-</i> </PPListtoken>
          <PPListtoken onClick={() => props.selectToken('ANKR')}> <ImgBx> <img src={TokenIco05} alt='' /> </ImgBx>ANKR  <i>-</i> </PPListtoken>
          <PPListtoken onClick={() => props.selectToken('ANY')}> <ImgBx> <img src={TokenIco06} alt='' /> </ImgBx>ANY  <i>-</i> </PPListtoken>
          <PPListtoken onClick={() => props.selectToken('anyUNI')}> <ImgBx> <img src={TokenIco07} alt='' /> </ImgBx>anyUNI  <i>-</i> </PPListtoken>
          <PPListtoken onClick={() => props.selectToken('BNB')}> <ImgBx> <img src={TokenIco01} alt='' /> </ImgBx>BNB  <i>-</i> </PPListtoken>
          <PPListtoken onClick={() => props.selectToken('WBNB')}> <ImgBx> <img src={TokenIco02} alt='' /> </ImgBx>WBNB  <i>-</i> </PPListtoken>
          <PPListtoken onClick={() => props.selectToken('7UP')}> <ImgBx> <img src={TokenIco03} alt='' /> </ImgBx>7UP  <i>-</i> </PPListtoken>
          <PPListtoken onClick={() => props.selectToken('ADA')}> <ImgBx> <img src={TokenIco04} alt='' /> </ImgBx>ADA  <i>-</i> </PPListtoken> */}
          {tokenList.map((item, index) => (<PPListtoken key={index} onClick={() => props.selectChain(item)}>
            <ImgBx><img src={item.image} alt='' /></ImgBx>
            <span>{item.name}</span>
            <i>{item.balance}</i>
          </PPListtoken>))}

        </CustomScrollbars >

        <PPsBx02>
          <button>Having trouble finding a token?</button>
        </PPsBx02>


      </PPMainBx>

      <ReactTooltip effect="solid" className="myTip" />
    </Modal>

  );
}

const FlexDiv = styled.div`
display: flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const PPMainBx = styled.div`
 width:100%; max-width: 431px; margin:0 auto; background-color:#2c2f36; border:2px solid #000; display:block; border-radius: 10px;
 ${Media.xs}{
  margin:0px 15px; max-width:100%; width:auto;
  }
`;

const PPClosBTN01 = styled.button`
 width:20px; height:20px; border:0px; outline:none;  color:#fff; background:url(${Xbtn}) left top no-repeat; position:absolute; right:0px;
 transition: 0.5s ease all;
 :hover{ opacity:0.7; transform: rotate(180deg );} 
`;

const PPsBx01 = styled(FlexDiv)`
    width:100%; padding:30px 30px 10px 30px; border-bottom:#3c3f46 1px solid;
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
     align-items: flex-start; justify-content:flex-start; width:100%; font-size:14px; font-weight:700; padding:8px 0 12px 0; position:relative;
`;

const PPstitle02 = styled(PPstitle01)`
     align-items: flex-start; justify-content:space-between; padding:10px 0; width:100%; color:#fff; font-size:12px; font-weight:400;


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
     &.active { background-color:#1f2127; border-color:#1f2127;}
`;

const ImgBx = styled(FlexDiv)`
  width:23px; height:23px; text-align: center; margin-right:12px;    border-radius:15px; overflow:hidden;

 
  img { max-width:100%; height:auto;} 

`;