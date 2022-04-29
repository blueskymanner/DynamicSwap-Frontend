import React, { Component, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Modal from "../modal";
import { Link } from "react-router-dom";
import Gs from "../../Theme/globalStyles";
import ReactTooltip from "react-tooltip";
import { Scrollbars } from "react-custom-scrollbars";
import Media from "../../Theme/media-breackpoint";
import Collapse from "@kunukn/react-collapse";

import {
  BsQuestionCircleFill,
  BsCaretDownFill,
  BsPinAngleFill,
  BsPinAngle,
} from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import TokenIco01 from "../../Assets/images/selectTkn-01.png";
import TokenIco02 from "../../Assets/images/selectTkn-02.png";
import TokenIco03 from "../../Assets/images/selectTkn-03.png";
import TokenIco04 from "../../Assets/images/selectTkn-04.png";
import TokenIco05 from "../../Assets/images/selectTkn-05.png";
import TokenIco06 from "../../Assets/images/selectTkn-06.png";
import TokenIco07 from "../../Assets/images/selectTkn-07.png";
import Xbtn from "../../Assets/images/closeBTN.png";

import { devEthList, devBscList } from "../../Assets/token/conToken";

import Web3 from "web3";
import ERC20 from "./../../Assets/Abi/ERC20.json";

import {
  getBscTokens,
  getDefaultChain,
  getEnvType,
  getEthTokens,
  isValidNumber,
  useStorage,
} from "../../helper";
import { useOnScreen } from "../../hooks";
import ManageToken from "./manageToken";
//import BigNumber from 'bignumber.js'

const CHAIN_MAPPER = { BSC: "bsc", Ethereum: "eth" };
class CustomScrollbars extends Component {
  render() {
    return (
      <Scrollbars
        renderTrackVertical={(props) => (
          <div {...props} className="track-vertical" />
        )}
        renderThumbVertical={(props) => (
          <div {...props} className="thumb-vertical" />
        )}
        renderView={(props) => <div {...props} className="view" />}
        style={this.props.style}
      >
        {this.props.children}
      </Scrollbars>
    );
  }
}

export default function SelectTokenPopup({
  currentChain,
  liquidityclick,
  defaultToken = "",
  specialSelectToken = () => {},
  ...props
}) {
  const selectRef = useRef(null);
  const [tokenList, setTokenList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [ethTokens, setEthTokens] = useState([]);
  const [coinList, setCoinList] = useStorage();
  const [bscTokens, setBscTokens] = useState([]);
  const [devTokenList, setDevTokenList] = useState([]);
  const [isDev] = useState(getEnvType() === "development");
  const [openManage, setOpenManage] = useState(false);
  const [visible, lastRef] = useOnScreen({ threshold: 0.1 });
  const [fromChain, setFromChain] = useState("BSC");
  const [toChain, setToChain] = useState("ETH");
  const [commonTokens, setCommonTokens] = useState([]);
  useEffect(() => {
    getEthTokens().then(setEthTokens).catch(setEthTokens);
    getBscTokens().then(setBscTokens).catch(setBscTokens);
    getBscTokens().then(setCommonTokens).catch(setCommonTokens);
  }, []);

  const [customTokens, setCustomTokens] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const onInit = ({ state, style, node }) => {
    setIsOpen(false);
  };
  const [showActive, setShowActive] = useState(false);
  const onToggleClick = () => setShowActive(!showActive);

  const setSearch = (list) => {
    try {
      setTokenList(list);
      for(var i=0; i<list.length; i++){
        getTokenBalance(list[i].address, list[i], i);
      }
    } catch (e) {
      setTokenList((t) => t);
    }
  };

  useEffect(() => {
    getDefaultChain()
      .then((chain) => {
        const desired = customTokens.filter((el) => chain === el.chain);
        const altered = desired.map((el) => ({ ...el, value: el.address }));
        const original = (o) => o.filter((el) => !el.custom);
        setSearch((o) => [...original(o), ...altered]);
      })
      .catch(() => {});
  }, [customTokens]);

  useEffect(() => {
    const localCustom = localStorage.getItem("customTokens");
    if (!localCustom) localStorage.setItem("customTokens", JSON.stringify([]));
    else {
      const local = JSON.parse(localCustom);
      setCustomTokens(local);
    }
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (
        props.isOpen &&
        selectRef?.current &&
        !selectRef?.current?.contains(e.target)
      ) {
        props.dismiss();
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [props.isOpen]);

  useEffect(() => {
    if (tokenList?.length && defaultToken) {
      const tokens = defaultToken.substring(1);
      const [from, to] = tokens.split("-");
      if (isDev) {
        specialSelectToken(
          (devTokenList || []).find(
            (e) => e.symbol.toUpperCase() === (from || "").toUpperCase()
          ),
          (devTokenList || []).find(
            (e) => e.symbol.toUpperCase() === (to || "").toUpperCase()
          )
        );
      } else {
        specialSelectToken(
          ([...bscTokens, ...ethTokens] || []).find(
            (e) => e.symbol.toUpperCase() === (from || "").toUpperCase()
          ),
          ([...bscTokens, ...ethTokens] || []).find(
            (e) => e.symbol.toUpperCase() === (to || "").toUpperCase()
          )
        );
      }
    }
  }, [defaultToken, devTokenList, bscTokens, ethTokens, isDev]);

  useEffect(() => {
    if (isDev) setSearch(devTokenList);
  }, [devTokenList, isDev]);
  useEffect(() => {
    if (currentChain === "ETHEREUM") {
      setDevTokenList(devEthList);
      setFromChain("ETH");
      setToChain("BSC");
    } else setDevTokenList(devBscList);
  }, [currentChain]);

  useEffect(() => {
    if (liquidityclick) setDevTokenList(devBscList);
    else setDevTokenList(devEthList);
  }, [liquidityclick]);

  useEffect(() => {
    if (!isDev) {
      if (visible) {
        // if(currentChain === 'eth') setSearch(s => ethTokens.slice(0, s.length + 30));
        if (currentChain === "eth") setSearch([]);
        if (currentChain === "bsc")
          setSearch((s) => bscTokens.slice(0, s.length + 30));
      }
    } else setSearch(devTokenList);
  }, [ethTokens, bscTokens, isDev, currentChain, visible]);
  // useEffect(async () => {
  //   const chain = await getDefaultChain();
  //   //console.log(this.state.tokenamountIn,this.state.tokenamountOut,this.state.tokentoAddress,this.state.tokenfromAddress);
  //   if (chain === 'bsc' || chain == 'eth') {
  //     if (process.env.REACT_APP_DEPLOYMENT_ENVIRONMENT == 'development') {
  //       devTokenList.forEach(async function (item) {
  //         let balance = 0;
  //         balance = await getTokenBalance(item.value, item);
  //       })
  //       setSearch(devTokenList);
  //     } else {
  //       let new_tokenList = [];
  //       // for bsc
  //       const apiUrl = 'https://tokens.pancakeswap.finance/pancakeswap-extended.json';
  //       fetch(apiUrl)
  //         .then((response) => response.json())
  //         .then((data) => {
  //           let tokens = data['tokens'].slice(0, 15);
  //           for (let i = 0; i < tokens.length; i++) {
  //             let newObj = {
  //               name: tokens[i].symbol,
  //               chain: tokens[i].chainId == 56 ? 'BSC' : 'Ethereum',
  //               image: tokens[i].logoURI,
  //               value: tokens[i].address,
  //               balance: 0
  //             }
  //             new_tokenList.push(newObj);
  //           };
  //           // for eth
  //           const apiUrl = 'https://wispy-bird-88a7.uniswap.workers.dev/?url=http://tokens.1inch.eth.link';
  //           fetch(apiUrl)
  //             .then((response) => response.json())
  //             .then((data) => {
  //               let tokens = data['tokens'].slice(0, 15);
  //               for (let i = 0; i < tokens.length; i++) {
  //                 let newObj = {
  //                   name: tokens[i].symbol,
  //                   chain: tokens[i].chainId == 56 ? 'BSC' : 'Ethereum',
  //                   image: tokens[i].logoURI,
  //                   value: tokens[i].address,
  //                   balance: 0
  //                 }
  //                 new_tokenList.push(newObj);
  //               };

  //               setSearch(new_tokenList);
  //               new_tokenList.forEach(async function (item) {
  //                 let balance = 0;
  //                 balance = await getTokenBalance(item.value, item);
  //               })
  //             })
  //         });
  //     }
  //   }
  // }, []);

  useEffect(() => {
    console.log(
      tokenList,
      "THIS IS) THE CURRET LENGTH OF THE ARRAY ________+++"
    );
  }, [tokenList]);

  useEffect(() => {
    if (!props.isOpen) {
      setSearchValue("");
    }
  }, [props.isOpen]);

  useEffect(() => {
    if (!isDev) {
      const inputChangeHandler = (v) => {
        setSearch(
          [
            ...(currentChain === "eth" ? ethTokens : bscTokens),
            ...customTokens,
          ].filter((e) => e.symbol.toLowerCase().startsWith(v.toLowerCase()))
        );
      };

      if (searchValue) inputChangeHandler(searchValue);
      else
        setSearch(
          [...(currentChain === "eth" ? [] : bscTokens), ...customTokens].slice(
            0,
            30
          )
        );
      // else setSearch([...(currentChain === 'eth' ? ethTokens : bscTokens), ...customTokens].slice(0, 30));
    } else
      setSearch(
        [...devTokenList, ...customTokens].filter((e) =>
          e.symbol.toLowerCase().startsWith(searchValue.toLowerCase())
        )
      );
  }, [searchValue, bscTokens, ethTokens, currentChain, customTokens, isDev]);

  const selectToken = (value) => {
    props.tokenValue1(value);
  };

  const changeChain = () => {
    if (fromChain === "BSC") {
      currentChain = "ETHEREUM";
      setFromChain("ETH");
      setToChain("BSC");
    } else {
      currentChain = "bsc";
      setFromChain("BSC");
      setToChain("ETH");
    }
    setIsOpen((state) => !state);
    onToggleClick();
  };

  const addTokenFromList = (e, symbol) => {
    e.stopPropagation();
    var tokens = [...commonTokens];
    var lists = [...tokenList];
    for(var j=0; j<tokenList.length; j++){
      if(!tokenList[j].state){
        if(symbol === tokenList[j].symbol){
          lists[j]['state'] = true;
          tokens.push(tokenList[j]);
        }else{
          lists[j]['state'] = false;
        }
      }
    }
    setCommonTokens(tokens);
    setTokenList(lists);
  };

  const removeTokenFromList = (e, symbol) => {
    e.stopPropagation();
    var tokens = [];
    var lists = [...tokenList];
    for(var k=0; k<commonTokens.length; k++){
      console.log(commonTokens[k], "commonTokens symbol", symbol);
      if(symbol !== commonTokens[k].symbol){
        tokens.push(commonTokens[k]);
      }
      for(var l=0; l<lists.length; l++){
        if(lists[l].symbol === symbol){
          console.log(lists[k].symbol, "symbol passed", symbol);
          lists[l].state = false;
        }
      }
    }
    setCommonTokens(tokens);
    setTokenList(lists);
  };

  const getTokenBalance = async (tokenaddresss, item, index) => {
    if (window?.ethereum) {
      const accounts = await window?.ethereum.request({
        method: "eth_requestAccounts",
      });
      let userwalletaddresss = accounts[0];
      window.web3 = new Web3(window?.ethereum);
      let balance = new window.web3.eth.Contract(ERC20, tokenaddresss);
      //const balances = await web3.eth.getBalance(this.state.account)
      if (
        tokenaddresss != "0x0000000000000000000000000000000000000000" &&
        item.symbol !== "ETH" &&
        item.symbol !== "BNB"
      ) {
        balance.methods
          .balanceOf(userwalletaddresss)
          .call({ from: userwalletaddresss })
          .then((balan) => {
            //balan = (balan / window.web3.utils.toWei('1')).toFixed(5);
            balan = parseFloat(window.web3.utils.fromWei(balan)).toFixed(5);
            item.balance = balan;
            devTokenList.sort(function (x, y) {
              return y.balance - x.balance;
            });
          })
          .catch();
      } else {
        let balan = await window.web3.eth.getBalance(userwalletaddresss);
        //balan = (balan / window.web3.utils.toWei('1')).toFixed(5);
        balan = parseFloat(window.web3.utils.fromWei(balan)).toFixed(5);
        item.balance = balan;
        devTokenList.sort(function (x, y) {
          return y.balance - x.balance;
        });
        //tokenList.push(item);
        //return balan;
      }
    }
  };

  // const [grid, setShow] = React.useState();

  return (
    <Modal
      isOpen={props.isOpen}
      dismiss={props.dismiss}
      chain={props.chain}
      checkedTo={props.checkedTo}
    >
      <ManageToken
        customTokens={customTokens}
        setCustomTokens={setCustomTokens}
        coinList={coinList}
        setCoinList={setCoinList}
        isOpen={openManage}
        dismiss={() => {
          setOpenManage(false);
          // setRenderKey(Math.random());
          props.dismiss();
        }}
        partialDismiss={() => setOpenManage(false)}
      />

      <PPMainBx ref={selectRef}>
        <PPsBx01>
          <PPstitle01>
            Select token{" "}
            <i
              className="fas helpIco fa-question-circle"
              data-tip="Content Coming Soon"
            ></i>
            <CustomDropdown>
              <button
                onClick={() => {
                  setIsOpen((state) => !state);
                  onToggleClick();
                }}
                className={showActive ? "active" : ""}
              >
                <div>{fromChain}</div>
                <BsCaretDownFill />
              </button>
              <Collapse onInit={onInit} isOpen={isOpen}>
                <NNOuter>
                  <NetName onClick={() => changeChain()}>{toChain}</NetName>
                </NNOuter>
              </Collapse>
            </CustomDropdown>
            <PPClosBTN01 onClick={props.dismiss} />
          </PPstitle01>
          <PopInput01
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            placeholder="Search name or past address"
          />
          <PPstitle02>
            <span>
              Common bases
              <i
                className="fas helpIco fa-question-circle"
                data-tip="Content Coming Soon"
              ></i>
            </span>
          </PPstitle02>
          <PPselectTokenBTN>
            {/* <button className="active" onClick={() => props.selectToken('BNB')}> <ImgBx> <img src={TokenIco01} alt='' /> </ImgBx> BNB</button> */}
            {/* <button onClick={() => props.selectToken('WBNB')}> <ImgBx> <img src={TokenIco02} alt='' /> </ImgBx> WBNB</button>
            <button onClick={() => props.selectToken('BAI')}> <ImgBx> <img src={TokenIco03} alt='' /> </ImgBx> BAI</button>
            <button onClick={() => props.selectToken('USDT')}> <ImgBx> <img src={TokenIco04} alt='' /> </ImgBx> USDT</button>
            <button onClick={() => props.selectToken('BUSD')}> <ImgBx> <img src={TokenIco05} alt='' /> </ImgBx> BUSD</button> */}
            {console.log("commonTokens", commonTokens)}
            {(isDev
              ? devTokenList
              : currentChain === "bsc"
              ? commonTokens.filter((e) =>
                  [
                    "BNB",
                    "USDT",
                    "WBNB",
                    "DAI",
                    "BAI",
                    "BUSD",
                    "DEGEN",
                  ].includes(e.symbol)
                )
              : []
            ).map((item, index) => (
              <button
                className={
                  localStorage.getItem("tokenfrom") == item.symbol ||
                  localStorage.getItem("tokento") == item.symbol
                    ? ""
                    : ""
                }
                key={index}
                onClick={() => {
                  setTimeout(() => {
                    props.selectToken(item);
                  }, 1);
                }}
              >
                <ImgBx>
                  {" "}
                  <img src={item.image} alt="" />{" "}
                </ImgBx>{" "}
                {item.symbol}
                <IoIosClose
                  onClick={(e) => removeTokenFromList(e, item.symbol)}
                  className="top-right-icon"
                />
              </button>
            ))}
          </PPselectTokenBTN>

          <PPstitle02>
            Token name{" "}
            <button>
              <i className="fas fa-arrow-down"></i>{" "}
            </button>
          </PPstitle02>
        </PPsBx01>

        <CustomScrollbars
          style={{ width: "100%", height: "265px", position: "relative" }}
        >
          {/* <PPListtoken onClick={() => props.selectToken('WBNB')}> <ImgBx> <img src={TokenIco02} alt='' /> </ImgBx>WBNB  <i>-</i> </PPListtoken>
          <PPListtoken onClick={() => props.selectToken('7UP')}> <ImgBx> <img src={TokenIco03} alt='' /> </ImgBx>7UP  <i>-</i> </PPListtoken>
          <PPListtoken onClick={() => props.selectToken('ADA')}> <ImgBx> <img src={TokenIco04} alt='' /> </ImgBx>ADA  <i>-</i> </PPListtoken>
          <PPListtoken onClick={() => props.selectToken('ANKR')}> <ImgBx> <img src={TokenIco05} alt='' /> </ImgBx>ANKR  <i>-</i> </PPListtoken>
          <PPListtoken onClick={() => props.selectToken('ANY')}> <ImgBx> <img src={TokenIco06} alt='' /> </ImgBx>ANY  <i>-</i> </PPListtoken>
          <PPListtoken onClick={() => props.selectToken('anyUNI')}> <ImgBx> <img src={TokenIco07} alt='' /> </ImgBx>anyUNI  <i>-</i> </PPListtoken>
          <PPListtoken onClick={() => props.selectToken('BNB')}> <ImgBx> <img src={TokenIco01} alt='' /> </ImgBx>BNB  <i>-</i> </PPListtoken>
          <PPListtoken onClick={() => props.selectToken('WBNB')}> <ImgBx> <img src={TokenIco02} alt='' /> </ImgBx>WBNB  <i>-</i> </PPListtoken>
          <PPListtoken onClick={() => props.selectToken('7UP')}> <ImgBx> <img src={TokenIco03} alt='' /> </ImgBx>7UP  <i>-</i> </PPListtoken>
          <PPListtoken onClick={() => props.selectToken('ADA')}> <ImgBx> <img src={TokenIco04} alt='' /> </ImgBx>ADA  <i>-</i> </PPListtoken> */}

          {/* Token Item when search by address */}
          {/* <PPListtoken onClick={() => props.selectToken("BNB")}>
            {" "}
            <div>
              <div className="d-flex">
                <ImgBx>
                  {" "}
                  <img src={TokenIco01} alt="" />{" "}
                </ImgBx>
                <div className="my-auto">BNB</div>
              </div>
              <CoinDesc>
                Found by address <Link to="#">(Add)</Link>
              </CoinDesc>
            </div>
            <p>1000</p>{" "}
          </PPListtoken> */}
          {console.log("tokenList", tokenList)}
          {(Array.isArray(tokenList) ? tokenList : []).map((item, index) => {
            return (
              <PPListtoken
                className={
                  localStorage.getItem("tokenfrom") == item.symbol ||
                  localStorage.getItem("tokento") == item.symbol
                    ? ""
                    : ""
                }
                key={index}
                onClick={() => {
                  setTimeout(() => {
                    props.selectToken(item);
                  }, 1);
                }}
              >
                <ImgBx>
                  <img src={item.image} alt="" />
                </ImgBx>
                <span>{item.symbol}</span>
                <span className="ml-auto">
                  {/* {props.balanceFrom && props.balanceFrom[0] === item.symbol
                    ? props.balanceFrom[1]
                    : props.balanceTo && props.balanceTo[0] === item.symbol
                    ? props.balanceTo[1]
                    : "-"} */}
                  {item.balance ? (
                    <div>
                      <PPListBalance>{item.balance}</PPListBalance>{" "}
                      {item.state ? (
                        <BsPinAngleFill
                          className="pin-icon"
                          onClick={(e) => removeTokenFromList(e, item.symbol)}
                        />
                      ) : (
                        <BsPinAngle
                          className="pin-icon"
                          onClick={(e) => addTokenFromList(e, item.symbol)}
                        />
                      )}
                    </div>
                  ) : (
                    <div>
                      <PPListBalance>-</PPListBalance>{" "}
                      {item.state ? (
                        <BsPinAngleFill
                          className="pin-icon"
                          onClick={(e) => removeTokenFromList(e, item.symbol)}
                        />
                      ) : (
                        <BsPinAngle
                          className="pin-icon"
                          onClick={(e) => addTokenFromList(e, item.symbol)}
                        />
                      )}
                    </div>
                  )}
                </span>
              </PPListtoken>
            );
          })}
          {isDev || searchValue ? <></> : <div ref={lastRef} />}
        </CustomScrollbars>

        <PPsBx02>
          <button onClick={() => setOpenManage(true)}>
            Manage token lists
          </button>
          {/* <button>Having trouble finding a token?</button> */}
        </PPsBx02>
      </PPMainBx>

      <ReactTooltip effect="solid" className="myTip" />
    </Modal>
  );
}

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const ModalTopOuter = styled(FlexDiv)`
  flex-wrap: nowrap;
  justify-content: space-between;
`;

const ModalTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 26px;
  color: ${(props) => props.theme.colorWhite};
  padding: 26px 0px 0px 30px;
  svg {
    position: relative;
    top: -8px;
    right: 10px;
    font-size: 12px;
  }
`;

const CustomDropdown = styled.div`
  position: absolute;
  right: 30px;
  top: -3px;
  transition: height 280ms cubic-bezier(0.4, 0, 0.2, 1);
  .collapse-css-transition {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 35px;
  }
  button {
    background-color: ${(props) => props.theme.bodybg01};
    border-radius: 10px;
    border: 2px solid ${(props) => props.theme.greyBorder};
    padding: 10px;
    font-size: 14px;
    font-weight: bold;
    color: ${(props) => props.theme.colorWhite};
    min-width: 90px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    svg {
      transition: 0.5s ease all;
    }
    &.active {
      svg {
        transform: rotate(180deg);
      }
    }
  }
`;

const NNOuter = styled.div`
  background-color: ${(props) => props.theme.bodybg01};
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.greyBorder};
  border-top: none;
  width: 100%;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
`;

const NetName = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => props.theme.colorWhite};
  padding: 10px;
  cursor: pointer;
`;

const CoinDesc = styled.div`
  font-size: 12px;
  line-height: 22px;
  margin-left: 35px;
  a {
    color: ${(props) => props.theme.colorGreen};
  }
`;

const PPMainBx = styled.div`
  width: 100%;
  max-width: 431px;
  margin: 0 auto;
  background-color: #20232a;
  border: 2px solid #000;
  display: block;
  border-radius: 10px;
  ${Media.xs} {
    margin: 0px 15px;
    max-width: 100%;
    width: auto;
  }
`;

const PPClosBTN01 = styled.button`
  width: 20px;
  height: 20px;
  border: 0px;
  outline: none;
  color: #fff;
  background: url(${Xbtn}) left top no-repeat;
  position: absolute;
  right: 0px;
  transition: 0.5s ease all;
  :hover {
    opacity: 0.7;
    transform: rotate(180deg);
  }
`;

const PPsBx01 = styled(FlexDiv)`
  width: 100%;
  padding: 30px 30px 10px 30px;
  border-bottom: #3c3f46 1px solid;
`;

const PPsBx02 = styled(FlexDiv)`
  width: 100%;
  padding: 20px 30px 20px 30px;
  border-top: #3c3f46 1px solid;

  & button {
    border: 0px;
    outline: none;
    background-color: transparent;
    color: #8be05a;

    :hover {
      opacity: 0.7;
    }
  }
`;

const PPselectTokenBTN = styled(FlexDiv)`
  justify-content: flex-start;
  width: 100%;
  padding: 8px 0;

  button {
    display: inline-flex;
    color: #fff;
    align-items: center;
    justify-content: flex-start;
    padding: 4px 10px 4px 6px;
    margin: 0 8px 8px 0;
    position: relative;
    background-color: #3c3e4b;

    :hover {
      background-color: #545861;
      .top-right-icon {
        display: block;
      }
    }

    &.active {
      background-color: #1f2127;
      border-color: #1f2127;
    }
  }
`;

const PPstitle01 = styled(FlexDiv)`
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  font-size: 14px;
  font-weight: 700;
  padding: 8px 0 12px 0;
  position: relative;
  color: white;
`;

const PPstitle02 = styled(PPstitle01)`
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px 0;
  width: 100%;
  color: #fff;
  font-size: 12px;
  font-weight: 400;

  & button {
    border: 0px;
    outline: none;
    background-color: transparent;
    color: #fff;

    :hover {
      opacity: 0.7;
    }
  }
`;

const PopInput01 = styled.input`
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  line-height: normal;
  background-color: transparent;
  border: 2px solid #545861;
  width: 100%;
  padding: 11px 8px;
  border-radius: 10px;
  margin: 10px 0;
`;

const PPListtoken = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 16px;
  color: #fff;
  padding: 15px 30px;

  & p {
    margin-left: auto;
    font-size: 16px;
    color: #ffffff;
    font-weight: 400;
    font-family: "Montserrat";
    text-align: right;
  }

  :hover {
    background-color: #24272c;
  }
  &.active {
    background-color: #1f2127;
    border-color: #1f2127;
  }
`;

const PPListBalance = styled.i`
  margin-right: 10px;
`;

const ImgBx = styled(FlexDiv)`
  width: 23px;
  height: 23px;
  text-align: center;
  margin-right: 12px;
  border-radius: 15px;
  overflow: hidden;

  img {
    max-width: 100%;
    height: auto;
  }
`;
