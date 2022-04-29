import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';
import {Helmet} from 'react-helmet';
import styled from 'styled-components';
import Gs from '../Theme/globalStyles';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';
import TokenPopup from '../Component/popup/tokenPopup';
import Media from './../Theme/media-breackpoint';
import SmartTknStack from '../Component/popup/smartToknStack';
import SelectTokenPopup from '../Component/popup/selectToken';
import TitleIcon01 from './../Assets/images/swapTitleIcon-01.png'
import TitleIcon02 from './../Assets/images/swapTitleIcon-02.png'
import SmbnbIco from './../Assets/images/smBNB-icon.png'
import UnicornIco from './../Assets/images/unicornIco.png'
import SSIcon01 from '../Assets/images/swapBICON-01.png'
import SSIcon02 from '../Assets/images/swapBICON-02.png'
import SSIcon03 from '../Assets/images/swapSICON-01.png'
import SSIcon04 from '../Assets/images/swapSICON-02.png'
import SSIcon05 from '../Assets/images/arrowIcon02.png'
import SSIcon06 from '../Assets/images/ethRedioICON.png'



import dexIcon01 from './../Assets/images/dexIcon-01.png'
import dexIcon02 from './../Assets/images/dexIcon-02.png'
import dexIcon03 from './../Assets/images/dexIcon-03.png'
import dexIcon04 from './../Assets/images/dexIcon-04.png'
import dexIcon05 from './../Assets/images/dexIcon-05.png'
import dexIcon06 from './../Assets/images/dexIcon-06.png'
import dexIcon07 from './../Assets/images/dexIcon-07.png'
import dexIcon08 from './../Assets/images/dexIcon-08.png'
import dexIcon09 from './../Assets/images/dexIcon-09.png'
import dexIcon010 from './../Assets/images/dexIcon-010.png'
import dexIcon011 from './../Assets/images/dexIcon-011.png'
import dexIcon012 from './../Assets/images/dexIcon-012.png'
import dexIcon013 from './../Assets/images/dexIcon-013.png'
import dexIcon014 from './../Assets/images/dexIcon-014.png'
import dexIcon015 from './../Assets/images/dexIcon-015.png'
import dexIcon016 from './../Assets/images/dexIcon-016.png'
import dexIcon017 from './../Assets/images/dexIcon-017.png'
import dexIcon018 from './../Assets/images/dexIcon-018.png'
import dexIcon019 from './../Assets/images/dexIcon-019.png'

// import '../Theme/patch.css';

import YRIcon01 from '../Assets/images/selectTkn-02.png'
import YRIcon02 from '../Assets/images/selectTkn-08.png'


import Xbtn from '../Assets/images/closeBTN.png'
import { shortenChain } from '../helper';

class Page02 extends Component {

    constructor() {
        super();
        this.state = {
            popup01: false,
            popup02: false, 
            popup03: true 
        }
    }


