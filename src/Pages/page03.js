import React, { Component } from 'react';
import styled from 'styled-components';
import Gs from './../Theme/globalStyles';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';
//import InputRange from 'react-input-range';
import Media from './../Theme/media-breackpoint';
import TokenPopup from '../Component/popup/tokenPopup'
import SelectTokenPopup from '../Component/popup/selectToken'
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
import Xbtn from '../Assets/images/closeBTN.png'


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


import YLIcon01 from './../Assets/images/selectTkn-08.png'
import YLIcon02 from './../Assets/images/selectTkn-02.png'
import Collapse from '@kunukn/react-collapse';
import { shortenChain } from '../helper';
class Page08 extends Component {

    constructor() {
        super();
        this.state = {
            popup01: false,
            popup02: false,
            index: 1,
            underTab: 1,
            value: 78,
        }
    }
    render() {
        return (
            <>
                <Gs.Container>
                    <SSNTitle01>
                        Dynamic AMM
                        <span>Our DEX includes new features that turn it to be a superior AMM for traders</span>
                    </SSNTitle01>
                    <SSswapMBX className='topmFix01'>
                        <SSswapSBX01 className="borRight">
                            <SSBlackBX>
                                <SSInputMBX>
                                    <SSInputSBX01> <input type="text" placeholder="0" /> </SSInputSBX01>
                                    <SSInputSBX02>
                                        <SSBTN01 onClick={() => { this.setState({ popup02: true }) }}> BEP20 <i className="fas fa-chevron-down"></i></SSBTN01>
                                        <SSBTN01 onClick={() => { this.setState({ popup02: true }) }} className="v2"> <img src={SSIcon04} alt='' /> bSWAP v2 <i className="fas fa-chevron-down"></i></SSBTN01>
                                    </SSInputSBX02>
                                </SSInputMBX>
                                <SSTitle01> Rate: 1 Bswap v2 =  0.0189881 ETH [$28.48]</SSTitle01>
                                <SSBTNBar01>
                                    <button className="arrowBTN01"></button>
                                </SSBTNBar01>
                                <SSInputMBX>
                                    <SSInputSBX01> <input type="text" placeholder="0" /> </SSInputSBX01>
                                    <SSInputSBX02>
                                        <SSBTN01 onClick={() => { this.setState({ popup02: true }) }}> BEP20 <i className="fas fa-chevron-down"></i></SSBTN01>
                                        <SSBTN01 onClick={() => { this.setState({ popup02: true }) }} className="v2 marFix003"> <img src={SSIcon06} alt='' /> ETH <i className="fas fa-chevron-down"></i></SSBTN01>
                                    </SSInputSBX02>
                                </SSInputMBX>
                                <SSTitle01 className='marginFix'><p>Rate: 1 ETH  = 0.0190 bSWAP v2 [$28.51]  </p>
                                    <p>Estimated fees: ~ [<span className='redC'>$5.37</span>]  |  Reimbursement reward: 126.53 bSWAP [<span className='greenC'>$5.37]</span>]</p></SSTitle01>
                                <SwapBTN01 className="orangBack">Swap</SwapBTN01>
                            </SSBlackBX>
                            <SSswapSBX01  style={{ width: '100%', marginBottom: '-41px', paddingLeft:'0px', paddingRight:'0px' }}>
                                <SSTitle01 className='marginFix2'>
                                    <div className='first-div'>100% gas and fee reimbursement with<a href='#' >bSWAP</a><i className="fas helpIco fa-question-circle" data-tip='Content Coming Soon'></i></div>
                                    <span>|</span>
                                    <a href='#' >Transaction settings</a>
                                    <span>|</span>
                                    <a href='#' >Analysis</a>
                                </SSTitle01>
                            </SSswapSBX01>
                        </SSswapSBX01>





                        <SSswapSBX02>

                            {/* Remove Liquidity popup
                            <SSBlackBX className="orngBR">   
                            <SwapTitle01>
                                     Remove Liquidity  <i className="fas helpIco fa-question-circle" data-tip='Content Coming Soon'></i> 
                                </SwapTitle01>  
                                <RLTitle01>
                                Amount    <a href='#'>Detailed</a>
                                </RLTitle01>
                                <RLTitle01 className='v2'>
                                    78%
                                </RLTitle01> 
                                <DragorInput>
                                           <InputRange
                                               maxValue={100}
                                               minValue={0}
                                               value={this.state.value}
                                               formatLabel={value => `${value}%`}
                                               onChange={value => this.setState({ value })}  /> 
                               </DragorInput> 
                               <RLBTNBX>
                               <button>25%</button><button class="active">50%</button><button>75%</button><button>100%</button> 
                               </RLBTNBX> 
                               <AeroBX> <i class="fas fa-arrow-down"></i> </AeroBX> 
                               <YLMBX> 
                                    <YLTitle02 className='v2'>0.0521
                                       <span> <img src={YLIcon01} alt="" /> bSWAP</span>
                                    </YLTitle02>
                                    <YLTitle02 className='v2'>11.24
                                       <span> <img src={YLIcon01} alt="" /> BNB</span>
                                    </YLTitle02> 
                                </YLMBX> 
                                <YLBtnBar>
                                        <button class="ylBTN03">Approve </button>
                                        <button class="ylBTN02">Remove </button>
                                </YLBtnBar> 
                                
                            </SSBlackBX>    */}
                            {/* End of Remove Liquidity popup  */}




                            {/* your liquidity popup 01 
<SSBlackBX className="orngBR heiFix01">   
<SwapTitle01 className="smTitle"> <span>  Add Liquidity  </span><PPClosBTN01  />   </SwapTitle01> 

<YLBtnBar>
<SwapBTN01 className="orangBack">Add Liquidity</SwapBTN01>   </YLBtnBar> 

<SwapTitle01 style={{marginTop : '14px'}} > Your liquidity <i className="fas helpIco fa-question-circle" data-tip='Content Coming Soon'></i>   </SwapTitle01>   

<SwapInputMbx>
                                    <ConnectWallText>   Connect to a wallet to view  your liquidity </ConnectWallText>
                                </SwapInputMbx>
                                <SSLinkbox01>
                                    Don't see the pool you joined?  <br />
                                    <a href=''>Import it</a>
                                </SSLinkbox01> 
                              
                               
                                
                            </SSBlackBX>   */}
                            {/* End of your liquidity popup 01  */}



                            {/* your liquidity popup 02 
                            <SSBlackBX className="orngBR">
                                <SwapTitle01 className="smTitle">
                                    <span>
                                        Your Liquidity<i className="fas helpIco fa-question-circle" data-tip='Content Coming Soon'></i>  </span><PPClosBTN01 />
                                </SwapTitle01>
                                <YLMBX className="mtFix01">
                                    <YLTitle01>
                                        <span> <i> <img src={YLIcon01} alt="" />  </i> <i> <img src={YLIcon02} alt="" />  </i>
                                        </span>
                                        bSWAP/BNB
                                    </YLTitle01>
                                    <YLTitle02>Pooled bSWAP:
                                        <img src={YLIcon01} alt="" />
                                    </YLTitle02>
                                    <YLTitle02>Pooled BNB:
                                        <img src={YLIcon02} alt="" />
                                    </YLTitle02>
                                    <YLTitle02>Your pool tokens:</YLTitle02>
                                    <YLTitle02>Your pool shared:</YLTitle02>
                                    <YLBtnBar>
                                        <a href="#" class="ylBTN01"> View pool information <i className="fas fa-external-link-alt"></i></a>
                                    </YLBtnBar>
                                    <YLBtnBar>
                                        <button class="ylBTN02">Add </button>
                                        <button class="ylBTN02">Remove </button>
                                    </YLBtnBar>
                                </YLMBX>
                                <YLBtnBar style={{ paddingBottom: '0px' }}>
                                    <span>
                                        Don't see the pool you joined? <br /> <a href="#" class="ylBTN01">Import it</a> </span>
                                </YLBtnBar>

                            </SSBlackBX> */}
                            {/* End of your liquidity popup 02  */}


                            {/* Vote popup 01  */}
                            <SSBlackBX>

                                <TabMBX01>
                                    <a href='javascript:void(0);' className={" " + (this.state.index === 1 ? "active" : "")} onClick={() => this.onToggle(1)}>Vote</a>
                                    |
                                    <a href='javascript:void(0);' className={" " + (this.state.index === 2 ? "active" : "")} onClick={() => this.onToggle(2)}>Add New Vote</a>
                                    <PPClosBTN01 />
                                </TabMBX01>

                                <Collapse className={"collapse wow fadeInUp " + (this.state.index === 1 ? "active" : "")}
                                    isOpen={this.state.index === 1} data-wow-delay="0.1s"
                                    onChange={({ state }) => { this.setState({ item1: state }); }}
                                    onInit={({ state }) => { this.setState({ item1: state }); }}>



                                    <TabMBX02>
                                        <a href='#' className={" " + (this.state.index === 1 ? "active" : "")} onClick={() => this.onToggle02(1)}>Active proposal</a>
                                        <a href="#" className={" " + (this.state.index === 2 ? "active" : "")} onClick={() => this.onToggle02(2)}>Completed votes</a>
                                    </TabMBX02>

                                    <Collapse className={"collapse wow fadeInUp " + (this.state.underTab === 1 ? "active" : "")}
                                        isOpen={this.state.underTab === 1} data-wow-delay="0.1s"
                                        onChange={({ state }) => { this.setState({ item1: state }); }}
                                        onInit={({ state }) => { this.setState({ item1: state }); }}>
                                        <TabText01>
                                            Change circuit breakers from 10% pre day for all transaction to 0%
                                        </TabText01>

                                        <TabTitle01>
                                            Time to vote
                                        </TabTitle01>
                                        <TabTimer>
                                            <span>1</span><span>1</span>:<span>2</span><span>4</span>:<span>5</span><span>6</span>:<span>5</span><span>6</span>
                                        </TabTimer>

                                        <YLBtnBar>
                                            <button class="ylBTN04">Nay </button>
                                            <button class="ylBTN03">Yea </button>
                                        </YLBtnBar>
                                    </Collapse>

                                    <Collapse className={"collapse wow fadeInUp " + (this.state.underTab === 2 ? "active" : "")}
                                        isOpen={this.state.underTab === 2} data-wow-delay="0.1s"
                                        onChange={({ state }) => { this.setState({ item2: state }); }}
                                        onInit={({ state }) => { this.setState({ item2: state }); }}>
                                        <TabText02>
                                            <p>Change circuit breakers from 10% pre day for all transaction to 0%</p>
                                            <span>Ends Jul 1, 2021 20:45</span>
                                        </TabText02>

                                        <TabText02>
                                            <p>Proposal to Boost the SMART-USDC farm and a New bSWAP Pool</p>
                                            <span>Ends Jul 1, 2021 20:45</span>
                                        </TabText02>



                                    </Collapse>
                                </Collapse>

                                <Collapse className={"collapse wow fadeInUp " + (this.state.index === 2 ? "active" : "")}
                                    isOpen={this.state.index === 2} data-wow-delay="0.1s"
                                    onChange={({ state }) => { this.setState({ item2: state }); }}
                                    onInit={({ state }) => { this.setState({ item2: state }); }}>
                                    <TabSelBX>
                                        <select name="select" id="select">
                                            <option value="1">A rule</option>
                                            <option value="2">B rule</option>
                                            <option value="3">C rule</option>
                                        </select>
                                    </TabSelBX>

                                    <TabFormBX>
                                        <input type="text" name="" placeholder="The change" />

                                    </TabFormBX>

                                    <TabFormBX02>
                                        <textarea name="textarea" id="textarea"></textarea>

                                    </TabFormBX02>


                                    <SwapBTN01 className="orangBack">Add New Vote</SwapBTN01>
                                </Collapse>






                            </SSBlackBX>
                            {/* End of Vote popup 01  */}







                            <SSswapSBX02  style={{ width: '100%', paddingLeft: '0px', paddingRight:'0px'}}>
                                <YLTitle02 className='v3'>Price
                                    <span>
                                        1 bSWAP = 922 BNB <br />
                                        1 BNB = 0.00252 bSWAP</span>
                                </YLTitle02>
                            </SSswapSBX02>


                        </SSswapSBX02>


                    </SSswapMBX>


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
                <ReactTooltip effect="solid" className="myTip" />
            </>
        );
    }

    onToggle = index =>
        this.setState(state => ({ index: state.index === index ? null : index }));

        onToggle02 = underTab =>
        this.setState(state => ({ underTab: state.underTab === underTab ? null : underTab }));
}



