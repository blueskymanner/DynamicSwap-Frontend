import { BNB_USDT, ETH_USDT, PANCAKE_FACTORY, PANCAKE_ROUTER, SUSHISWAP_FACTORY, SUSHISWAP_ROUTER, TEST_WBNB, TEST_WETH, UNISWAP_FACTORY, UNISWAP_ROUTER, ethConnectionUrl, bnbConnectionUrl, ZERO_ADDRESS, MAIN_ZERO_ADDRESS } from "../constants";
import factoryAbi from '../abi/factory.json';
import Web3 from 'web3';
import uniswapAbi from '../Assets/Abi/uniswap.json';
import pairAbi from '../Assets/Abi/pairAbi.json';
import ERC20 from '../Assets/Abi/ERC20.json';
import dynamicAbi from '../abi/dynamicPairAbi.json';
//import { getDecimal } from "../service/degen_function";
import fromExponential from "from-exponential";
 import { BSwapfactoryContractAddress } from "../Assets/Abi/ContractAbi";
// export const ethConnectionUrl = "https://mainnet.infura.io/v3/e3706a59ed38418095f619d56df648e0";
// export const bnbConnectionUrl = "https://bsc-dataseed.binance.org";

export const replaceWithBnb = addr => [MAIN_ZERO_ADDRESS, ZERO_ADDRESS].includes(addr) ? TEST_WBNB : addr;

export const getPair = async (from, to, factoryContract = UNISWAP_FACTORY) => {
    try{
        const wallet = localStorage.getItem('account');
        const factory = new window.web3.eth.Contract(factoryAbi, factoryContract);
        const pair = await factory.methods.getPair(from, to).call({ from: wallet });
        return pair;
    }catch(e){
        console.log(e);
        return '0x0000000000000000000000000000000000000000';
    };
};

export const getReservesRatio = async (from, pairAddress, short = false) => {
    try{
        const wallet = localStorage.getItem('account');
        const tokenPair = new window.web3.eth.Contract(pairAbi, pairAddress);
        const token0 = await tokenPair.methods.token0().call({ from: wallet });
        const reserve = await tokenPair.methods.getReserves().call({ from: wallet });
        if(short) return String(token0).toLowerCase() === String(from).toLowerCase() ?  reserve._reserve0 : reserve._reserve1;
        return String(token0).toLowerCase() === String(from).toLowerCase() ?  reserve._reserve0 / reserve._reserve1 : reserve._reserve1 / reserve._reserve0;
    }catch(e){
        return 0;
    };
};


export const getImpact = async (from, to, fromAmt, toAmt, factory) => {
    if(!fromAmt || !toAmt) return 0;
    let reserveRatio;
    fromAmt = window.web3.utils.toWei(String(fromAmt));
    toAmt = window.web3.utils.toWei(String(toAmt));
    const swapFee = factory === PANCAKE_FACTORY ? 0.25 : 0.3;
    const pairAddress = await getPair(from, to, factory);
    const r = await getReservesRatio(from, pairAddress);
    if(pairAddress !== '0x0000000000000000000000000000000000000000') reserveRatio = (await getReservesRatio(from, pairAddress));
    else{
        const mediator = factory === PANCAKE_FACTORY ? TEST_WBNB : TEST_WETH ;
        const pairAB = (await getPair(from, mediator, factory));
        const pairBC = (await getPair(mediator, to, factory));
        const ratioAB = (await getReservesRatio(from, pairAB));
        const ratioBC = (await getReservesRatio(mediator, pairBC));
        reserveRatio = ratioAB * ratioBC;
    };
    const amtRatio = fromAmt / toAmt;
    return (1 - (reserveRatio / amtRatio)) * 100 - swapFee;
};

export const toBig = num => window.web3.utils.toBN((num));