    render() {
        return (
            <> 
                <Helmet style={[{
                        'cssText': `
                            .MainBox{background-image:none;}
                        `
                    }]} /> 
                <Gs.Container>
                    <SSNTitle01>
                    Reimbursement Staking Contract
                        <span>Stake tokens to claim reimbursement for gas and fees. you can unstacke at any time with no penalty and remining will stay pending for future clamming<i className="fas helpIco fa-question-circle" data-tip='Content Coming Soon'></i></span>
                    </SSNTitle01>

                    <RscTable>

                    <table width="100%" border="0" cellspacing="0" cellpadding="10">
                        <tbody>
                                <tr>
                                        <th align="left" valign="middle" scope="col">Reimbursement token</th>
                                        <th align="left" valign="middle" scope="col">Gas spent</th>
                                        <th align="left" valign="middle" scope="col">Fees spent</th>
                                        <th align="left" valign="middle" scope="col">Total to reimbursement</th>
                                        <th align="left" valign="middle" scope="col">Staking ratio</th>
                                        <th align="left" valign="middle" scope="col">Staking period days</th>
                                        <th align="left" valign="middle" scope="col">Reimbursement </th>
                                </tr>
                                <tr>
                                        <td align="left" valign="middle">SMART</td>
                                        <td align="left" valign="middle">$1,695.95</td>
                                        <td align="left" valign="middle">$1,695.95</td>
                                        <td align="left" valign="middle">$1,695.95</td>
                                        <td align="left" valign="middle">1:1</td>
                                        <td align="left" valign="middle">365</td>
                                        <td align="left" valign="middle">
                                            <RSCBTNbar>
                                            <RSCBTN01>Claim</RSCBTN01>
                                            <RSCBTN02><i className="far fa-times-circle"></i></RSCBTN02> </RSCBTNbar>
                                        </td>
                                </tr>
                                <tr>
                                        <td align="left" valign="middle">DEGEN</td>
                                        <td align="left" valign="middle">$0.990654</td>
                                        <td align="left" valign="middle">$0.990654</td>
                                        <td align="left" valign="middle">$0.990654</td>
                                        <td align="left" valign="middle">1:1</td>
                                        <td align="left" valign="middle">365</td>
                                        <td align="left" valign="middle"><RSCBTNbar>
                                            <RSCBTN01>Claim</RSCBTN01>
                                            <RSCBTN02><i className="far fa-times-circle"></i></RSCBTN02> </RSCBTNbar></td>
                                </tr>
                                <tr>
                                        <td align="left" valign="middle">PDO</td>
                                        <td align="left" valign="middle">$252.46</td>
                                        <td align="left" valign="middle">$252.46</td>
                                        <td align="left" valign="middle">$252.46</td>
                                        <td align="left" valign="middle">1:1</td>
                                        <td align="left" valign="middle">365</td>
                                        <td align="left" valign="middle">
                                            <RSCBTNbar>
                                                <RSCBTN01>Claim</RSCBTN01>
                                                <RSCBTN02><i className="far fa-times-circle"></i></RSCBTN02> 
                                            </RSCBTNbar>
                                        </td>
                                </tr>
                        </tbody>
                </table>

                    </RscTable>

                    <SSIconMBX01> 
                        <HeadCenterbox>
                            <span>Supporting all DEXs</span> 
                            <div className='support-list'>
                                <Link to='/page2'><img src={dexIcon01} alt="" /> </Link>
                                <Link to='/page3'><img src={dexIcon02} alt="" /> </Link>
                                <Link to='/page4'><img src={dexIcon03} alt="" /> </Link>
                                <Link to='/page5'><img src={dexIcon04} alt="" /> </Link>
                                <Link to='/page6'><img src={dexIcon05} alt="" /> </Link>
                                <Link href=''><img src={dexIcon06} alt="" /> </Link>
                                <Link href=''><img src={dexIcon07} alt="" /> </Link>
                                <Link href=''><img src={dexIcon08} alt="" /> </Link>
                                <Link href=''><img src={dexIcon09} alt="" /> </Link>
                                <Link href=''><img src={dexIcon010} alt="" /> </Link>
                                <Link href=''><img src={dexIcon011} alt="" /> </Link>
                                <Link href=''><img src={dexIcon012} alt="" /> </Link>
                                <Link href=''><img src={dexIcon013} alt="" /> </Link>
                                <Link href=''><img src={dexIcon014} alt="" /> </Link>
                                <Link href=''><img src={dexIcon015} alt="" /> </Link>
                                <Link href=''><img src={dexIcon016} alt="" /> </Link>
                                <Link href=''><img src={dexIcon017} alt="" /> </Link>
                                <Link href=''><img src={dexIcon018} alt="" /> </Link>
                                <Link href=''><img src={dexIcon019} alt="" /> </Link> 
                            </div>
                        </HeadCenterbox>
                        </SSIconMBX01>
            
            
                </Gs.Container>
                <SelectTokenPopup 
                    currentChain = {shortenChain(this.state.popupID == 'fromChainName1' ? this.state.fromChainName1 : this.state.toChainName1)}
                    isOpen={this.state.popup02} dismiss={() => { this.setState({ popup02: false }) }} />
                <TokenPopup isOpen={this.state.popup01} dismiss={() => { this.setState({ popup01: false }) }} />
                <SmartTknStack isOpen={this.state.popup03} dismiss={() => { this.setState({ popup03: false }) }} />
                <ReactTooltip effect="solid" className="myTip" />
            </>
        );
    }
}