// Common Style Div 


const FlexDiv = styled.div`
display: flex; align-items: center; justify-content:center; flex-wrap:wrap;

.collapse { width: 100%; }
`;

const SSswapMBX = styled(FlexDiv)`
    width: 100%; max-width:1080px; margin:170px auto 80px auto; align-items:flex-start; 

    &.topmFix01{ margin-top:70px; margin-bottom:60px;}
    ${Media.xs} { &.topmFix01{ margin-top:10px; margin-bottom:20px;}}
`

const SSNTitle01 = styled(FlexDiv)`

    width: 100%; font:300 32px/40px 'Press Start 2P',arial; color:#fff;

    span{ font:300 18px/32px 'IBM Plex Mono', monospace; display:block; color:#8e9195; width:100%; text-align:center; padding-top:10px; margin:0px 15px;
        ${Media.sm} { font-size:16px; line-height:26px;}
    }
    ${Media.sm} { font-size:21px; }
`


const SSswapSBX01 = styled(FlexDiv)`
    width: 65%; padding:0 15px; justify-content:flex-start;

    &.borRight{ border-right:1px solid #16191e;}
    ${Media.md}  { width:100%; padding-bottom:13px; margin-bottom:30px; &.borRight{ border-right:none; border-bottom:1px solid #16191e;}  }
`
const SSswapSBX02 = styled(FlexDiv)`
    width: 35%; padding:0 15px; justify-content:flex-start;
    ${Media.md} { width:100%; }
`
const SSBlackBX = styled(FlexDiv)`
    background-color: #16191e; border: 2px solid #000;  padding:26px; border-radius: 10px; width: 100%; flex-direction:column; position:relative;

    &.heiFix01{ min-height:438px; justify-content: flex-start;}
    &.orngBR{ border-color:#8be05a; -webkit-box-shadow: 0 0 20px 1px rgba(254,187,0,0.4); box-shadow: 0 0 20px 1px rgba(254,187,0,0.4);}
    ${Media.xs} { padding:10px; }
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
 ${Media.sm} { width:100%; justify-content:space-between; padding-bottom:10px; flex-direction: row;   }
 ${Media.xs} {  flex-direction:row; flex-wrap:nowrap;  }
 `
