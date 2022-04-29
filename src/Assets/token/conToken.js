import TokenIco01 from '../../Assets/images/selectTkn-01.png'
import TokenIco02 from '../../Assets/images/selectTkn-02.png'
import TokenIco03 from '../../Assets/images/selectTkn-03.png'
import degen_token from '../../Assets/images/Degen_token.png';
import TokenIco04 from '../../Assets/images/selectTkn-04.png'
import TokenIco05 from '../../Assets/images/selectTkn-05.png'
import TokenIco06 from '../../Assets/images/selectTkn-06.png'
import TokenIco07 from '../../Assets/images/selectTkn-07.png'
import SSIcon06 from '../../Assets/images/ethRedioICON.png'
import bnb from '../../Assets/images/bnb-icon.png';
import { TEST_WETH, TEST_WBNB } from '../../constants'

export const coinTOken_array = [
    //{ name: 'ETH', image: SSIcon06 , value: '0x0000000000000000000000000000000000000000'},
    { name: 'BNB', chain:'BSC', image: TokenIco01  , value: '0x0000000000000000000000000000000000000000', balance: 0},
    { name: 'BVBV', chain:'BSC', image: TokenIco02 , value: '0xAe0354F143Ad57843359fb32966F48A4693B3D76', balance: 0},
    { name: 'AVAV', chain:'BSC', image: TokenIco02 , value: '0x6484eBf9880eFD0e226a31cB2Cd4fbc12b31C757', balance: 0},
    { name: 'JNTR/b', chain:'BSC', image: TokenIco07 , value: '0x001667842Cc59CAdB0A335bf7c7f77b3C75f41c2', balance: 0},
    //{ name: 'WETH', image: TokenIco07 , value: ' 0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',}

    { name: 'ETH', chain:'Ethereum', image: SSIcon06 , value: '0x0000000000000000000000000000000000000000', balance: 0},
    { name: 'BVBV', chain:'Ethereum', image: TokenIco02 , value: '0x422c9EeE99b40775c258bF1AEED4528F0A8b380E', balance: 0},
    { name: 'AVAV',chain:'Ethereum', image: TokenIco02 , value: '0x116699E5E9aE620Ad11CaAcb3dc5982ecfB49152', balance: 0},
    { name: 'TK',chain:'Ethereum', image: TokenIco02 , value: '0x47A530f3Fa882502344DC491549cA9c058dbC7Da', balance: 0},

    // { value: '0x0000000000000000000000000000000000000000', label: 'ETH' },
    //     { value: '0xad6d458402f60fd3bd25163575031acdce07538d', label: 'DAI' },
    //     { value: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', label: 'UNI' },
    //     { value: '0xc778417e063141139fce010982780140aa0cd5ab', label: 'WETH' }
];

export const devEthList = [
    { symbol: 'ETH', name: 'ETH', chain:'Ethereum', image: SSIcon06 , value: '0x0000000000000000000000000000000000000000', balance: 0},
    { symbol: 'BVBV', name: 'BVBV', chain:'Ethereum', image: TokenIco02 , value: '0x422c9EeE99b40775c258bF1AEED4528F0A8b380E', balance: 0},
    { symbol: 'AVAV', name: 'AVAV',chain:'Ethereum', image: TokenIco02 , value: '0x116699E5E9aE620Ad11CaAcb3dc5982ecfB49152', balance: 0},
    { symbol: 'TK', name: 'TK',chain:'Ethereum', image: TokenIco02 , value: '0x47A530f3Fa882502344DC491549cA9c058dbC7Da', balance: 0},
];
export const devBscList = [{ symbol: 'BNB', name: 'BNB', chain: 'bsc', address: '0x0000000000000000000000000000000000000000', value: '0x0000000000000000000000000000000000000000', image: bnb }, { symbol: 'DEGEN', name: 'DEGENSWAP Token', chain: 'bsc', address: '0x1Eea643fc6C0B4D253621839986fc566Fce40704', value: '0x1Eea643fc6C0B4D253621839986fc566Fce40704', image: degen_token }]
// [
//     { symbol: 'BNB', name: 'BNB', chain:'BSC', image: TokenIco01  , value: '0x0000000000000000000000000000000000000000', balance: 0},
//     { symbol: 'BVBV', name: 'BVBV', chain:'BSC', image: TokenIco02 , value: '0xAe0354F143Ad57843359fb32966F48A4693B3D76', balance: 0},
//     { symbol: 'AVAV', name: 'AVAV', chain:'BSC', image: TokenIco02 , value: '0x6484eBf9880eFD0e226a31cB2Cd4fbc12b31C757', balance: 0},
//     { symbol: 'JNTR/b', name: 'JNTR/b', chain:'BSC', image: TokenIco07 , value: '0x001667842Cc59CAdB0A335bf7c7f77b3C75f41c2', balance: 0},
// ];

export const chain_array = [
    { name: 'Ethereum', chain: 'Ethereum', image: SSIcon06 , value: '0x0E11862a0Da0C38F15568A8FA2C992Afc1f0b278'},
    { name: 'BSC', chain: 'BSC',  image: TokenIco01  , value: '0x078F9018a2fF0D7a0FE919Ff6e4d2485a0d78d8c'},
];