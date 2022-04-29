import React, { Component } from "react";
import styled from "styled-components";
import Media from "./../Theme/media-breackpoint";
import Collapse from "@kunukn/react-collapse";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemState,
  AccordionItemPanel,
} from "react-accessible-accordion";

import Xbtn from "../Assets/images/closeBTN.png";
import { Scrollbars } from "react-custom-scrollbars";
import CurrencyIcon from "./../Assets/images/eth-icon.png";
import bnbImage from "../Assets/images/icon-3.png";
import ethImage from "../Assets/images/b-icon.png";
import { Link } from "react-router-dom";
import {
  BsDiscord,
  BsFillCaretUpFill,
  BsFillCaretDownFill,
} from "react-icons/bs";
import {
  FaTelegramPlane,
  FaTwitter,
  FaRedditAlien,
  FaMediumM,
  FaGithub,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import Web3 from "web3";
import { getDecimal, getDefaultChain } from "../helper";
import { SecondAlert } from "./popup/loader";
import LogoImg from "../Assets/images/logo.png";
import AtomImg from "../Assets/images/atom.png";


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      WalletAddress: "",
      walletBalance: "",
      currChain: "",
      warning: "",
      changeNetwork: false,
      modalIsOpen: true,
    };
  }

  async componentDidMount() {
    const chain = await getDefaultChain();
    this.setState({ currChain: chain });
    this.connectMetamask();
    localStorage.setItem("tokenfromAddress", "");
    localStorage.setItem("tokentoAddress", "");
    //this.getWalletAddress();
  }

  onInit = ({ state, style, node }) => {
    this.setState({
      isOpen: false,
    });
  };

  setIsOpen = (state) => {
    console.log("state", state);
    this.setState({
      isOpen: !state,
    });
  };

  render() {
    return (
      <>
        {this.state.warning ? (
          <SecondAlert
            text={this.state.warning}
            onClose={() => this.setState({ warning: "" })}
          />
        ) : (
          <></>
        )}
        <Mainheadbox>
          <Logo href="/">
            <img className="logo-class" src="./images/logo.png" alt="" />
          </Logo>
          <HeadCenterboxV2>
            <a>SAVE AND INVEST</a>
            <a>MULTI SWAP</a>
            <a className="active">DYNAMIC SWAP</a>
          </HeadCenterboxV2>
          <HeadRightbox>
            <BallanceText className="desktop-div">
              {localStorage.getItem("account") ? (
                <div style={{ marginRight: "25px" }}>
                  ${this.state.walletBalance}
                </div>
              ) : (
                <span></span>
              )}
            </BallanceText>
            <div className="img-outer desktop-div">
              {localStorage.getItem("account") ||
              this.state.currChain === "bsc" ||
              this.state.currChain === "eth" ? (
                <img
                  src={this.state.currChain === "bsc" ? bnbImage : ethImage}
                  alt="Currency"
                />
              ) : (
                <span></span>
              )}
            </div>
            {!localStorage.getItem("account") ? (
              <SwapBTN01
                className="darkFix"
                onClick={() => this.connectMetamask()}
              >
                Connect Wallet
              </SwapBTN01>
            ) : this.state.currChain === "bsc" ||
              this.state.currChain === "eth" ? (
              <WalletAddressItem>{this.getWalletAddress()}</WalletAddressItem>
            ) : (
              <SwapBTN01 className="darkRed">Wrong Network</SwapBTN01>
            )}
            <MenuIcon onMouseEnter={() => this.setIsOpen(this.state.isOpen)}>
              <TopDot className="topdot"></TopDot>
              <MidDot className="middot"></MidDot>
              <BottomDot className="bottomdot"></BottomDot>
            </MenuIcon>
            {/* <Dot></Dot> */}
            <MenuRight>
              <Collapse onInit={this.onInit} isOpen={this.state.isOpen}>
                <MenuBg>
                  <Scrollbars
                    renderTrackVertical={(props) => (
                      <div {...props} className="track-vertical" />
                    )}
                    renderThumbVertical={(props) => (
                      <div {...props} className="thumb-vertical" />
                    )}
                    renderView={(props) => <div {...props} className="view" />}
                    autoHide
                    autoHideTimeout={1000}
                  >
                    <BallanceText className="mobile-div">
                      {localStorage.getItem("account") ? (
                        <div style={{ marginRight: "25px" }}>
                          ${this.state.walletBalance}
                        </div>
                      ) : (
                        <span></span>
                      )}
                    </BallanceText>
                    <MenuTop>
                      <div className="m-inner">
                        <div className="img-outer">
                          {localStorage.getItem("account") ||
                          this.state.currChain === "bsc" ||
                          this.state.currChain === "eth" ? (
                            <img
                              src={
                                this.state.currChain === "bsc"
                                  ? bnbImage
                                  : ethImage
                              }
                              alt="Currency"
                            />
                          ) : (
                            <span></span>
                          )}
                        </div>
                        <WalletAddress className="m-0">
                          {localStorage.getItem("account") &&
                          (this.state.currChain === "bsc" ||
                            this.state.currChain === "eth") ? (
                            this.getWalletAddress()
                          ) : (
                            <SwapBTN01 className="darkRed">
                              Wrong Network
                            </SwapBTN01>
                          )}
                        </WalletAddress>
                      </div>
                      {/* <MenuIcon
                        className="m-0 no-margin"
                        onClick={() => this.setIsOpen(this.state.isOpen)}
                      >
                        <TopDot className="topdot"></TopDot>
                        <MidDot className="middot"></MidDot>
                        <BottomDot className="bottomdot"></BottomDot>
                      </MenuIcon> */}
                      <PPClosBTN01
                        className="menuCloseBtn"
                        onClick={() => this.setIsOpen(this.state.isOpen)}
                      />
                    </MenuTop>
                    <MenuLinks>
                      <Link to="#" className="active">
                        Buy DMC
                      </Link>
                      <Link to="#">Dynamic AMM</Link>
                      <Link to="#">Multi Swap</Link>
                      <Link to="#">Multi Trade</Link>
                      <Link to="#">Multi Staking</Link>
                    </MenuLinks>
                    <CustomAccordion>
                      <Accordion allowZeroExpanded>
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton className="menuToggleBtn">
                              Launchpool
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <MenuLinks2>
                              <Link to="#">Reimbursement</Link>
                              <Link to="#">HODL</Link>
                              <Link to="#">Forge</Link>
                              <Link to="#">Burn</Link>
                              <Link to="#">Farm</Link>
                              <Link to="#">Launchpool</Link>
                            </MenuLinks2>
                          </AccordionItemPanel>
                        </AccordionItem>
                      </Accordion>
                    </CustomAccordion>
                    <MenuLinks>
                      <Link to="#">Reserve Presale</Link>
                      <Link to="#">PDO</Link>
                      <Link to="#">Secure Future</Link>
                    </MenuLinks>
                    <CustomAccordion2>
                      <Accordion allowZeroExpanded>
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton>
                              v1.5
                              <AccordionItemState>
                                {({ expanded }) =>
                                  expanded ? (
                                    <BsFillCaretUpFill />
                                  ) : (
                                    <BsFillCaretDownFill />
                                  )
                                }
                              </AccordionItemState>
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <VersionLink>
                              <Link to="#" className="active">
                                v1
                              </Link>
                              <Link to="#">v2 - coming soon</Link>
                            </VersionLink>
                          </AccordionItemPanel>
                        </AccordionItem>
                      </Accordion>
                    </CustomAccordion2>
                    <CustomAccordion3>
                      <Accordion allowZeroExpanded>
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton>
                              Library
                              <AccordionItemState>
                                {({ expanded }) =>
                                  expanded ? (
                                    <BsFillCaretUpFill />
                                  ) : (
                                    <BsFillCaretDownFill />
                                  )
                                }
                              </AccordionItemState>
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <LibLinks>
                              <Link to="#">GitHub</Link>
                              <Link to="#">Whitepaper</Link>
                              <Link to="#">Light Paper</Link>
                              <Link to="#">Technical Documentation</Link>
                              <Link to="#">Pitch Deck</Link>
                              <Link to="#">One Page</Link>
                            </LibLinks>
                          </AccordionItemPanel>
                        </AccordionItem>
                      </Accordion>
                      <Accordion allowZeroExpanded>
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton>
                              Community
                              <AccordionItemState>
                                {({ expanded }) =>
                                  expanded ? (
                                    <BsFillCaretUpFill />
                                  ) : (
                                    <BsFillCaretDownFill />
                                  )
                                }
                              </AccordionItemState>
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <LibLinks>
                              <Link to="#">
                                <FaTelegramPlane />
                                Telegram
                              </Link>
                              <Link to="#">
                                <FaTwitter />
                                Twitter
                              </Link>
                              <Link to="#">
                                <FaRedditAlien />
                                Reddit
                              </Link>
                              <Link to="#">
                                <BsDiscord />
                                Discord
                              </Link>
                              <Link to="#">
                                <FaMediumM />
                                Medium
                              </Link>
                              <Link to="#">
                                <FaGithub />
                                Github
                              </Link>
                            </LibLinks>
                          </AccordionItemPanel>
                        </AccordionItem>
                      </Accordion>
                      <Accordion allowZeroExpanded>
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton>
                              About
                              <AccordionItemState>
                                {({ expanded }) =>
                                  expanded ? (
                                    <BsFillCaretUpFill />
                                  ) : (
                                    <BsFillCaretDownFill />
                                  )
                                }
                              </AccordionItemState>
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <LibLinks>
                              <Link to="#">About Us</Link>
                              <Link to="#">Careers</Link>
                              <Link to="#">Partner with Us</Link>
                              <Link to="#">Privacy Policy</Link>
                              <Link to="#">Terms of Use</Link>
                              <Link to="#">Cookie Policy</Link>
                            </LibLinks>
                          </AccordionItemPanel>
                        </AccordionItem>
                      </Accordion>
                    </CustomAccordion3>
                    <ThemeSection>
                      <FaMoon className="active" />
                      <FaSun />
                    </ThemeSection>
                    <hr />
                    <img src={LogoImg} alt="" className="logo" />
                    <CopyRText>
                      &copy; 2022 Dynamic Swap. All rights
                      <br /> reserved
                    </CopyRText>
                    <PoweredBy>
                      <p>Powered by</p>
                      <img src={AtomImg} alt="" />
                    </PoweredBy>
                    <CopyRText className="mt-15">
                      Atom Foundation is a Decentralized Financial (DeFi)
                      liquidity ecosystem powered by proprietary protocols which
                      underlines zero volatility platforms, a NFT (Non-fungible
                      token) and altcoin marketplace with downside protection,
                      post dex offerings (PDO), a dynamic AMM with multiple swap
                      exchanges, cross network aggregation, as well as a CBDC
                      alternative and price support game theoretic model.
                    </CopyRText>
                  </Scrollbars>
                </MenuBg>
              </Collapse>
            </MenuRight>
          </HeadRightbox>
        </Mainheadbox>
      </>
    );
  }
  async checkWalletAddress() {
    let address = localStorage.getItem("account");
    if (
      address != undefined &&
      address != null &&
      window?.ethereum.selectedAddress != null
    ) {
      const chain = await getDefaultChain();
      if (chain === "bsc" || chain === "eth") {
        let start = address.substring(0, 6);
        let end = address.slice(-4);
        return start + "...." + end;
      } else {
        const style = {
          color: "white",
          border: "1px solid",
          padding: "6px",
          borderRadius: "7px",
          backgroundColor: "Red",
        };
        return <button style={style}> Wrong Network </button>;
      }
    } else {
      const style = {
        color: "white",
        border: "1px solid",
        padding: "6px",
        borderRadius: "7px",
        whiteSpace: "pre",
      };
      return (
        <button style={style} onClick={() => this.connectMetamask()}>
          {" "}
          Connect Wallet{" "}
        </button>
      );
    }
  }
  getWalletAddress() {
    let address = localStorage.getItem("account");
    let start = address.substring(0, 6);
    let end = address.slice(-4);
    return start + "...." + end;
  }
  async getWalletBalance() {
    let address = localStorage.getItem("account");
    window.web3 = new Web3(window?.ethereum);
    let balan = await window.web3.eth.getBalance(address);
    const decimal = await getDecimal();
    this.state.walletBalance = (balan / 10 ** decimal).toFixed(3);
    return this.state.walletBalance;
  }
  async connectMetamask() {
    console.log("first call==============", window.web3)
    if (typeof window?.ethereum !== "undefined") {
      console.log("correct network method1?")
      //window?.ethereum.request({ method: 'eth_requestAccounts' });
      window?.ethereum.enable().then(async (accounts) => {
        localStorage.setItem("account", accounts[0]);
        window.web3 = new Web3(window?.ethereum);
        let balan = await window.web3.eth.getBalance(accounts[0]);
        const decimal = await getDecimal();
        balan = (balan / 10 ** decimal).toFixed(3);
        this.setState({ walletBalance: balan });
        localStorage.setItem("walletBalance", balan);
        //window.location.reload();
      });
    } else {
      this.setState({ warning: "MetaMask is not installed!" });
    }
    if (window.web3) {
      const web3 = new Web3(Web3.givenProvider);
      const networkId = await web3.eth.net.getId();
      console.log("correct network method2?", networkId)
      // Subscription register
      window?.ethereum?.on("accountsChanged", async (accounts) => {
        if (accounts == "") {
          localStorage.removeItem("account");
        } else {
          localStorage.setItem("account", accounts);
        }
        window.location.reload();
      });
      window?.ethereum?.on("chainChanged", (chainId) => {
        localStorage.setItem("chainId", chainId);
        console.log("changechanged===========", chainId);
        // window.location.reload();
      });
      window?.ethereum?.on("networkChanged", async (network) => {
        console.log("networkChanged===========", network);
        if (network == 1 || network == 56) {
          window.location.reload();
        } else {
          // alert("Wrong Network!!!");
          this.props.openModal();
        }
      });
      if (networkId == 1 || networkId == 56) {
        return;
      } else {
        this.props.openModal();
      }
    }
  }
}

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const BallanceText = styled.div`
  font-size: 14px;
  font-weight: bold;
  line-height: normal;
  margin: 0px 31px 0px 0px;
  color: ${(props) => props.theme.colorWhite};
  &.desktop-div {
    ${Media.sm} {
      display: none;
    }
  }
  &.mobile-div {
    display: none;
    margin: 40px 0px 0px 35px;
    ${Media.sm} {
      display: block;
    }
  }
`;
const PPClosBTN01 = styled.button`
  width: 20px;
  height: 20px;
  border: 0px;
  outline: none;
  color: #fff;
  background: url(${Xbtn}) left top no-repeat;
  position: relative;
  right: -20px;
  top: -10px;
  transition: 0.5s ease all;
  :hover {
    opacity: 0.7;
    transform: rotate(180deg);
  }
`;
const MenuIcon = styled.div`
  margin-left: 30px;
  margin-right: 20px;
  cursor: pointer;
  z-index: 1;
  :hover {
    .topdot {
      background-color: #8be05a;
      animation: hoverpulse 2s infinite;
    }
    .middot {
      background-color: #8be05a;
      animation: hoverpulse 2s infinite;
    }
    .bottomdot {
      background-color: #8be05a;
      animation: hoverpulse 2s infinite;
    }
  }
  @keyframes hoverpulse {
    0% {
      box-shadow: 0 0 0 0 rgb(139 224 90 / 40%);
    }
    70% {
      box-shadow: 0 0 0 10px rgb(255 255 255 / 0%);
    }
    100% {
      box-shadow: 0 0 0 0 rgb(255 255 255 / 0%);
    }
  }
`;
const TopDot = styled.div`
  width: 8px;
  height: 8px;
  margin: 4px;
  background: white;
  border-radius: 50%;
  &.topdot {
    background: white;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgb(255 255 255 / 40%);
    }
    70% {
      box-shadow: 0 0 0 10px rgb(255 255 255 / 0%);
    }
    100% {
      box-shadow: 0 0 0 0 rgb(255 255 255 / 0%);
    }
  }
`;
const MidDot = styled.div`
  width: 6px;
  height: 6px;
  margin: 5px;
  background: white;
  border-radius: 50%;
  &.middot {
    background: white;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgb(255 255 255 / 40%);
    }
    70% {
      box-shadow: 0 0 0 10px rgb(255 255 255 / 0%);
    }
    100% {
      box-shadow: 0 0 0 0 rgb(255 255 255 / 0%);
    }
  }
`;
const BottomDot = styled.div`
  width: 4px;
  height: 4px;
  margin: 4px 6px 4px 6px;
  border-radius: 50%;
  &.bottomdot {
    background: white;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgb(255 255 255 / 40%);
    }
    70% {
      box-shadow: 0 0 0 10px rgb(255 255 255 / 0%);
    }
    100% {
      box-shadow: 0 0 0 0 rgb(255 255 255 / 0%);
    }
  }
`;
const Mainheadbox = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  align-items: center;
  justify-content: space-between;
  min-height: 85px;
  background-color: ${(props) => props.theme.headbg01};
  z-index: 100;
  padding: 0 15px;

  ${Media.xs} {
    min-height: 108px;
    align-items: flex-start;
    padding-top: 21px;
  }