const SSBTN01 = styled.button`
    display:inline-flex; font-size: 14px; color: #fff; margin-left:12px; align-items:center; justify-content:center; 
    &:last-child{margin-right:10px}
    & img{ margin-right:8px;}
    & .fas {  margin-left: 12px; }
    &.v2{ font-weight:700; min-width:} 

    &.v2.marFix003{ margin-left:68px;}
    ${Media.sm} { margin-left:6px; }
    ${Media.xs} { margin-left:0;  display:flex; max-width:50%; ; &.v2{ margin-right:6px;}   }
`
const SSTitle01 = styled(FlexDiv)`
    width:100%; justify-content:flex-start; font-size:11px; color: #8e9195; margin:10px 0 10px 0; 
    .redC{ color: #c32b2d;}
    .greenC{ color: #8db610;} 
    p{ margin:0 0 6px 0;} 

    &.marginFix{ margin-bottom:42px; } 
    &.marginFix2{ margin-bottom:42px; color: #ababab; font-size:12px; & a{ font-size:12px; cursor: pointer;}
        .first-div{display:inline-block;
            .helpIco {
                ${Media.sm}{
                    position: relative; right: 0px; top: -9px;
                }
            }
        }
    } 
    

    & a{color: #8e9195; margin:0 10px;  
        ${Media.sm}{ 
            margin:0px 4px;
        }
        :hover{ text-decoration:underline; color:#8be05a; }
    }
    & a.maxBotton{  color: #8be05a; margin:0 10px;  :hover{ color:#fe9500; cursor: pointer; }} 
    .helpIco {
    position: relative;
    right: 0px;
    top: -9px; } 
    ${Media.md}{
        display:inline-block;
    }
    ${Media.sm} { flex-direction:column; position:relative; line-height:24px; 
                .helpIco{ position:absolute; top: 0px; right: 22%;}
            }
    ${Media.sm}{.helpIco{right: 4%;} }
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
  font:700 16px/18px 'IBM Plex Mono', arial; color:#fff; margin-bottom:6px;  position:relative; justify-content:flex-start; width:100%;

  img{margin:0 16px 0 0; } 
  .helpIco{ position:relative; left:6px; font-size:14px;}
`;