// Common Style Div 


const FlexDiv = styled.div`
display: flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;
 
const SSNTitle01 = styled(FlexDiv)` 
    width: 100%; font:300 32px/40px 'Press Start 2P',arial; color:#fff; 
    span{ font:300 18px/32px 'IBM Plex Mono', monospace; display:block; color:#8e9195; width:100%; text-align:center; padding-top:10px;}

    .fas.helpIco{ font-size:14px;}
`


const SSswapSBX01 = styled(FlexDiv)`
    width: 65%; padding:0 15px; justify-content:flex-start;

    &.borRight{ border-right:1px solid #16191e;}
`
const SSswapSBX02 = styled(FlexDiv)`
    width: 35%; padding:0 15px; justify-content:flex-start;
`
const SSBlackBX = styled(FlexDiv)`
    background-color: #16191e; border: 2px solid #000;  padding:26px; border-radius: 10px; width: 100%; flex-direction:column;

`
const SSInputMBX = styled(FlexDiv)`
 border: 2px solid #545861;   border-radius: 10px; width: 100%; flex-direction:row; min-height: 60px; justify-content:flex-start;

`
const SSInputSBX01 = styled(FlexDiv)`
 width:50%;
    input{ width:100%; background-color:transparent; font-size:26px; font-weight:700; color:#fff; padding:10px 15px; outline:none; border:none; } 
`
const SSInputSBX02 = styled(FlexDiv)`
 width:50%; justify-content:flex-end;
 `
const SSBTN01 = styled.button`
    display:inline-flex; font-size: 14px; color: #fff; margin-left:12px; align-items:center; justify-content:center; 
    &:last-child{margin-right:10px}
    & img{ margin-right:8px;}
    & .fas {  margin-left: 12px; }
    &.v2{ font-weight:700;} 

    &.v2.marFix003{ margin-left:68px;}
`
const SSTitle01 = styled(FlexDiv)`
    width:100%; justify-content:flex-start; font-size:11px; color: #8e9195; margin:10px 0 10px 0; 
    .redC{ color: #c32b2d;}
    .greenC{ color: #8db610;} 
    p{ margin:0 0 6px 0;} 

    &.marginFix{ margin-bottom:42px; } 
    &.marginFix2{ margin-bottom:42px; color: #ababab; font-size:12px; & a{ font-size:12px;}} 
    

    & a{  color: #8e9195; margin:0 10px;  :hover{ text-decoration:underline; color:#8be05a; }}

    .helpIco {
    position: relative;
    right: 0px;
    top: -9px; } 
`
const SSTitle02 = styled(FlexDiv)`
    font:300 16px/32px 'Press Start 2P',arial; justify-content:flex-start; width:100%; margin-bottom:36px;
`
const SSTitle03 = styled(FlexDiv)`
    font-size:18px; font-weight:700; margin-bottom:22px; color:#fff; justify-content:flex-start; border-bottom:1px solid #292c32;
    span{ display:block; width:100%; font-size:12px; color:#8e9195; font-weight:400; margin:14px 0; line-height:18px;} 

    &:nth-last-child(01) { margin-bottom:0; border-bottom:0;  span{ margin-bottom:0;}}

    & .fas{ font-size:12px;}
`


const SSBTNBar01 = styled(FlexDiv)`

        width:100%; height:1px; background-color:#282b31; margin:40px 0; position:relative;

    button.arrowBTN01{ width:48px; height:34px; background-image:url(${SSIcon05}); left:50%; transform: translateX(-50%); top: -18px;
    position: absolute; background-position: 50% 50%; background-color:#16191e; background-repeat: no-repeat;  
        :hover{opacity:0.8;}
      }
`
const SSIconMBX01 = styled(FlexDiv)` 
      width:100%; position:relative; min-height: 42px; 
`

const HeadCenterbox = styled.div`
  display: flex; align-items:center; width: 100%; max-width: 1186px; position:relative; top:19px; padding: 6px;
  span{ font-size:14px; font-weight:600; color:#8e9195; margin-right:10px;
    ${Media.md}{
     display:block; margin-right:0px; margin-bottom:20px; text-align:center;
    }
  }
  .support-list{ display:flex; flex-wrap:wrap;
    a { display:flex; width:34px; height:34px; background-color:#16191e; border-radius:25px; 
        align-items: center;
        justify-content: center;
        padding: 4px; margin:4px 9px;
        :hover{ background-color:#000;}
        img { max-width:100%; height:auto}
    }
    ${Media.md}{
        justify-content:center;
    }
  }
  ${Media.md}{
    display:block;
  }
`;

const Title01 = styled.div`
  font:400 16px/25px 'Press Start 2P', arial; color:#8e9195; margin: 0 0 15px 0;
`;
const TimerBox = styled.div`
  font:400 50px/60px 'Press Start 2P', arial; color:#8be05a; margin: 0 0 15px 0;
  display:flex; align-items: center; justify-content:flex-start;
  span{display: inline-block; background-color: #16191e;  padding: 12px 8px; margin: 0 3px; border-radius: 10px; border: 2px solid #5a5e67; text-indent: 6px;}
`;
const SwapMbox01 = styled.div`
   display: flex; align-items: center; justify-content:center; margin:60px 0 0 0;
`;
const SwapSbox01 = styled(FlexDiv)`
   width: 33.33%; justify-content:flex-start ;
  &.rightAlign{ justify-content:flex-end ; }
`;
const SwapSbox02 = styled(FlexDiv)`
   width: 33.33%; padding:15px; flex-direction: column;
`;
const SwapSSbox01 = styled.div`
   width:100%; max-width:430px; background-color: #16191e; border: 2px solid #000; min-height: 430px; padding:18px; border-radius: 10px; 
  &.active{ border-color:#8be05a; -webkit-box-shadow: 1px 1px 25px 1px rgba(254,187,0,0.4);
box-shadow: 1px 1px 25px 1px rgba(254,187,0,0.4);}
`;
const SwapTitle01 = styled(FlexDiv)`
  font:300 18px/25px 'Press Start 2P', arial; color:#fff; margin-bottom:24px;  position:relative;
  img{margin:0 16px 0 0; } 
  .helpIco{ position:absolute; right:0px;}
  &.smTitle{ font:700 16px/25px 'IBM Plex Mono', arial; justify-content:flex-start;  width:100%; 
    span{ position:relative; padding-right:15px;}}
`;
const SwapInputMbx = styled(FlexDiv)`
    border:2px solid #545861; border-radius: 10px; min-height:90px; padding:12px 14px; 
    &.marginFixer01{ margin-bottom:22px; }
`;
const SSbx01 = styled(FlexDiv)`
    margin:0 auto 0 0; justify-content: flex-start; color:#8e9195; font-size:14px; width: auto; max-width:40%; 
    span{ width:100%; margin:0 0 6px 0; font-weight:700; }
    input{ background-color:transparent; font-weight:700; font-size:26px; width:100%; height:25px; color:#393d46; border:none;} 
`;
const SSbx02 = styled(FlexDiv)`
    margin:0 0 0 auto; justify-content: flex-end; color:#8e9195; font-size:14px; width: auto; max-width:55%; 
    span{ width:100%; margin:0 0 6px 0; text-align:right; min-height:20px;   }  

    button{
        font-size:16px; color:#fff;  font-weight: 700; display:flex; align-items: center; justify-content:space-between;
    }
    button.OrangeBTN{ background-color:#8be05a; font-size:16px; color:#fff; font-weight:500; padding:6px 12px; border-radius:6px;
    .fas{font-size:14px;}
    &:hover{ background-color:#6cc837;}
    &.widthFix{ font-size:15px; padding:6px 6px;}
    }
    .maxTitle{ background-color:#faecc5;  margin:0 0 0 8px; font-size:12px; border-radius:3px; padding:2px 5px; color:#000000; display:inline-block; } 
    .imgBox{ display:inline-block; margin:0 10px; padding-top:6px; }
    .fas { margin-left:8px;}
`;
const SwapTitle02 = styled(FlexDiv)`
  font:300 18px/25px 'Press Start 2P', arial; color:#565a69;  padding:18px 0; justify-content:flex-start;
    &.Center{ justify-content:center;}
`;
const SwapTitle03 = styled(FlexDiv)`
  font-size:14px; color:#8e9195; font-weight:600; min-height:42px;   justify-content:flex-start;
    span{ margin-left:auto;}
`;
const SwapTitle04 = styled(FlexDiv)`
  font:300 18px/40px 'Press Start 2P', arial; color:#fff; margin-bottom:20px;    justify-content:flex-start; 
    &.smlTitle{  font:300 11px/20px 'IBM Plex Mono', arial; color:#8e9195; margin-top:20px;}
`;

const SwapBTN01 = styled.button`
    display:flex; align-items:center; justify-content: center; color:#fff; border:none; background-color: #ababab;
    font:300 16px/32px 'Press Start 2P', arial; width:100%; padding:12px 12px; border-radius: 10px;
    :hover{  background-color: #878787;}
    &.darkGray{ background-color:#5d6168;
        :hover{  background-color: #484c53;}
    } 
    &.orangBack{ background-color:#8be05a;
        :hover{  background-color: #6cc837;}
    }
`;

const SwapBTN02 = styled.button`
    display:flex; align-items:center; justify-content: flex-start; flex-direction:column; color:#fff; border:none; background-color: #8be05a;  width:152px; height:152px; padding:15px; border-radius:80px;
    .imgBox01{ margin-bottom:12px } 
    :hover{  background-color: #e4a802;} 
`;

const SwapLinkbx = styled(FlexDiv)`
  font-size:12px; color:#ababab; font-weight:400; min-height:46px;  width:100%; max-width: 430px;
  a{color:#ababab; margin:0 6px; 
    :hover{ color:#8be05a;}
   }
`;

const YwrTitle01 = styled(FlexDiv)`
    width:100%; justify-content:space-between; font-size:30px; font-weight:700; color:#fff; line-height:40px;  
    span{ display:flex; align-items: center; justify-content:flex-end; 
            .ywrCoinImg{width:24px; height:24px; display:flex;  }
        }  
    &.smVr{ font-size:14px; font-weight:400; color:#fff; line-height:26px; margin-top:9px; align-items:flex-start; 
        span{ text-align:right;}
        .ywrCoinImg{ margin-right:4px !important;  }
    }  
`
const YwrTitle02 = styled(FlexDiv)`
    width:100%;  font-size:16px; align-items:flex-start; justify-content:flex-start;   font-weight:700; color:#fff; line-height:30px;
`

// New Const for Update Design   
const AlertTitle01 = styled.div`
    font-size:11px; color:#c32b2d; margin: 0 6px 15px 6px; line-height:18px; 
    & span{ font-size:14px; font-weight:700; margin-bottom:10px; }
    & a{text-decoration:underline; color:#c32b2d;  :hover{color:#fff;}} 
`;

const InitialPriceBox = styled(FlexDiv)`
    width:33.33%; flex-direction:column; font-size:12px; font-weight:700; color:#565a69;
    & span{ margin-bottom:8px}

`;
const PPClosBTN01 = styled.button`
 width:20px; height:20px; border:0px; outline:none;  color:#fff; background:url(${Xbtn}) left top no-repeat; position:absolute; right:0px;
 transition: 0.5s ease all;
 :hover{ opacity:0.7; transform: rotate(180deg );} 
`;

const SwapTitle05 = styled(FlexDiv)`
 font-size:18px; font-weight:700; color:#fff; margin:25px 0 15px 0;    justify-content:flex-start;  

 & .helpIco{ font-size:14px; margin-left:auto; right:3px; top:0px;}
`;
const ConnectWallText = styled(FlexDiv)`
    width:100%; max-width:260px; font-size:14px; color:#565a69; text-align:center; font-weight:400; 
`;
const SSLinkbox01 = styled(FlexDiv)`
    width:100%;  font-size:12px; color:#565a69; text-align:center; font-weight:400; padding:15px 0; 

    & a{ color:#8be05a; margin-left:4px;  :hover{ text-decoration:underline;} }
`;

const YLMBX = styled(FlexDiv)`
    width:100%;  border:2px solid #545861;  border-radius:10px; padding:15px 15px 8px 15px;

    &.v2{ border:0 solid #545861;  border-radius:10px; padding:0px 0 8px 0; }

`
const YLTitle01 = styled(FlexDiv)`
    justify-content:flex-start; width:100%; font-size:18px; font-weight:700; color:#fff; margin-bottom:10px; 
    span{ margin-right:8px; display:inline-flex; align-items:center; justify-content:flex-start;}
    i{ width:24px; height:24px; display:inline-flex; align-items:center; justify-content:center; margin-right:1px;} 
`
const YLTitle02 = styled(FlexDiv)`
 justify-content:space-between; width:100%; font-size:14px; font-weight:400; color:#fff; min-height:38px;

   &.v2{ font-size:18px; font-weight:700;  span{ display:flex; align-items:center; justify-content:space-between; 
        img{ margin-right:6px;}
        }
    } 
    &.v3{ align-items:flex-start; margin-top:10px; line-height:30px; font-size:14px; font-weight:700; color:#8e9195;   span{ text-align:right;
        }
    }



`

const YLTitle03 = styled(FlexDiv)`
 justify-content:flex-start; width:100%; font-size:12px; font-weight:400; color:#fff; min-height:38px;
`
const YLBtnBar = styled(FlexDiv)`
    align-items:center; padding:10px 0;  justify-content:space-between; width:100%; font-size:14px; font-weight:400; color:#fff; 
 .ylBTN01{ color:#8be05a; margin:0 auto; :hover{ text-decoration:underline;} }
 .ylBTN02{ background-color:#5d6168; text-align:center; font-weight:700; color:#fff; border-radius:10px; display:inline-block; padding:12px 10px; width:48%;  
    :hover{  background-color:#4f545c; }
}

 span{ margin:0 auto; color:#565a69; font-size:12px} 
`
const TSinputBar = styled(FlexDiv)`
    width:100%; justify-content:flex-start; margin-bottom: 10px; 
    &.smbar{ 
       color:#8e9195;
       input{ width:75px;  margin:0 8px 0 0; color:#fff; text-align:center;}
    }

   .tsBTN01{ width:75px; text-align:center; font-size:14px; font-weight:400; color:#fff; padding:12px 6px; background-color:#8be05a; border-radius:10px;
    :hover{background-color:#6cc837; }
    }
   input{ padding:10px 10px; background-color:transparent; border:2px solid #545861; border-radius: 10px; font-size:14px; color:#fff; text-align:right; width:calc(100% - 85px); margin-left:10px;} 
`
 
const RscTable = styled(FlexDiv)` 
margin-top:40px; margin-bottom:80px; 
table tr td{ border:1px solid #545861; padding:15px; font-size:16px; color:#fffefe;}
table tr td:nth-child(01){ border-left:none; color:#4848ff;}
table tr td:nth-last-child(01), table tr th:nth-last-child(01){ border-right:none;}
table tr th{ border-bottom:2px solid #545861; border-top:2px solid #545861; border-right:1px solid #545861;  padding:15px; font-size:14px; color:#9a9a9a; font-weight:400;} 
` 

const RSCBTNbar = styled(FlexDiv)`
    width:222px; justify-content:space-between;
`

const RSCBTN01 = styled.button`
    width:194px; height:34px; border:2px solid #8be05a; color: #8be05a; font-size:12px; font-weight:400;  border-radius:5px;
    :hover{color:#fff; background-color: #8be05a; }
`
const RSCBTN02 = styled.button`
   width:20px; height:34px; color: #53575d; margin-left:8px; font-size:24px; display:flex; align-items:center; justify-content:center; 

   :hover{ color:#c22b2d;}

`


export default Page02;