`;
const Logo = styled.a`
  margin: 0 auto 0 0;
  img {
    max-width: 100%;
    height: auto;
  }

  ${Media.md2} {
    img {
      max-width: 146px;
    }
  }
`;

const HeadRightbox = styled.div`
  .img-outer {
    width: 22px;
    height: 22px;
    margin-right: 20px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    &.desktop-div {
      ${Media.sm} {
        display: none;
      }
    }
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WalletAddressItem = styled.p`
  color: white;
`;

const CurrIcon = styled.button`
  display: flex;
  color: #fff;
  padding: 8px;
  font-weight: 700;
  font-size: 16px;
  border-radius: 10px;
  margin: 0 2px;

  ${Media.xs} {
    position: absolute;
    left: 10px;
    top: 67px;
  }
`;

const WalletAddress = styled.div`
  color: ${(props) => props.theme.colorWhite};
  font-size: 14px;
  font-weight: 600;
  margin-right: 10px;
`;

const SwapBTN01 = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border: none;
  background-color: #ababab;
  padding: 12px 12px;
  border-radius: 10px;
  white-space: nowrap;
  :hover {
    background-color: #878787;
  }
  &.darkGray {
    background-color: #5d6168;
    :hover {
      background-color: #484c53;
    }
  }
  &.darkRed {
    background-color: Red;
    :hover {
      background-color: Red;
    }
  }
  &.orangBack {
    background-color: #8be05a;
    :hover {
      background-color: #6cc837;
    }
  }

  ${Media.xs} {
    background-color: transparent !important;
    position: absolute;
    right: 11px;
    top: 64px;
    &.darkFix {
      background-color: #5d6168 !important;
      padding: 12px 88px;
      right: 50%;
      transform: translateX(50%);
      :hover {
        background-color: #484c53 !important;
      }
    }
  }
`;

const WalletSignal = styled.a` 
  display:block;
  width:9px; height:9px; background-color: #8be05a; border-radius:50%;
  margin: 0 10px 0 10px; 
  ${Media.xs}{ margin-top:6px;}

  &.white{ background-color:#fff;}
  &:hover{ opacity:0.6;}

  
animation: pulse 2s infinite; 
}
@-webkit-keyframes pulse {
0% {
  -webkit-box-shadow: 0 0 0 0 rgba(254,187,0, 0.4);
}
70% {
  -webkit-box-shadow: 0 0 0 10px rgba(254,187,0, 0);
}
100% {
  -webkit-box-shadow: 0 0 0 0 rgba(254,187,0, 0);
}
}
@keyframes pulse {
0% {
  -moz-box-shadow: 0 0 0 0 rgba(254,187,0, 0.4);
  box-shadow: 0 0 0 0 rgba(254,187,0, 0.4);
}
70% {
  -moz-box-shadow: 0 0 0 10px rgba(254,187,0, 0);
  box-shadow: 0 0 0 10px rgba(254,187,0, 0);
}
100% {
  -moz-box-shadow: 0 0 0 0 rgba(254,187,0, 0);
  box-shadow: 0 0 0 0 rgba(254,187,0, 0);
}
}
`;

const HeadCenterbox = styled.div`
  width: 100%;
  max-width: 1120px;
  position: absolute;
  left: 50%;
  top: 19px;
  transform: translateX(-50%);
  padding: 6px 6px 6px 100px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  span {
    position: absolute;
    left: 0px;
    font-size: 14px;
    font-weight: 600;
    max-width: 100px;
    color: #8e9195;
  }
`;
const HeadCenterboxV2 = styled.div`
  margin: 0 auto;
  display: flex;
  font: normal 11px/20px "Press Start 2P", arial;
  color: #fff;
  width: 100%;
  position: absolute;
  justify-content: center;

  a {
    color: #fff;
    padding: 6px 12px 6px 20px;
    position: relative;
    font-size: 16px;
    font-weight: 400;
    font-family: "Montserrat", sans-serif;
    text-align: center;
    &.inactive {
      color: #aba5a5;
    }
    :hover,
    &.active {
      color: #8be05a;
    }
  }

  ${Media.md} {
    width: 35%;
  }
  ${Media.md2} {
    width: 42%;
    a {
      white-space: nowrap;
    }
  }
  ${Media.sm} {
    display: none;
  }
`;
const MenuRight = styled.div`
  .collapse-css-transition {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 9;
    box-shadow: -10px 0px 10px 0px ${(props) => props.theme.boxShadowOne};
  }
`;

const MenuBg = styled.div`
  width: 326px;
  height: 100vh !important;
  background-color: ${(props) => props.theme.bodybg011};
  hr {
    border-color: ${(props) => props.theme.bodybg01};
    margin: 0px 35px 25px;
  }
  img.logo {
    padding: 0px 35px;
  }
`;

const MenuTop = styled(FlexDiv)`
  justify-content: space-between;
  padding: 25px 35px;
  ${Media.sm} {
    padding: 20px 35px 40px;
  }
  .m-inner {
    display: flex;
    align-items: center;
    justify-contnet: center;
    .img-outer {
      margin-right: 10px;
      display: none;
      ${Media.sm} {
        display: block;
      }
    }
  }
`;

const MenuLinks = styled.div`
  padding: 0px 35px;
  a {
    font-size: 16px;
    color: ${(props) => props.theme.colorWhite};
    font-family: "Kanit", sans-serif;
    display: block;
    margin-bottom: 25px;
    font-weight: 700;
    :hover,
    &.active {
      color: ${(props) => props.theme.colorGreen};
    }
  }
`;

const MenuLinks2 = styled.div`
  margin-left: 20px;
  a {
    font-size: 12px;
    color: ${(props) => props.theme.colorLightGrey};
    font-family: "Kanit", sans-serif;
    display: block;
    margin-bottom: 25px;
    :hover,
    &.active {
      color: ${(props) => props.theme.colorGrey};
    }
  }
`;

const CustomAccordion = styled.div`
  padding: 0px 35px;
  .accordion {
    .accordion__button {
      font-size: 12px;
      color: ${(props) => props.theme.colorWhite};
      font-family: "Press Start 2P", cursive;
      cursor: pointer;
      margin-bottom: 25px;
      :hover {
        color: ${(props) => props.theme.colorGreen};
      }
    }
    .accordion__panel {
      padding: 0px;
    }
  }
`;

const CustomAccordion2 = styled.div`
  margin-bottom: 30px;
  padding: 0px 35px;
  .accordion {
    .accordion__item {
      background-color: ${(props) => props.theme.bodybg012};
      padding: 15px 12px;
      border-radius: 5px;
    }
    .accordion__button {
      font-size: 14px;
      font-weight: bold;
      color: ${(props) => props.theme.colorWhite};
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      svg {
        font-size: 12px;
      }
    }
  }
`;

const VersionLink = styled.div`
  a {
    font-size: 14px;
    font-weight: bold;
    color: ${(props) => props.theme.colorGrey5};
    display: block;
    padding: 10px 0px;
    &.active {
      color: ${(props) => props.theme.colorWhite};
    }
    :last-child {
      padding-bottom: 0px;
    }
    :first-child {
      padding-top: 20px;
    }
  }
`;

const CustomAccordion3 = styled.div`
  padding: 0px 35px;
  .accordion {
    .accordion__button {
      font-size: 14px;
      font-weight: bold;
      color: ${(props) => props.theme.colorWhite};
      cursor: pointer;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      svg {
        font-size: 12px;
      }
    }
  }
`;

const LibLinks = styled.div`
  a {
    font-size: 12px;
    color: ${(props) => props.theme.colorLightGrey};
    display: block;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    :hover {
      color: ${(props) => props.theme.colorGrey};
    }
    svg {
      font-size: 16px;
      margin-right: 10px;
    }
  }
`;

const ThemeSection = styled.div`
  margin: 30px 0px;
  padding: 0px 35px;
  svg {
    font-size: 20px;
    margin-right: 25px;
    color: ${(props) => props.theme.colorLightGrey};
    cursor: pointer;
    &.active {
      color: ${(props) => props.theme.colorGreen};
    }
  }
`;

const CopyRText = styled.div`
  font-size: 12px;
  line-height: 18px;
  color: ${(props) => props.theme.colorLightGrey};
  letter-spacing: 0px;
  margin: 20px 0px 15px;
  padding: 0px 35px;
  font-family: "Montserrat", sans-serif;
  &.mt-15 {
    margin-top: 15px;
  }
`;

const PoweredBy = styled(FlexDiv)`
  justify-content: flex-start;
  padding: 0px 35px;
  p {
    margin: 0px 15px 0px 0px;
    font-size: 12px;
    font-weight: bold;
    line-height: 18px;
    color: ${(props) => props.theme.colorLightGrey};
  }
`;

export default Header;