const SwapInputMbx = styled(FlexDiv)`
    border:2px solid #545861; border-radius: 10px; min-height:90px; padding:12px 14px;  margin:10px 0;


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
    display:flex; align-items:center; justify-content: flex-start; flex-direction:column; color:#fff; border:none; background-color: #8be05a;
     width:152px; height:152px; padding:15px; border-radius:80px;
     
    .imgBox01{ margin-bottom:12px } 

    :hover{  background-color: #e4a802;} 

`;

const SwapLinkbx = styled(FlexDiv)`
  font-size:12px; color:#ababab; font-weight:400; min-height:46px;  width:100%; max-width: 430px;

  a{color:#ababab; margin:0 6px; 
    :hover{ color:#8be05a;}
   }
     
`;


const RLTitle01 = styled(FlexDiv)`
width:100%; justify-content: space-between; font-size:14px; font-weight:700; color:#fff; margin:22px 0 13px 0; 

a{ color:#8be05a; :hover{ text-decoration:underline;}} 
    &.v2{ margin:0 0 10px 0; font:400 24px/18px 'Press Start 2P', sans-serif; color:#fff;}

`
const DragorInput = styled.div` 
position:relative;width:100%;height:56px;padding-top:0; padding-bottom:0;
 
.input-range__slider{-webkit-appearance:none;appearance:none;background:#8be05a;  cursor:pointer;display:block;
  margin-left:-0.5rem;margin-top:-0.65rem; color: #fff !important; font-weight: 700; outline:none;position:absolute;top:50%;transition:transform 0.3s ease-out, box-shadow 0.3s ease-out; border-radius:50%; width:3rem; height:3rem; font-weight: 400; transform: translateY(-22px); border:4px solid #fff; transform: translateY(-26px) translateX(-6px);}
 
.input-range__slider:focus{box-shadow:0 0 0 5px rgba(63, 81, 181, 0.2);}
.input-range__slider-container{transition:left 0.3s ease-out; z-index: 100;}
.input-range__label{color:#aaaaaa; font-size:16px;transform:translateZ(0);white-space:nowrap;}
.input-range__label--min,.input-range__label--max{bottom:-1.4rem;position:absolute;}
.input-range__label--min{left:12px; top:7px; z-index: 2;}
.input-range__label--max{right:23px; top:7px;}
.input-range__label--value{position:absolute;top:-21px;z-index:2;color:#fff;left:9px; pointer-events: none;}
.input-range__label-container{left:-50%;position:relative; color:#fff; font:500 14px/20px 'IBM Plex Mono', arial; pointer-events: none; }
.input-range__label--max .input-range__label-container{left:50%;}
.input-range__track{background:#393d46; cursor:pointer;display:block;height:26px;position:relative;transition:left 0.3s ease-out, width 0.3s ease-out; border-radius:15px;}
.input-range__track--background{left:0;margin-top:-0.15rem;position:absolute;right:0;top:50%;}
.input-range__track--active{background:#8be05a;}
.input-range{height:1rem;position:relative;width:100%;}
.input-range__label--value .input-range__label-container{ color:#000; font-weight: 700; font-size:14px; } 
`

