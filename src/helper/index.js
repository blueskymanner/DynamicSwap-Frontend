import {
  LARGE_APPROVAL_AMOUNT,
  MAIN_ZERO_ADDRESS,
  PANCAKE_FACTORY,
  TEST_WBNB,
  TEST_WETH,
  ZERO_ADDRESS,
} from "../constants";
import bnb from "../Assets/images/bnb-icon.png";
import degen_token from "../Assets/images/Degen_token.png";
import pairAbi from "../abi/pair.json";
import {
  BSwapfactoryAbi as factoryAbi,
  BSwaprouter2ContractAddress,
} from "../Assets/Abi/ContractAbi";
import dynamicAbi from "../abi/dynamicPairAbi.json";
import ERC20 from "../Assets/Abi/ERC20.json";
import { useEffect, useState } from "react";
import Web3 from "web3";
import fromExponential from "from-exponential";

const URL_ARRAY = [
  {
    home: "https://tokenlists.org/token-list?url=https://www.gemini.com/uniswap/manifest.json",
    data: "https://www.gemini.com/uniswap/manifest.json",
    enabled: false,
  },
  {
    home: "https://tokenlists.org/token-list?url=https://tokens.coingecko.com/uniswap/all.json",
    data: "https://tokens.coingecko.com/uniswap/all.json",
    enabled: false,
  },
  //   {
  //     home: 'https://tokenlists.org/token-list?url=defi.cmc.eth',
  //     data: 'https://wispy-bird-88a7.uniswap.workers.dev/?url=http://defi.cmc.eth.link',
  //   enabled: false,
  // },
  {
    home: "https://tokenlists.org/token-list?url=https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json",
    data: "https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json",
    enabled: false,
  },
];

const CHAINS = {
  Mainnet: "0x1",
  Kovan: "0x42",
  Ropsten: "0x3",
  Rinkeby: "0x4",
  Goerli: "0x5",
  BSCTESTNET: "0x61",
  BSCMAINNET: "0x38",
};

export const findAllowedAmount = async (
  address,
  amount,
  router = BSwaprouter2ContractAddress,
  callback = () => {}
) => {
  try {
    if (address === "0x0000000000000000000000000000000000000000") return false;
    const decimal = await getDecimal(address);
    const web3 = window.web3;
    let walletAddress = localStorage.getItem("account");
    let contract = new web3.eth.Contract(ERC20, address);
    let allowed = await contract.methods
      .allowance(walletAddress, router)
      .call();
    console.log(allowed);
    allowed = +allowed / Math.pow(10, decimal);
    console.log(allowed, amount);
    callback(allowed < amount);
    return allowed < amount;
  } catch (error) {
    callback(true);
    return true;
  }
};

export const getEnvType = () => {
  return "production";
};

export const getDefaultChain = async () => {
  if (!window?.ethereum) return;
  const chainId = await window?.ethereum.request({ method: "eth_chainId" });
  if (chainId === CHAINS.Ropsten || chainId === CHAINS.Mainnet) {
    return "eth";
  } else if (chainId === CHAINS.BSCTESTNET || chainId === CHAINS.BSCMAINNET) {
    return "bsc";
  } else return "eth";
};

export const isValidNumber = (num) => {
  var regx = new RegExp(/^(0|[1-9]\d*)(\.\d+)?$/);
  console.log(num);
  if (isNaN(num)) {
    console.log("========bug=======");
    return false;
  }
  console.log("========bug test=======");
  if (num == "" || num == "." || regx.test(num)) {
    console.log("========true=======");
    return true;
  } else {
    console.log("========false=======");
    return false;
  }
};

export const getDecimal = async (tokenAddress, abi = ERC20) => {
  let decimal = 18;
  if (!tokenAddress) return decimal;

  try {
    const accounts = await window?.ethereum.request({
      method: "eth_requestAccounts",
    });
    let userwalletaddresss = accounts[0];
    let bal = new window.web3.eth.Contract(abi, tokenAddress);
    decimal = await bal.methods.decimals().call({ from: userwalletaddresss });
    decimal = +decimal;
  } catch (e) {
    console.log(e);
  }

  return decimal;
};