export const getAmountOut = ({
    fromToken, toToken, amount, router = UNISWAP_ROUTER, 
    abi = uniswapAbi, factoryContract = UNISWAP_FACTORY,
    isBsc = false, web3Instance = null,
}) => new Promise((resolve, reject) => {

    console.log('inside amount out function')
    const userwalletaddresss = localStorage.getItem('account');
    let factories = web3Instance ? new web3Instance.Contract(factoryAbi, factoryContract) : new window.web3.eth.Contract(factoryAbi,factoryContract);
    let path;
    let  swaping = web3Instance ? new web3Instance.Contract(abi, router) : new window.web3.eth.Contract(abi,router);
    factories.methods.getPair(fromToken,toToken).call({from:userwalletaddresss})
    .then((pairaddress)=>
    {
        if(pairaddress == '0x0000000000000000000000000000000000000000' && [fromToken, toToken].includes(isBsc ? TEST_WBNB : TEST_WETH)){
            resolve(['0', '0', false, true]);
        };
        if(pairaddress == '0x0000000000000000000000000000000000000000')
        { 
        
            let path = [fromToken,isBsc ? TEST_WBNB : TEST_WETH];
            let bal = web3Instance ? new web3Instance.Contract(ERC20, path[0]) : new window.web3.eth.Contract(ERC20,path[0]);
            bal.methods.decimals().call({from:userwalletaddresss}).then((number)=>
            {
                const multipied = String(fromExponential(amount * Math.pow(10, number)))
                let amountIn = toBig(multipied.split('.')[0]);
                swaping.methods.getAmountsOut(amountIn, path).call({from:userwalletaddresss})
                .then((res) => {
                let balance = web3Instance ? new web3Instance.Contract(ERC20, path[1]) : new window.web3.eth.Contract(ERC20,path[1]);
                balance.methods.decimals().call({from:userwalletaddresss}).then((numb)=>
                {
                    let amounts = (parseFloat(res[1])/(10**numb));
                    let path = [isBsc ? TEST_WBNB : TEST_WETH,toToken];
                    let bal = web3Instance ? new web3Instance.Contract(ERC20, path[0]) : new window.web3.eth.Contract(ERC20,path[0]);
                    bal.methods.decimals().call({from:userwalletaddresss}).then((number)=>
                    {
                        let amountIn = toBig(fromExponential((amounts) * Math.pow(10,number)));
                        swaping.methods.getAmountsOut(amountIn, path).call({from:userwalletaddresss})
                        .then((res) => {
                        let balance = web3Instance ? new web3Instance.Contract(ERC20, path[1]) : new window.web3.eth.Contract(ERC20,path[1]);
                        balance.methods.decimals().call({from:userwalletaddresss}).then((numb)=>
                        {
                            let amount = (parseFloat(res[1])/(10**numb));
                            resolve([amount, res[1], true]);
                        }).catch(e => {
                            if(e) reject(['0', '0']);
                        })
                        
                        }).catch(e => {
                            if(e) reject(['0', '0']);
                        })
                        .catch(e => {
                            if(e) reject(['0', '0']);
                        })
                    }).catch(e => {
                        if(e) reject(['0', '0']);
                    })
                }).catch()
                
                }).catch(e => {
                    if(e){
                        reject(['0', '0']);
                    }
                })
            }).catch(err => {
                reject(['0', '0']);
            });
        }else{
            let path = [fromToken, toToken];

            let bal = web3Instance ? new web3Instance.Contract(ERC20, path[0]) : new window.web3.eth.Contract(ERC20,path[0]);
            bal.methods.decimals().call({from:userwalletaddresss}).then((number)=>
            {
                const multipied = String(fromExponential(amount * Math.pow(10, number)))
                let amountIn = toBig(multipied.split('.')[0]);
                    swaping.methods.getAmountsOut(amountIn, path).call({from:userwalletaddresss})
                    .then((res) => {
                    let balance = web3Instance ? new web3Instance.Contract(ERC20, path[1]) : new window.web3.eth.Contract(ERC20,path[1]);
                    balance.methods.decimals().call({from:userwalletaddresss}).then((numb)=>
                    {
                        let amount = (parseFloat(res[1])/(10**numb));
                        resolve([amount, res[1]]);
                    }).catch(e => reject(['0', '0']))
                    
                    })
                    .catch(e => reject(['0', '0']))
            }).catch(e => reject(['0', '0']))
        }
    }).catch(err => {
        console.log(err);
        reject(['0', '0'])
    });


})

