import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import Media from "./../Theme/media-breackpoint";
import FooterLogo from "../Assets/images/footer-doodle.png";
import Icon6 from "../Assets/images/icon-6.png";
import BinanceLogo from "../Assets/images/binance-logo.png";
import ETHLogo from "../Assets/images/eth-logo.png";
import PolyGonLogo from "../Assets/images/polygon-logo.png";

const Footer = ({setResetFlag, resetFlag}) => {
  const setPool = () => {
    setResetFlag(!resetFlag);
  }
  return (
    <FooterMain>
      <FooterLeft>
        <img src={FooterLogo} alt="" className="doodle" />
        <div className="footer-detail">
          <img src={Icon6} alt="" />
          <ValueText>$0.2153</ValueText>
          <Link to="#" onClick={setPool}>BUY NOW</Link>
        </div>
      </FooterLeft>
      <FooterMiddle>
        <FooterMiddleUpper>
          <Link to="#" className="active">
            Free license
          </Link>
          {/* <span></span>
          <Link to="#">Open Multi Pools on Multi DEXs</Link> */}
          <span></span>
          <Link to="#">Upgrade bSWAP to DMC</Link>
          <span></span>
          <Link to="#">100% gas and fees reimbursement</Link>
        </FooterMiddleUpper>
        <FooterMiddleLower>
          <p>Powered by Atom Foundation:</p>
          <a href="https://smartswap.exchange/" target="_blank">SmartSwap.exchange</a>
          <span></span>
          <a href="https://www.jointer.io/" target="_blank">Jointer.io</a>
          <span></span>
          <a href="#">NFT.mx</a>
          <span></span>
          <a href="https://pdo.finance/#/list" target="_blank">PDO.finance</a>
          <span></span>
          <a href="https://degenswap.io/" target="_blank">DegenSwap.io</a>
          <span></span>
          <a href="https://freez.finance/" target="_blank">Freez.Finance</a>
          <span></span>
          <a href="https://cbdc.science/" target="_blank">CBDC.science</a>
        </FooterMiddleLower>
      </FooterMiddle>
      {/* <FooterRight>
        <img src={ETHLogo} alt="" />
        <img src={BinanceLogo} alt="" />
        <img src={PolyGonLogo} alt="" />
      </FooterRight> */}
    </FooterMain>
  );
};

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const FooterMain = styled(FlexDiv)`
  background-color: ${(props) => props.theme.bodybg02};
  padding: 9px 0px;
  justify-content: space-between;
  margin-top: 50px;
`;

const FooterLeft = styled.div`
  position: relative;
  top: 40px;
  .doodle {
    position: absolute;
    left: 20px;
    top: -108px;
    ${Media.sm} {
      width: 75px;
      top: -70px;
    }
  }
  .footer-detail {
    display: flex;
    align-items: center;
    padding-left: 180px;
    img {
      margin-right: 15px;
    }
    ${Media.xl} {
      justify-content: center;
      margin-top: -30px;
      margin-bottom: 55px;
    }
  }
  a {
    font-size: 14px;
    font-weight: bold;
    color: ${(props) => props.theme.colorGreen};
    display: flex;
    align-items: center;
    svg {
      margin-left: 15px;
    }
    :hover {
      color: ${(props) => props.theme.colorGreenHover};
    }
  }
  ${Media.xl} {
    width: 100%;
  }
`;

const ValueText = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => props.theme.colorWhite};
  margin-right: 15px;
`;

const FooterMiddle = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  margin-bottom: 20px;
  ${Media.xl} {
    margin-right: 20px;
  }
  ${Media.lg} {
    width: 100%;
    margin: 0px 15px;
  }
`;

const FooterMiddleUpper = styled(FlexDiv)`
  margin-bottom: 20px;
  .active {
    color: #8be05a;
  }
  a {
    font-size: 16px;
    font-family: "Kanit", sans-serif;
    font-weight: 700;
    color: ${(props) => props.theme.colorWhite};
    :hover {
      color: ${(props) => props.theme.colorGreen};
    }
    ${Media.xs} {
      display: block;
      line-height: 24px;
      text-align: center;
    }
  }
  span {
    width: 1px;
    height: 15px;
    background-color: ${(props) => props.theme.bodybg06};
    margin: 0px 30px;
    ${Media.xs} {
      display: none;
    }
  }
  ${Media.xs} {
    display: block;
  }
`;

const FooterMiddleLower = styled(FlexDiv)`
  p {
    font-size: 12px;
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
    color: ${(props) => props.theme.colorWhite};
    margin: 0px 10px 0px 0px;
    ${Media.xs} {
      text-align: center;
    }
  }
  a {
    font-size: 12px;
    color: ${(props) => props.theme.colorWhite};
    :hover {
      color: ${(props) => props.theme.colorGreen};
    }
    ${Media.xs} {
      display: block;
      line-height: 24px;
      text-align: center;
    }
  }
  span {
    width: 1px;
    height: 15px;
    background-color: ${(props) => props.theme.bodybg06};
    margin: 0px 10px;
    ${Media.xs} {
      display: none;
    }
  }
  ${Media.lg} {
    justify-content: center;
  }
  ${Media.xs} {
    display: block;
  }
`;

const FooterRight = styled(FlexDiv)`
  max-width: 252px;
  width: 100%;
  justify-content: flex-end;
  padding-right: 10px;
  img {
    margin: 10px;
  }
  ${Media.xl} {
    max-width: 100%;
  }
  ${Media.lg} {
    justify-content: center;
  }
`;
export default Footer;