export const getTokenBalance = async (address) => {
  let walletAddress = localStorage.getItem("account");
  let web3 = window.web3;
  let bal = "";
  if (web3 && web3.eth && walletAddress) {
    try {
      if (address === "0x0000000000000000000000000000000000000000") {
        bal = await web3.eth.getBalance(walletAddress);
      } else {
        let contract = new web3.eth.Contract(ERC20, address);
        bal = await contract.methods.balanceOf(walletAddress).call();
      }
    } catch (err) {
      console.log(err);
    }
  }
  return bal;
};

export const compareBalance = async (
  address,
  amount = LARGE_APPROVAL_AMOUNT
) => {
  const decimal = await getDecimal(address);
  const web3 = window.web3;
  try {
    const balance = await getTokenBalance(address);
    const available = balance / Math.pow(10, decimal);
    if (available <= amount) return web3.utils.toBN(balance);
    return web3.utils.toBN(amount + "0".repeat(decimal));
  } catch (e) {
    return web3.utils.toBN(amount + "0".repeat(decimal));
  }
};

export const getEthTokens = async () => {
  try {
    const res = [];
    const response = await fetch("https://api.1inch.exchange/v3.0/1/tokens");
    const data = await response.json();
    for (const [key, value] of Object.entries(data.tokens)) {
      res.push({
        chain: "eth",
        ...value,
        image: value.logoURI,
        value: value.address,
      });
    }
    return res.sort(
      (a, b) => a.symbol.toLowerCase() > b.symbol.toLowerCase() || -1
    );
  } catch (e) {
    return [];
  }
};

export const getBscTokens = async () => {
  try {
    const res = [
      {
        symbol: "BNB",
        name: "BNB",
        chain: "bsc",
        value: "0x0000000000000000000000000000000000000000",
        address: "0x0000000000000000000000000000000000000000",
        image: bnb,
        state: true,
        balance: 0,
      },
      {
        symbol: "DEGEN",
        name: "DEGENSWAP Token",
        chain: "bsc",
        address: "0x1Eea643fc6C0B4D253621839986fc566Fce40704",
        value: "0x1Eea643fc6C0B4D253621839986fc566Fce40704",
        image: degen_token,
        state: true,
        balance: 0,
      },
    ];
    // const propel = { symbol: 'PROPEL', image: bnb, address: '0x9B44Df3318972bE845d83f961735609137C4C23c', value: '0x9B44Df3318972bE845d83f961735609137C4C23c', chain: 'bsc', name: 'PROPEL Token' };
    // const response = await fetch('https://tokens.pancakeswap.finance/pancakeswap-extended.json');
    // const data = await response.json();
    // for(const value of data.tokens){
    // res.push({ chain: 'bsc', ...value, image: value.logoURI, value:value.address });
    // };
    return res.sort(
      (a, b) => a.symbol.toLowerCase() > b.symbol.toLowerCase() || -1
    );
  } catch (e) {
    return [];
  }
};

export const shortenChain = (name) => {
  if (name === "BSC") return "bsc";
  if (name === "Ethereum") return "eth";
  return name;
};

export const getPair = async (from, to, factoryContract) => {
  try {
    const wallet = localStorage.getItem("account");
    const factory = new window.web3.eth.Contract(factoryAbi, factoryContract);
    const pair = await factory.methods.getPair(from, to).call({ from: wallet });
    return pair;
  } catch (e) {
    return "0x0000000000000000000000000000000000000000";
  }
};