export const getAmountOutUni = async ({
    fromToken, toToken, amount, web3Instance
}) => {
    const amountOut = await getAmountOut({
        fromToken, toToken, amount, web3Instance
    });
    return amountOut;
}

export const getAmountOutSushi = async ({
    fromToken, toToken, amount, web3Instance
}) => {
    const amountOut = await getAmountOut({
        fromToken, toToken, amount,
        router: SUSHISWAP_ROUTER,
        factoryContract: SUSHISWAP_FACTORY,
        web3Instance
    })
    return amountOut;
};

export const getAmountOutPan = async ({
    fromToken, toToken, amount, web3Instance
}) => {
    
    const amountOut = await getAmountOut({
        fromToken, toToken, amount,
        router: PANCAKE_ROUTER, 
        factoryContract: PANCAKE_FACTORY,
        isBsc: true, web3Instance
    });
    return amountOut;
}

export const panUsdtAmount = async ({
    otherToken, usdtSide = 'from', amount, shoudldCreateInstance = false,
}) => {
    let web3Instance = null;
    if(shoudldCreateInstance) {
        const account = localStorage.getItem('account');
        web3Instance = new Web3(new Web3.providers.HttpProvider(bnbConnectionUrl)).eth;
        
    };
    return (await getAmountOutPan({
        fromToken: usdtSide === 'from' ? BNB_USDT : otherToken,
        toToken: usdtSide === 'to' ? BNB_USDT : otherToken,
        amount, web3Instance
    }));
};

export const uniUsdtAmount = async ({
    otherToken, usdtSide = 'from', amount, shoudldCreateInstance = false,
}) => {
    let web3Instance = null;
    if(shoudldCreateInstance) {
        console.log(ethConnectionUrl);
        web3Instance = new Web3(new Web3.providers.HttpProvider(ethConnectionUrl)).eth;
    };
    return (await getAmountOutUni({
        fromToken: usdtSide === 'from' ? ETH_USDT : otherToken,
        toToken: usdtSide === 'to' ? ETH_USDT : otherToken,
        amount, web3Instance
    }));
};

export const sushiUsdtAmount = async ({
    otherToken, usdtSide = 'from', amount, shoudldCreateInstance = false,
}) => {
    let web3Instance = null;
    if(shoudldCreateInstance) {
        web3Instance = new Web3(new Web3.providers.HttpProvider(ethConnectionUrl)).eth;
    };
    return (await getAmountOutSushi({
        fromToken: usdtSide === 'from' ? ETH_USDT : otherToken,
        toToken: usdtSide === 'to' ? ETH_USDT : otherToken,
        amount, web3Instance
    }));
};

const getDecimal = async (tokenAddress) => {
    let decimal = 18;
    if(!tokenAddress) return decimal;
  
    try{
        const accounts = await window?.ethereum.request({ method: 'eth_requestAccounts' });
        let userwalletaddresss = accounts[0];
        let bal = new window.web3.eth.Contract(ERC20, tokenAddress);
        decimal = await bal.methods.decimals().call({from:userwalletaddresss});
        decimal = +decimal;
    }catch(e){
        decimal = 18;
    };
    return decimal;
  }

export const ethUsdtValue = async amt => {
    try{
        const decimals = await getDecimal(TEST_WETH);
        const wallet = localStorage.getItem('account');
        const bigAmt = toBig(fromExponential(amt * Math.pow(10, decimals)));
        const swaping = new window.web3.eth.Contract(uniswapAbi, UNISWAP_ROUTER);
        const path = [TEST_WETH, ETH_USDT];
        const res = await swaping.methods.getAmountsOut(bigAmt, path).call({ from: wallet });
        return res[1];
    }catch(e){
        return 1;
    }
};



export const getChainShort = name => {
    if(['ethereum', 'Ethereum', 'eth', 'ETH', 'ETHEREUM'].includes(name)) return 'eth';
    else return 'bsc';
};