const RLBTNBX = styled(FlexDiv)`
    width:100%; justify-content:space-between;  margin-bottom:12px;

    button{ width:calc(25% - 10px); background-color:#2d3037; color:#8e9195; padding:4px; border-radius:6px;  font-size:11px; font-weight:400; 
        :hover, &.active{ background-color:#34383f; color:#fff;} 
    } 
`
const YLMBX = styled(FlexDiv)`
    width:100%;  border:2px solid #545861;  border-radius:10px; padding:15px 15px 8px 15px;

    &.v2{ border:0 solid #545861;  border-radius:10px; padding:0px 0 8px 0; }

    &.mtFix01{ margin-top:6px;}

`
const YLTitle02 = styled(FlexDiv)`
 justify-content:space-between; width:100%; font-size:14px; font-weight:400; color:#fff; min-height:38px; 
   &.v2{ font-size:14px; font-weight:400;  span{ display:flex; align-items:center; justify-content:space-between; 
        img{ margin-right:6px;}
        }
    } 
    &.v3{ align-items:flex-start; margin-top:10px; line-height:18px; font-size:12px; font-weight:700; color:#8e9195;   span{ text-align:right;
        }
    } 
`
const YLBtnBar = styled(FlexDiv)`
    align-items:center; padding:10px 0;  justify-content:space-between; width:100%; font-size:14px; font-weight:400; color:#fff; 
 .ylBTN01{ color:#8be05a; margin:0 auto; :hover{ text-decoration:underline;} }
 .ylBTN02{ background-color:#5d6168; text-align:center; font-weight:700; color:#fff; border-radius:10px; display:inline-block; padding:12px 10px; width:48%; :hover{  background-color:#4f545c; } 
}
.ylBTN03{background-color:#8be05a; color:#fff;   text-align:center; font-weight:700; color:#fff; border-radius:10px; display:inline-block; padding:12px 10px; width:48%; :hover{  background-color:#6cc837; }  }
.ylBTN04{background-color:#c32b2d; color:#fff;   text-align:center; font-weight:700; color:#fff; border-radius:10px; display:inline-block; padding:12px 10px; width:48%; :hover{  background-color:#ae1719; }  }

 span{ margin:0 auto; color:#565a69; font-size:12px; width:100%; text-align:center; } 
`
const AeroBX = styled(FlexDiv)`
    width:100%; color:#565a69; font-size:15px; padding-bottom:8px;

`
const PPClosBTN01 = styled.button`
 width:20px; height:20px; border:0px; outline:none;  color:#fff; background:url(${Xbtn}) left top no-repeat; position:absolute; right:0px;
 transition: 0.5s ease all;
 :hover{ opacity:0.7; transform: rotate(180deg );} 
`;
const ConnectWallText = styled(FlexDiv)`
    width:100%; max-width:260px; font-size:14px; color:#565a69; text-align:center; font-weight:400; 
`;
const SSLinkbox01 = styled(FlexDiv)`
    width:100%;  font-size:12px; color:#565a69; text-align:center; font-weight:400; padding:15px 0; flex-direction:column;

    & a{ color:#8be05a; margin-left:4px;  :hover{ text-decoration:underline;} }
`;
const YLTitle01 = styled(FlexDiv)`
    justify-content:flex-start; width:100%; font-size:18px; font-weight:700; color:#fff; margin-bottom:10px; 
    span{ margin-right:8px; display:inline-flex; align-items:center; justify-content:flex-start;}
    i{ width:24px; height:24px; display:inline-flex; align-items:center; justify-content:center; margin-right:1px;} 
`