export const getReservesRatio = async (from, pairAddress) => {
  try {
    const wallet = localStorage.getItem("account");
    const tokenPair = new window.web3.eth.Contract(pairAbi, pairAddress);
    const token0 = await tokenPair.methods.token0().call({ from: wallet });
    const reserve = await tokenPair.methods
      .getReserves()
      .call({ from: wallet });
    return String(token0).toLowerCase() === String(from).toLowerCase()
      ? reserve._reserve0 / reserve._reserve1
      : reserve._reserve1 / reserve._reserve0;
  } catch (e) {
    return 0;
  }
};

export const getImpact = async (
  from,
  to,
  fromAmt,
  toAmt,
  factory,
  swapFee = 0
) => {
  if (!fromAmt || !toAmt) return 0;
  if ([MAIN_ZERO_ADDRESS, ZERO_ADDRESS].includes(from)) from = TEST_WBNB;
  if ([MAIN_ZERO_ADDRESS, ZERO_ADDRESS].includes(to)) to = TEST_WBNB;
  let reserveRatio;
  fromAmt = window.web3.utils.toWei(String(fromAmt));
  toAmt = window.web3.utils.toWei(String(toAmt));
  const pairAddress = await getPair(from, to, factory);
  if (pairAddress !== "0x0000000000000000000000000000000000000000")
    reserveRatio = await getReservesRatio(from, pairAddress);
  else {
    const mediator = TEST_WBNB;
    const pairAB = await getPair(from, mediator, factory);
    const pairBC = await getPair(mediator, to, factory);
    const ratioAB = await getReservesRatio(from, pairAB);
    const ratioBC = await getReservesRatio(mediator, pairBC);
    reserveRatio = ratioAB * ratioBC;
  }
  if (pairAddress !== "0x0000000000000000000000000000000000000000") {
    try {
      const wallet = localStorage.getItem("account");
      const pairContract = new window.web3.eth.Contract(
        dynamicAbi,
        pairAddress
      );
      const { fee } = await pairContract.methods
        .getAmountOutAndFee(fromAmt, from, to)
        .call({ from: wallet });
      swapFee = fee / 100;
    } catch (e) {
      swapFee = 0;
    }
  }
  const amtRatio = fromAmt / toAmt;
  const impact = (1 - reserveRatio / amtRatio) * 100 - swapFee;
  return impact < 0 ? 0.00001 : impact;
};

export const useStorage = () => {
  const [coinList, setCoinList] = useState([]);

  useEffect(() => {
    const coinListRaw = localStorage.getItem("coinList");
    let parsed;
    try {
      parsed = JSON.parse(coinListRaw);
      const firstData = parsed[0].data;
      if (!firstData) throw new Error("Incorrect format!");
    } catch (e) {
      parsed = false;
    }
    if (!parsed) {
      setCoinList(URL_ARRAY);
      localStorage.setItem("coinList", JSON.stringify(URL_ARRAY));
    } else {
      setCoinList(parsed);
      // setCoinList(URL_ARRAY);
      // localStorage.setItem('coinList', JSON.stringify(URL_ARRAY));
    }
  }, []);

  useEffect(() => {
    if (coinList.length)
      localStorage.setItem("coinList", JSON.stringify(coinList));
  }, [coinList]);

  return [coinList, setCoinList];
};

export const useChainHook = () => {
  if (window.ethereum && window.ethereum.chainId) {
    return window.ethereum.chainId.split("x")[1];
  } else {
    return null;
  }
};

export const generateSecondary = (link) =>
  `https://wispy-bird-88a7.uniswap.workers.dev/?url=http://${link}.link`;

export const fetchLink = async (link, setter, errorSetter) => {
  const second = generateSecondary(link);
  try {
    const response = await fetch(link.includes("http") ? link : second);
    const data = await response.json();
    if (Array.isArray(data.tokens)) errorSetter(false);
    setter({ data, url: link });
  } catch (err) {
    errorSetter(true);
    setter(null);
  }
};

export const get_web3_instance = () => {
  if (window.web3 && window.web3.currentProvider) {
    return new Web3(window.web3.currentProvider);
  }
};