export const getPoolShare = async (from, to) => {

    try{
        const wallet = localStorage.getItem('account');
        const pair = await getPair(from, to, BSwapfactoryContractAddress);
        if(![ZERO_ADDRESS, MAIN_ZERO_ADDRESS].includes(pair)){
            const fromContract = new window.web3.eth.Contract(ERC20, from);
            const toContract = new window.web3.eth.Contract(ERC20, to);
            const fromShare = ((await fromContract.methods.balanceOf(pair).call({ from: wallet })) / Math.pow(10, (await getDecimal(from)))) || 1;
            const toShare = ((await toContract.methods.balanceOf(pair).call({ from: wallet })) / Math.pow(10, (await getDecimal(to)))) || 1;
            console.log({ fromShare, toShare });
            return { fromShare, toShare };
        }else{
            return { fromShare: 1, toShare: 1 };
        }
    }catch(e){
        return { fromShare: 1, toShare: 1 };
    }
};

export const getCircuitBreakers = async (from, to, factory = BSwapfactoryContractAddress) => {
    try{
        
        if(!(from && to)) throw new Error('Missing arguments');
        const wallet = localStorage.getItem('account');
        const pair = await getPair(from, to, factory);
        if([MAIN_ZERO_ADDRESS, ZERO_ADDRESS].includes(pair)) throw new Error('No pool exist');
        const pairContract = new window.web3.eth.Contract(dynamicAbi, pair);
        const res = [];
        const switcher = { '3600': 'hour', '86400': 'day' };
        const token0 = await pairContract.methods.token0().call({ from: wallet });
        const values = await(Promise.all([0, 1, 2, 3, 4].map(async num => {
            return (await pairContract.methods.vars(num).call({ from: wallet }));
        })));
        res[2] = +values[0] === 3600 ? 'hour' : (values[0] / 3600) === 24 ? 'day' : `${values[0] / 3600} hours`;
        res[0] = (token0.toLowerCase() === from.toLowerCase() ? values[1] : values[2]) / 100;
        res[1] = (token0.toLowerCase() === from.toLowerCase() ? values[3] : values[4]) / 100;
        
        return res;
    }catch(e){
        return [0, 0, 'day'];
    }
}

export const getFluctuationFees = async (from, to, amt, reverse = false, factory = BSwapfactoryContractAddress) => {
    try{
        if (amt == 0) {
            return amt;
        }
        if(!(from && to && amt)) throw new Error('Missing arguments');
        const wallet = localStorage.getItem('account');
        const pair = await getPair(from, to, factory);
        const amtDecimals = await getDecimal(from);
        const bigAmt = toBig(fromExponential(amt * Math.pow(10, amtDecimals)));
        if([MAIN_ZERO_ADDRESS, ZERO_ADDRESS].includes(pair)) throw new Error('No pool exist');
        const pairContract = new window.web3.eth.Contract(dynamicAbi, pair);
        if(!reverse){
            const { fee } = (await pairContract.methods.getAmountInAndFee(bigAmt, from, to).call({ from: wallet }));
            return fee / 100;
        }else{
            const { fee } = (await pairContract.methods.getAmountOutAndFee(bigAmt, from, to).call({ from: wallet }));
            return fee / 100;
        }
        
    }catch(e){
        console.log(e);
        return 0;
    }
}

export const getDmcFees = async () => {
    const from = ''
    const pool = '0x962C9862cb1837C1B2073A3011c7F0D58Fd229a3';
    const baselinePrice = 0.000015267175572518;
    try{
        const ratio = await getReservesRatio(TEST_WBNB, pool);
        return ((ratio / baselinePrice) - 1) * 100;
    }catch(e){
        console.log(e);
        return 0;
    }
}

export const createCustomInstance = (chain = 'bsc') => {
    const url = chain === 'bsc' ? bnbConnectionUrl : ethConnectionUrl;
    const web3Instance = new Web3(new Web3.providers.HttpProvider(url)).eth;
    return web3Instance;
};