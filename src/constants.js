export const CHAINS = {
    Mainnet: '0x1',
    Kovan: '0x42',
    Ropsten: '0x3',
    Rinkeby: '0x4',
    Goerli: '0x5',
    BSCTESTNET: '0x61',
    BSCMAINNET: '0x38'
};

const getEnvType = () => {
    return 'production';
}

export const BSWAP_FACTORY = getEnvType() === 'development' ? '0xCe8fd65646F2a2a897755A1188C04aCe94D2B8D0' : '0xCe8fd65646F2a2a897755A1188C04aCe94D2B8D0';
export const localprovide = 'http://localhost:3001';
export const LARGE_APPROVAL_AMOUNT = 1000;
export const bsc_contract_address = getEnvType() == 'development' ? '0x632f263107868F20ba2b31BF84d5517148c5AaF6' : '0x32e43563d2df6a0a953c9a501c61b49e91bbbebb';//'0x345B0c2D5F24E10f9C4C641446082cBFa33D952f';  // BSC CONTRACT
export const eth_contract_address = getEnvType() == 'development' ? '0xB2982a10cEB968137977dcAd6A945cd714f5dEdc' : '0xd85a4ac007cf06a4bf8daef180efe522096bceed';//'0xdB311dE19163F1730B8DeBE4C7C610866b659405'; // ETH CONTRACT
//test
// export const TEST_WETH = getEnvType() == 'development' ? '0xc778417E063141139Fce010982780140Aa0cD5Ab' : '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' ;
// export const TEST_WBNB = getEnvType() == 'development' ? '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd': '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c' ;

export const API_URL= getEnvType() == 'development' ? 'http://52.70.198.55:5000/api/DEGEN/' : 'https://api.degenswap.io/';

// page1
// export const UNISWAP_FACTORY = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
// export const UNISWAP_ROUTER = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';

// export const WETH = '0xc778417E063141139Fce010982780140Aa0cD5Ab';  ///  test net
// export const WBNB = '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd';

export const WETH = getEnvType() == 'development' ? '0xc778417E063141139Fce010982780140Aa0cD5Ab' : '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';  /// main net
export const WBNB = getEnvType() == 'development' ? '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd' : '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';


// export const SUSHISWAP_ROUTER = '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506';
// export const SUSHISWAP_FACTORY = '0xc35DADB65012eC5796536bD9864eD8773aBc74C4';
// export const PANCAKE_ROUTER = '0xD99D1c33F9fC3444f8101754aBC46c52416550D1';
// export const PANCAKE_FACTORY = '0x6725F303b657a9451d8BA641348b6761A6CC7a17';
// export const BNB_USDT = '0x536Ed4aaf8fBe8e35CDDd04b1928882FA292C282';
// export const ETH_USDT = '0x47A530f3Fa882502344DC491549cA9c058dbC7Da';

export const MAIN_ZERO_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const UNISWAP_FACTORY = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
export const UNISWAP_ROUTER = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
export const SUSHISWAP_ROUTER = getEnvType() == 'development' ? '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506' : '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F';
export const PANCAKE_ROUTER = getEnvType() == 'development' ? '0xD99D1c33F9fC3444f8101754aBC46c52416550D1' : '0x10ED43C718714eb63d5aA57B78B54704E256024E';
export const PANCAKE_FACTORY = getEnvType() == 'development' ? '0x6725F303b657a9451d8BA641348b6761A6CC7a17' : '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73';
export const SUSHISWAP_FACTORY = getEnvType() == 'development' ? '0xc35DADB65012eC5796536bD9864eD8773aBc74C4' : '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac';
export const TEST_WETH = getEnvType() == 'development' ? '0xc778417E063141139Fce010982780140Aa0cD5Ab' : '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' ;
export const TEST_WBNB = getEnvType() == 'development' ? '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd': '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c' ;

export const BNB_USDT = getEnvType() == 'development' ? '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd' : '0x55d398326f99059fF775485246999027B3197955';
export const ETH_USDT = getEnvType() == 'development' ? '0x110a13FC3efE6A245B50102D2d79B3E76125Ae83' : '0xdAC17F958D2ee523a2206206994597C13D831ec7';

export const ethConnectionUrl = getEnvType() == 'development' ? "https://ropsten.infura.io/v3/e3706a59ed38418095f619d56df648e0" : "https://mainnet.infura.io/v3/e3706a59ed38418095f619d56df648e0";
export const bnbConnectionUrl = getEnvType() == 'development' ? "https://data-seed-prebsc-1-s1.binance.org:8545" : "https://bsc-dataseed.binance.org";