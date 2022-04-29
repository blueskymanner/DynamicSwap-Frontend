import Web3 from "web3";
import { BSwapfactoryContractAddress, BSwaprouter2ContractAddress } from "../Assets/Abi/ContractAbi";
import { getAmountOut } from "../Component/functions";
import pairAbi from '../abi/pair.json';
import factoryAbi from '../abi/factory.json';
import { TEST_WBNB, TEST_WETH } from "../constants";

const url = 'https://bsc-dataseed.binance.org';

export const getValueForTesting = async ({ amount, fromToken, toToken, router = BSwaprouter2ContractAddress, factoryContract = BSwapfactoryContractAddress }) => {
    
    const web3Instance = new Web3(new Web3.providers.HttpProvider(url)).eth;

    const amt = (await getAmountOut({
        fromToken, toToken, web3Instance, 
        isBsc: true, router, factoryContract, amount
    }));
    return amt;
};


export const getPair = async (from, to) => {
    try{
        const factoryContract = BSwapfactoryContractAddress;
        const web3Instance = new Web3(new Web3.providers.HttpProvider(url)).eth;
 
        const factory = new web3Instance.Contract(factoryAbi, factoryContract);
        const pair = await factory.methods.getPair(from, to).call();
        return pair;
    }catch(e){
        return '0x0000000000000000000000000000000000000000';
    };
};

export const getReservesRatio = async (from, pairAddress) => {
    try{
        const web3Instance = new Web3(new Web3.providers.HttpProvider(url)).eth;
        
        const tokenPair = new web3Instance.Contract(pairAbi, pairAddress);
        const token0 = await tokenPair.methods.token0().call();
        const reserve = await tokenPair.methods.getReserves().call();
        return String(token0).toLowerCase() === String(from).toLowerCase() ?  reserve._reserve0 / reserve._reserve1 : reserve._reserve1 / reserve._reserve0;
    }catch(e){
        return 0;
    };
};


export const getImpactForTesting = async (from, to, fromAmt, toAmt, factory) => {
    if(!fromAmt || !toAmt) return 0;
    let reserveRatio;
    fromAmt = window.web3.utils.toWei(String(fromAmt));
    toAmt = window.web3.utils.toWei(String(toAmt));
    const swapFee = factory === BSwapfactoryContractAddress ? 0.25 : 0.3;
    const pairAddress = await getPair(from, to, factory);
    const r = await getReservesRatio(from, pairAddress);
    if(pairAddress !== '0x0000000000000000000000000000000000000000') reserveRatio = (await getReservesRatio(from, pairAddress));
    else{
        const mediator = factory === BSwapfactoryContractAddress ? TEST_WBNB : TEST_WETH;
        const pairAB = (await getPair(from, mediator, factory));
        const pairBC = (await getPair(mediator, to, factory));
        const ratioAB = (await getReservesRatio(from, pairAB));
        const ratioBC = (await getReservesRatio(mediator, pairBC));
        reserveRatio = ratioAB * ratioBC;
    };
    const amtRatio = fromAmt / toAmt;
    const impact = (1 - (reserveRatio / amtRatio)) * 100 - swapFee;
    return impact < 0 ?  0.00001 : impact;
};