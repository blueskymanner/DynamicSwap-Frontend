import React  from 'react';
import styled from 'styled-components';
import Modal from '../modal';
import Media from '../../Theme/media-breackpoint'
// icon images
import CoinIco01 from '../../Assets/images/coinicon-uniswap.png'
import CoinIco02 from '../../Assets/images/coinicon-defiswap.png'
import CoinIco03 from '../../Assets/images/coinicon-miniswap.png'
import CoinIco04 from '../../Assets/images/coinicon-pancakeswap.png'
import CoinIco05 from '../../Assets/images/coinicon-sushiswap.png'
import Collapse from '@kunukn/react-collapse';

import ClsBTNIMG from '../../Assets/images/close-icon.png'
import SSICO01 from '../../Assets/images/ssICON-01.png'


 

export default function  SmartTknStack (props) { 
  
    const [grid, setShow] = React.useState(false); 

    return (
      

        <Modal isOpen={props.isOpen} dismiss={props.dismiss} hideBTN={true} > 
        <StakePopup>

         <McloseBTN01><i></i></McloseBTN01>

         <SPinputMBX>
            <SPinputSBX01>
                Token

                <div className="LiproDropdown">
                    <button className='LiproDDbtn01' onClick={() => setShow(!grid)} >
                        <div className="ddIconBX"> <span> <img src={SSICO01} alt="" /></span> ETH</div>
                        <i className="fas fa-caret-down"></i>
                    </button>
                    <div  className={'ddContainer ' + `${grid ? 'active' : ''}`}> 
                            <button className='LiproDDbtn01 v2'  >
                                <div className="ddIconBX"> <span> <img src={SSICO01} alt="" /></span> ETH</div>
                            </button>
                            <button className='LiproDDbtn01 v2'  >
                                <div className="ddIconBX"> <span> <img src={SSICO01} alt="" /></span> ETH</div>
                            </button> 
                    </div>
                </div>
            </SPinputSBX01>
            <SPinputSBX01>
            Amount to claim
                <SPinputSBX02> 
                    <input type="text" defaultValue="100,000" /> 
                    <i>Max: 145,656.3256 SMART</i>
                </SPinputSBX02>
            </SPinputSBX01>
        
         </SPinputMBX>

         <SPBTNbar>
             <button>Stake Now</button>
         </SPBTNbar>






 
        </StakePopup>


          
        
        
        
        </Modal>
        
    );
}
  

const FlexDiv = styled.div`
    display: flex; align-items: center; justify-content:center; flex-wrap:wrap; width:100%; 
`;

const StakePopup = styled(FlexDiv)` 
    max-width:980px; background-color:#2c2f36; border:2px solid #000; border-radius:10px; padding:38px; position:relative; margin:0 auto;
    ${Media.md}{
        margin:0px 15px; max-width:100%; width:auto; padding:15px;
    }
`

const McloseBTN01 = styled(FlexDiv)`
    width:48px; height:48px; border-radius:0 9px 0 9px; position:absolute; right:0; top:0px; background-color:#000000; cursor:pointer; 
    :hover i{  transform:rotate(180deg);  } 
    i{ width:18px; height:18px; background:url(${ClsBTNIMG}) 50% 50% no-repeat; display:block;  transition:all 0.4s ease-out; } 
`
const SPinputMBX = styled(FlexDiv)`
    max-width:744px; margin:60px auto 30px auto;  
`
const SPinputSBX01 = styled(FlexDiv)`
    font-size:18px; font-weight:700; justify-content:space-between;  margin-bottom:20px;

    
.LiproDropdown{ width: 100%; max-width:482px; height: 62px; background-color: transparent; border: 2px solid #545861; border-radius: 10px; position: relative; 
    ${Media.sm}{
        max-width:100%;
    }
}
.LiproDDbtn01 { display: flex;  width: 100%; align-items: center; justify-content: space-between; background-color: transparent; border: 0; font-size: 18px; color: #fff; height: 62px; padding: 5px 20px;

    &.v2:hover{ background-color: #171c26; }

}
.ddIconBX { display: flex; align-items: center; justify-content: flex-start;}
.ddIconBX span { width: 40px; height: 40px;  border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 10px 0 0;}
.ddContainer { background-color: rgba(0, 0, 0, 0.8); z-index: 2; position: absolute; left: 0; right: 0; top: calc(100% + 5px); border-radius: 10px; overflow: hidden;opacity:0; visibility: hidden; transition:all 0.4s ease;}
.ddContainer.active{ opacity:1; visibility: visible; }  
`

const SPinputSBX02 = styled(FlexDiv)`
    max-width:482px; flex-direction:column; align-items:flex-start; 
    ${Media.sm}{
        max-width:100%;
    }
    input{width: 100%; color:#fff; font-size:18px; padding:16px 20px; height: 62px; background-color: transparent; border: 2px solid #545861; border-radius: 10px; } 
    i{ color:#9a9a9a; font-size:11px; font-style:normal; padding:15px 0 0 20px; } 
`
const SPBTNbar = styled(FlexDiv)`
    padding:10px 0; 
    button{ width:100%; padding:30px 20px; font:normal 24px/30px 'Press Start 2P', arial; color:#fff; background-color:#8be05a; border-radius: 10px;  
        ${Media.sm}{
            font-size:16px; line-height:20px;
        }
        :hover{ background-color:#fea100;}  
        &.grayBTN{ background-color:#383b42; color:#c32b1c; :hover{ background-color:#363c4a;}
    }

}

`