const TabMBX01 = styled(FlexDiv)`
    width:100%; justify-content:flex-start; font-size:16px; color:#545861; position:relative; 

    a{ color:#fff; font-weight:500; font-size:16px; margin:0 8px; 
        :hover, &.active{ color:#8be05a;}
        &:nth-child(01){ margin-left:0;}
    }
`
const TabMBX02 = styled(FlexDiv)`
    width:100%; justify-content:flex-start; font-size:16px; color:#545861; position:relative; margin:10px 0;

    a{ color:#fff; font-weight:700; font-size:12px; margin:0; width:50%; text-align:center; line-height:30px; border-bottom:3px solid #545861; padding:10px 0;
        :hover, &.active{ color:#8be05a; border-color:#8be05a;}
        &:nth-child(01){ margin-left:0;}
    }
`
const TabText01 = styled(FlexDiv)`
    font-size:14px; color:#fff; font-weight:400; line-height:24px; padding:10px; min-height:130px; align-items:flex-start;
`


const TabText02 = styled(FlexDiv)`
    font-size:14px; color:#fff; font-weight:400; line-height:24px; padding:18px 10px 28px 10px;  align-items:flex-start; border-bottom:1px solid #282b31;
    &:nth-last-child(01){ border-bottom:none;}
    p{ margin-bottom:0;}
    span{ display:block; width:100%; color:#fff; font-size:12px; color:#9a9a9a;}
`
const TabTitle01 = styled(FlexDiv)`
width:100%; font-size:16px; color:#fff; font-weight:700; line-height:30px; justify-content:flex-start; padding:10px;
`
const TabTimer = styled(FlexDiv)` 
width:100%; font-size:14px; color:#fff; font-weight:600; line-height:24px; justify-content:flex-start; padding:0 10px 10px 10px;
    span{display: inline-flex; align-items: center; justify-content:center; padding:0 5px; border:1px solid #43474f; border-radius:4px; margin:3px;
    &:nth-child(01) { margin-left:0;}
    } 
`

const TabSelBX = styled(FlexDiv)`
    position:relative; width:100%; height:46px; border:2px solid #545861; margin:30px 0 16px 0; padding:0 4px; border-radius:10px; 
    select{ width:100%; height:46px; border-radius:10px; border:0px; background-color:transparent; color:#8e9195; 
     option { background-color:#000; color:#fff; font-size:16px; line-height:24px; padding:6px; } 
    } 
`

const TabFormBX = styled(FlexDiv)`

position:relative; width:100%; height:46px; border:2px solid #545861; margin:5px 0 16px 0; padding:0 4px; border-radius:10px; 

    input{ width:100%; height:46px; border-radius:10px; border:0px; background-color:transparent; color:#8e9195; }
    textarea{ width:100%; height:46px; border-radius:10px; border:0px; background-color:transparent; color:#8e9195; }

`
const TabFormBX02 = styled(FlexDiv)`

position:relative; width:100%; height:auto; border:2px solid #545861; margin:5px 0 36px 0; padding:0 4px; border-radius:10px; 

    textarea{ width:100%; height:102px; border-radius:10px; border:0px; background-color:transparent; color:#8e9195; }

`







export default Page08;