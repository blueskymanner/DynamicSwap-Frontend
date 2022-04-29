import React, { Component } from "react";
import styled from "styled-components";
import Gs from "../Theme/globalStyles";
import ReactTooltip from "react-tooltip";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Media from "./../Theme/media-breackpoint";
import { Link, withRouter } from "react-router-dom";
import { connectwallet } from "../Assets/metamask/metamask";
import TokenPopup from "../Component/popup/tokenPopup";
import SelectTokenPopup from "../Component/popup/selectToken";
import Subgraph from "../Component/subgraph";
import SelectChainPopup from "../Component/popup/selectChain";
import TransactionPopup from "../Component/popup/transactionPopup";
import LoaderPopup, { SecondAlert } from "../Component/popup/loader";
import WrongNetworkPopup from "../Component/popup/wrongNetworkPopup";
import FailedTransactionPopup from "../Component/popup/failedTransactionPopup";
import degen_token from "../Assets/images/Degen_token.png";
import bnb_token from "../Assets/images/bnb-icon.png";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemState,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { FaChevronDown, FaExternalLinkAlt } from "react-icons/fa";
import {
  BsQuestionCircleFill,
  BsFillCaretUpFill,
  BsFillCaretDownFill,
  BsXLg,
} from "react-icons/bs";
import { BiDownArrowAlt } from "react-icons/bi";

import TitleIcon01 from "./../Assets/images/swapTitleIcon-01.png";
import TitleIcon02 from "./../Assets/images/swapTitleIcon-02.png";
import SmbnbIco from "./../Assets/images/smBNB-icon.png";
import UnicornIco from "./../Assets/images/unicornIco.png";
import SSIcon01 from "../Assets/images/swapBICON-01.png";
import SSIcon02 from "../Assets/images/swapBICON-02.png";
import SSIcon03 from "../Assets/images/swapSICON-01.png";
import SSIcon04 from "../Assets/images/swapSICON-02.png";
import SSIcon05 from "../Assets/images/arrowIcon02.png";
import SSIcon06 from "../Assets/images/ethRedioICON.png";
import dexIcon01 from "./../Assets/images/dexIcon-01.png";
import dexIcon02 from "./../Assets/images/dexIcon-02.png";
import dexIcon03 from "./../Assets/images/dexIcon-03.png";
import dexIcon04 from "./../Assets/images/dexIcon-04.png";
import dexIcon05 from "./../Assets/images/dexIcon-05.png";
import dexIcon06 from "./../Assets/images/dexIcon-06.png";
import dexIcon07 from "./../Assets/images/dexIcon-07.png";
import dexIcon08 from "./../Assets/images/dexIcon-08.png";
import dexIcon09 from "./../Assets/images/dexIcon-09.png";
import dexIcon010 from "./../Assets/images/dexIcon-010.png";
import dexIcon011 from "./../Assets/images/dexIcon-011.png";
import dexIcon012 from "./../Assets/images/dexIcon-012.png";
import dexIcon013 from "./../Assets/images/dexIcon-013.png";
import dexIcon014 from "./../Assets/images/dexIcon-014.png";
import dexIcon015 from "./../Assets/images/dexIcon-015.png";
import dexIcon016 from "./../Assets/images/dexIcon-016.png";
import dexIcon017 from "./../Assets/images/dexIcon-017.png";
import dexIcon018 from "./../Assets/images/dexIcon-018.png";
import dexIcon019 from "./../Assets/images/dexIcon-019.png";
import BinanceLogo from "../Assets/images/binance-logo.png";
import ETHLogo from "../Assets/images/eth-logo.png";
import PolyGonLogo from "../Assets/images/polygon-logo.png";
import YRIcon01 from "../Assets/images/selectTkn-09.png";
import YRIcon02 from "../Assets/images/selectTkn-02.png";
import YLIcon01 from "./../Assets/images/selectTkn-08.png";
import YLIcon02 from "./../Assets/images/selectTkn-02.png";
import WImg from "../Assets/images/b-icon.png";
import Icon1 from "../Assets/images/icon-1.png";
import Icon2 from "../Assets/images/icon-2.png";
import Icon3 from "../Assets/images/icon-3.png";
import Icon4 from "../Assets/images/icon-4.png";
import Icon5 from "../Assets/images/icon-5.png";

import pairAbi from "../Assets/Abi/pair.json";
import pair from "../abi/pair.json";
import TokenIco01 from "../Assets/images/icon-3.png";
import Xbtn from "../Assets/images/closeBTN.png";
import Web3 from "web3";
import {
  BSwapfactoryContractAddress,
  BSwapfactoryAbi,
  BSwaprouter2ContractAddress,
  bswap,
  WBNB_Address,
} from "../Assets/Abi/ContractAbi";
import { ReservesContract, ReservesAbi } from "../Assets/Abi/reserves";
import { withSnackbar } from "react-simple-snackbar";
import InputRange from "react-input-range";
import Collapse from "@kunukn/react-collapse";

import ERC20 from "./../Assets/Abi/ERC20.json";
import BigNumber from "bignumber.js";
import different from "./../Assets/Abi/different.json";
import factory from "../abi/factory.json";
//import pair  from  '../abi/pair.json'

import fromExponential from "from-exponential";
import {
  compareBalance,
  getDefaultChain,
  isValidNumber,
  findAllowedAmount,
  getDecimal,
  shortenChain,
  getEnvType,
  getImpact,
} from "../helper";

import {
  coinTOken_array,
  devBscList,
  devEthList,
  chain_array,
} from "../Assets/token/conToken";

import eth_abi from "./../Assets/Abi/eth_abi.json";
import bsc_abi from "./../Assets/Abi/bsc_abi.json";
import {
  bsc_contract_address,
  eth_contract_address,
  API_URL,
  UNISWAP_FACTORY,
  WETH,
  WBNB,
  BSWAP_FACTORY,
  SUSHISWAP_FACTORY,
  PANCAKE_FACTORY,
  ZERO_ADDRESS,
  MAIN_ZERO_ADDRESS,
  PANCAKE_ROUTER,
  bnbConnectionUrl,
  ethConnectionUrl,
} from "../constants";

import { TEST_WETH, TEST_WBNB } from "../constants";
import { TEST_WETH_LIVE, TEST_WBNB_LIVE } from "../constants";
import { DebounceInput } from "react-debounce-input";
import {
  createCustomInstance,
  getAmountOut,
  getAmountOutPan,
  getAmountOutSushi,
  getAmountOutUni,
  getCircuitBreakers,
  getDmcFees,
  getFluctuationFees,
  getPair,
  getPoolShare,
  getReservesRatio,
  panUsdtAmount,
  replaceWithBnb,
  sushiUsdtAmount,
  uniUsdtAmount,
} from "../Component/functions";
import { getImpactForTesting, getValueForTesting } from "../helper/new";

class Page01 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new window.Date().getTime(),
      popup01: false,
      warning: "",
      popup02: false,
      popup03: false,
      transaction: false,
      loader: false,
      isWrongNetwork: false,
      isTransactionFailed: false,
      method: "Swap",
      currChain: "",
      selectedChain: "",
      wrongNetworkMsg: "",
      circuitData: [10, 0.5, "hour"],

      isConfirmSupply: false,
      isDetailSection: true,
      isTransactionSetting: false,
      isAnalysis: false,
      isAdd_and_Your_Liquidity: false,
      isAddLiquidity: false,
      isYourLiquidity: false,
      isVote: false,
      isRemoveLiquidity: false,

      tokenamountIn: "", //fromValue
      tokenamountOut: "", //toValue
      minValue: "",

      from: false,
      to: false,
      lquidityfrom: false,
      lquidityto: false,
      isApprove: false,
      isliquidityapprove: false,
      liquidityclick: false,
      swapamountout: false,
      liquidityamountout: false,

      tokenfromAddress: "",
      tokentoAddress: "",

      slippage: 0.1,
      deadLine: 20,
      dexId_destination: "",
      dexId: "",

      data: null,

      popupID: "",

      fromtokenName1: "Select Token",
      totokenName1: "Select Token",

      fromChainName1: "Select Chain",
      toChainName1: "Select Chain",

      fromChainAddress: "",
      toChainAddress: "",

      fromtokenImage1: null,
      fromChainImage1: null,
      totokenImage1: null,
      toChainImage1: null,

      insuffientBalance: false,
      fromConvertedValue: "",
      toConvertedvalue: "",

      fromTokenBalance: 0,
      toTokenBalance: 0,

      estimated_fees: " $5.37",
      reimbursement_reward: "",
      reimbursement_inUSD: "0",

      bSwap_Deposited: 150,
      bnb_Deposited: 5,
      rate1: "1 bSWAP = 0.25 BNB",
      rate2: "1 bSWAP = 0.25 BNB",
      shared_of_pool: "0.0005%",

      // add liquidity state
      liquiditytokenfrom: "Select Token",
      tot: "Select Token",
      tokenAaddress: "",
      tokenBaddress: "",
      liqFromImg: "",
      liqToImg: "",
      liquiditybalancefrom: "0.00",
      liquiditybalanceto: "0.00",
      liquiditymethod: "Add Liquidity",

      clickedTo: false,
      index: 1,
      underTab: 1,
      value: 0,

      multiHops: false,
      disableSwapButton: false,
      clickedChain: "",
      removeLiqFromTokens: {
        name: "",
        img: "",
        address: "",
      },
      removeLiqToTokens: {
        name: "",
        img: "",
        address: "",
      },
      removeLiqValues: { from: 0, to: 0 },
      totalLiqValues: { from: 0, to: 0 },
      allowedToRemove: "",
      priceImpact: "0.000",
      pairBalance: 0,
      removeAllowance: 0,
      totalAmountSupply: 0,
      liqTokenRatio: 0,
      liqImpact: 0,
      usingThreePath: false,
      dmcFees: 0,
      fluctFees: { from: "0", to: "0" },
      readOnlyMode: false,
      transactionSettingClass: "",
      enableLiquidityClass: "",
      voteClass: "",
      changeCoinPair: false,
    };
  }
  handleCallback = (childData) => {
    this.setState({ data: childData });
  };
  fromValueHandleChange = (e) => {
    this.setState({ tokenamountIn: e.target.value });
  };
  toValueHandleChange = (e) => {
    this.setState({ tokenamountOut: e.target.value });
  };
  onClick = (e) => {
    e.preventDefault();
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.resetFlag !== this.props.resetFlag) {
      this.setState({
        fromtokenName1: "BNB",
        fromtokenImage1: bnb_token,
        tokenfromAddress: "0x0000000000000000000000000000000000000000",
        totokenName1: "DEGEN",
        totokenImage1: degen_token,
        tokentoAddress: "0x1Eea643fc6C0B4D253621839986fc566Fce40704",
      })

    }
  }
  async componentDidMount() {
    if (window?.ethereum) {
      const chain = await getDefaultChain();
      setTimeout(() => {
        getDmcFees().then((f) =>
          this.setState({ dmcFees: (f || 0).toFixed(2) })
        );
      }, 2000);
      this.setState({ currChain: chain, clickedChain: chain });
      if (chain === "eth") {
        this.setState({
          wrongNetworkMsg: "Please open Metamask and switch to BNB chain!",
        });
        //this.setState({ isWrongNetwork: true });
        this.setState({
          fromChainName1: "Ethereum",
          fromChainImage1: SSIcon06,
          toChainName1: "Ethereum",
          toChainImage1: SSIcon06,
        });

        this.setState({ popupID: "fromtokenName1" });
        let token = devEthList[0];
        this.selectToken(token);

        // this.setState({ fromtokenName1: token.name });
        // this.setState({ fromtokenImage1: token.image });
        // this.setState({ tokenfromAddress: token.value });
        //window.alert('Please open Metamask and switch to BNB chain!');
      } else if (chain === "bsc") {
        this.setState({
          wrongNetworkMsg: "Please open Metamask and switch to ETH chain!",
        });
        this.setState({
          fromChainName1: "BSC",
          fromChainImage1: TokenIco01,
          toChainName1: "BSC",
          toChainImage1: TokenIco01,
        });

        this.setState({ popupID: "fromtokenName1" });
        let token = devBscList[0];
        this.selectToken(token);
      }
    } else {
      const chain = await getDefaultChain();
      window.web3 = new Web3(
        new Web3.providers.HttpProvider(
          chain === "bsc" ? bnbConnectionUrl : ethConnectionUrl
        )
      );
      this.setState(
        {
          readOnlyMode: true,
          fromChainName1: "BSC",
          fromChainImage1: TokenIco01,
          toChainName1: "BSC",
          toChainImage1: TokenIco01,
          popupID: "fromtokenName1",
        },
        () => {
          this.selectToken(devBscList[0]);
        }
      );
    }

    // if (window?.ethereum && localStorage.getItem('account') && localStorage.getItem('chainId') != '0x61') {
    //     window.alert("Please open Metamask and switch to BNB chain!")
    // }
    // console.log(BSwapfactoryContractAddress);
  }
  async componentDidUpdate(_, prevState) {
    const {
      tokenfromAddress,
      tokentoAddress,
      fromChainName1,
      isYourLiquidity,
    } = this.state;
    const {
      tokenfromAddress: tfa,
      tokentoAddress: tta,
      fromChainName1: fcn,
    } = prevState;

    const { fromtokenName1, totokenName1, tokenamountOut, tokenamountIn } =
      this.state;
    const {
      fromtokenName1: f1,
      totokenName1: t1,
      tokenamountOut: tao,
      tokenamountIn: tai,
    } = prevState;
    console.log(t1, "prevstate", f1);
    ReactTooltip.rebuild();
    if (
      (tokenfromAddress !== tfa || tokentoAddress !== tta) &&
      tokenfromAddress &&
      tokentoAddress
    ) {
      getCircuitBreakers(
        replaceWithBnb(tokenfromAddress),
        replaceWithBnb(tokentoAddress)
      )
        .then((d) => {
          console.log(d);
          this.setState({ circuitData: d });
        })
        .catch(console.log);
    }

    // console.log(this.state.fromChainName1, this.state.toChainName1);
    const {
      liquiditytokenamountA: amtA,
      liquiditytokenamountB: amtB,
      liquiditytokenfrom: prevFrom,
      tot: prevTot,
    } = prevState;
    const {
      liquiditytokenfrom,
      tot,
      tokenAaddress,
      tokenBaddress,
      liquiditytokenamountA,
      liquiditytokenamountB,
    } = this.state;
    if (
      (tot !== prevTot || liquiditytokenfrom !== prevFrom) &&
      [tokenBaddress, tokenAaddress].every(Boolean)
    ) {
      const first = [ZERO_ADDRESS, MAIN_ZERO_ADDRESS].includes(tokenAaddress)
        ? WBNB
        : tokenAaddress;
      const second = [ZERO_ADDRESS, MAIN_ZERO_ADDRESS].includes(tokenBaddress)
        ? WBNB
        : tokenBaddress;
      const pair = await getPair(first, second, BSwapfactoryContractAddress);
      const ratio = await getReservesRatio(first, pair);
      this.setState({ liqTokenRatio: ratio });
      this.getRemoveLiquidityValues(tokenAaddress, tokenBaddress);
    }
    if (isYourLiquidity && (tokenfromAddress !== tfa || tokentoAddress !== tta))
      this.getRemoveLiquidityValues(tokenfromAddress, tokentoAddress);
    if (liquiditytokenamountB !== amtB || liquiditytokenamountA !== amtA) {
      const first = [ZERO_ADDRESS, MAIN_ZERO_ADDRESS].includes(tokenAaddress)
        ? WBNB
        : tokenAaddress;
      const second = [ZERO_ADDRESS, MAIN_ZERO_ADDRESS].includes(tokenBaddress)
        ? WBNB
        : tokenBaddress;
      const shares = await getPoolShare(first, second);
      // const pair = await getPair(first, second, PANCAKE_FACTORY);
      // const imp = await getReservesRatio(this.state.tokenAaddress, pair, true);
      // const decimal = await getDecimal(this.state.tokenAaddress);
      console.log(
        +liquiditytokenamountA / (shares.fromShare + +liquiditytokenamountA),
        "dfsdfdsfds ________________________________________"
      );
      this.setState({
        liqImpact:
          ((+liquiditytokenamountA /
            (shares.fromShare + +liquiditytokenamountA)) *
            100 +
            (+liquiditytokenamountB /
              (shares.toShare + +liquiditytokenamountB)) *
              100) /
          2,
      });
      const allB = await findAllowedAmount(
        tokenBaddress,
        liquiditytokenamountB,
        BSwaprouter2ContractAddress
      );
      const allA = await findAllowedAmount(
        tokenAaddress,
        liquiditytokenamountA,
        BSwaprouter2ContractAddress
      );

      if (allB)
        this.setState({
          liquiditymethod:
            tot === "Select Token" ? "Add Liquidity" : `Approve ${tot}`,
        });
      else if (allA)
        this.setState({
          liquiditymethod:
            liquiditytokenfrom === "Select Token"
              ? "Add Liquidity"
              : `Approve ${liquiditytokenfrom}`,
        });
      else this.setState({ liquiditymethod: "Add Liquidity" });
    }

    if (
      tfa !== tokenfromAddress ||
      tai !== tokenamountIn ||
      fcn !== fromChainName1 ||
      tta !== tokentoAddress
    ) {
      this.setState({ priceImpact: 0 });
      if (![ZERO_ADDRESS, tokenfromAddress].includes(TEST_WBNB)) {
        const isApproved = await findAllowedAmount(
          tokenfromAddress,
          tokenamountIn,
          BSwaprouter2ContractAddress
        );
        console.log(isApproved);
        this.setState({
          method: !isApproved ? "Swap" : `Approve ${fromtokenName1}`,
        });
      } else {
        this.setState({ method: "Swap" });
      }
    }
  }
  async connectMetamask() {
    if (typeof window?.ethereum !== "undefined") {
      const chain = await getDefaultChain();
      if (localStorage.getItem("account") && chain != "bsc") {
        this.setState({ isWrongNetwork: true });
        return;
      }
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
        window.location.reload();
      });
      window?.ethereum?.on("networkChanged", async (network) => {
        // window.location.reload();
      });
    }
  }
  onToggle = (index) =>
    this.setState((state) => ({ index: state.index === index ? null : index }));

  onToggle02 = (underTab) =>
    this.setState((state) => ({
      underTab: state.underTab === underTab ? null : underTab,
    }));
  async closeSideSection() {
    this.setState({ isDetailSection: true });
    this.setState({ isConfirmSupply: false });
    this.setState({ isTransactionSetting: false });
    this.setState({ isAnalysis: false });
    this.setState({ isAddLiquidity: false });

    this.setState({ isAdd_and_Your_Liquidity: false });
    this.setState({ isYourLiquidity: false });
    this.setState({ isRemoveLiquidity: false });
    this.setState({ isVote: false });
    const currentChain = await getDefaultChain();
    if (currentChain == "bsc") {
      let token = devBscList[0];
      this.setState({
        removeLiqFromTokens: {
          name: token.name,
          img: token.image,
          address: token.value,
        },
      });
      this.setState({
        removeLiqToTokens: {
          name: "",
          img: "",
          address: "",
        },
      });
      this.setState({ value: 0 });
      this.setState({
        removeLiqValues: {
          from: 0,
          to: 0,
        },
      });
    }
  }
  // isConfirmSupplyFunction() {
  //     this.setState({ isConfirmSupply: true });
  //     this.setState({ isTransactionSetting: false });
  //     this.setState({ isAnalysis: false });
  //     this.setState({ isAddLiquidity: false });
  // this.setState({isVote: false});
  // }
  transactionSetting() {
    this.setState({
      isDetailSection: false,
      isConfirmSupply: false,
      isYourLiquidity: false,
      isTransactionSetting: true,
      isAnalysis: false,
      isAddLiquidity: false,
      isRemoveLiquidity: false,
      isVote: false,
      transactionSettingClass: "active",
      enableLiquidityClass: "",
      voteClass: "",
    });
  }
  analysis() {
    // this.setState({ isDetailSection: false });
    // this.setState({ isConfirmSupply: true });
    // this.setState({ isTransactionSetting: false });
    // //this.setState({ isAnalysis: true });
    // this.setState({ isAddLiquidity: false });
    // this.setState({isVote: false});
  }
  async addLiquidity() {
    const currentChain = await getDefaultChain();
    if (currentChain == "bsc") {
      this.setState({
        transactionSettingClass: "",
        enableLiquidityClass: "active",
        voteClass: "",
        isDetailSection: false,
        isConfirmSupply: false,
        isTransactionSetting: false,
        isAnalysis: false,
        isAddLiquidity: false,
        isVote: false,
        isRemoveLiquidity: false,
        isYourLiquidity: true,
      });
    }
  }
  realAddLiquidity = async () => {
    const currentChain = await getDefaultChain();
    if (currentChain == "bsc") {
      this.setState({ isDetailSection: false });
      this.setState({ isConfirmSupply: false });
      this.setState({ isTransactionSetting: false });
      this.setState({ isAnalysis: false });
      this.setState({ isAddLiquidity: true });
      this.setState({ isVote: false });
      this.setState({ isRemoveLiquidity: false });
      this.setState({ isYourLiquidity: false });
    }
  };
  removeLiquidities = async () => {
    const currentChain = await getDefaultChain();
    if (currentChain == "bsc") {
      this.setState({ isYourLiquidity: false });
      this.setState({ isDetailSection: false });
      this.setState({ isConfirmSupply: false });
      this.setState({ isTransactionSetting: false });
      this.setState({ isAnalysis: false });
      this.setState({ isAddLiquidity: false });
      this.setState({ isVote: false });
      this.setState({ isRemoveLiquidity: true });
      let token = devBscList[0];
      this.setState({
        removeLiqFromTokens: {
          name: token.name,
          img: token.image,
          address: token.value,
        },
      });
    }
  };
  vote() {
    // const def = 5;
    // if (def < 10) return;
    //const currentChain = await getDefaultChain();
    this.setState({
      isDetailSection: false,
      isConfirmSupply: false,
      isTransactionSetting: false,
      isAnalysis: false,
      isAddLiquidity: false,
      isRemoveLiquidity: false,
      isYourLiquidity: false,
      isVote: true,
      transactionSettingClass: "",
      enableLiquidityClass: "",
      voteClass: "active",
    });
  }

  useFullBalance = async () => {};
  async getRemoveLiquidityValues(defTokenA, defTokenB) {
    if (window?.ethereum) {
      const accounts = await window?.ethereum.request({
        method: "eth_requestAccounts",
      });

      let userwalletaddresss = accounts[0];
      window.web3 = new Web3(window?.ethereum);
      let liquidity, totalLiquidity;
      let tokenA = defTokenA || this.state.removeLiqFromTokens.address;
      let tokenB = defTokenB || this.state.removeLiqToTokens.address;

      if (tokenA == "0x0000000000000000000000000000000000000000") {
        tokenA = TEST_WBNB;
      }

      if (tokenB == "0x0000000000000000000000000000000000000000") {
        tokenB = TEST_WBNB;
      }

      console.log(tokenA, tokenB);

      let factories = new window.web3.eth.Contract(
        factory,
        BSwapfactoryContractAddress
      );

      const tokenADecimals = await getDecimal(tokenA);
      const tokenBDecimals = await getDecimal(tokenB);

      factories.methods
        .getPair(tokenA, tokenB)
        .call({ from: userwalletaddresss })
        .then((pairaddress) => {
          console.log("adresssss", pairaddress);
          let addresss = pairaddress;
          let tokenpair = new window.web3.eth.Contract(pair, addresss);
          tokenpair.methods
            .balanceOf(userwalletaddresss)
            .call({ from: userwalletaddresss })
            .then(async (result) => {
              //   console.log(result)

              const pairDecimals = await getDecimal(pairaddress);
              this.setState({
                pairBalance: (result / 10 ** pairDecimals || 0).toFixed(4),
              });

              console.log(result, this.state.value);
              liquidity = (result * this.state.value) / 100;
              totalLiquidity = result;
              //   liquidity*this.state.removeLiqValue/100;
              //   debugger;
              let token = new window.web3.eth.Contract(ERC20, addresss);
              token.methods
                .allowance(userwalletaddresss, BSwaprouter2ContractAddress)
                .call({ from: userwalletaddresss })
                .then(async (result) => {
                  const tokenDecimal = await getDecimal(pairaddress);
                  console.log(result, " allowance");
                  this.setState({
                    allowedToRemove: result,
                    removeAllowance: result / 10 ** tokenDecimal,
                  });
                  return result;
                  // allowed = result
                })
                .catch((err) => {
                  console.log(err);
                });

              tokenpair.methods
                .token0()
                .call({ from: userwalletaddresss })
                .then((token0address) => {
                  let balance = new window.web3.eth.Contract(
                    ERC20,
                    token0address
                  );
                  balance.methods
                    .balanceOf(pairaddress)
                    .call({ from: userwalletaddresss })
                    .then((balance0) => {
                      tokenpair.methods
                        .token1()
                        .call({ from: userwalletaddresss })
                        .then((token1address) => {
                          let balance1 = new window.web3.eth.Contract(
                            ERC20,
                            token1address
                          );
                          balance1.methods
                            .balanceOf(pairaddress)
                            .call({ from: userwalletaddresss })
                            .then((balance1) => {
                              // console.log(balance0,balance1)
                              // console.log(liquidity)

                              tokenpair.methods
                                .totalSupply()
                                .call({ from: userwalletaddresss })
                                .then(async (totalsupply) => {
                                  const pairDecimals = await getDecimal(
                                    addresss
                                  );
                                  this.setState({
                                    totalAmountSupply:
                                      totalsupply / Math.pow(10, pairDecimals),
                                  });
                                  let amountAmin = 0;
                                  let amountBmin = 0;

                                  let amt0 = (
                                    (totalLiquidity * balance0) /
                                    totalsupply /
                                    10 ** tokenADecimals
                                  ).toFixed(4);
                                  let amt1 = (
                                    (totalLiquidity * balance1) /
                                    totalsupply /
                                    10 ** tokenBDecimals
                                  ).toFixed(4);
                                  let amount0 = (
                                    (liquidity * balance0) /
                                    totalsupply /
                                    10 ** tokenADecimals
                                  ).toFixed(4);
                                  let amount1 = (
                                    (liquidity * balance1) /
                                    totalsupply /
                                    10 ** tokenBDecimals
                                  ).toFixed(4);
                                  console.log(amount0, amount1);

                                  if (token0address == tokenA) {
                                    this.setState({
                                      removeLiqValues: {
                                        from: amount0,
                                        to: amount1,
                                      },
                                      totalLiqValues: { from: amt0, to: amt1 },
                                    });
                                  } else {
                                    this.setState({
                                      removeLiqValues: {
                                        from: amount1,
                                        to: amount0,
                                      },
                                      totalLiqValues: { from: amt1, to: amt0 },
                                    });
                                  }

                                  return;

                                  // removeliquidity.methods.removeLiquidity(tokenA,tokenB,liquidity,amountAmin,amountBmin,userwalletaddresss,(this.state.time+10000000)).send({from:userwalletaddresss})
                                  // .then((result)=>{
                                  //          // // console.log(result)
                                  // }).catch(err => {})
                                });
                            });
                        })
                        .catch((err) => {});
                    })
                    .catch((err) => {});
                })
                .catch((err) => {});
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {});
    }
  }

  getRemovalStatus = () => {
    const { removeAllowance, value, pairBalance } = this.state;
    if (+value === 100) {
      if (+removeAllowance >= +pairBalance) return true;
      return false;
    } else {
      if (+removeAllowance >= +pairBalance * +value) return true;
      return false;
    }
  };

  removeLiquidityAmountChange = (val) => {
    const { openSnackbar } = this.props;
    if (
      this.state.removeLiqFromTokens.address == "" ||
      this.state.removeLiqToTokens.address == ""
    ) {
      return openSnackbar("Please choose a token pair.");
    }
    if (
      this.state.removeLiqFromTokens.address &&
      this.state.removeLiqToTokens.address
    ) {
      this.setState({ value: val });
      this.getRemoveLiquidityValues();
    }
  };
  render() {
    const { location } = this.props;
    const { openSnackbar } = this.props;
    const onTokenChainHandler = async (value) => {
      //console.log(value.name,value.values);
      if (this.state.liquidityclick) {
        this.setState({ liquidityclick: false });
        if (
          this.state.liquiditytokenfrom == value.name ||
          this.state.tot == value.name
        ) {
          //alert('Both the token are different');
          //this.setState({})
          this.setState({ popup02: false });
          if (this.state.lquidityfrom) {
            this.balance(value.values, "liquidityfrom");
            // this.setState({liquiditybalancefrom:bal})
            this.setState({ liquiditytokenfrom: value.name });
            this.setState({ tokenAaddress: value.values });
            if (value.values != "0x0000000000000000000000000000000000000000") {
              this.setState({ liquiditymethod: "Approve " + value.name });
            }
            this.setState({ tot: "Select Token" });
            this.setState({ liquiditybalanceto: 0 });
          } else {
            this.balance(value.values, "lquidityto");

            // this.setState({liquiditybalanceto:bal})
            this.setState({ tokenBaddress: value.values });
            this.setState({ tot: value.name });
            if (
              this.state.tokenAaddress ==
              "0x0000000000000000000000000000000000000000"
            ) {
              this.setState({ liquiditymethod: "Approve " + value.name });
            }
            this.setState({ liquiditytokenfrom: "Select Token" });
            this.setState({ liquiditybalancefrom: 0 });
          }
        } else {
          this.setState({ popup02: false });
          //this.setState({liquidityclick:false});
          if (this.state.lquidityfrom) {
            this.balance(value.values, "liquidityfrom");
            // this.setState({liquiditybalancefrom:bal})
            this.setState({ liquiditytokenfrom: value.name });
            this.setState({ tokenAaddress: value.values });
            if (value.values != "0x0000000000000000000000000000000000000000") {
              this.setState({ liquiditymethod: "Approve " + value.name });
            }
          } else if (this.state.lquidityto) {
            this.balance(value.values, "lquidityto");

            // this.setState({liquiditybalanceto:bal})
            this.setState({ tokenBaddress: value.values });
            this.setState({ tot: value.name });
            if (
              this.state.tokenAaddress ==
              "0x0000000000000000000000000000000000000000"
            ) {
              this.setState({ liquiditymethod: "Approve " + value.name });
            }
          }
        }
      } else {
        if (
          this.state.tokenfromname == value.name ||
          this.state.tokentoname == value.name
        ) {
          //  alert('Both the token are different');
          this.setState({ popup02: false });
          if (this.state.from) {
            this.balance(value.values, "from");
            this.setState({ tokenfromname: value.name });
            this.setState({ tokenfromAddress: value.values });
            if (value.values == "0x0000000000000000000000000000000000000000") {
              this.setState({ method: "Swap" });
            } else {
              this.setState({ method: "Approve " + value.name });
            }
            this.setState({ tokentoname: "Select Token" });
            this.setState({ balanceto: 0 });
          } else {
            this.balance(value.values, "to");
            this.setState({ tokentoname: value.name });
            this.setState({ tokentoAddress: value.values });
            this.setState({ tokenfromname: "Select Token" });
            this.setState({ balancefrom: 0 });
          }
        } else {
          this.setState({ popup02: false });
          if (this.state.from) {
            this.balance(value.values, "from");
            this.setState({ tokenfromname: value.name });
            this.setState({ tokenfromAddress: value.values });
            if (value.values == "0x0000000000000000000000000000000000000000") {
              this.setState({ method: "Swap" });
            } else {
              this.setState({ method: "Approve " + value.name });
            }
          } else if (this.state.to) {
            this.balance(value.values, "to");

            this.setState({ tokentoname: value.name });
            this.setState({ tokentoAddress: value.values });
          }
        }
      }
    };
    return (
      <>
        {console.log("balances")}
        {this.state.warning ? (
          <SecondAlert
            text={this.state.warning}
            onClose={() => this.setState({ warning: "" })}
          />
        ) : (
          <></>
        )}
        <Gs.Container>
          <MainTitle>Dynamic Swap</MainTitle>
          <MainDesc>
            Superior multi-chain AMM with trader focused features
          </MainDesc>
          <BoxesOuter>
            <Subgraph
              changeCoinPair={this.state.changeCoinPair}
              fromToken={this.state.fromtokenName1}
              toToken={this.state.totokenName1}
            ></Subgraph>
            <Box2>
              {/* <SSBlackBX> */}
              <SSInputMBX>
                <SSInputSBX01>
                  {" "}{console.log("console", this.state.tokenamountIn)}
                  <DebounceInput
                    minLength={1}
                    debounceTimeout={100}
                    // readOnly={[
                    //   this.state.fromtokenName1,
                    //   this.state.totokenName1,
                    // ].includes("Select Token")}
                    type="text"
                    min="0"
                    placeholder="0"
                    value={this.state.tokenamountIn}
                    onClick={() => {
                      this.setState({
                        liquidityclick: false,
                        swapamountout: false,
                      });
                    }}
                    onChange={(event) => {
                      this.handleContractChange(event);
                    }}
                  />{" "}
                </SSInputSBX01>
                <SSInputSBX02>
                  <SSBTN01
                    onClick={() => {
                      this.setState({
                        popup03: true,
                        popupID: "fromChainName1",
                      });
                    }}
                  >
                    {" "}
                    <img src={this.state.fromChainImage1} alt="" />{" "}
                    {this.state.fromChainName1}{" "}
                    <i className="fas fa-chevron-down"></i>
                  </SSBTN01>
                  <SSBTN01
                    onClick={() => {
                      this.setState({
                        popup02: true,
                        clickedChain: this.state.fromChainName1,
                        popupID: "fromtokenName1",
                        selectedChain: this.state.fromChainName1,
                        checkedTo: false,
                      });
                      this.setState({ from: true, to: false });
                    }}
                    className="v2"
                  >
                    {" "}
                    <img
                      className="imgStyle"
                      src={this.state.fromtokenImage1}
                      alt=""
                    />{" "}
                    {this.state.fromtokenName1}{" "}
                    <i className="fas fa-chevron-down"></i>
                  </SSBTN01>
                </SSInputSBX02>
              </SSInputMBX>
              <InfoText>Rate: 1 DMC = 0.0189881 ETH [$28.48]</InfoText>

              <SSBTNBar01>
                <hr />
                <button className="arrowBTN01 arrowBTN02"></button>
                <button
                  className="arrowBTN01"
                  onClick={() => this.exchange()}
                ></button>
              </SSBTNBar01>
              <SSInputMBX>
                <SSInputSBX01>
                  {" "}
                  <input
                    readOnly={[
                      this.state.fromtokenName1,
                      this.state.totokenName1,
                      "Select Token",
                    ].includes("Select Token")}
                    type="text"
                    placeholder="0"
                    value={this.state.tokenamountOut}
                    onClick={() => {
                      this.setState({
                        liquidityclick: false,
                        swapamountout: true,
                      });
                    }}
                    onChange={(event) => this.handleContractChange(event)}
                  />{" "}
                </SSInputSBX01>
                <SSInputSBX02>
                  <SSBTN01
                    onClick={() => {
                      this.setState({ popup03: true, popupID: "toChainName1" });
                    }}
                  >
                    {" "}
                    <img src={this.state.toChainImage1} alt="" />{" "}
                    {this.state.toChainName1}{" "}
                    <i className="fas fa-chevron-down"></i>
                  </SSBTN01>
                  <SSBTN01
                    onClick={() => {
                      this.setState({
                        popup02: true,
                        popupID: "totokenName1",
                        clickedChain: this.state.toChainName1,
                        selectedChain: this.state.toChainName1,
                        checkedTo: true,
                      });
                      this.setState({ from: false });
                      this.setState({ to: true });
                    }}
                    className="v2"
                  >
                    {" "}
                    <img
                      className="imgStyle"
                      src={this.state.totokenImage1}
                      alt=""
                    />{" "}
                    {this.state.totokenName1}{" "}
                    <i className="fas fa-chevron-down"></i>
                  </SSBTN01>
                </SSInputSBX02>
              </SSInputMBX>
              <InfoText>Rate: 1 ETH = 0.0190 DMC [$28.51]</InfoText>
              <InfoText className="bottom-space">
                Estimated fees: ~ [<span className="red">$5.37</span>] |
                Reimbursement reward: 126.53 DMC [
                <span className="green">$5.37</span>]
              </InfoText>
              {parseFloat(this.state.priceImpact) ? (
                <span
                  style={{
                    color: "#777",
                    width: "100%",
                    fontSize: "12.5px",
                    paddingTop: "5px",
                    textAlign: "left",
                  }}
                >
                  Price Impact:{" "}
                  {this.state.priceImpact < 0.0001
                    ? "<0.0001"
                    : this.state.priceImpact.toFixed(4)}
                  %
                </span>
              ) : (
                <></>
              )}
              {/* <SSTitle01 className="marginFixTop">
                <p>
                  {this.state.fromConvertedValue.length > 0
                    ? "Rate: " + this.state.fromConvertedValue
                    : ""}{" "}
                </p> */}
              {/* {this.state.toTokenBalance.length > 0 ? <p>Balance: {this.state.currChain != 'bsc' ? 0 : this.state.toTokenBalance} {this.state.totokenName1 === 'Select Token' ? '' : this.state.totokenName1}</p> : ''} */}
              {/* </SSTitle01> */}

              {/* <SSTitle01 className="marginFix">
                <p>
                  {this.state.reimbursement_reward > 0
                    ? "Estimated fees: ~ ["
                    : ""}{" "}
                  <span className="redC">
                    {" "}
                    {this.state.reimbursement_reward > 0
                      ? this.state.estimated_fees
                      : ""}{" "}
                  </span>{" "}
                  {this.state.reimbursement_reward > 0 ? "] |" : ""}
                  {this.state.reimbursement_reward > 0
                    ? " Reimbursement reward with BSWAP: " +
                      this.state.reimbursement_reward +
                      " ["
                    : ""}{" "}
                  <span className="greenC">
                    {this.state.reimbursement_reward > 0
                      ? "$" + this.state.reimbursement_inUSD
                      : ""}{" "}
                  </span>{" "}
                  {this.state.reimbursement_reward > 0 ? "]" : ""}
                </p>
              </SSTitle01> */}

              {!localStorage.getItem("account") &&
              (this.state.currChain != "bsc" ||
                this.state.currChain != "eth") ? (
                <SwapBTN01
                  className="darkGray"
                  onClick={() => this.connectMetamask()}
                >
                  Connect Wallet
                </SwapBTN01>
              ) : this.state.insuffientBalance ? (
                <SwapBTN01 className="darkGray">Insufficient balance</SwapBTN01>
              ) : (
                <SwapBTN01
                  disabled={
                    this.state.disableSwapButton || this.state.slippage >= 50
                  }
                  className={
                    this.state.disableSwapButton ? "darkGray" : "orangBack"
                  }
                  onClick={() => this.swapBetweenDifferentChain()}
                >
                  {this.state.tokenfromAddress == TEST_WBNB ||
                  this.state.tokenfromAddress == TEST_WETH ||
                  [ZERO_ADDRESS, MAIN_ZERO_ADDRESS].includes(
                    this.state.tokenfromAddress
                  )
                    ? "SWAP"
                    : this.state.method}
                </SwapBTN01>
              )}

              {this.state.multiHops && this.state.usingThreePath ? (
                <p>Multihops is enabled, please disabled for transaction</p>
              ) : (
                ""
              )}
              {/* </SSBlackBX> */}
            </Box2>
            {this.state.isDetailSection ? (
              <Box3 className="orngBR">
                <BoxRow>
                  <Box3Title>
                    1. Circuit breakers{" "}
                    <BsQuestionCircleFill
                      className="fas helpIco"
                      data-type="light"
                      data-html="true"
                      data-class="data-tooltip"
                      data-tip="Circuit Breakers limit slippage to a certain percentage for a certain amount of time and are controlled by LPs."
                    />
                  </Box3Title>
                  <Box3Desc>
                    <span>
                      {this.state.circuitData[1]}% per{" "}
                      {this.state.circuitData[2]} for all transactions
                      <br />
                      {this.state.circuitData[0]}% per transaction
                    </span>
                  </Box3Desc>
                </BoxRow>
                <BoxRow>
                  <Box3Title>
                    2. Fluctuation fees{" "}
                    <BsQuestionCircleFill
                      className="fas helpIco"
                      data-type="light"
                      data-html="true"
                      data-class="data-tooltip"
                      data-tip="Fluctuating fees start from 0.1% and increases in real time based on market demand, calculated by the Exponential Moving Average [EMA] of the pool"
                    />
                  </Box3Title>
                  <Box3Desc>
                    <span>
                      From {this.checkNot(this.state.fromtokenName1)} to{" "}
                      {this.checkNot(this.state.totokenName1)}{" "}
                      {this.state.fluctFees.from}%
                      <br /> From {this.checkNot(
                        this.state.totokenName1
                      )} to {this.checkNot(this.state.fromtokenName1)}{" "}
                      {this.state.fluctFees.to}%
                    </span>
                  </Box3Desc>
                </BoxRow>
                <BoxRow>
                  <Box3Title>
                    3. Anti bot protection{" "}
                    <BsQuestionCircleFill
                      className="fas helpIco"
                      data-type="light"
                      data-html="true"
                      data-class="data-tooltip"
                      data-tip="The Exponential Moving Average(EMA) measures token trends in the pool. The protection does not allow 1% increase above the EMA."
                    />
                  </Box3Title>
                  <Box3Desc>
                    <span>1% slippage limit based on EMA</span>
                  </Box3Desc>
                </BoxRow>
                <BoxRow>
                  <Box3Title>
                    4. Token price driven{" "}
                    <BsQuestionCircleFill
                      data-type="light"
                      data-html="true"
                      data-class="data-tooltip"
                      data-tip="DMC sends fees to support DMC and the ecosystem through a buyback of DMC tokens from the pool. The DMC received through this process is burned into a zero one address that is used for staking programs to encourage long time holding"
                    />
                  </Box3Title>
                  <Box3Desc>
                    <span>
                      Swap fees used to appreciate DMC :{" "}
                      {this.state.dmcFees >= 0 ? this.state.dmcFees : "0.00"}%
                    </span>
                  </Box3Desc>
                </BoxRow>
              </Box3>
            ) : (
              ""
            )}
            {this.state.isTransactionSetting ? (
              <Box3 className="orngBR">
                <SwapTitle01 className="smTitle">
                  <span>Transaction settings </span>
                  <PPClosBTN01 onClick={() => this.closeSideSection()} />
                </SwapTitle01>
                <YLMBX className="v2">
                  <YLTitle03>
                    Anti bot protection
                    <BsQuestionCircleFill
                      className="fas helpIco"
                      data-type="light"
                      data-html="true"
                      data-class="data-tooltip"
                      data-tip="All Dynamic Swap pools have a default setting of 1% slippage protection over ther average EMA slippage in the pool. The design prevents a front running attack. Transactions fail once the 1% decrease is met."
                    />
                  </YLTitle03>
                  <TSinputBar>
                    <button className="tsBTN01">Auto</button>
                    <input
                      type="text"
                      placeholder="0%"
                      value={this.state.slippage}
                      onChange={(event) => this.calculateSlippage(event)}
                    />
                  </TSinputBar>
                  <div>
                    {this.state.slippage >= 50 ? (
                      <span
                        style={{
                          paddingTop: "20px",
                          color: "#f00",
                        }}
                      >
                        Enter a valid slippage percentage
                      </span>
                    ) : (
                      <></>
                    )}
                    {this.state.slippage >= 6 && this.state.slippage < 50 ? (
                      <span
                        style={{
                          paddingTop: "20px",
                          color: "#aa0",
                        }}
                      >
                        Your transaction may be frontrun
                      </span>
                    ) : (
                      <></>
                    )}
                    {this.state.slippage == 0 ? (
                      <span
                        style={{
                          paddingTop: "20px",
                          color: "#aa0",
                        }}
                      >
                        Your transaction may fail
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                  <YLTitle03>
                    Transaction deadline
                    <BsQuestionCircleFill
                      className="fas helpIco"
                      data-type="light"
                      data-html="true"
                      data-class="data-tooltip"
                      data-tip="Time to remain pending before the <br/> transaction fails."
                    />
                  </YLTitle03>
                  <TSinputBar className="smbar">
                    <input
                      type="text"
                      placeholder="0"
                      value={this.state.deadLine}
                      onChange={(event) => this.changeDeadLine(event)}
                    />
                    minutes
                  </TSinputBar>
                  <YLTitle03>
                    <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                      {" "}
                      Interface settings{" "}
                    </span>
                  </YLTitle03>
                  <TSinputBar02>
                    <span>
                      Auto Router
                      <BsQuestionCircleFill
                        className="fas helpIco"
                        data-type="light"
                        data-html="true"
                        data-class="data-tooltip"
                        data-tip="Allow high price impact trades and skip<br/> the confirm Use at your own risk."
                      />
                    </span>

                    <span>
                      <div className="apollo-element apollo-element-active apollo-field-switcher">
                        <div className="apollo-fieldset">
                          <label>
                            {" "}
                            <input
                              type="checkbox"
                              defaultChecked
                              name="shortcode[active]"
                              value="1"
                              data-depend-id="active"
                              data-atts="active"
                            />
                            <em data-on="On" data-off="Off"></em>
                            <span></span>
                          </label>
                        </div>
                      </div>
                    </span>
                  </TSinputBar02>
                  <TSinputBar02>
                    <span>
                      Expert Mode
                      <BsQuestionCircleFill
                        className="fas helpIco"
                        data-type="light"
                        data-html="true"
                        data-class="data-tooltip"
                        data-tip="Content Coming Soon"
                      />
                    </span>

                    <span>
                      <div className="apollo-element apollo-element-active apollo-field-switcher">
                        <div className="apollo-fieldset">
                          <label>
                            {" "}
                            <input
                              type="checkbox"
                              checked={this.state.multiHops}
                              name="shortcode[active]"
                              value={this.state.multiHops}
                              onChange={(event) => this.onMultiHops(event)}
                              data-depend-id="active"
                              data-atts="active"
                            />
                            <em data-on="On" data-off="Off"></em>
                            <span></span>
                          </label>
                        </div>
                      </div>
                    </span>
                  </TSinputBar02>
                </YLMBX>
              </Box3>
            ) : (
              ""
            )}

            {/* your liquidity popup 01  */}
            {this.state.isAdd_and_Your_Liquidity ? (
              <Box3 className="orngBR">
                <SwapTitle01 className="smTitle">
                  {" "}
                  <span> Add Liquidity </span>
                  <PPClosBTN01 onClick={() => this.closeSideSection()} />{" "}
                </SwapTitle01>

                <YLBtnBar>
                  <SwapBTN01 className="orangBack">Add Liquidity</SwapBTN01>{" "}
                </YLBtnBar>

                <SwapTitle01>
                  {" "}
                  Your liquidity{" "}
                  <BsQuestionCircleFill
                    className="fas helpIco"
                    data-type="light"
                    data-html="true"
                    data-class="data-tooltip"
                    data-tip="View, add, or remove your LP tokens by<br/> connecting your wallet"
                  />{" "}
                </SwapTitle01>

                <SwapInputMbx>
                  <ConnectWallText>
                    {" "}
                    Connect to a wallet to view your liquidity{" "}
                  </ConnectWallText>
                </SwapInputMbx>
                <SSLinkbox01>
                  Don't see the pool you joined? <br />
                  <a href="">Import it</a>
                </SSLinkbox01>
              </Box3>
            ) : (
              ""
            )}
            {/* End of your liquidity popup 01  */}

            {/* your liquidity popup 02  */}
            {this.state.isYourLiquidity ? (
              <Box3 className="orngBR">
                <SwapTitle01 className="smTitle">
                  <span>
                    Your Liquidity
                    <i
                      className="fas helpIco fa-question-circle"
                      data-tip="Content Coming Soon"
                    ></i>{" "}
                  </span>
                  <PPClosBTN01 onClick={() => this.closeSideSection()} />
                </SwapTitle01>
                <YLMBX className="mtFix01">
                  <Accordion allowZeroExpanded className="card-full-width">
                    <AccordionItem className="card-full-width">
                      <AccordionItemHeading className="card-full-width">
                        <AccordionItemButton className="card-full-width d-flex">
                          <YLTitle01 className="your-lp-title">
                            <span>
                              {" "}
                              <i>
                                {" "}
                                {this.state.fromtokenImage1 ? (
                                  <img
                                    style={{ height: "25px", width: "25px" }}
                                    src={this.state.fromtokenImage1}
                                    alt=""
                                  />
                                ) : (
                                  <></>
                                )}{" "}
                              </i>{" "}
                              <i>
                                {" "}
                                {this.state.totokenImage1 ? (
                                  <img
                                    style={{ height: "25px", width: "25px" }}
                                    src={this.state.totokenImage1}
                                    alt=""
                                  />
                                ) : (
                                  <></>
                                )}{" "}
                              </i>
                            </span>
                            {this.checkNot(this.state.fromtokenName1)}/
                            {this.checkNot(this.state.totokenName1)}
                          </YLTitle01>
                          <AccordionItemState>
                            {({ expanded }) =>
                              expanded ? (
                                <BsFillCaretUpFill className="white-icon" />
                              ) : (
                                <BsFillCaretDownFill className="white-icon" />
                              )
                            }
                          </AccordionItemState>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <YLTitle02>
                          Pooled {this.checkNot(this.state.fromtokenName1)}:
                          <span
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            {(
                              Number(this.state.totalLiqValues.from) || 0
                            ).toFixed(4)}
                            {this.state.fromtokenImage1 ? (
                              <img
                                style={{
                                  height: "20px",
                                  width: "20px",
                                  marginLeft: "7.5px",
                                }}
                                src={this.state.fromtokenImage1}
                                alt=""
                              />
                            ) : (
                              <></>
                            )}
                          </span>
                        </YLTitle02>
                        <YLTitle02>
                          Pooled {this.checkNot(this.state.totokenName1)}:
                          <span
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            {(
                              Number(this.state.totalLiqValues.to) || 0
                            ).toFixed(4)}
                            {this.state.totokenImage1 ? (
                              <img
                                style={{
                                  height: "20px",
                                  marginLeft: "7.5px",
                                  width: "20px",
                                }}
                                src={this.state.totokenImage1}
                                alt=""
                              />
                            ) : (
                              <></>
                            )}
                          </span>
                        </YLTitle02>
                        <YLTitle02
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>Your pool tokens:</span>
                          {/* <span>{this.state.pairBalance}</span> */}
                        </YLTitle02>
                        <YLTitle02>Your pool shared:</YLTitle02>
                        <YLBtnBar>
                          <a href="#" className="ylBTN01">
                            {" "}
                            View pool information{" "}
                            <i className="fas fa-external-link-alt"></i>
                          </a>
                        </YLBtnBar>
                        <YLBtnBar>
                          <button
                            onClick={this.realAddLiquidity}
                            className="ylBTN02"
                          >
                            Add{" "}
                          </button>
                          <button
                            onClick={this.removeLiquidities}
                            className="ylBTN02"
                          >
                            Remove{" "}
                          </button>
                        </YLBtnBar>
                      </AccordionItemPanel>
                    </AccordionItem>
                  </Accordion>
                </YLMBX>
                <YLBtnBar style={{ paddingBottom: "0px" }}>
                  <span>
                    Don't see the pool you joined? <br />{" "}
                    <a href="#" className="ylBTN01">
                      Import it
                    </a>{" "}
                  </span>
                </YLBtnBar>
              </Box3>
            ) : (
              ""
            )}
            {/* End of your liquidity popup 02  */}
            {/* Remove Liquidity popup */}
            {this.state.isRemoveLiquidity ? (
              <Box3 className="orngBR">
                <SwapTitle01 className="smTitle">
                  <span>Remove Liquidity</span>
                  <BsQuestionCircleFill
                    className="fas tip-ico"
                    data-type="light"
                    data-html="true"
                    data-class="data-tooltip"
                    data-tip="By removing liquidity, the LPs are sent to your wallet"
                  />
                  <PPClosBTN01 onClick={() => this.closeSideSection()} />
                </SwapTitle01>
                <RLTitle01>
                  Amount <a href="#">Detailed</a>
                </RLTitle01>
                <RLTitle01 className="v2">{this.state.value} %</RLTitle01>
                <DragorInput>
                  <InputRange
                    maxValue={100}
                    minValue={0}
                    di
                    value={this.state.value}
                    formatLabel={(value) => `${value}%`}
                    onChange={(value) =>
                      this.removeLiquidityAmountChange(value)
                    }
                  />
                </DragorInput>
                <RLBTNBX>
                  <button
                    className={this.state.value == 25 ? "active" : ""}
                    onClick={() => {
                      this.removeLiquidityAmountChange(25);
                    }}
                  >
                    25%
                  </button>
                  <button
                    className={this.state.value == 50 ? "active" : ""}
                    onClick={() => {
                      this.removeLiquidityAmountChange(50);
                    }}
                  >
                    50%
                  </button>
                  <button
                    className={this.state.value == 75 ? "active" : ""}
                    onClick={() => {
                      this.removeLiquidityAmountChange(75);
                    }}
                  >
                    75%
                  </button>
                  <button
                    className={this.state.value == 100 ? "active" : ""}
                    onClick={() => {
                      this.removeLiquidityAmountChange(100);
                    }}
                  >
                    100%
                  </button>
                </RLBTNBX>
                <AeroBX>
                  {" "}
                  <i className="fas fa-arrow-down"></i>{" "}
                </AeroBX>
                <YLMBX>
                  <YLTitle02 className="v2">
                    {this.state.removeLiqValues.from || 0}
                    <span>
                      <SSBTN01
                        onClick={() => {
                          this.setState({
                            popup02: true,
                            popupID: "removeLiqFrom",
                            checkedTo: false,
                          });
                        }}
                        className={
                          this.state.removeLiqFromTokens.name ? "" : "OrangeBTN"
                        }
                      >
                        {" "}
                        <img
                          className="imgStyle"
                          src={this.state.removeLiqFromTokens.img}
                          alt=""
                        />{" "}
                        {this.state.removeLiqFromTokens.name
                          ? this.state.removeLiqFromTokens.name
                          : "Select Token"}{" "}
                        {/* <i className="fas fa-chevron-down"></i> */}
                      </SSBTN01>
                    </span>
                  </YLTitle02>
                  <YLTitle02 className="v2">
                    {this.state.removeLiqValues.to || 0}
                    <span>
                      <SSBTN01
                        onClick={() => {
                          this.setState({
                            popup02: true,
                            popupID: "removeLiqTo",
                            checkedTo: false,
                          });
                        }}
                        className={
                          this.state.removeLiqToTokens.name ? "" : "OrangeBTN"
                        }
                      >
                        {" "}
                        <img
                          className="imgStyle"
                          src={this.state.removeLiqToTokens.img}
                          alt=""
                        />{" "}
                        {this.state.removeLiqToTokens.name
                          ? this.state.removeLiqToTokens.name
                          : "Select Token"}{" "}
                        {/* <i className="fas fa-chevron-down"></i> */}
                      </SSBTN01>
                    </span>
                  </YLTitle02>
                </YLMBX>
                {/* {![
                  this.state.removeLiqFromTokens.name,
                  this.state.removeLiqToTokens.name,
                ].includes("") ? (
                  <span
                    style={{
                      width: "100%",
                      textAlign: "left",
                      fontSize: "10px",
                      padding: "10px 0px 0px",
                    }}
                  >
                    {this.state.removeLiqFromTokens.name}/
                    {this.state.removeLiqToTokens.name} LP Token Pair Balance:{" "}
                    {this.state.pairBalance}
                  </span>
                ) : (
                  <></>
                )} */}
                <YLBtnBar>
                  <button
                    disabled={this.getRemovalStatus()}
                    className={this.getRemovalStatus() ? "ylBTN02" : "ylBTN03"}
                    onClick={this.approve_onRemoveLiquidity}
                  >
                    Approve{" "}
                  </button>
                  <button
                    className={
                      !this.state.removeLiqFromTokens.name ||
                      !this.state.removeLiqToTokens.name ||
                      !this.getRemovalStatus()
                        ? "ylBTN02"
                        : "ylBTN03"
                    }
                    disabled={
                      !this.state.removeLiqFromTokens.name ||
                      !this.state.removeLiqToTokens.name ||
                      !this.getRemovalStatus()
                    }
                    onClick={this.removeliquidity}
                  >
                    Remove{" "}
                  </button>
                </YLBtnBar>
              </Box3>
            ) : (
              ""
            )}
            {/* End of Remove Liquidity popup  */}

            {/* add Liquidity box  */}
            {this.state.isAddLiquidity ? (
              <Box3 className="orngBR">
                <SwapTitle01 className="smTitle">
                  <span>Add Liquidity </span>
                  <PPClosBTN01 onClick={() => this.closeSideSection()} />
                </SwapTitle01>
                <SwapInputMbx>
                  <SSbx01>
                    <span>Input </span>
                    <DebounceInput
                      minLength={1}
                      debounceTimeout={1000}
                      readOnly={
                        this.state.tot === "Select Token" ||
                        this.state.liquiditytokenfrom === "Select Token"
                      }
                      type="text"
                      id="liqfrom"
                      placeholder="0.0"
                      value={this.state.liquiditytokenamountA}
                      onClick={() => {
                        this.setState({
                          liquidityclick: true,
                          liquidityamountout: false,
                        });
                      }}
                      onChange={(event) => this.handleContractChange(event)}
                    />
                  </SSbx01>
                  <SSbx02>
                    <span>Balance: {this.state.liquiditybalancefrom}</span>
                    {this.state.liquiditytokenfrom !== "Select Token" ? (
                      <div
                        className="maxTitle"
                        onClick={() => {
                          this.setState({
                            liquidityclick: true,
                            swapClick: false,
                          });
                          this.useFullBalance(
                            this.state.tokenAaddress,
                            this.state.liquiditybalancefrom,
                            (v) => {
                              this.setState({ liquiditytokenamountA: v });
                            }
                          );
                        }}
                      >
                        Max
                      </div>
                    ) : (
                      <></>
                    )}
                    <button
                      className={
                        this.state.liquiditytokenfrom !== "Select Token"
                          ? ""
                          : "OrangeBTN"
                      }
                      onClick={() => {
                        this.setState({
                          liquidityclick: true,
                          swapClick: false,
                          lquidityfrom: true,
                          popup02: true,
                          selectedChain: this.state.currChain,
                          popupID: "liqFrom",
                          checkedTo: false,
                        });
                      }}
                    >
                      {this.state.liquiditytokenfrom !== "Select Token" ? (
                        <IconImage alt="" src={this.state.liqFromImg} />
                      ) : (
                        <></>
                      )}
                      {this.state.liquiditytokenfrom}{" "}
                      <i className="fas fa-chevron-down"></i>
                    </button>
                  </SSbx02>
                </SwapInputMbx>
                <SwapTitle02 className="Center">
                  <i className="fas fa-plus"></i>
                </SwapTitle02>
                <SwapInputMbx>
                  <SSbx01>
                    <span>To (estimated) </span>
                    <input
                      readOnly={
                        this.state.tot === "Select Token" ||
                        this.state.liquiditytokenfrom === "Select Token"
                      }
                      type="text"
                      defaultValue=""
                      placeholder="0.0"
                      value={this.state.liquiditytokenamountB}
                      onClick={() => {
                        this.setState({
                          liquidityclick: true,
                          liquidityamountout: true,
                        });
                      }}
                      onChange={(event) => this.handleContractChange(event)}
                    />
                  </SSbx01>
                  <SSbx02>
                    <span>-</span>

                    <button
                      className={
                        this.state.tot !== "Select Token" ? "" : "OrangeBTN"
                      }
                      onClick={() => {
                        this.setState({
                          lquidityfrom: false,
                          swapClick: false,
                          liquidityclick: true,
                          lquidityto: true,
                          popup02: true,
                          selectedChain: this.state.currChain,
                          popupID: "liqTo",
                          checkedTo: true,
                        });
                      }}
                    >
                      {this.state.tot !== "Select Token" ? (
                        <IconImage alt="" src={this.state.liqToImg} />
                      ) : (
                        <></>
                      )}
                      {this.state.tot} <i className="fas fa-chevron-down"></i>
                    </button>
                  </SSbx02>
                </SwapInputMbx>
                {/* <SwapTitle03> */}
                {/* {![this.state.tot, this.state.liquiditytokenfrom].includes('Select Token') ? <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ margin: '20px 0' }}>Prices and pool share</span>
                                        </div> : <></>} */}
                {/* {![this.state.tot, this.state.liquiditytokenfrom].includes(
                    "Select Token"
                  ) ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        margin: "10px 0",
                        alignItems: "flex-start",
                        borderRadius: "10px",
                        border: ".1rem solid #555",
                      }}
                    >
                      <span
                        style={{
                          margin: "0",
                          fontSize: "12px",
                          padding: "10px",
                          borderBottom: ".1rem solid #555",
                          width: "100%",
                          textAlign: "left",
                        }}
                      >
                        Prices and pool share
                      </span>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          padding: "15px 10px",
                          width: "100%",
                        }}
                      >
                        <section
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <span style={{ fontSize: "10px" }}>
                            {!this.state.liqTokenRatio
                              ? "-"
                              : (1 / this.state.liqTokenRatio).toFixed(4)}
                          </span>
                          <span style={{ fontSize: "10px" }}>
                            {this.state.tot} per {this.state.liquiditytokenfrom}
                          </span>
                        </section>
                        <section
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <span style={{ fontSize: "10px" }}>
                            {!this.state.liqTokenRatio
                              ? "-"
                              : this.state.liqTokenRatio.toFixed(4)}
                          </span>
                          <span style={{ fontSize: "10px" }}>
                            {this.state.liquiditytokenfrom} per {this.state.tot}
                          </span>
                        </section>
                        <section
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <span style={{ fontSize: "10px" }}>
                            {(this.state.liqImpact || 0) === 0
                              ? "-"
                              : this.state.liqImpact < 0.0001
                              ? "<0.0001%"
                              : this.state.liqImpact >= 100
                              ? "100%"
                              : `${this.state.liqImpact.toFixed(4)}%`}
                          </span>
                          <span style={{ fontSize: "10px" }}>
                            Share of Pool
                          </span>
                        </section>
                      </div>
                    </div>
                  ) : (
                    <div style={{ margin: "10px" }} />
                  )} */}

                {/* {![this.state.tot, this.state.liquiditytokenfrom].includes('Select Token') ? <span style={{ width: '100%', textAlign: 'left',fontSize:'10px',marginTop: '-10px' }}>
                                            % of total LP: {((this.state.pairBalance / (this.state.totalAmountSupply || 1) * 100) || 0).toFixed(4)}%
                                        </span> : <></>} */}
                {/* </SwapTitle03> */}

                {!localStorage.getItem("account") ? (
                  <SwapBTN01
                    className="darkGray top-btn-space"
                    onClick={() => connectwallet()}
                  >
                    Connect Wallet
                  </SwapBTN01>
                ) : +this.state.liquiditybalanceto <
                    +this.state.liquiditytokenamountB ||
                  +this.state.liquiditybalancefrom <
                    +this.state.liquiditytokenamountA ? (
                  <SwapBTN01 className="darkGray top-btn-space">
                    Insufficient Funds
                  </SwapBTN01>
                ) : this.state.tot === "Select Token" ||
                  this.state.liquiditytokenfrom === "Select Token" ? (
                  <SwapBTN01 className="darkGray top-btn-space">
                    Invalid Pair
                  </SwapBTN01>
                ) : (
                  <SwapBTN01
                    className="orangBack top-btn-space"
                    onClick={() => {
                      this.liquidity(openSnackbar);
                    }}
                  >
                    {this.state.liquiditymethod}
                  </SwapBTN01>
                )}
              </Box3>
            ) : (
              ""
            )}

            {/* You will receive Popup 1  */}
            {this.state.isConfirmSupply ? (
              <Box3 className="active">
                <SwapTitle01 className="smTitle">
                  <span> You will receive </span>
                  <PPClosBTN01 onClick={() => this.closeSideSection()} />
                </SwapTitle01>

                <YwrTitle01>
                  {" "}
                  {/* {this.state.tokenamountOut}{" "} */}
                  150.2913{" "}
                  <span>
                    <i className="ywrCoinImg">
                      {" "}
                      <img src={YRIcon01} alt="" />{" "}
                    </i>
                    <i className="ywrCoinImg">
                      <img src={YRIcon02} alt="" />{" "}
                    </i>{" "}
                  </span>
                </YwrTitle01>

                <YwrTitle02>
                  {this.state.fromtokenName1}/{this.state.totokenName1} pool
                  tokens
                </YwrTitle02>

                <YwrTitle01 className="smVr">
                  {this.state.fromtokenName1} deposited{" "}
                  <span>
                    <i className="ywrCoinImg">
                      {" "}
                      <img src={YRIcon01} alt="" />{" "}
                    </i>{" "}
                    {this.state.bSwap_Deposited}{" "}
                  </span>
                </YwrTitle01>
                <YwrTitle01 className="smVr">
                  {this.state.totokenName1} deposited{" "}
                  <span>
                    <i className="ywrCoinImg">
                      {" "}
                      <img src={YRIcon02} alt="" />{" "}
                    </i>{" "}
                    {this.state.bnb_Deposited}{" "}
                  </span>
                </YwrTitle01>
                <YwrTitle01 className="smVr">
                  Rates{" "}
                  <span>
                    {this.state.rate1} <br /> {this.state.rate2}{" "}
                  </span>
                </YwrTitle01>
                <YwrTitle01 className="smVr">
                  Shared of pool <span>{this.state.shared_of_pool}</span>
                </YwrTitle01>

                {!localStorage.getItem("account") ||
                this.state.currChain != "bsc" ? (
                  <SwapBTN01
                    className="orangBack"
                    onClick={() => this.connectMetamask()}
                  >
                    Connect Wallet
                  </SwapBTN01>
                ) : (
                  <SwapBTN01
                    className="orangBack"
                    style={{ marginTop: "10px" }}
                    onClick={() => this.confirmSupply()}
                  >
                    Confirm Supply
                  </SwapBTN01>
                )}
              </Box3>
            ) : (
              ""
            )}
            {/* End of You will receive Popup 1 */}
            {/* You will receive Popup 2 */}
            {/* <SwapTitle01 className="smTitle">
              <span>You will receive </span>
              <PPClosBTN01 onClick={() => this.closeSideSection()} />
            </SwapTitle01>
            <DMCList className="ver2">
              <p>0.0521</p>
              <Box1TopPart className="mb-0">
                <div className="img-outer ver2">
                  <img src={Icon1} alt="" />
                </div>
                <p className="ml-10">DMC</p>
              </Box1TopPart>
            </DMCList>
            <PlusBox className="ver2">+</PlusBox>
            <DMCList className="ver2 mb-30">
              <p>11.24</p>
              <Box1TopPart className="mb-0">
                <div className="img-outer ver2">
                  <img src={Icon3} alt="" />
                </div>
                <p className="ml-10">BNB</p>
              </Box1TopPart>
            </DMCList>
            <DMCList className="mb-10 align-items-start">
              <p>DMC/BNB Burned</p>
              <Box1TopPart className="mb-0">
                <div className="img-outer ">
                  <img src={Icon1} alt="" />
                </div>
                <div className="img-outer ">
                  <img src={Icon3} alt="" />
                </div>
                <p className="ml-10">0.01238</p>
              </Box1TopPart>
            </DMCList>
            <DMCList className="mb-10 align-items-start">
              <p>Price</p>
              <Box1TopPart className="mb-0">
                <p className="ml-10 text-right">
                  1 DMC = 0.25 BNB <br />1 BNB = 25 DMC
                </p>
              </Box1TopPart>
            </DMCList>
            <GreenBtn className="ani-1">Confirm</GreenBtn> */}
            {/* End of You will receive Popup 2 */}
            {/* Vote popup 01  */}
            {this.state.isVote ? (
              <Box3 className="active">
                <PPClosBTN01 className="voteCloseBtn" onClick={() => this.closeSideSection()} />{" "}
                <CustomTabs>
                  <Tabs>
                    <TabList>
                      <Tab>Vote</Tab>
                      <Tab>Add New Vote</Tab>
                    </TabList>
                    <TabPanel>
                      <CustomTabs2>
                        <Tabs>
                          <TabList>
                            <Tab>Active proposal</Tab>
                            <Tab>Completed votes</Tab>
                          </TabList>
                          <TabPanel>
                            <CText>
                              Change circuit breakers from 10% per day for all
                              transactions to 0%
                            </CText>
                            <TimeVote>Time to vote</TimeVote>
                            <TimerList>
                              <TimeBox>1</TimeBox>
                              <TimeBox>1</TimeBox>
                              <TimeBox className="colun">:</TimeBox>
                              <TimeBox>2</TimeBox>
                              <TimeBox>4</TimeBox>
                              <TimeBox className="colun">:</TimeBox>
                              <TimeBox>5</TimeBox>
                              <TimeBox>6</TimeBox>
                              <TimeBox className="colun">:</TimeBox>
                              <TimeBox>7</TimeBox>
                              <TimeBox>8</TimeBox>
                            </TimerList>
                            <ButtonList className="ver3">
                              <button className="ani-1 red-btn">Nay</button>
                              <button className="ani-1 green-btn">Yea</button>
                            </ButtonList>
                          </TabPanel>
                          <TabPanel>
                            <CText className="mb-10">
                              Change circuit breakers from 10% pre day for all
                              transaction to 0%
                            </CText>
                            <CDate>Ends Jul 1, 2021 20:45</CDate>
                            <DoubleHR></DoubleHR>
                            <CText className="mb-10 mt-0">
                              Proposal to Boost the SMART-USDC farm and a New
                              bSWAP Pool
                            </CText>
                            <CDate>Ends Jul 1, 2021 20:45</CDate>
                          </TabPanel>
                        </Tabs>
                      </CustomTabs2>
                    </TabPanel>
                    <TabPanel>
                      <AddNewVote>
                        <SelectOuter>
                          <select>
                            <option>A rule</option>
                            <option>A terms</option>
                          </select>
                          <FaChevronDown />
                        </SelectOuter>
                        <input placeholder="The change" />
                        <textarea placeholder="Explanation"></textarea>
                        <GreenBtn className="ani-1 mt-0">Add New Vote</GreenBtn>
                      </AddNewVote>
                    </TabPanel>
                  </Tabs>
                </CustomTabs>
              </Box3>
            ) : (
              ""
            )}
            {/* End of Vote popup 01  */}
            {/* 
              {![this.state.tot, this.state.liquiditytokenfrom].includes(
                "Select Token"
              ) && this.state.isAddLiquidity ? (
                <div
                  style={{
                    display: "flex",
                    padding: "10px",
                    flexDirection: "column",
                    width: "100%",
                    margin: "10px 0",
                    alignItems: "flex-start",
                    borderRadius: "10px",
                    border: ".1rem solid #555",
                  }}
                >
                  <span style={{ color: "#aaa", margin: "10px 0" }}>
                    LP Tokens in your wallet
                  </span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      color: "#aaa",
                      width: "100%",
                      marginBottom: "5px",
                    }}
                  >
                    <span>
                      <span>
                        {this.state.liquiditytokenfrom !== "Select Token" ? (
                          <IconImage alt="" src={this.state.liqFromImg} />
                        ) : (
                          <></>
                        )}
                        {this.state.tot !== "Select Token" ? (
                          <IconImage alt="" src={this.state.liqToImg} />
                        ) : (
                          <></>
                        )}
                      </span>
                      {this.state.liquiditytokenfrom}/{this.state.tot} LP
                    </span>
                    <span style={{ fontWeight: "600", color: "#ddd" }}>
                      {this.state.pairBalance}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      color: "#aaa",
                      width: "100%",
                      marginBottom: "5px",
                    }}
                  >
                    <span>
                      {this.state.liquiditytokenfrom !== "Select Token" ? (
                        <IconImage alt="" src={this.state.liqFromImg} />
                      ) : (
                        <></>
                      )}
                      Pooled {this.state.liquiditytokenfrom}
                    </span>
                    <span style={{ fontWeight: "600", color: "#ddd" }}>
                      {(Number(this.state.totalLiqValues.from) || 0).toFixed(4)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      color: "#aaa",
                      width: "100%",
                      marginBottom: "5px",
                    }}
                  >
                    <span>
                      {this.state.tot !== "Select Token" ? (
                        <IconImage alt="" src={this.state.liqToImg} />
                      ) : (
                        <></>
                      )}
                      Pooled {this.state.tot}
                    </span>
                    <span style={{ fontWeight: "600", color: "#ddd" }}>
                      {(Number(this.state.totalLiqValues.to) || 0).toFixed(4)}
                    </span>
                  </div>
                </div>
              ) : (
                <></>
              )} */}
            {/* End of add Liquidity popup */}
          </BoxesOuter>
          <BoxesOuter className="button-line">
            <Box1 className="ver2 desktop-div"></Box1>
            <Box2 className="ver2 desktop-div">
              <ExtraLinks>
                <Link to="#">
                  100% gas and fee reimbursement{" "}
                  <BsQuestionCircleFill
                    data-type="light"
                    data-html="true"
                    className="fas helpIco"
                    data-class="data-tooltip"
                    data-tip="Content Coming Soon"
                  />
                </Link>
                <span></span>
                <Link
                  to="#"
                  className={this.state.transactionSettingClass}
                  onClick={() => this.transactionSetting()}
                >
                  Transaction settings
                </Link>
              </ExtraLinks>
            </Box2>
            <Box3 className="ver2">
              <ExtraLinks>
                <Link
                  to="#"
                  className={this.state.enableLiquidityClass}
                  onClick={() => this.addLiquidity()}
                >
                  Add liquidity
                </Link>
                <span></span>
                <Link
                  to="#"
                  className={this.state.voteClass}
                  onClick={() => this.vote()}
                >
                  Vote
                </Link>
              </ExtraLinks>
              {this.state.isAddLiquidity &&
              this.state.tot !== "Select Token" &&
              this.state.liquiditytokenfrom !== "Select Token" ? (
                <ExtraInfo>
                  <p>
                    Initial prices and pool shares <br />{" "}
                    <b>860.048 bSWAP per BNB</b>
                    <br /> <b>0.00116273 BNB per bSWAP</b>
                    <br /> <b>0% Shared pool</b>
                  </p>
                </ExtraInfo>
              ) : this.state.isConfirmSupply ? (
                <ExtraInfo>
                  <AlertTitle01 style={{ margin: "0" }}>
                    Output is estimated, if the price changes by more than 0.5%
                    your transaction will revert.
                  </AlertTitle01>
                </ExtraInfo>
              ) : (
                ""
              )}
            </Box3>
          </BoxesOuter>
          {/* <SSIconMBX01>
            <HeadCenterbox>
              <span>Supporting all DEXs</span>
              <div className="support-list">
                <Link to="/page2">
                  <img src={dexIcon01} alt="" />{" "}
                </Link>
                <Link to="/page3">
                  <img src={dexIcon02} alt="" />{" "}
                </Link>
                <Link to="/page4">
                  <img src={dexIcon03} alt="" />{" "}
                </Link>
                <Link to="/page5">
                  <img src={dexIcon04} alt="" />{" "}
                </Link>
                <Link to="/page6">
                  <img src={dexIcon05} alt="" />{" "}
                </Link>
                <Link href="">
                  <img src={dexIcon06} alt="" />{" "}
                </Link>
                <Link href="">
                  <img src={dexIcon07} alt="" />{" "}
                </Link>
                <Link href="">
                  <img src={dexIcon08} alt="" />{" "}
                </Link>
                <Link href="">
                  <img src={dexIcon09} alt="" />{" "}
                </Link>
                <Link href="">
                  <img src={dexIcon010} alt="" />{" "}
                </Link>
                <Link href="">
                  <img src={dexIcon011} alt="" />{" "}
                </Link>
                <Link href="">
                  <img src={dexIcon012} alt="" />{" "}
                </Link>
                <Link href="">
                  <img src={dexIcon013} alt="" />{" "}
                </Link>
                <Link href="">
                  <img src={dexIcon014} alt="" />{" "}
                </Link>
                <Link href="">
                  <img src={dexIcon015} alt="" />{" "}
                </Link>
                <Link href="">
                  <img src={dexIcon016} alt="" />{" "}
                </Link>
                <Link href="">
                  <img src={dexIcon017} alt="" />{" "}
                </Link>
                <Link href="">
                  <img src={dexIcon018} alt="" />{" "}
                </Link>
                <Link href="">
                  <img src={dexIcon019} alt="" />{" "}
                </Link>
              </div>
            </HeadCenterbox>
          </SSIconMBX01> */}
          <TokenLogoCenterBox>
            <img src={PolyGonLogo} alt="" />
            <img src={ETHLogo} alt="" />
            <img src={BinanceLogo} alt="" />
          </TokenLogoCenterBox>
        </Gs.Container>
        <SelectTokenPopup
          specialSelectToken={this.specialSelectToken}
          defaultToken={this.props.location.hash}
          currentChain={shortenChain(this.state.clickedChain)}
          isOpen={this.state.popup02}
          dismiss={() => {
            this.setState({ popup02: false });
          }}
          chain={this.state.selectedChain}
          checkedTo={this.state.checkedTo}
          selectToken={this.selectToken}
          onTokenChainHandler={onTokenChainHandler}
          liquidityclick={this.state.liquidityclick}
          balanceFrom={[this.state.fromtokenName1, this.state.fromTokenBalance]}
          balanceTo={[this.state.totokenName1, this.state.toTokenBalance]}
        />
        <SelectChainPopup
          isOpen={this.state.popup03 && false}
          dismiss={() => {
            this.setState({ popup03: false });
          }}
          selectChain={this.selectChain}
        />

        <TokenPopup
          isOpen={this.state.popup01}
          dismiss={() => {
            this.setState({ popup01: false });
          }}
        />
        <TransactionPopup
          isOpen={this.state.transaction}
          dismiss={() => {
            this.setState({ transaction: false });
          }}
          chain={this.state.currChain}
        />
        <LoaderPopup isOpen={this.state.loader} />
        <WrongNetworkPopup
          isOpen={this.state.isWrongNetwork}
          dismiss={() => {
            this.setState({ isWrongNetwork: false });
          }}
          message={this.state.wrongNetworkMsg}
        />
        <FailedTransactionPopup
          isOpen={this.state.isTransactionFailed}
          dismiss={() => {
            this.setState({ isTransactionFailed: false });
          }}
        />
        <ReactTooltip effect="solid" className="myTip" />
      </>
    );
  }
  // onTransactionSuccess(){
  //     let sts = this.state.transaction;
  //     this.setState({ transaction: false });
  //     if(sts){
  //         window.location.reload();
  //     }
  // }
  onMultiHops(eve) {
    this.setState({ multiHops: eve.target.checked });
    if (eve.target.checked) {
      this.setState((p) => ({ disableSwapButton: true && p.usingThreePath }));
    } else {
      this.setState({ disableSwapButton: false });
    }
  }
  async selectMaxBalance(event) {
    const { openSnackbar } = this.props;
    if (
      this.state.fromtokenName1 === "Select Token" ||
      this.state.totokenName1 === "Select Token"
    )
      return openSnackbar("Please choose a token pair.");
    this.setState({ liquidityclick: false, swapamountout: false });
    let bal = this.state.fromTokenBalance;
    const chain = await getDefaultChain();

    if (window?.ethereum && bal > 0 && (chain === "bsc" || chain === "eth")) {
      const accounts = await window?.ethereum.request({
        method: "eth_requestAccounts",
      });
      // console.log(accounts);
      let userwalletaddresss = accounts[0];
      window.web3 = new Web3(window?.ethereum);
      let gasPrice = await window.web3.eth.getGasPrice();

      let gas = 0;
      var block = await window.web3.eth.getBlock("latest");
      gas = block.gasLimit;

      // if (this.state.tokenfromAddress == '0x0000000000000000000000000000000000000000') {
      //     let path = [WBNB_Address, this.state.tokentoAddress];
      //     let deadline = (this.state.time + 10000)
      //     swaping.methods.swapExactETHForTokens(amountOut, path, userwalletaddresss, deadline).estimateGas({ from: userwalletaddresss, value: amountIn })
      //         .then((res) => {
      //             console.log(res);
      //             gas = res;

      //         });
      // }
      // else if (this.state.tokentoAddress == '0x0000000000000000000000000000000000000000') {
      //     let path = [this.state.tokenfromAddress, WBNB_Address];
      //     let deadline = (this.state.time + 10000)
      //     swaping.methods.swapExactTokensForETH(amountIn, amountOut, path, userwalletaddresss, deadline).estimateGas({ from: userwalletaddresss })
      //         .then((res) => {
      //             gas = res;
      //         });
      // }
      // else {
      //     let path = [this.state.tokenfromAddress, this.state.tokentoAddress];
      //     let deadline = (this.state.time + 10000)
      //     swaping.methods.swapExactTokensForTokens(amountIn, amountOut, path, userwalletaddresss, deadline).estimateGas({ from: userwalletaddresss })
      //         .then((res) => {
      //             console.log(res);
      //             gas = res;
      //         });
      // }

      let newBal = bal * 1000000000000000000;
      //let fee = (gas + 200000) * gasPrice;
      let fee = (gas + 200000) * gasPrice;
      let calc = newBal - fee;
      event.target.value = calc / 1000000000000000000;
      if (fee < newBal) {
        this.setState({ insuffientBalance: false });
        this.handleContractChange(event);
      } else {
        const { openSnackbar } = this.props;
        openSnackbar("Insufficient funds for this transaction.");
        this.setState({ insuffientBalance: true });
      }
    }
  }
  selectChain = async (chain) => {
    const currentChain = await getDefaultChain();
    this.setState({ popup03: false, clickedChain: chain.chain });
    //if (currentChain == chain.name.toLocaleLowerCase()) {

    if (this.state.popupID == "fromChainName1") {
      let fromchain = chain.name == "Ethereum" ? "eth" : "bsc";
      if (currentChain == fromchain) {
        this.setState({ fromChainName1: chain.chain });
        this.setState({ fromChainImage1: chain.image });
        this.setState({ fromChainAddress: chain.value });
      } else {
        this.setState({ isWrongNetwork: true });
      }
    } else if (this.state.popupID == "toChainName1") {
      this.setState({ toChainName1: chain.chain });
      this.setState({ toChainImage1: chain.image });
      this.setState({ toChainAddress: chain.value });

      this.setState({ totokenName1: "Select Token" });
      this.setState({ totokenImage1: "" });
      this.setState({ tokentoAddress: "" });
      this.setState({ tokenamountIn: "", tokenamountOut: 0 });
    }
    // }
    // else {
    //     this.setState({ isWrongNetwork: true });
    //     return;
    // }
  };
  specialSelectToken = (fromToken, toToken) => {
    if (!(fromToken && toToken)) return;
    this.setState({
      fromtokenName1: fromToken.symbol,
      fromtokenImage1: fromToken.image,
      tokenfromAddress: fromToken.value,
      totokenName1: toToken.symbol,
      totokenImage1: toToken.image,
      tokentoAddress: toToken.value,
    });
    this.getTokenBalance(fromToken.symbol, fromToken.value, "from");
  };
  selectToken = async (token) => {
    const { openSnackbar } = this.props;
    const { popupID } = this.state;
    console.log(popupID);
    if (
      [
        "fromtokenName1",
        "totokenName1",
        "fromChainName1",
        "toChainName1",
      ].includes(popupID)
    ) {
      // if (this.state.fromtokenName1 == token.symbol || this.state.totokenName1 == token.symbol) {
      //     return;
      // }
      console.log(token, "inside the selectionn");
      this.setState({ popup02: false });
      if (this.state.popupID == "fromtokenName1") {
        this.setState({ fromtokenName1: token.symbol });
        this.setState({ fromtokenImage1: token.image });
        this.setState({ tokenfromAddress: token.value });
        //this.setState({ fromTokenBalance: token.balance });
        localStorage.setItem("tokenfromAddress", token.value);
        localStorage.setItem("tokenfrom", token.symbol);
        this.getTokenBalance(token.symbol, token.value, "from");
      } else if (this.state.popupID == "fromChainName1") {
        this.setState({ fromChainName1: token.symbol });
        this.setState({ fromChainImage1: token.image });
      } else if (this.state.popupID == "totokenName1") {
        this.setState({ totokenName1: token.symbol });
        this.setState({ totokenImage1: token.image });
        this.setState({ tokentoAddress: token.value });
        localStorage.setItem("tokentoAddress", token.value);
        localStorage.setItem("tokento", token.symbol);
        this.getTokenBalance(token.symbol, token.value, "to");
      } else if (this.state.popupID == "toChainName1") {
        this.setState({ toChainName1: token.symbol });
        this.setState({ toChainImage1: token.image });
      }
    } else if (["liqFrom", "liqTo"].includes(popupID)) {
      if (
        this.state.liquiditytokenfrom == token.symbol ||
        this.state.tot == token.symbol
      ) {
        return;
      }
      this.setState({ popup02: false });
      if (popupID === "liqFrom") {
        this.setState({
          liquiditytokenfrom: token.symbol,
          liqFromImg: token.image,
          tokenAaddress: token.value || token.address,
        });
        this.getTokenBalance(token.symbol, token.value, "liquidityfrom");
      } else {
        this.setState({
          tot: token.symbol,
          liqToImg: token.image,
          tokenBaddress: token.value || token.address,
        });
        this.getTokenBalance(token.symbol, token.value, "lquidityto");
      }
    } else if (["removeLiqFrom", "removeLiqTo"].includes(popupID)) {
      this.setState({ popup02: false });
      if (popupID === "removeLiqFrom") {
        this.setState({
          removeLiqFromTokens: {
            name: token.symbol,
            img: token.image,
            address: token.value,
          },
        });
        if (token.value && this.state.removeLiqToTokens.address) {
          this.getRemoveLiquidityValues();
        }
      } else if (popupID === "removeLiqTo") {
        this.setState({
          removeLiqToTokens: {
            name: token.symbol,
            img: token.image,
            address: token.value,
          },
        });
        if (this.state.removeLiqFromTokens.address && token.value) {
          this.getRemoveLiquidityValues();
        }
      }
    }
    // if (this.state.fromtokenName1 != 'Select Token' || this.state.totokenName1 != 'Select Token') {
    //     let bna_jnrt = ['BNB', 'JNTR/b'];
    //     let avav_bvbv = ['AVAV', 'BVBV'];
    //     if (bna_jnrt.includes(token.name) && bna_jnrt.includes(token.name)) {
    //         let dd = null;

    //     } else if (avav_bvbv.includes(token.name) && avav_bvbv.includes(token.name)) {
    //         let aa = null;

    //     } else {
    //         this.setState({ popup02: false })
    //         openSnackbar('Please select valid pair.');
    //         return;
    //     }
    // }

    //this.setState({ fromtokenName1: token });
    // this.setState({ popup02: false })
    let eve = {
      target: {
        //value : this.state.tokenamountIn
        value: "",
      },
    };
    this.handleContractChange(eve);
  };
  exchange = async () => {
    const fromtokenName1 = this.state.fromtokenName1;
    const fromtokenImage1 = this.state.fromtokenImage1;
    const tokenamountIn = this.state.tokenamountIn;
    const tokenfromAddress = this.state.tokenfromAddress;
    const tokenfromBalance = this.state.fromTokenBalance;

    const totokenName1 = this.state.totokenName1;
    const totokenImage1 = this.state.totokenImage1;
    const tokenamountOut = this.state.tokenamountOut;
    const tokentoAddress = this.state.tokentoAddress;
    const tokentoBalance = this.state.toTokenBalance;

    this.setState({ fromtokenName1: totokenName1 });
    this.setState({ fromtokenImage1: totokenImage1 });
    this.setState({ tokenamountIn: tokenamountOut });
    this.setState({ tokenfromAddress: tokentoAddress });
    this.setState({ fromTokenBalance: tokentoBalance });

    this.setState({ totokenName1: fromtokenName1 });
    this.setState({ totokenImage1: fromtokenImage1 });
    this.setState({ tokenamountOut: "" });
    this.setState({ tokentoAddress: tokenfromAddress });
    this.setState({ toTokenBalance: tokenfromBalance });

    if (!this.state.changeCoinPair) {
      this.setState({
        changeCoinPair: true,
      });
    } else {
      this.setState({
        changeCoinPair: false,
      });
    }

    if ([ZERO_ADDRESS, MAIN_ZERO_ADDRESS].includes(tokentoAddress)) {
      this.setState({ method: "Swap" });
    } else if (tokentoAddress !== "") {
      const shouldApprove = await findAllowedAmount(
        tokentoAddress,
        tokenamountOut
      );
      this.setState({ method: "Approve " });
      this.setState({ isApprove: false });
      if (shouldApprove)
        this.setState({ method: "Approve ", isApprove: false });
      else this.setState({ method: "Swap", isApprove: true });
    }

    if (
      tokenamountOut > 0 &&
      this.state.tokentoAddress != "" &&
      this.state.tokenfromAddress != ""
    ) {
      this.getamountout_on_exchange_only(
        tokenamountOut,
        false,
        tokentoAddress,
        tokenfromAddress
      );
      this.balance(this.state.tokenfromAddress, "from");
      let path = [tokentoAddress, tokenfromAddress];
      let userwalletaddresss = localStorage.getItem("account");
      //this.getReimbursement(path, window.web3.utils.fromWei((tokenamountOut)), userwalletaddresss)
    }
  };
  async getamountout_on_exchange_only(amount, bool, fromAddress, toAddress) {
    if (window.web3) {
      const decimal = await getDecimal(fromAddress);
      console.log("amountIn", amount)
      let amountIn = window.web3.utils.toBN(
        fromExponential(amount * Math.pow(10, decimal))
      );
      if (fromAddress == "0x0000000000000000000000000000000000000000") {
        let path = [WBNB_Address, toAddress];
        let userwalletaddresss = localStorage.getItem("account");
        window.web3 = new Web3(window?.ethereum);
        let swaping = new window.web3.eth.Contract(
          different,
          BSwaprouter2ContractAddress
        );
        this.getUnitAmount(path, swaping, userwalletaddresss);

        if (bool) {
          swaping.methods
            .getAmountsIn(amountIn, path)
            .call({ from: userwalletaddresss })
            .then((res) => {
              //console.log(res)
              let amount = window.web3.utils.fromWei(res[0]);
              this.setState({ tokenamountIn: amount });
            })
            .catch((error) => {
              //console.log('error', error)
            });
        } else {
          swaping.methods
            .getAmountsOut(amountIn, path)
            .call({ from: userwalletaddresss })
            .then((res) => {
              //console.log(res)
              let amount = window.web3.utils.fromWei(res[1]);
              console.log("tokenamountout", amount);
              //this.setState({ tokenamountOut: parseFloat(amount).toFixed(8) })
              if (amount > 0) {
                this.setState({
                  tokenamountOut: parseFloat(amount).toFixed(8),
                });
              } else {
                this.setState({ tokenamountOut: 0 });
              }
            })
            .catch((error) => {
              //console.log('error', error)
            });
        }
      } else if (toAddress == "0x0000000000000000000000000000000000000000") {
        let path = [fromAddress, WBNB_Address];
        let userwalletaddresss = localStorage.getItem("account");
        window.web3 = new Web3(window?.ethereum);
        let swaping = new window.web3.eth.Contract(
          different,
          BSwaprouter2ContractAddress
        );
        this.getUnitAmount(path, swaping, userwalletaddresss);
        if (bool) {
          swaping.methods
            .getAmountsIn(amountIn, path)
            .call({ from: userwalletaddresss })
            .then((res) => {
              // console.log(res)
              let amount = window.web3.utils.fromWei(res[0]);
              this.setState({ tokenamountIn: amount });
            })
            .catch((error) => {
              //console.log('error', error)
            });
        } else {
          swaping.methods
            .getAmountsOut(amountIn, path)
            .call({ from: userwalletaddresss })
            .then((res) => {
              // console.log(res)
              let amount = window.web3.utils.fromWei(res[1]);
              console.log("tokenamountout", amount);
              //this.setState({ tokenamountOut: parseFloat(amount).toFixed(8) })
              if (amount > 0) {
                this.setState({
                  tokenamountOut: parseFloat(amount).toFixed(8),
                });
              } else {
                this.setState({ tokenamountOut: 0 });
              }
            })
            .catch((error) => {
              //console.log('error', error)
            });
        }
      } else {
        let path = [fromAddress, toAddress];
        let userwalletaddresss = localStorage.getItem("account");
        window.web3 = new Web3(window?.ethereum);
        let swaping = new window.web3.eth.Contract(
          different,
          BSwaprouter2ContractAddress
        );
        this.getUnitAmount(path, swaping, userwalletaddresss);
        if (bool) {
          swaping.methods
            .getAmountsIn(amountIn, path)
            .call({ from: userwalletaddresss })
            .then((res) => {
              // console.log(res)
              let amount = window.web3.utils.fromWei(res[0]);
              this.setState({ tokenamountIn: amount });
            })
            .catch();
        } else {
          swaping.methods
            .getAmountsOut(amountIn, path)
            .call({ from: userwalletaddresss })
            .then((res) => {
              // console.log(res)
              let amount = window.web3.utils.fromWei(res[1]);
              console.log("tokenamountout", amount);
              //this.setState({ tokenamountOut: parseFloat(amount).toFixed(8) })
              if (amount > 0) {
                this.setState({
                  tokenamountOut: parseFloat(amount).toFixed(8),
                });
              } else {
                this.setState({ tokenamountOut: 0 });
              }
            })
            .catch();
        }
      }
    }
  }
  getReimbursement(path, amountIn, userwalletaddresss) {
    window.web3 = new Web3(window?.ethereum);
    let swaping = new window.web3.eth.Contract(ReservesAbi, ReservesContract);
    let tokenA = path[0];
    let tokenB = path[1];

    swaping.methods
      .getAmountOut(amountIn, tokenA, tokenB)
      .call({ from: userwalletaddresss })
      .then((result) => {
        let amountOut = window.web3.utils.fromWei(result);

        swaping.methods
          .getReserves()
          .call({ from: userwalletaddresss })
          .then((reserve) => {
            swaping.methods
              .token0()
              .call({ from: userwalletaddresss })
              .then((addre) => {
                let reserveIn = "";
                let reserveOut = "";
                if (tokenA.toLowerCase() == addre.toLowerCase()) {
                  reserveIn = parseFloat(
                    window.web3.utils.fromWei(reserve._reserve0)
                  );
                  reserveOut = parseFloat(
                    window.web3.utils.fromWei(reserve._reserve1)
                  );
                } else {
                  reserveIn = parseFloat(
                    window.web3.utils.fromWei(reserve._reserve1)
                  );
                  reserveOut = parseFloat(
                    window.web3.utils.fromWei(reserve._reserve0)
                  );
                }

                amountIn = parseFloat(window.web3.utils.fromWei(amountIn));

                let amountOutWithoutFee =
                  (reserveOut * amountIn) / (reserveIn + amountIn);
                let fee = amountOutWithoutFee - amountOut;
                this.setState({ reimbursement_reward: fee.toFixed(6) });
                let tokenContract =
                  "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82";
                const apiUrl =
                  "https://api.coingecko.com/api/v3/simple/token_price/binance-smart-chain?contract_addresses=" +
                  tokenContract +
                  "&vs_currencies=USD";
                fetch(apiUrl)
                  .then((response) => response.json())
                  .then((data) => {
                    let usd_rate = data[tokenContract]["usd"];
                    this.setState({
                      reimbursement_inUSD: (fee * usd_rate).toFixed(2),
                    });
                  });
              })
              .catch((error) => {});
          })
          .catch((error) => {});
      })
      .catch((error) => {});
  }

  confirmSupply() {
    //console.log('confirm supply..........');
  }
  clearValueAfterSwap() {
    this.setState({ tokenamountIn: "" });
    this.setState({ tokenamountOut: "" });

    this.setState({ fromtokenImage1: null });
    this.setState({ totokenImage1: null });

    this.setState({ fromTokenBalance: "" });
    this.setState({ toTokenBalance: "" });

    this.setState({ fromConvertedvalue: "" });
    this.setState({ toConvertedvalue: "" });

    this.setState({ fromtokenName1: "Select Token" });
    //this.setState({ fromChainName1: 'Select Token' })
    this.setState({ totokenName1: "Select Token" });
    //this.setState({ toChainName1: 'Select Token' })

    this.setState({ tokenfromAddress: "" });
    this.setState({ tokentoAddress: "" });
  }

  async onApprove(address, amount, type) {
    const { openSnackbar } = this.props;
    const tokenBlock = address;
    const accounts = await window?.ethereum.request({
      method: "eth_requestAccounts",
    });
    let userwalletaddresss = accounts[0];
    if (type == "swap") {
      amount = await compareBalance(address);
      const web3 = window.web3;
      const ercContract = await new web3.eth.Contract(ERC20, tokenBlock);
      await ercContract.methods
        .balanceOf(userwalletaddresss)
        .call({ from: userwalletaddresss })
        .then((balance) => {
          //amount=BigNumber(amount);
          // console.log(amount);
          ercContract.methods
            .approve(BSwaprouter2ContractAddress, amount)
            .send({ from: userwalletaddresss })
            // ercContract.methods.approve(PANCAKE_ROUTER, amount).send({ from: userwalletaddresss })
            .then((res) => {
              // console.log(res);
              this.setState({ isApprove: true });
              this.setState({ method: "Swap" });
              let transactionHashApprove = res.transactionHash;
              this.setState({ loader: false });
              localStorage.setItem("transactionHash", transactionHashApprove);
              //this.setState({ transaction: true });
            })
            .catch(() => {
              //alert('Transaction failed');
              this.setState({ loader: false });
              //this.setState({isTransactionFailed: true });
              openSnackbar("Transaction failed");
            });
        })
        .catch();
    } else {
      amount[0] = await compareBalance(address[0]);
      amount[1] = await compareBalance(address[1]);
      const web3 = window.web3;
      if (
        tokenBlock[0] == "0x0000000000000000000000000000000000000000" ||
        tokenBlock[1] == "0x0000000000000000000000000000000000000000"
      ) {
        var tokenapprove;
        var amountapprove;
        if (tokenBlock[0] == "0x0000000000000000000000000000000000000000") {
          tokenapprove = tokenBlock[1];
          amountapprove = amount[1];
        } else {
          tokenapprove = tokenBlock[0];
          amountapprove = amount[0];
        }
        let ercContract = await new web3.eth.Contract(ERC20, tokenapprove);
        ercContract.methods
          .allowance(userwalletaddresss, BSwaprouter2ContractAddress)
          .call({ from: userwalletaddresss })
          // ercContract.methods.allowance(userwalletaddresss, PANCAKE_ROUTER).call({ from: userwalletaddresss })
          .then((allowance) => {
            //console.log(allowance,'allow',parseFloat(amountapprove))
            if (allowance >= parseFloat(amountapprove)) {
              this.setState({ isliquidityapprove: true });
              this.setState({ liquiditymethod: "Add Liquidity" });
              this.setState({ loader: false });
            } else {
              ercContract.methods
                .approve(BSwaprouter2ContractAddress, amountapprove)
                .send({ from: userwalletaddresss })
                // ercContract.methods.approve(PANCAKE_ROUTER, amountapprove).send({ from: userwalletaddresss })
                .then((res) => {
                  //console.log(res);
                  this.setState({ isliquidityapprove: true });
                  this.setState({ liquiditymethod: "Add Liquidity" });
                  this.setState({ loader: false });
                })
                .catch();
            }
          });
      } else {
        console.log("upto here");
        let ercContract = await new web3.eth.Contract(ERC20, tokenBlock[0]);
        ercContract.methods
          .allowance(userwalletaddresss, BSwaprouter2ContractAddress)
          .call({ from: userwalletaddresss })
          // ercContract.methods.allowance(userwalletaddresss, PANCAKE_ROUTER).call({ from: userwalletaddresss })
          .then((allowance) => {
            if (allowance >= parseFloat(amount[0])) {
              let ercCont = new web3.eth.Contract(ERC20, tokenBlock[1]);
              ercCont.methods
                .allowance(userwalletaddresss, BSwaprouter2ContractAddress)
                .call({ from: userwalletaddresss })
                // ercCont.methods.allowance(userwalletaddresss, PANCAKE_ROUTER).call({ from: userwalletaddresss })
                .then((allowance1) => {
                  if (allowance1 >= parseFloat(amount[1])) {
                    this.setState({ isliquidityapprove: true });
                    this.setState({ liquiditymethod: "Add Liquidity" });
                    this.setState({ loader: false });
                  } else {
                    this.setState({
                      liquiditymethod: "Approve " + this.state.tot,
                    });
                    let ercCont = new web3.eth.Contract(ERC20, tokenBlock[1]);
                    // console.log(amount[1])
                    ercCont.methods
                      .approve(BSwaprouter2ContractAddress, amount[1])
                      .send({ from: userwalletaddresss })
                      // ercCont.methods.approve(PANCAKE_ROUTER, amount[1]).send({ from: userwalletaddresss })
                      .then((result) => {
                        //console.log(result);
                        this.setState({ isliquidityapprove: true });
                        this.setState({ liquiditymethod: "Add Liquidity" });
                        this.setState({ loader: false });
                      })
                      .catch();
                  }
                })
                .catch();
            } else {
              ercContract.methods
                .approve(BSwaprouter2ContractAddress, amount[0])
                .send({ from: userwalletaddresss })
                // ercContract.methods.approve(PANCAKE_ROUTER, amount[0]).send({ from: userwalletaddresss })
                .then((res) => {
                  //  console.log(res);
                  this.setState({
                    liquiditymethod: "Approve " + this.state.tot,
                  });
                  let ercCont = new web3.eth.Contract(ERC20, tokenBlock[1]);
                  //console.log(amount[1])
                  ercCont.methods
                    .approve(BSwaprouter2ContractAddress, amount[1])
                    .send({ from: userwalletaddresss })
                    // ercCont.methods.approve(PANCAKE_ROUTER, amount[1]).send({ from: userwalletaddresss })
                    .then((result) => {
                      // console.log(result);
                      this.setState({ isliquidityapprove: true });
                      this.setState({ liquiditymethod: "Add Liquidity" });
                      this.setState({ loader: false });
                    })
                    .catch();
                })
                .catch();
            }
          })
          .catch();
      }
    }
  }
  async checkAllowance() {
    this.setState({ loader: true });
    const accounts = await window?.ethereum.request({
      method: "eth_requestAccounts",
    });
    // console.log(accounts);
    let userwalletaddresss = accounts[0];
    const decimal = await getDecimal(this.state.tokenfromAddress);
    let amountIn = window.web3.utils.toBN(
      fromExponential(this.state.tokenamountIn * Math.pow(10, decimal))
    );
    const ercContract = new window.web3.eth.Contract(
      ERC20,
      this.state.tokenfromAddress
    );

    ercContract.methods
      .allowance(userwalletaddresss, BSwaprouter2ContractAddress)
      .call({ from: userwalletaddresss })
      .then(
        (allowance) => {
          // console.log(4)
          if (allowance >= parseFloat(amountIn)) {
            //  console.log(allowance,amountIn);
            this.setState({ isApprove: true });
            this.setState({ method: "Swap" });
            this.setState({ loader: false });
          } else {
            this.onApprove(this.state.tokenfromAddress, amountIn, "swap");
          }
        },
        (error) => {
          this.setState({ loader: false });
        }
      );
  }

  checkNot = (subject, text = "Select Token", replacement = "-") =>
    subject !== text ? subject : replacement;

  calculateSlippage(event) {
    //let val = event.target.value;
    //let calcalutedSlippage = '';
    this.setState({ slippage: event.target.value });
  }
  changeDeadLine(event) {
    this.setState({ deadLine: event.target.value });
  }
  async swapBetweenDifferentChain() {
    const { openSnackbar } = this.props;
    if (
      this.state.fromChainName1 == "Select Chain" ||
      this.state.toChainName1 == "Select Chain"
    ) {
      return openSnackbar("Please choose a chain.");
    }
    // if (this.state.fromChainName1 != this.state.toChainName1) {
    //     this.approveContract();
    // }
    // else if (this.state.fromChainName1 == this.state.toChainName1 && this.state.fromChainName1 == 'BSC') {
    //     this.checkBeforeSwap();
    // }
    if (this.state.fromChainName1 == "Ethereum") {
      //this.checkBeforeSwap();
      return openSnackbar("Ethereum chian is disabled.");
    } else if (
      this.state.fromChainName1 === "BSC" &&
      this.state.toChainName1 === this.state.fromChainName1
    ) {
      this.checkBeforeSwap();
    } else {
      console.log("going to degen flow");
      this.approveContract();
    }
  }
  async findAllowedAmount() {
    try {
      let addressProp = [
        this.state.tokenfromAddress,
        this.state.tokentoAddress,
      ];
      const decimal = await this.getDecimal(addressProp[0]);
      //const web3 = get_web3_instance()
      window.web3 = new Web3(window?.ethereum);
      let walletAddress = localStorage.getItem("account");
      let contract = new window.web3.eth.Contract(ERC20, addressProp[0]);
      let allowed = await contract.methods
        .allowance(
          walletAddress,
          this.state.fromChainName1 === "Ethereum"
            ? eth_contract_address
            : bsc_contract_address
        )
        .call();
      console.log(allowed);
      // allowed = +allowed / Math.pow(10, decimal);
      console.log(allowed);
      //callback(allowed || '');
      return +allowed;
    } catch (error) {
      //callback('');
      return "";
    }
  }
  async approveToken(address, value, gasPrice, fromChain, toChain) {
    const contractDetails = await this.getContractAdd(fromChain, toChain);
    let web3, contractInstance, new_value, response, CurrentgasPrice;
    web3 = new Web3(window.web3.currentProvider);
    contractInstance = new web3.eth.Contract(ERC20, address[0]);
    const decimal = await getDecimal(fromChain);
    new_value = web3.utils.toBN(parseInt(value * Math.pow(10, decimal)));

    let userAddress = localStorage.getItem("account");

    await web3.eth.getGasPrice().then((res) => {
      CurrentgasPrice = res;
    });
    const ss = gasPrice != "0" ? gasPrice * Math.pow(10, 9) : CurrentgasPrice;
    this.setState({ loader: true });
    await web3.eth
      .sendTransaction({
        from: userAddress,
        to: address[0],
        gas: 0x64190,
        gasPrice:
          gasPrice != "0" ? gasPrice * Math.pow(10, 9) : CurrentgasPrice,
        data: contractInstance.methods
          .approve(contractDetails.contract, new_value)
          .encodeABI(),
      })
      .then((res) => {
        console.log(res);
        // //;
        response = res;
      })
      .catch((err) => {
        // alert(err.message);
        response = err;
        // setTimeout(() => {
        //     window.location.reload()
        // }, 4000);
        this.setState({ loader: false });
      });
    return response;
  }
  async getDecimal(tokenAddress) {
    let decimal = 18;
    if (!tokenAddress) return decimal;
  }

  getDecimal = async (addr) => {
    let decimal = 18;
    if (!addr) throw new Error("Invalid token address");

    try {
      const accounts = await window?.ethereum.request({
        method: "eth_requestAccounts",
      });
      let userwalletaddresss = accounts[0];
      let bal = new window.web3.eth.Contract(ERC20, addr);
      decimal = await bal.methods.decimals().call({ from: userwalletaddresss });
      decimal = +decimal;
    } catch (e) {
      console.log(e);
      return decimal;
    }
    return decimal;
  };

  getOrderType = async () => {
    let orderType = { orderType: "", crossOrderType: "" };
    let frm = this.state.fromtokenName1;
    let to = this.state.totokenName1;
    if (this.state.fromChainName1 === this.state.toChainName1) {
      if (frm == "ETH" || frm == "BNB") {
        orderType.orderType = "0";
      } else if (
        (frm != "ETH" || frm != "BNB") &&
        (to == "ETH" || to == "BNB")
      ) {
        orderType.orderType = "1";
      } else if (
        (frm != "ETH" || frm != "BNB") &&
        (to != "ETH" || to != "BNB")
      ) {
        orderType.orderType = "2";
      }
    } else {
      if ((frm == "ETH" && to == "BNB") || (frm === "BNB" && to === "ETH")) {
        orderType.orderType = "0";
        orderType.crossOrderType = "1";
      } else if (frm == "ETH" && to != "BNB") {
        orderType.orderType = "0";
        orderType.crossOrderType = "2";
      } else if (frm == "BNB" && to != "ETH") {
        orderType.orderType = "0";
        orderType.crossOrderType = "2";
      } else if (
        (frm != "ETH" || frm != "BNB") &&
        (to == "ETH" || to == "BNB")
      ) {
        orderType.orderType = "2";
        orderType.crossOrderType = "1";
      } else if (
        (frm != "ETH" || frm != "BNB") &&
        (to != "ETH" || to != "BNB")
      ) {
        orderType.orderType = "2";
        orderType.crossOrderType = "2";
      }
    }
    return orderType;
  };

  async approveContract() {
    let addressProp = [this.state.tokenfromAddress, this.state.tokentoAddress];
    const allowed = await this.findAllowedAmount();
    let shouldApprove = !+allowed || +allowed < this.state.tokenamountIn;
    let fromChain = this.state.fromChainName1 == "Ethereum" ? "eth" : "bsc";
    let toChain = this.state.toChainName1 == "Ethereum" ? "eth" : "bsc";
    let env = getEnvType();
    console.log("env => ", getEnvType());
    const weth_wbnb = [TEST_WETH, TEST_WBNB];
    if (
      weth_wbnb.includes(this.state.tokenfromAddress) ||
      this.state.fromtokenName1 === "ETH" ||
      this.state.fromtokenName1 === "BNB"
    ) {
      shouldApprove = false;
    }
    let approveResponse;
    let minValue = this.state.minValue;
    if (shouldApprove) {
      const decimal = await this.getDecimal(this.state.tokenfromAddress);
      //console.log(Math.min(LARGE_APPROVAL_AMOUNT, Math.floor(prop.availableBal/Math.pow(10, decimal) || 0)), 'app amt');
      //console.log((prop.availableBal/Math.pow(10, decimal)), 'avl amt');
      //console.log(Math.floor(prop.availableBal), 'props avl amt');
      //console.log(prop.tokenAddressArr.from, decimal);
      approveResponse = await this.approveToken(
        addressProp,
        999,
        0,
        fromChain,
        toChain
      );
      console.log(approveResponse);
    }
    //;
    console.log(approveResponse);

    if (!shouldApprove || (approveResponse && approveResponse.status)) {
      this.setState({ method: "Swap" });
      console.log("into this...");
      //  console.log(approveResponse.status);
      const orderType = await this.getOrderType();
      //const orderType = 2;
      console.log(orderType);
      //console.log(prop.dexData);

      const tokenSymbol =
        this.state.fromtokenName1 + "/" + this.state.totokenName1;
      this.sendTransaction(
        addressProp,
        this.state.tokenamountIn,
        "true",
        0,
        fromChain,
        toChain,
        minValue,
        orderType,
        tokenSymbol,
        "",
        0
      )
        .then((trxResponse) => {
          //;
          if (addressProp[0] === addressProp[1]) {
            //openSnackbar('Identical Token Addresses');
            return;
          }
          //prop.myLoaderSatate(true);
          // console.log(prop.gasProp,'adads');
          if (trxResponse === undefined) {
            //this.findAllowedAmount(setAllowedAmt);
            //openSnackbar('Transaction has been cancelled');
          } else {
            //openSnackbar('Swapping Transaction Hash is ' + trxResponse);
            //prop.reset();
            //setQuotePrice("");
          }
          // openSnackbar('Swapping Transaction Hash is ' + trxResponse);
          //  window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          //openSnackbar('Transaction failed, please try again ');
          // setTimeout(() => {
          // window.location.reload();
          // }, 3000);
        });
    } else {
      //prop.myLoaderSatate(true);
      //openSnackbar('Token not approved');
      //  setTimeout(() => {
      //   window.location.reload();
      //      }, 3000);
    }
  }
  async getContractAdd(fromChain, toChain) {
    let contractDetails = {
      contract: "",
      abi: null,
    };
    if (fromChain == "eth") {
      contractDetails.contract = eth_contract_address;
      contractDetails.abi = eth_abi;
    } else if (fromChain == "bsc") {
      contractDetails.contract = bsc_contract_address;
      contractDetails.abi = bsc_abi;
    }
    return contractDetails;
  }

  getEstimatedGas = async (
    contractInstance,
    status,
    address,
    newNumber,
    fromChain,
    toChain,
    minValue,
    orderType,
    [dexId, dexIdDestination],
    fees
  ) => {
    let gas;
    let userAddress = localStorage.getItem("account");
    const price = [0, minValue, minValue];
    const ot = orderType.orderType;
    const cot = orderType.crossOrderType;
    const licenseVault = "0x0000000000000000000000000000000000000000";

    const deadline = 0;
    let assetsAmount;
    const gasObject = { from: userAddress };
    if ([TEST_WBNB, TEST_WETH].includes(address[0]))
      gasObject.value = newNumber;
    if (fromChain == "eth" && toChain == "eth") {
      gas = await contractInstance.methods
        .executeSwap(
          ot,
          address,
          newNumber,
          fees,
          minValue,
          licenseVault,
          dexId,
          deadline
        )
        .estimateGas(gasObject);
    } else if (fromChain == "eth" && toChain == "bsc") {
      gas = await contractInstance.methods
        .executeCrossExchange(
          address,
          ot,
          cot,
          newNumber,
          fees,
          minValue,
          licenseVault,
          [dexId, dexIdDestination, deadline]
        )
        .estimateGas(gasObject);
    } else if (fromChain == "bsc" && toChain == "bsc") {
      gas = await contractInstance.methods
        .executeSwap(
          ot,
          address,
          newNumber,
          fees,
          minValue,
          licenseVault,
          dexId,
          deadline
        )
        .estimateGas(gasObject);
    } else if (fromChain == "bsc" && toChain == "eth") {
      try {
        gas = await contractInstance.methods
          .executeCrossExchange(
            address,
            ot,
            cot,
            newNumber,
            fees,
            minValue,
            licenseVault,
            [dexId, dexIdDestination, deadline]
          )
          .estimateGas(gasObject);
      } catch (e) {
        console.log(e);
        gas = 22000;
      }
    }
    return gas;
  };

  sendTransaction = async (
    address,
    value,
    status,
    gasPrice,
    fromChain,
    toChain,
    minVal,
    orderType,
    tokenSymbol,
    tokenPairImg,
    dexData
  ) => {
    if ([ZERO_ADDRESS, MAIN_ZERO_ADDRESS].includes(address[0]))
      address[0] = fromChain === "bsc" ? TEST_WBNB : TEST_WETH;
    if ([ZERO_ADDRESS, MAIN_ZERO_ADDRESS].includes(address[1]))
      address[1] = toChain === "bsc" ? TEST_WBNB : TEST_WETH;
    let txnHash, web3, contractInstance, newNumber, fromName, CurrentgasPrice;
    if (window.web3 && window.web3.currentProvider) {
      const contractDetails = await this.getContractAdd(fromChain, toChain);
      console.log(contractDetails);
      // ;
      //let provider = getProvider(fromChain, toChain);
      let fnData;

      web3 = new Web3(window.web3.currentProvider); //new Web3(provider);
      contractInstance = new web3.eth.Contract(
        contractDetails.abi,
        contractDetails.contract
      );
      console.log(contractInstance);
      //;
      const decimal = await getDecimal(address[0]);
      let enteredValue = parseInt(value * Math.pow(10, decimal));
      newNumber = web3.utils.toBN(parseInt(value * Math.pow(10, decimal)));

      let minValue = web3.utils.toBN(
        parseInt(Math.ceil(minVal * Math.pow(10, decimal)))
      ); // need to be change

      const balance = fromChain != "eth" ? "0x0" : newNumber;
      const WeiNumber = web3.utils.toWei(value, "ether");
      let userAddress = localStorage.getItem("account");

      await web3.eth
        .getGasPrice()
        .then((res) => {
          console.log(res);
          CurrentgasPrice = res;
        })
        .catch((err) => {
          console.log(err);
        });

      console.log(CurrentgasPrice);
      console.log(dexData);
      //;

      const proFees = await this.getProcessingFees(fromChain, toChain);
      let fees = 0,
        combinedFees = proFees;
      console.log(combinedFees);
      const feesObject = await this.getFees(
        fromChain,
        contractDetails.contract,
        newNumber,
        "0x0000000000000000000000000000000000000000"
      );
      if (feesObject?.status === "true") {
        fees += feesObject.companyFee + feesObject.licenseFee;
        combinedFees += fees;
      }

      if (address[0] == TEST_WETH || address[0] == TEST_WBNB) {
        console.log("weth check......");
        combinedFees = Math.round(combinedFees + enteredValue);
        console.log(combinedFees, " comb fee");
      }

      console.log(fees, combinedFees);
      combinedFees = web3.utils.toBN(parseInt(combinedFees));
      fees = web3.utils.toBN(parseInt(fees));
      this.setState({ loader: true });
      fnData = await this.getDataForSendTransaction(
        contractInstance,
        status,
        address,
        newNumber,
        fromChain,
        toChain,
        minValue,
        orderType,
        [this.state.dexId, this.state.dexId_destination],
        fees
      );
      let gasLimit = await this.getEstimatedGas(
        contractInstance,
        status,
        address,
        newNumber,
        fromChain,
        toChain,
        minValue,
        orderType,
        [this.state.dexId, this.state.dexId_destination],
        fees
      );
      gasLimit = (parseInt(gasLimit) + 20000).toString();
      // console.log('fnDATA=>', fnData);
      await web3.eth
        .sendTransaction({
          from: userAddress,
          to: contractDetails.contract,
          gas: gasLimit,
          gasPrice:
            gasPrice != "0"
              ? gasPrice * Math.pow(10, 9)
              : web3.utils.toBN(parseInt(CurrentgasPrice)),
          // value: (+this.buyForm.value.from + 0.000001) * 1000000000000000000,
          value: web3.utils.toHex(combinedFees), //'0x3B9ACA00', //'0x3B9ACA00',//'0x0',//fromChain != 'eth' ? '0x0' : WeiNumber,
          data: fnData,
        })
        // this.spinner.show()
        .then((res) => {
          txnHash = res["transactionHash"];
          this.clearValueAfterSwap();
          //this.setState({ tokenamountIn: '' })
          //this.setState({ tokenamountOut: '' })

          let transactionHashApprove = res.transactionHash;
          this.setState({ loader: false });
          localStorage.setItem("transactionHash", transactionHashApprove);
          this.setState({ transaction: true });
          // setTimeout(() => {
          //     window.location.reload();
          // }, 6000);
        })
        .catch((err) => {
          this.setState({ loader: false });
          console.log(err, "catch");
        });
      console.log(txnHash);
      //;
      return txnHash;
    }
  };
  async getProcessingFees(from, to) {
    try {
      const web3 = new Web3(window.web3.currentProvider);
      const gas = await web3.eth.getGasPrice();
      let converted = await web3.utils.toBN(parseInt(gas));
      converted *= 200000;
      const prices = await this.getPrices();
      const ethPrice = prices?.ethereum?.usd || 1;
      const bscPrice = prices?.binancecoin?.usd || 1;

      if (from === "eth" && to === "bsc") {
        return converted * (bscPrice / ethPrice);
      } else if (from === "bsc" && to === "eth") {
        return converted * (ethPrice / bscPrice);
      } else return 0;
    } catch (e) {
      return 0;
    }
  }
  async getPrices() {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Cbinancecoin&vs_currencies=usd"
      );
      const data = await response.json();
      return data;
    } catch (e) {
      return {};
    }
  }
  async getFees(from, toToken, amount, lisenceVault) {
    let url = "";
    if (from === "eth") {
      url = `http://52.70.198.55:5000/api/DEGEN/calculateETHFee?licenseeVault=${lisenceVault}&token=${toToken}&amount=${amount}`;
    } else {
      url = `http://52.70.198.55:5000/api/DEGEN/calculateBSCFee?licenseeVault=${lisenceVault}&token=${toToken}&amount=${amount}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (e) {
      return { status: false };
    }
  }
  getDataForSendTransaction = async (
    contractInstance,
    status,
    address,
    newNumber,
    fromChain,
    toChain,
    minValue,
    orderType,
    [dexId, dexIdDestination],
    fees
  ) => {
    let data;
    const price = [0, minValue, minValue];
    const ot = orderType.orderType;
    const cot = orderType.crossOrderType;
    const licenseVault = "0x0000000000000000000000000000000000000000";

    const deadline = 0;
    let assetsAmount;
    if (fromChain == "eth" && toChain == "eth") {
      data = contractInstance.methods
        .executeSwap(
          ot,
          address,
          newNumber,
          fees,
          minValue,
          licenseVault,
          dexId,
          deadline
        )
        .encodeABI();
    } else if (fromChain == "eth" && toChain == "bsc") {
      data = contractInstance.methods
        .executeCrossExchange(
          address,
          ot,
          cot,
          newNumber,
          fees,
          minValue,
          licenseVault,
          [dexId, dexIdDestination, deadline]
        )
        .encodeABI();
    } else if (fromChain == "bsc" && toChain == "bsc") {
      data = contractInstance.methods
        .executeSwap(
          ot,
          address,
          newNumber,
          fees,
          minValue,
          licenseVault,
          dexId,
          deadline
        )
        .encodeABI();
    } else if (fromChain == "bsc" && toChain == "eth") {
      data = contractInstance.methods
        .executeCrossExchange(
          address,
          ot,
          cot,
          newNumber,
          fees,
          minValue,
          licenseVault,
          [dexId, dexIdDestination, deadline]
        )
        .encodeABI();
    }
    return data;
  };

  async checkBeforeSwap() {
    const { openSnackbar } = this.props;
    const chain = await getDefaultChain();
    //console.log(this.state.tokenamountIn,this.state.tokenamountOut,this.state.tokentoAddress,this.state.tokenfromAddress);
    if (window?.ethereum && localStorage.getItem("account")) {
      if (chain === "bsc") {
        if (!this.state.isApprove && this.state.method.trim() == "Approve") {
          if (
            this.state.fromtokenName1 === "Select Token" ||
            !this.state.totokenName1 === "Select Token"
          )
            return openSnackbar("Please choose a token pair.");
          if (!this.state.tokenamountIn || !this.state.tokenamountOut)
            return openSnackbar("Please enter a valid amount.");
          this.checkAllowance();
        } else {
          this.swaps();
        }
      } else {
        this.setState({ isWrongNetwork: true });
      }
    }
  }

  async swaps() {
    const { openSnackbar } = this.props;
    if (
      this.state.fromtokenName1 === "Select Token" ||
      this.state.totokenName1 === "Select Token"
    )
      return openSnackbar("Please choose a token pair.");
    if (!this.state.tokenamountIn || !this.state.tokenamountOut)
      return openSnackbar("Please enter a valid amount.");
    const chain = await getDefaultChain();
    //console.log(this.state.tokenamountIn,this.state.tokenamountOut,this.state.tokentoAddress,this.state.tokenfromAddress);
    if (
      window?.ethereum &&
      localStorage.getItem("account") &&
      chain === "bsc"
    ) {
      this.setState({ loader: true });
      const accounts = await window?.ethereum.request({
        method: "eth_requestAccounts",
      });
      // console.log(accounts);
      let userwalletaddresss = accounts[0];
      window.web3 = new Web3(window?.ethereum);
      // let swaping = new window.web3.eth.Contract(different, PANCAKE_ROUTER)
      let swaping = new window.web3.eth.Contract(
        different,
        BSwaprouter2ContractAddress
      );
      // let licensee ='0xeD3C6Dea2c3c8fc12b6224045E0b14bA1b7ab313';
      const decimal = await getDecimal(this.state.tokenfromAddress);
      let amountIn = window.web3.utils.toBN(
        fromExponential(this.state.tokenamountIn * Math.pow(10, decimal))
      );
      //console.log(1);
      const toTokenDecimals = await getDecimal(this.state.tokentoAddress);
      const slippageMargin =
        ((this.state.slippage || 0) * this.state.tokenamountOut) / 100;
      const actualAmountOut = this.state.tokenamountOut - slippageMargin;
      // let amountOut = window.web3.utils.toBN(fromExponential(actualAmountOut * Math.pow(10, toTokenDecimals)));
      const poweredAmount = actualAmountOut * Math.pow(10, toTokenDecimals);
      const expoAmount = fromExponential(poweredAmount);
      const absoluteAmount = expoAmount.split(".")[0];
      let amountOut = window.web3.utils.toBN(absoluteAmount);

      //console.log(amountOut);
      // let uniswap = BSwaprouter2ContractAddress;
      // let path = [this.state.tokenfromAddress, this.state.tokentoAddress];

      // let gasPrice = await window.web3.eth.getGasPrice();
      //swaping.methods.getFee(this.state.tokenfromAddress,amountIn,licensee,uniswap).call({from:userwalletaddresss})
      //.then((fees)=>
      //{
      let gasPrice = 0;
      try {
        gasPrice = await window.web3.eth.getGasPrice();
        console.log(gasPrice);
        gasPrice *= 1.1;
        gasPrice = String(gasPrice);
        console.log(gasPrice);
      } catch (e) {
        console.log(e);
      }
      if (
        [MAIN_ZERO_ADDRESS, ZERO_ADDRESS].includes(this.state.tokenfromAddress)
      ) {
        //let amount = window.web3.utils.toBN(fromExponential((calculate)+parseInt(fees)));

        //console.log(amount,calculate,fees)
        let path = [WBNB_Address, this.state.tokentoAddress];
        let deadline = Math.floor(Date.now() / 1000) + this.state.deadLine * 60;
        // let deadline = (this.state.time + 10000 + ((this.state.deadLine * 60) || 0))
        swaping.methods
          .swapExactETHForTokens(amountOut, path, userwalletaddresss, deadline)
          .send({ from: userwalletaddresss, value: amountIn, gasPrice })
          .then((res) => {
            this.clearValueAfterSwap();

            let transactionHashApprove = res.transactionHash;
            this.setState({ loader: false });
            localStorage.setItem("transactionHash", transactionHashApprove);
            this.setState({ transaction: true });
            // setTimeout(() => {
            //     window.location.reload();
            // }, 6000);
          })
          .catch((error) => {
            this.setState({ loader: false });
            openSnackbar("Transaction failed");
            //this.setState({isTransactionFailed: true });
          });
      } else if (
        [MAIN_ZERO_ADDRESS, ZERO_ADDRESS].includes(this.state.tokentoAddress)
      ) {
        let path = [this.state.tokenfromAddress, WBNB_Address];
        //debugger
        // console.log(3)
        const ercContract = new window.web3.eth.Contract(
          ERC20,
          this.state.tokenfromAddress
        );

        ercContract.methods
          .allowance(userwalletaddresss, BSwaprouter2ContractAddress)
          .call({ from: userwalletaddresss })
          // ercContract.methods.allowance(userwalletaddresss, PANCAKE_ROUTER).call({ from: userwalletaddresss })
          .then((allowance) => {
            // console.log(4)
            if (allowance >= parseFloat(amountIn)) {
              //  console.log(allowance,amountIn);
              this.setState({ isApprove: true });
              this.setState({ method: "Swap" });
            }
            if (this.state.isApprove) {
              // console.log(5)
              let path = [this.state.tokenfromAddress, WBNB_Address];
              //debugger
              let deadline =
                Math.floor(Date.now() / 1000) + this.state.deadLine * 60; // (this.state.time + 10000 + ((this.state.deadLine * 60) || 0))
              console.log({
                amountIn: amountIn.toString(),
                amountOut: amountOut.toString(),
                path,
                userwalletaddresss,
                deadline,
              });
              swaping.methods
                .swapExactTokensForETH(
                  amountIn,
                  amountOut,
                  path,
                  userwalletaddresss,
                  deadline
                )
                .send({ from: userwalletaddresss, gasPrice })
                .then((res) => {
                  this.setState({ method: "Swap" });
                  this.setState({ isApprove: false });

                  this.clearValueAfterSwap();

                  let transactionHashApprove = res.transactionHash;
                  this.setState({ loader: false });
                  localStorage.setItem(
                    "transactionHash",
                    transactionHashApprove
                  );
                  this.setState({ transaction: true });
                  // setTimeout(() => {
                  //     window.location.reload();
                  // }, 6000);
                })
                .catch((error) => {
                  this.setState({ loader: false });
                  //this.setState({isTransactionFailed: true });
                  openSnackbar("Transaction failed");
                });
            } else {
              this.onApprove(this.state.tokenfromAddress, amountIn, "swap");
            }
          })
          .catch();
      } else {
        const ercContract = new window.web3.eth.Contract(
          ERC20,
          this.state.tokenfromAddress
        );

        ercContract.methods
          .allowance(userwalletaddresss, BSwaprouter2ContractAddress)
          .call({ from: userwalletaddresss })
          // ercContract.methods.allowance(userwalletaddresss, PANCAKE_ROUTER).call({ from: userwalletaddresss })
          .then((allowance) => {
            // console.log(4)
            if (allowance >= parseFloat(amountIn)) {
              //  console.log(allowance,amountIn);
              this.setState({ isApprove: true });
              this.setState({ method: "Swap" });
            }
            if (this.state.isApprove) {
              // console.log(5)
              let path = [
                this.state.tokenfromAddress,
                this.state.tokentoAddress,
              ];
              let deadline =
                Math.floor(Date.now() / 1000) + this.state.deadLine * 60; // (this.state.time + 10000 + ((this.state.deadLine * 60) || 0))
              console.log({
                amountIn: amountIn.toString(),
                amountOut: amountOut.toString(),
                path,
                userwalletaddresss,
                deadline,
              });
              swaping.methods
                .swapExactTokensForTokens(
                  amountIn,
                  amountOut,
                  path,
                  userwalletaddresss,
                  deadline
                )
                .send({ from: userwalletaddresss, gasPrice })
                .then((res) => {
                  this.setState({ method: "Swap" });
                  this.setState({ isApprove: false });

                  this.clearValueAfterSwap();

                  let transactionHashApprove = res.transactionHash;
                  this.setState({ loader: false });
                  localStorage.setItem(
                    "transactionHash",
                    transactionHashApprove
                  );
                  this.setState({ transaction: true });
                  // setTimeout(() => {
                  //     window.location.reload();
                  // }, 6000);
                })
                .catch((error) => {
                  this.setState({ loader: false });
                  //this.setState({isTransactionFailed: true });
                  openSnackbar("Transaction failed");
                });
            } else {
              this.onApprove(this.state.tokenfromAddress, amountIn, "swap");
            }
          })
          .catch();
      }
      //}).catch()
    }
  }

  // async liquidity() {
  //     if (window?.ethereum) {
  //         const accounts = await window?.ethereum.request({ method: 'eth_requestAccounts' });
  //         //console.log(accounts);
  //         let userwalletaddresss = accounts   [0];
  //         window.web3 = new Web3(window?.ethereum);
  //         let liquidity = new window.web3.eth.Contract(bswap, BSwaprouter2ContractAddress);
  //         let tokenA = this.state.tokenAaddress;
  //         let tokenB = this.state.tokenBaddress;
  //         let amountAMin = 1;
  //         let amountBMin = 1;
  //         if (this.state.isliquidityapprove) {
  //             if (this.state.tokenAaddress == '0x0000000000000000000000000000000000000000' || this.state.tokenBaddress == '0x0000000000000000000000000000000000000000') {
  //                 var tokenaddress; var amountTokenDesired; var amountethDesired
  //                 if (this.state.tokenAaddress == '0x0000000000000000000000000000000000000000') {
  //                     tokenaddress = this.state.tokenBaddress;
  //                         amountethDesired = BigNumber(amountADesired);
  //                         amountTokenDesired = BigNumber(amountBDesired);
  //                     }
  //                     else {
  //                         amountethDesired = (amountADesired);
  //                         amountTokenDesired = BigNumber(amountBDesired);
  //                     }

  //                 }
  //                 else {
  //                     tokenaddress = this.state.tokenAaddress;
  //                         amountethDesired = BigNumber(amountBDesired);
  //                         amountTokenDesired = BigNumber(amountADesired);
  //                     }
  //                     else {
  //                         amountethDesired = (amountBDesired);
  //                         amountTokenDesired = BigNumber(amountADesired);
  //                     }

  //                 }
  //                 liquidity.methods.addLiquidityBNB(tokenaddress, amountTokenDesired, amountAMin, amountBMin, userwalletaddresss, this.state.time).send({ from: userwalletaddresss, value: amountethDesired }).then((result) => {
  //                     // console.log(result)
  //                     this.setState({ liquiditytokenfrom: 'Select Token', tot: 'Select Token', isliquidityapprove: false, liquiditytokenamountA: 0, liquiditytokenamountB: 0, tokenAaddress: '', tokenBaddress: '' })
  //                 }).catch()
  //             }
  //             else {
  //                 amountADesired = BigNumber(amountADesired);
  //                 amountBDesired = BigNumber(amountBDesired)

  //                 liquidity.methods.addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin, userwalletaddresss, this.state.time).send({ from: userwalletaddresss }).then(result => {
  //                     // console.log(result);
  //                     this.setState({ liquiditytokenfrom: 'Select Token', tot: 'Select Token', isliquidityapprove: false, liquiditytokenamountA: 0, liquiditytokenamountB: 0, tokenAaddress: '', tokenBaddress: '' })
  //                 }).catch()
  //             }

  //         }
  //         else {
  //             amountADesired = BigNumber(amountADesired); amountBDesired = BigNumber(amountBDesired)
  //             this.onApprove([tokenA, tokenB], [amountADesired, amountBDesired], 'lqudity');
  //         }

  //     }
  // }

  zeroIncludes = (adr) => [ZERO_ADDRESS, MAIN_ZERO_ADDRESS].includes(adr);

  async liquidity(openSnackbar) {
    //const { openSnackbar } = this.props;
    if (this.state.fromChainName1 != this.state.toChainName1) {
      return openSnackbar("Cross chain liquidity is disabled.");
    }
    console.log(
      `${this.state.liquiditytokenfrom}: ${this.state.tokenAaddress}`
    );
    console.log(`${this.state.tot}: ${this.state.tokenBaddress}`);
    // if(this.state.currChain === 'bsc') return this.setState({ shouldAlert: true });
    if (
      this.state.liquiditytokenfrom === "Select Token" ||
      !this.state.tot === "Select Token"
    )
      return openSnackbar("Please choose both tokens");
    if (!this.state.liquiditytokenamountA || !this.state.liquiditytokenamountB)
      return openSnackbar("Please choose a valid amount");
    if (window?.ethereum) {
      this.setState({ loader: true });
      const accounts = await window?.ethereum.request({
        method: "eth_requestAccounts",
      });
      // // console.log(accounts);
      let userwalletaddresss = accounts[0];
      window.web3 = new Web3(window?.ethereum);

      const {
        tokenAaddress,
        tokenBaddress,
        liquiditytokenamountA,
        liquiditytokenamountB,
      } = this.state;
      const allowanceA = await findAllowedAmount(
        tokenAaddress,
        liquiditytokenamountA,
        BSwaprouter2ContractAddress
      );
      const allowanceB = await findAllowedAmount(
        tokenBaddress,
        liquiditytokenamountB,
        BSwaprouter2ContractAddress
      );

      const fromTokenDecimals = await getDecimal(this.state.tokenAaddress);
      const toTokenDecimals = await getDecimal(this.state.tokenBaddress);
      //.........................APRROVE MAX AMOUNT OF WALLLET.................................
      const amountToApproveA = await compareBalance(this.state.tokenAaddress);
      const amountToApproveB = await compareBalance(this.state.tokenBaddress);

      let liquidity = new window.web3.eth.Contract(
        bswap,
        BSwaprouter2ContractAddress
      );
      let tokenA = this.state.tokenAaddress;
      let tokenB = this.state.tokenBaddress;
      let amountADesired = window.web3.utils.toBN(
        fromExponential(
          parseInt(
            parseFloat(this.state.liquiditytokenamountA) *
              Math.pow(10, fromTokenDecimals)
          )
        )
      );
      let amountBDesired = window.web3.utils.toBN(
        fromExponential(
          parseInt(
            parseFloat(this.state.liquiditytokenamountB) *
              Math.pow(10, toTokenDecimals)
          )
        )
      );
      let amountAMin = 1;
      let amountBMin = 1;
      if (!allowanceA && !allowanceB) {
        if (
          this.zeroIncludes(this.state.tokenAaddress) ||
          this.zeroIncludes(this.state.tokenBaddress)
        ) {
          var tokenaddress;
          var amountTokenDesired;
          var amountethDesired;
          if (this.zeroIncludes(this.state.tokenAaddress)) {
            tokenaddress = this.state.tokenBaddress;
            if (amountADesired > 10 ** fromTokenDecimals) {
              amountethDesired = amountADesired;
              amountTokenDesired = amountBDesired;
            } else {
              amountethDesired = amountADesired;
              amountTokenDesired = amountBDesired;
            }
          } else {
            tokenaddress = this.state.tokenAaddress;
            if (amountBDesired > 10 ** toTokenDecimals) {
              amountethDesired = amountBDesired;
              amountTokenDesired = amountADesired;
            } else {
              amountethDesired = amountBDesired;
              amountTokenDesired = amountADesired;
            }
          }
          liquidity.methods
            .addLiquidityETH(
              tokenaddress,
              amountTokenDesired,
              amountAMin,
              amountBMin,
              userwalletaddresss,
              Math.floor(Date.now() / 1000) + this.state.deadLine * 60
            )
            .send({ from: userwalletaddresss, value: amountethDesired })
            .then((result) => {
              openSnackbar("Transaction Succeed!");

              this.setState({
                Loading: false,
                liquiditytokenfrom: "Select Token",
                tot: "Select Token",
                isliquidityapprove: false,
                liquiditytokenamountA: "",
                liquiditytokenamountB: "",
                tokenAaddress: "",
                tokenBaddress: "",
                liquiditymethod: "Add Liquidity",
              });
              this.setState({
                liquiditytokenamountA: "",
                loader: false,
                liquiditytokenamountB: "",
                liquiditybalancefrom: "0",
                liquiditybalanceto: "0",
              });
              // window.location.reload();
              let transactionHashApprove = result?.transactionHash;
              localStorage.setItem("transactionHash", transactionHashApprove);
              this.setState({ loader: false });
              this.setState({ transaction: true });
            })
            .catch((err) => {
              // snackbar here
              this.setState({ loader: false });
              if (err.code !== -32602) {
                openSnackbar(
                  err.code === 4001
                    ? "Transaction Rejected"
                    : "Transaction failed"
                );
                this.setState({
                  Loading: false,
                  loader: false,
                  // liquiditytokenamountA:'',liquiditytokenamountB:''
                });
                // window.location.reload();
              } else {
                this.setState({
                  Loading: false,
                  loader: false,
                  // liquiditytokenamountA:'',liquiditytokenamountB:''
                });
                openSnackbar("Gas fees is too low.");
              }
            });
        } else {
          // amountADesired=(amountADesired);
          // amountBDesired=(amountBDesired)
          // console.log({ tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin, userwalletaddresss, time: this.state.time });
          liquidity.methods
            .addLiquidity(
              tokenA,
              tokenB,
              amountADesired,
              amountBDesired,
              amountAMin,
              amountBMin,
              userwalletaddresss,
              Math.floor(Date.now() / 1000) + this.state.deadLine * 60
            )
            .send({ from: userwalletaddresss })
            .then((result) => {
              // console.log('if success')

              openSnackbar("Transaction Succeed!");

              this.setState({
                loader: false,
                liquiditytokenfrom: "Select Token",
                tot: "Select Token",
                isliquidityapprove: false,
                liquiditytokenamountA: "",
                liquiditytokenamountB: "",
                tokenAaddress: "",
                tokenBaddress: "",
                liquiditymethod: "Add Liquidity",
              });
              this.setState({
                liquiditytokenamountA: "",
                liquiditytokenamountB: "",
                liquiditybalancefrom: "0",
                liquiditybalanceto: "0",
              });
              // window.location.reload();
              let transactionHashApprove = result?.transactionHash;
              localStorage.setItem("transactionHash", transactionHashApprove);
              this.setState({ loader: false });
              this.setState({ transaction: true });
            })
            .catch((err) => {
              //snackbar
              this.setState({ loader: false });
              if (err.code !== -32602) {
                openSnackbar(
                  err.code === 4001
                    ? "Transaction Rejected"
                    : "Transaction failed"
                );
                this.setState({
                  loader: false,
                  // liquiditytokenamountA:'',liquiditytokenamountB:''
                });
                // window.location.reload();
              } else {
                this.setState({
                  loader: false,
                  // liquiditytokenamountA:'',liquiditytokenamountB:''
                });
                openSnackbar("Gas fees is too low.");
              }
            });
        }
      } else {
        // amountADesired=(amountADesired);amountBDesired=(amountBDesired)
        this.onApprove(
          [tokenA, tokenB],
          [amountToApproveA, amountToApproveB],
          "lqudity",
          openSnackbar
        );
      }
    }
  }

  removeliquidityNew = async () => {
    const toBig = (num) => window.web3.utils.toBN(num);
    const { openSnackbar } = this.props;
    if (window?.ethereum) {
      this.setState({ loader: true });
      const accounts = await window?.ethereum.request({
        method: "eth_requestAccounts",
      });
      let userwalletaddresss = accounts[0];
      window.web3 = new Web3(window?.ethereum);
      let removeliquidity = new window.web3.eth.Contract(
        bswap,
        BSwaprouter2ContractAddress
      );
      let liquidity;
      // let tokenA = '0xaD6D458402F60fD3Bd25163575031ACDce07538D';
      // //let tokenB = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';
      // let tokenB = '0xc778417E063141139Fce010982780140Aa0cD5Ab';
      // debugger;
      // console.log(this.state.tokenAaddress, this.state.tokenBaddress)
      // debugger
      let tokenA = this.state.removeLiqFromTokens.address;
      let tokenB = this.state.removeLiqToTokens.address;

      if (tokenA == "0x0000000000000000000000000000000000000000") {
        tokenA = TEST_WBNB;
      }

      if (tokenB == "0x0000000000000000000000000000000000000000") {
        tokenB = TEST_WBNB;
      }

      let factories = new window.web3.eth.Contract(
        factory,
        BSwapfactoryContractAddress
      );

      const tokenADecimals = await getDecimal(tokenA);
      const tokenBDecimals = await getDecimal(tokenB);

      factories.methods
        .getPair(tokenA, tokenB)
        .call({ from: userwalletaddresss })
        .then((pairaddress) => {
          let address = pairaddress;
          let tokenpair = new window.web3.eth.Contract(pair, address);

          let approveTokenPair = new window.web3.eth.Contract(ERC20, address);

          tokenpair.methods
            .balanceOf(userwalletaddresss)
            .call({ from: userwalletaddresss })
            .then((result) => {
              console.log(result);
              liquidity = toBig(
                fromExponential((result * this.state.value) / 100)
              );
              //   let ERC20 = new Window.web3.eth.Contract(ERC20,pai)
              //   liquidity*this.state.removeLiqValue/100;
              if (this.state.removeLiqFromTokens.name != "BNB") {
                approveTokenPair.methods
                  .approve(BSwaprouter2ContractAddress, liquidity)
                  .send({ from: userwalletaddresss })
                  .then((ress) => {
                    tokenpair.methods
                      .token0()
                      .call({ from: userwalletaddresss })
                      .then((token0address) => {
                        console.log(token0address);
                        //debugger;

                        let balance = new window.web3.eth.Contract(
                          ERC20,
                          token0address
                        );
                        balance.methods
                          .balanceOf(pairaddress)
                          .call({ from: userwalletaddresss })
                          .then((balance0) => {
                            tokenpair.methods
                              .token1()
                              .call({ from: userwalletaddresss })
                              .then((token1address) => {
                                let balance1 = new window.web3.eth.Contract(
                                  ERC20,
                                  token1address
                                );
                                balance1.methods
                                  .balanceOf(pairaddress)
                                  .call({ from: userwalletaddresss })
                                  .then((balance1) => {
                                    tokenpair.methods
                                      .totalSupply()
                                      .call({ from: userwalletaddresss })
                                      .then((totalsupply) => {
                                        let amountAmin = 0;
                                        let amountBmin = 0;
                                        let amount0 =
                                          (liquidity * balance0) /
                                          totalsupply /
                                          10 ** tokenADecimals;

                                        let amount1 =
                                          (liquidity * balance1) /
                                          totalsupply /
                                          10 ** tokenBDecimals;

                                        // if(token0address == )

                                        // if(fetchValues){
                                        //     this.setState({amount0:amount0, amount1: amount1})
                                        //     return
                                        // }

                                        // console.log({ tokenA, tokenB, liquidity, amountAmin, amountBmin, userwalletaddresss, dead: this.state.time + 10000000 });
                                        removeliquidity.methods
                                          .removeLiquidity(
                                            tokenA,
                                            tokenB,
                                            liquidity,
                                            amountAmin,
                                            amountBmin,
                                            userwalletaddresss,
                                            Math.floor(Date.now() / 1000) +
                                              this.state.deadLine * 60
                                          )
                                          .send({ from: userwalletaddresss })
                                          .then((result) => {
                                            openSnackbar(
                                              "Liquidity Removed Successfully"
                                            );
                                            this.setState({
                                              removeLiqValues: {
                                                from: 0,
                                                to: 0,
                                              },
                                            });
                                            this.setState({
                                              removeLiqFromTokens: {
                                                name: "",
                                                img: "",
                                                address: "",
                                              },
                                              removeLiqToTokens: {
                                                name: "",
                                                img: "",
                                                address: "",
                                              },
                                            });
                                            let transactionHashApprove =
                                              result.transactionHash;
                                            localStorage.setItem(
                                              "transactionHash",
                                              transactionHashApprove
                                            );
                                            this.setState({ loader: false });
                                            this.setState({
                                              transaction: true,
                                            });
                                          })
                                          .catch((err) => {
                                            this.setState({ loader: false });
                                          });
                                      });
                                  });
                              })
                              .catch((err) => {
                                this.setState({ loader: false });
                              });
                          })
                          .catch((err) => {
                            this.setState({ loader: false });
                          });
                      })
                      .catch((err) => {
                        this.setState({ loader: false });
                      });
                  })
                  .catch((err) => {
                    this.setState({ loader: false });
                    console.log(err);
                  });
              } else {
                tokenpair.methods
                  .token0()
                  .call({ from: userwalletaddresss })
                  .then((token0address) => {
                    console.log(token0address);
                    //debugger;

                    let balance = new window.web3.eth.Contract(
                      ERC20,
                      token0address
                    );
                    balance.methods
                      .balanceOf(pairaddress)
                      .call({ from: userwalletaddresss })
                      .then((balance0) => {
                        tokenpair.methods
                          .token1()
                          .call({ from: userwalletaddresss })
                          .then((token1address) => {
                            let balance1 = new window.web3.eth.Contract(
                              ERC20,
                              token1address
                            );
                            balance1.methods
                              .balanceOf(pairaddress)
                              .call({ from: userwalletaddresss })
                              .then((balance1) => {
                                tokenpair.methods
                                  .totalSupply()
                                  .call({ from: userwalletaddresss })
                                  .then((totalsupply) => {
                                    let amountAmin = 0;
                                    let amountBmin = 0;
                                    let amount0 =
                                      (liquidity * balance0) /
                                      totalsupply /
                                      10 ** tokenADecimals;

                                    let amount1 =
                                      (liquidity * balance1) /
                                      totalsupply /
                                      10 ** tokenBDecimals;

                                    // if(token0address == )

                                    // if(fetchValues){
                                    //     this.setState({amount0:amount0, amount1: amount1})
                                    //     return
                                    // }

                                    // console.log({ tokenA, tokenB, liquidity, amountAmin, amountBmin, userwalletaddresss, dead: this.state.time + 10000000 });
                                    removeliquidity.methods
                                      .removeLiquidity(
                                        tokenA,
                                        tokenB,
                                        liquidity,
                                        amountAmin,
                                        amountBmin,
                                        userwalletaddresss,
                                        Math.floor(Date.now() / 1000) +
                                          this.state.deadLine * 60
                                      )
                                      .send({ from: userwalletaddresss })
                                      .then((result) => {
                                        openSnackbar(
                                          "Liquidity Removed Successfully"
                                        );
                                        this.setState({
                                          removeLiqValues: { from: 0, to: 0 },
                                        });
                                        this.setState({
                                          removeLiqFromTokens: {
                                            name: "",
                                            img: "",
                                            address: "",
                                          },
                                          removeLiqToTokens: {
                                            name: "",
                                            img: "",
                                            address: "",
                                          },
                                        });
                                        let transactionHashApprove =
                                          result.transactionHash;
                                        localStorage.setItem(
                                          "transactionHash",
                                          transactionHashApprove
                                        );
                                        this.setState({ loader: false });
                                        this.setState({ transaction: true });
                                      })
                                      .catch((err) => {
                                        this.setState({ loader: false });
                                      });
                                  });
                              });
                          })
                          .catch((err) => {
                            this.setState({ loader: false });
                          });
                      })
                      .catch((err) => {
                        this.setState({ loader: false });
                      });
                  })
                  .catch((err) => {
                    this.setState({ loader: false });
                  });
              }
            })
            .catch((err) => {
              this.setState({ loader: false });
            });
        })
        .catch((err) => {
          this.setState({ loader: false });
        });
    }
  };
  removeliquidity = async () => {
    const toBig = (num) => window.web3.utils.toBN(num);
    const { openSnackbar } = this.props;
    if (window?.ethereum) {
      if (
        !parseFloat(this.state.removeLiqValues.from) ||
        !parseFloat(this.state.removeLiqValues.to)
      )
        return openSnackbar("Not enough liquidity to remove.");
      this.setState({ loader: true });
      const allowedReturnedValue = await this.getRemoveLiquidityValues();
      console.log(
        allowedReturnedValue,
        "allowed value _______________________"
      );
      const accounts = await window?.ethereum.request({
        method: "eth_requestAccounts",
      });
      let userwalletaddresss = accounts[0];
      window.web3 = new Web3(window?.ethereum);
      let removeliquidity = new window.web3.eth.Contract(
        bswap,
        BSwaprouter2ContractAddress
      );
      let liquidity;
      // let tokenA = '0xaD6D458402F60fD3Bd25163575031ACDce07538D';
      // //let tokenB = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';
      // let tokenB = '0xc778417E063141139Fce010982780140Aa0cD5Ab';
      // debugger;
      // console.log(this.state.tokenAaddress, this.state.tokenBaddress)
      // debugger
      let tokenA = this.state.removeLiqFromTokens.address;
      let tokenB = this.state.removeLiqToTokens.address;

      if (tokenA == "0x0000000000000000000000000000000000000000") {
        tokenA = TEST_WBNB;
      }

      if (tokenB == "0x0000000000000000000000000000000000000000") {
        tokenB = TEST_WBNB;
      }

      let factories = new window.web3.eth.Contract(
        factory,
        BSwapfactoryContractAddress
      );

      const tokenADecimals = await getDecimal(tokenA);
      const tokenBDecimals = await getDecimal(tokenB);

      factories.methods
        .getPair(tokenA, tokenB)
        .call({ from: userwalletaddresss })
        .then((pairaddress) => {
          let address = pairaddress;

          let tokenpair = new window.web3.eth.Contract(pair, address);

          let approveTokenPair = new window.web3.eth.Contract(ERC20, address);

          tokenpair.methods
            .balanceOf(userwalletaddresss)
            .call({ from: userwalletaddresss })
            .then((result) => {
              console.log(result);
              let allowanceLiq =
                +this.state.value === 100
                  ? result
                  : fromExponential((result * this.state.value) / 100);
              liquidity =
                +this.state.value === 100
                  ? result
                  : toBig(fromExponential((result * this.state.value) / 100));
              //   let ERC20 = new Window.web3.eth.Contract(ERC20,pai)
              //   liquidity*this.state.removeLiqValue/100;
              const def = 5;
              if (
                ![
                  this.state.removeLiqToTokens.name,
                  this.state.removeLiqFromTokens.name,
                ].includes("BNB") ||
                def > 1
              ) {
                tokenpair.methods
                  .token0()
                  .call({ from: userwalletaddresss })
                  .then((token0address) => {
                    console.log(token0address);
                    //debugger;

                    let balance = new window.web3.eth.Contract(
                      ERC20,
                      token0address
                    );
                    balance.methods
                      .balanceOf(pairaddress)
                      .call({ from: userwalletaddresss })
                      .then((balance0) => {
                        tokenpair.methods
                          .token1()
                          .call({ from: userwalletaddresss })
                          .then((token1address) => {
                            let balance1 = new window.web3.eth.Contract(
                              ERC20,
                              token1address
                            );
                            balance1.methods
                              .balanceOf(pairaddress)
                              .call({ from: userwalletaddresss })
                              .then((balance1) => {
                                tokenpair.methods
                                  .totalSupply()
                                  .call({ from: userwalletaddresss })
                                  .then((totalsupply) => {
                                    let amountAmin = 0;
                                    let amountBmin = 0;
                                    let amount0 =
                                      (liquidity * balance0) /
                                      totalsupply /
                                      10 ** tokenADecimals;

                                    let amount1 =
                                      (liquidity * balance1) /
                                      totalsupply /
                                      10 ** tokenBDecimals;

                                    // if(token0address == )

                                    // if(fetchValues){
                                    //     this.setState({amount0:amount0, amount1: amount1})
                                    //     return
                                    // }
                                    console.log(
                                      "new condition=>",
                                      Number(
                                        allowedReturnedValue ||
                                          this.state.allowedToRemove
                                      ) > Number(allowanceLiq)
                                    );
                                    console.log(
                                      Number(
                                        allowedReturnedValue ||
                                          this.state.allowedToRemove
                                      ),
                                      Number(allowanceLiq)
                                    );
                                    if (
                                      Number(
                                        allowedReturnedValue ||
                                          this.state.allowedToRemove
                                      ) > Number(allowanceLiq)
                                    ) {
                                      console.log("allow to remove ");
                                      if (
                                        [
                                          this.state.removeLiqFromTokens.name,
                                          this.state.removeLiqToTokens.name,
                                        ].includes("BNB")
                                      ) {
                                        removeliquidity.methods
                                          .removeLiquidityETH(
                                            this.state.removeLiqFromTokens
                                              .name !== "BNB"
                                              ? tokenA
                                              : tokenB,
                                            liquidity,
                                            amountAmin,
                                            amountBmin,
                                            userwalletaddresss,
                                            Math.floor(Date.now() / 1000) +
                                              this.state.deadLine * 60
                                          )
                                          .send({ from: userwalletaddresss })
                                          .then((result) => {
                                            openSnackbar(
                                              "Liquidity Removed Successfully"
                                            );
                                            this.setState({
                                              removeLiqValues: {
                                                from: 0,
                                                to: 0,
                                              },
                                            });
                                            this.setState({
                                              removeLiqFromTokens: {
                                                name: "",
                                                img: "",
                                                address: "",
                                              },
                                              removeLiqToTokens: {
                                                name: "",
                                                img: "",
                                                address: "",
                                              },
                                            });
                                            this.setState({ value: 0 });
                                            let transactionHashApprove =
                                              result.transactionHash;
                                            localStorage.setItem(
                                              "transactionHash",
                                              transactionHashApprove
                                            );
                                            this.setState({ loader: false });
                                            this.setState({
                                              transaction: true,
                                            });
                                          })
                                          .catch((err) => {
                                            this.setState({ loader: false });
                                          });
                                      } else {
                                        removeliquidity.methods
                                          .removeLiquidity(
                                            tokenA,
                                            tokenB,
                                            liquidity,
                                            amountAmin,
                                            amountBmin,
                                            userwalletaddresss,
                                            Math.floor(Date.now() / 1000) +
                                              this.state.deadLine * 60
                                          )
                                          .send({ from: userwalletaddresss })
                                          .then((result) => {
                                            openSnackbar(
                                              "Liquidity Removed Successfully"
                                            );
                                            this.setState({
                                              removeLiqValues: {
                                                from: 0,
                                                to: 0,
                                              },
                                            });
                                            this.setState({
                                              removeLiqFromTokens: {
                                                name: "",
                                                img: "",
                                                address: "",
                                              },
                                              removeLiqToTokens: {
                                                name: "",
                                                img: "",
                                                address: "",
                                              },
                                            });
                                            this.setState({ value: 0 });
                                            let transactionHashApprove =
                                              result.transactionHash;
                                            localStorage.setItem(
                                              "transactionHash",
                                              transactionHashApprove
                                            );
                                            this.setState({ loader: false });
                                            this.setState({
                                              transaction: true,
                                            });
                                          })
                                          .catch((err) => {
                                            this.setState({ loader: false });
                                          });
                                      }
                                    } else {
                                      this.setState({ loader: false });
                                      console.log("approve first");
                                      openSnackbar(
                                        "Please approve value to remove"
                                      );
                                    }

                                    // console.log({ tokenA, tokenB, liquidity, amountAmin, amountBmin, userwalletaddresss, dead: this.state.time + 10000000 });
                                  });
                              });
                          })
                          .catch((err) => {
                            this.setState({ loader: false });
                          });
                      })
                      .catch((err) => {
                        this.setState({ loader: false });
                      });
                  })
                  .catch((err) => {
                    this.setState({ loader: false });
                  });
              } else {
                tokenpair.methods
                  .token0()
                  .call({ from: userwalletaddresss })
                  .then((token0address) => {
                    console.log(token0address);
                    //debugger;

                    let balance = new window.web3.eth.Contract(
                      ERC20,
                      token0address
                    );
                    balance.methods
                      .balanceOf(pairaddress)
                      .call({ from: userwalletaddresss })
                      .then((balance0) => {
                        tokenpair.methods
                          .token1()
                          .call({ from: userwalletaddresss })
                          .then((token1address) => {
                            let balance1 = new window.web3.eth.Contract(
                              ERC20,
                              token1address
                            );
                            balance1.methods
                              .balanceOf(pairaddress)
                              .call({ from: userwalletaddresss })
                              .then((balance1) => {
                                tokenpair.methods
                                  .totalSupply()
                                  .call({ from: userwalletaddresss })
                                  .then((totalsupply) => {
                                    let amountAmin = 0;
                                    let amountBmin = 0;
                                    let amount0 =
                                      (liquidity * balance0) /
                                      totalsupply /
                                      10 ** tokenADecimals;

                                    let amount1 =
                                      (liquidity * balance1) /
                                      totalsupply /
                                      10 ** tokenBDecimals;

                                    // if(token0address == )

                                    // if(fetchValues){
                                    //     this.setState({amount0:amount0, amount1: amount1})
                                    //     return
                                    // }

                                    // console.log({ tokenA, tokenB, liquidity, amountAmin, amountBmin, userwalletaddresss, dead: this.state.time + 10000000 });
                                    removeliquidity.methods
                                      .removeLiquidity(
                                        tokenA,
                                        tokenB,
                                        liquidity,
                                        amountAmin,
                                        amountBmin,
                                        userwalletaddresss,
                                        Math.floor(Date.now() / 1000) +
                                          this.state.deadLine * 60
                                      )
                                      .send({ from: userwalletaddresss })
                                      .then((result) => {
                                        openSnackbar(
                                          "Liquidity Removed Successfully"
                                        );
                                        this.setState({
                                          removeLiqValues: { from: 0, to: 0 },
                                        });
                                        this.setState({
                                          removeLiqFromTokens: {
                                            name: "",
                                            img: "",
                                            address: "",
                                          },
                                          removeLiqToTokens: {
                                            name: "",
                                            img: "",
                                            address: "",
                                          },
                                        });
                                        let transactionHashApprove =
                                          result.transactionHash;
                                        localStorage.setItem(
                                          "transactionHash",
                                          transactionHashApprove
                                        );
                                        this.setState({ loader: false });
                                        this.setState({ transaction: true });
                                      })
                                      .catch((err) => {
                                        this.setState({ loader: false });
                                      });
                                  });
                              });
                          })
                          .catch((err) => {
                            this.setState({ loader: false });
                          });
                      })
                      .catch((err) => {
                        this.setState({ loader: false });
                      });
                  })
                  .catch((err) => {
                    this.setState({ loader: false });
                  });
              }
            })
            .catch((err) => {
              this.setState({ loader: false });
            });
        })
        .catch((err) => {
          this.setState({ loader: false });
        });
    }
  };

  approve_onRemoveLiquidity = async () => {
    const toBig = (num) => window.web3.utils.toBN(num);
    const { openSnackbar } = this.props;
    if (window?.ethereum) {
      if (
        !parseFloat(this.state.removeLiqValues.from) ||
        !parseFloat(this.state.removeLiqValues.to)
      )
        return openSnackbar("Not enough liquidity to approve.");
      this.setState({ loader: true });
      const accounts = await window?.ethereum.request({
        method: "eth_requestAccounts",
      });
      let userwalletaddresss = accounts[0];
      window.web3 = new Web3(window?.ethereum);
      let removeliquidity = new window.web3.eth.Contract(
        bswap,
        BSwaprouter2ContractAddress
      );
      let liquidity;
      // let tokenA = '0xaD6D458402F60fD3Bd25163575031ACDce07538D';
      // //let tokenB = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';
      // let tokenB = '0xc778417E063141139Fce010982780140Aa0cD5Ab';
      // debugger;
      // console.log(this.state.tokenAaddress, this.state.tokenBaddress)
      // debugger
      let tokenA = this.state.removeLiqFromTokens.address;
      let tokenB = this.state.removeLiqToTokens.address;

      if (tokenA == "0x0000000000000000000000000000000000000000") {
        tokenA = TEST_WBNB;
      }

      if (tokenB == "0x0000000000000000000000000000000000000000") {
        tokenB = TEST_WBNB;
      }

      let factories = new window.web3.eth.Contract(
        factory,
        BSwapfactoryContractAddress
      );

      const tokenADecimals = await getDecimal(tokenA);
      const tokenBDecimals = await getDecimal(tokenB);
      // const allowanceA = await findAllowedAmount(tokenA, 1000, BSwaprouter2ContractAddress);
      // const allowanceB = await findAllowedAmount(tokenB, 1000, BSwaprouter2ContractAddress);
      //console.log('allowanceA,allowanceB=>', allowanceA, allowanceB)
      //if (true) {
      factories.methods
        .getPair(tokenA, tokenB)
        .call({ from: userwalletaddresss })
        .then((pairaddress) => {
          let address = pairaddress;

          let tokenpair = new window.web3.eth.Contract(pair, address);

          let approveTokenPair = new window.web3.eth.Contract(ERC20, address);

          tokenpair.methods
            .balanceOf(userwalletaddresss)
            .call({ from: userwalletaddresss })
            .then((result) => {
              console.log(result);
              liquidity = toBig(fromExponential(result * 1000));
              //   let ERC20 = new Window.web3.eth.Contract(ERC20,pai)
              //   liquidity*this.state.removeLiqValue/100;
              const def = 5;
              if (this.state.removeLiqFromTokens.name != "BNB" || def > 2) {
                approveTokenPair.methods
                  .approve(BSwaprouter2ContractAddress, liquidity)
                  .send({ from: userwalletaddresss })
                  .then(async (ress) => {
                    let transactionHashApprove = ress.transactionHash;
                    localStorage.setItem(
                      "transactionHash",
                      transactionHashApprove
                    );
                    this.setState({ loader: false });
                    this.setState({ transaction: true });

                    await this.getRemoveLiquidityValues();
                    tokenpair.methods
                      .token0()
                      .call({ from: userwalletaddresss })
                      .then((token0address) => {
                        console.log(token0address);
                        //debugger;

                        let balance = new window.web3.eth.Contract(
                          ERC20,
                          token0address
                        );
                        balance.methods
                          .balanceOf(pairaddress)
                          .call({ from: userwalletaddresss })
                          .then((balance0) => {
                            tokenpair.methods
                              .token1()
                              .call({ from: userwalletaddresss })
                              .then((token1address) => {
                                let balance1 = new window.web3.eth.Contract(
                                  ERC20,
                                  token1address
                                );
                                balance1.methods
                                  .balanceOf(pairaddress)
                                  .call({ from: userwalletaddresss })
                                  .then((balance1) => {
                                    tokenpair.methods
                                      .totalSupply()
                                      .call({ from: userwalletaddresss })
                                      .then((totalsupply) => {
                                        let amountAmin = 0;
                                        let amountBmin = 0;
                                        let amount0 =
                                          (liquidity * balance0) /
                                          totalsupply /
                                          10 ** tokenADecimals;

                                        let amount1 =
                                          (liquidity * balance1) /
                                          totalsupply /
                                          10 ** tokenBDecimals;
                                      });
                                  });
                              })
                              .catch((err) => {
                                this.setState({ loader: false });
                              });
                          })
                          .catch((err) => {
                            this.setState({ loader: false });
                          });
                      })
                      .catch((err) => {
                        this.setState({ loader: false });
                      });
                  })
                  .catch((err) => {
                    this.setState({ loader: false });
                    console.log(err);
                  });
              }
            })
            .catch((err) => {
              this.setState({ loader: false });
            });
        })
        .catch((err) => {
          this.setState({ loader: false });
        });
      // }else{
      //     this.setState({ loader: false });
      //     openSnackbar('Token already approved.');
      // }
    }
  };

  async getUnitAmount(path, swaping, userwalletaddresss) {
    const decimal = await getDecimal();
    let amount = window.web3.utils.toBN(
      fromExponential("1" * Math.pow(10, decimal))
    );
    let newPath = [path[1], path[0]];
    swaping.methods
      .getAmountsOut(amount, path)
      .call({ from: userwalletaddresss })
      .then((res) => {
        //console.log(res)
        let amount = window.web3.utils.fromWei(res[1]);
        let values =
          "1 " +
          this.state.fromtokenName1 +
          " = " +
          parseFloat(amount).toFixed(8) +
          " " +
          this.state.totokenName1;
        this.setState({ fromConvertedValue: values });
      })
      .catch((error) => {
        //console.log('error', error)
      });
    swaping.methods
      .getAmountsOut(amount, newPath)
      .call({ from: userwalletaddresss })
      .then(async (res) => {
        //console.log(res)
        let amount = window.web3.utils.fromWei(res[1]);
        let values =
          "1 " +
          this.state.totokenName1 +
          " = " +
          parseFloat(amount).toFixed(8) +
          " " +
          this.state.fromtokenName1;
        this.setState({ toConvertedvalue: values });
      })
      .catch((error) => {
        //console.log('error', error)
      });
  }

  async getamountout(amount, bool) {
    if (window.web3) {
      const decimal = await getDecimal(this.state.tokenfromAddress);
      console.log(decimal, "fromDEDIKADSA ______________________________");
      //window.web3.utils.toBN(fromExponential((parseInt(this.state.tokenamountOut))));
      let amountIn = window.web3.utils.toBN(
        fromExponential(amount * Math.pow(10, decimal))
      );
      if (
        [ZERO_ADDRESS, MAIN_ZERO_ADDRESS].includes(this.state.tokenfromAddress)
      ) {
        let path = [WBNB_Address, this.state.tokentoAddress];
        let userwalletaddresss = localStorage.getItem("account");
        window.web3 = new Web3(window?.ethereum);
        let swaping = new window.web3.eth.Contract(
          different,
          BSwaprouter2ContractAddress
        );
        this.getUnitAmount(path, swaping, userwalletaddresss);

        if (bool) {
          swaping.methods
            .getAmountsIn(amountIn, path)
            .call({ from: userwalletaddresss })
            .then((res) => {
              //console.log(res)
              let amount = window.web3.utils.fromWei(res[0]);
              this.setState({ tokenamountIn: parseFloat(amount).toFixed(8) });
            })
            .catch((error) => {
              //console.log('error', error)
            });
        } else {
          swaping.methods
            .getAmountsOut(amountIn, path)
            .call({ from: userwalletaddresss })
            .then(async (res) => {
              //console.log(res)
              let amountOut = window.web3.utils.fromWei(res[1]);
              console.log("tokenamountout", amountOut);
              //this.setState({ tokenamountOut: parseFloat(amount).toFixed(8) })
              if (amountOut > 0) {
                const impactValue = await getImpact(
                  this.state.tokenfromAddress,
                  this.state.tokentoAddress,
                  amount,
                  amountOut,
                  BSwapfactoryContractAddress
                );
                this.setState({
                  tokenamountOut: parseFloat(amountOut).toFixed(8),
                  priceImpact: impactValue,
                });
              } else {
                this.setState({ tokenamountOut: 0 });
              }
              this.getReimbursement(path, amountIn, userwalletaddresss);
            })
            .catch((error) => {
              //console.log('error', error)
            });
        }
      } else if (
        [ZERO_ADDRESS, MAIN_ZERO_ADDRESS].includes(this.state.tokentoAddress)
      ) {
        let path = [this.state.tokenfromAddress, WBNB_Address];
        let userwalletaddresss = localStorage.getItem("account");
        window.web3 = new Web3(window?.ethereum);
        let swaping = new window.web3.eth.Contract(
          different,
          BSwaprouter2ContractAddress
        );
        this.getUnitAmount(path, swaping, userwalletaddresss);
        if (bool) {
          swaping.methods
            .getAmountsIn(amountIn, path)
            .call({ from: userwalletaddresss })
            .then((res) => {
              // console.log(res)
              let amount = window.web3.utils.fromWei(res[0]);
              this.setState({ tokenamountIn: parseFloat(amount).toFixed(8) });
            })
            .catch((error) => {
              //console.log('error', error)
            });
        } else {
          swaping.methods
            .getAmountsOut(amountIn, path)
            .call({ from: userwalletaddresss })
            .then(async (res) => {
              // console.log(res)
              let amountOut = window.web3.utils.fromWei(res[1]);
              console.log("tokenamountout", amountOut);
              //this.setState({ tokenamountOut: parseFloat(amount).toFixed(8) })
              if (amountOut > 0) {
                const impactValue = await getImpact(
                  this.state.tokenfromAddress,
                  this.state.tokentoAddress,
                  amount,
                  amountOut,
                  BSwapfactoryContractAddress
                );
                this.setState({
                  tokenamountOut: parseFloat(amountOut).toFixed(8),
                  priceImpact: impactValue,
                });
              } else {
                this.setState({ tokenamountOut: 0 });
              }
              this.getReimbursement(path, amountIn, userwalletaddresss);
            })
            .catch((error) => {
              //console.log('error', error)
            });
        }
      } else {
        // let path = [this.state.tokenfromAddress, this.state.tokentoAddress];
        // let userwalletaddresss = localStorage.getItem('account');
        // window.web3 = new Web3(window?.ethereum);
        let swaping = new window.web3.eth.Contract(
          different,
          BSwaprouter2ContractAddress
        );
        //this.getUnitAmount(path, swaping, userwalletaddresss);

        // let path = [this.state.tokenfromAddress,this.state.tokentoAddress];
        let userwalletaddresss = localStorage.getItem("account");
        //let factories = new window.web3.eth.Contract(factory,UNISWAP_FACTORY);
        let factories = new window.web3.eth.Contract(
          BSwapfactoryAbi,
          BSwapfactoryContractAddress
        );
        let path;
        path = [this.state.tokenfromAddress, this.state.tokentoAddress];
        this.getUnitAmount(path, swaping, userwalletaddresss);
        factories.methods
          .getPair(this.state.tokenfromAddress, this.state.tokentoAddress)
          .call({ from: userwalletaddresss })
          .then((pairaddress) => {
            console.log(this.state.multiHops);

            if (pairaddress == "0x0000000000000000000000000000000000000000") {
              console.log(pairaddress, " Pair address1 - 1");
              // this.setState({disableSwapButton : true })
              if (this.state.multiHops) {
                console.log("disable swap button");
                this.setState({ disableSwapButton: true });
              } else if (!this.state.multiHops) {
                console.log("enable swap button");
                this.setState({ disableSwapButton: false });
              }

              path = [
                this.state.tokenfromAddress,
                TEST_WBNB,
                this.state.tokentoAddress,
              ];
            } else {
              console.log(pairaddress, " Pair address1 - 2");

              if (this.state.multiHops) {
                console.log("disable swap button");
                this.setState({ disableSwapButton: true });
              } else if (!this.state.multiHops) {
                console.log("enable swap button");
                this.setState({ disableSwapButton: false });
              }

              path = [this.state.tokenfromAddress, this.state.tokentoAddress];
            }

            window.web3 = new Web3(window?.ethereum);
            //let  swaping = new window.web3.eth.Contract(uniswap,UNISWAP_ROUTER);
            let swaping = new window.web3.eth.Contract(
              different,
              BSwaprouter2ContractAddress
            );

            if (bool) {
              // swaping.methods.getAmountsIn(amountIn, path).call({ from: userwalletaddresss })
              //     .then((res) => {
              //         // console.log(res)
              //         let amount = window.web3.utils.fromWei((res[0]));
              //         this.setState({ tokenamountIn: parseFloat(amount).toFixed(8) })
              //     })
              //     .catch()
              // console.log(amountIn);
              let balance = new window.web3.eth.Contract(ERC20, path[1]);
              balance.methods
                .decimals()
                .call({ from: userwalletaddresss })
                .then((number) => {
                  let amountIn = window.web3.utils.toBN(
                    fromExponential(amount * Math.pow(10, number))
                  );
                  swaping.methods
                    .getAmountsIn(amountIn, path)
                    .call({ from: userwalletaddresss })
                    .then((res) => {
                      let bal = new window.web3.eth.Contract(ERC20, path[0]);
                      bal.methods
                        .decimals()
                        .call({ from: userwalletaddresss })
                        .then((numb) => {
                          let amount = parseFloat(res[0]) / 10 ** numb;
                          // console.log(amount,'hello',this.state.tokenamountOut,res);
                          this.setState({
                            tokenamountIn: parseFloat(amount).toFixed(8),
                          });
                        })
                        .catch();
                    })
                    .catch((err) => {});
                })
                .catch();
            } else {
              let factories = new window.web3.eth.Contract(
                BSwapfactoryAbi,
                BSwapfactoryContractAddress
              );
              let path;
              factories.methods
                .getPair(this.state.tokenfromAddress, this.state.tokentoAddress)
                .call({ from: userwalletaddresss })
                .then((pairaddress) => {
                  console.log(pairaddress, "234324234234234");
                  if (
                    pairaddress == "0x0000000000000000000000000000000000000000"
                  ) {
                    // path = [this.state.tokenfromAddress,WETH,this.state.tokentoAddress];
                    console.log(pairaddress, " Pair address2 - 1");
                    let path = [this.state.tokenfromAddress, TEST_WBNB];
                    let bal = new window.web3.eth.Contract(ERC20, path[0]);
                    bal.methods
                      .decimals()
                      .call({ from: userwalletaddresss })
                      .then((number) => {
                        let amountIn = window.web3.utils.toBN(
                          fromExponential(amount * Math.pow(10, number))
                        );
                        swaping.methods
                          .getAmountsOut(amountIn, path)
                          .call({ from: userwalletaddresss })
                          .then((res) => {
                            //// console.log(res)
                            let balance = new window.web3.eth.Contract(
                              ERC20,
                              path[1]
                            );
                            balance.methods
                              .decimals()
                              .call({ from: userwalletaddresss })
                              .then((numb) => {
                                let amounts = parseFloat(res[1]) / 10 ** numb;
                                let path = [
                                  TEST_WBNB,
                                  this.state.tokentoAddress,
                                ];
                                let bal = new window.web3.eth.Contract(
                                  ERC20,
                                  path[0]
                                );
                                bal.methods
                                  .decimals()
                                  .call({ from: userwalletaddresss })
                                  .then((number) => {
                                    let amountIn = window.web3.utils.toBN(
                                      fromExponential(
                                        amounts * Math.pow(10, number)
                                      )
                                    );
                                    swaping.methods
                                      .getAmountsOut(amountIn, path)
                                      .call({ from: userwalletaddresss })
                                      .then(async (res) => {
                                        console.log(res);
                                        let balance =
                                          new window.web3.eth.Contract(
                                            ERC20,
                                            path[1]
                                          );
                                        balance.methods
                                          .decimals()
                                          .call({ from: userwalletaddresss })
                                          .then(async (numb) => {
                                            let amountOut =
                                              parseFloat(res[1]) / 10 ** numb;
                                            console.log(
                                              "tokenamountout",
                                              amountOut
                                            );
                                            const impactValue = await getImpact(
                                              this.state.tokenfromAddress,
                                              this.state.tokentoAddress,
                                              amount,
                                              amountOut,
                                              BSwapfactoryContractAddress
                                            );
                                            this.setState({
                                              tokenamountOut:
                                                parseFloat(amountOut).toFixed(
                                                  8
                                                ),
                                              priceImpact: impactValue,
                                            });
                                          })
                                          .catch();
                                      })
                                      .catch((err) => {});

                                    amountIn = window.web3.utils.toBN(
                                      fromExponential(
                                        "1" * Math.pow(10, number)
                                      )
                                    );
                                    swaping.methods
                                      .getAmountsOut(amountIn, path)
                                      .call({ from: userwalletaddresss })
                                      .then((res) => {
                                        console.log(res);
                                        let balance =
                                          new window.web3.eth.Contract(
                                            ERC20,
                                            path[1]
                                          );
                                        balance.methods
                                          .decimals()
                                          .call({ from: userwalletaddresss })
                                          .then((numb) => {
                                            let amount =
                                              parseFloat(res[1]) / 10 ** numb;
                                            let values =
                                              "1 " +
                                              this.state.fromtokenName1 +
                                              " = " +
                                              parseFloat(amount).toFixed(8) +
                                              " " +
                                              this.state.totokenName1;
                                            this.setState({
                                              fromConvertedValue: values,
                                            });
                                          })
                                          .catch();
                                      })
                                      .catch((err) => {});

                                    amountIn = window.web3.utils.toBN(
                                      fromExponential(
                                        "1" * Math.pow(10, number)
                                      )
                                    );
                                    swaping.methods
                                      .getAmountsOut(amountIn, [
                                        path[1],
                                        path[0],
                                      ])
                                      .call({ from: userwalletaddresss })
                                      .then((res) => {
                                        console.log(res);
                                        let balance =
                                          new window.web3.eth.Contract(
                                            ERC20,
                                            path[1]
                                          );
                                        balance.methods
                                          .decimals()
                                          .call({ from: userwalletaddresss })
                                          .then((numb) => {
                                            let amount =
                                              parseFloat(res[1]) / 10 ** numb;
                                            let values =
                                              "1 " +
                                              this.state.totokenName1 +
                                              " = " +
                                              parseFloat(amount).toFixed(8) +
                                              " " +
                                              this.state.fromtokenName1;
                                            this.setState({
                                              toConvertedvalue: values,
                                            });
                                          })
                                          .catch();
                                      })
                                      .catch((err) => {});
                                  })
                                  .catch();
                                //this.setState({tokenamountOut:amount})
                              })
                              .catch();
                          })
                          .catch((err) => {});
                      })
                      .catch();
                  } else {
                    // path = [this.state.tokenfromAddress,this.state.tokentoAddress];

                    // console.log(pairaddress, ' Pair address2 - 2')

                    // if(this.state.multiHops){
                    //     console.log('enable swap button')
                    //     this.setState({disableSwapButton : false })
                    // }else if(!this.state.multiHops){
                    //     console.log('disable swap button')
                    //     this.setState({disableSwapButton : true })
                    // }

                    let path = [
                      this.state.tokenfromAddress,
                      this.state.tokentoAddress,
                    ];
                    let userwalletaddresss = localStorage.getItem("account");
                    window.web3 = new Web3(window?.ethereum);
                    let swaping = new window.web3.eth.Contract(
                      different,
                      BSwaprouter2ContractAddress
                    );
                    if (bool) {
                      // console.log(amountIn);
                      let balance = new window.web3.eth.Contract(
                        ERC20,
                        path[1]
                      );
                      balance.methods
                        .decimals()
                        .call({ from: userwalletaddresss })
                        .then((number) => {
                          let amountIn = window.web3.utils.toBN(
                            fromExponential(amount * Math.pow(10, number))
                          );
                          swaping.methods
                            .getAmountsIn(amountIn, path)
                            .call({ from: userwalletaddresss })
                            .then((res) => {
                              let bal = new window.web3.eth.Contract(
                                ERC20,
                                path[0]
                              );
                              bal.methods
                                .decimals()
                                .call({ from: userwalletaddresss })
                                .then((numb) => {
                                  let amount = parseFloat(res[0]) / 10 ** numb;
                                  // console.log(amount,'hello',this.state.tokenamountOut,res);
                                  this.setState({
                                    tokenamountIn:
                                      parseFloat(amount).toFixed(8),
                                  });
                                })
                                .catch();
                            })
                            .catch((err) => {});
                        })
                        .catch();
                    } else {
                      let bal = new window.web3.eth.Contract(ERC20, path[0]);
                      bal.methods
                        .decimals()
                        .call({ from: userwalletaddresss })
                        .then((number) => {
                          let amountIn = window.web3.utils.toBN(
                            fromExponential(amount * Math.pow(10, number))
                          );
                          swaping.methods
                            .getAmountsOut(amountIn, path)
                            .call({ from: userwalletaddresss })
                            .then(async (res) => {
                              //// console.log(res)
                              let balance = new window.web3.eth.Contract(
                                ERC20,
                                path[1]
                              );
                              balance.methods
                                .decimals()
                                .call({ from: userwalletaddresss })
                                .then(async (numb) => {
                                  let amountOut =
                                    parseFloat(res[1]) / 10 ** numb;
                                  console.log("tokenamountout", amountOut);
                                  const impactValue = await getImpact(
                                    this.state.tokenfromAddress,
                                    this.state.tokentoAddress,
                                    amount,
                                    amountOut,
                                    BSwapfactoryContractAddress
                                  );
                                  this.setState({
                                    tokenamountOut:
                                      parseFloat(amountOut).toFixed(8),
                                    priceImpact: impactValue,
                                  });
                                })
                                .catch();
                            })
                            .catch((err) => {});
                        })
                        .catch();
                    }
                  }
                })
                .catch();
            }
          });
      }
    }
  }

  async balance(tokenaddresss, type) {
    if (window?.ethereum) {
      const accounts = await window?.ethereum.request({
        method: "eth_requestAccounts",
      });
      ///console.log(accounts);
      let userwalletaddresss = accounts[0];
      window.web3 = new Web3(window?.ethereum);
      let balance = new window.web3.eth.Contract(ERC20, tokenaddresss);
      //const balances = await web3.eth.getBalance(this.state.account)
      if (
        ![
          "0x0000000000000000000000000000000000000000",
          TEST_WETH,
          TEST_WBNB,
        ].includes(tokenaddresss)
      ) {
        balance.methods
          .balanceOf(userwalletaddresss)
          .call({ from: userwalletaddresss })
          .then((balan) => {
            // console.log(balan)
            balan = parseFloat(window.web3.utils.fromWei(balan)).toFixed(5);
            if (
              type == "from" &&
              parseFloat(balan) < parseFloat(this.state.tokenamountIn)
            ) {
              // this.setState({ balancefrom: balan })
              this.setState({ insuffientBalance: true });
            } else if (type == "to") {
              this.setState({ balanceto: balan });
            } else if (type == "liquidityfrom") {
              this.setState({ liquiditybalancefrom: balan });
            } else if (type == "lquidityto") {
              this.setState({ liquiditybalanceto: balan });
            } else {
              this.setState({ insuffientBalance: false });
            }
          })
          .catch();
      } else {
        let balan = await window.web3.eth.getBalance(userwalletaddresss);
        balan = parseFloat(window.web3.utils.fromWei(balan)).toFixed(5);
        if (
          type == "from" &&
          parseFloat(balan) < parseFloat(this.state.tokenamountIn)
        ) {
          // this.setState({ balancefrom: balan })
          this.setState({ insuffientBalance: true });
        } else if (type == "to") {
          this.setState({ balanceto: balan });
        } else if (type == "liquidityfrom") {
          this.setState({ liquiditybalancefrom: balan });
        } else if (type == "lquidityto") {
          this.setState({ liquiditybalanceto: balan });
        } else {
          this.setState({ insuffientBalance: false });
        }
      }
    }
  }
  async getTokenBalance(token, tokenaddresss, type) {
    try {
      if (window?.ethereum) {
        const accounts = await window?.ethereum.request({
          method: "eth_requestAccounts",
        });
        ///console.log(accounts);
        let userwalletaddresss = accounts[0];
        window.web3 = new Web3(window?.ethereum);
        let balance = new window.web3.eth.Contract(ERC20, tokenaddresss);
        //const balances = await web3.eth.getBalance(this.state.account)
        if (
          tokenaddresss != "0x0000000000000000000000000000000000000000" &&
          token !== "ETH" &&
          token !== "BNB"
        ) {
          balance.methods
            .balanceOf(userwalletaddresss)
            .call({ from: userwalletaddresss })
            .then((balan) => {
              // console.log(balan)
              balan = parseFloat(window.web3.utils.fromWei(balan)).toFixed(5);
              if (type == "from") {
                this.setState({ fromTokenBalance: balan });
                //this.setState({ balancefrom: balan })
              } else if (type == "to") {
                // this.setState({ balanceto: balan })
                this.setState({ toTokenBalance: balan });
              } else if (type == "liquidityfrom") {
                this.setState({ liquiditybalancefrom: balan });
              } else if (type == "lquidityto") {
                this.setState({ liquiditybalanceto: balan });
              }
            })
            .catch();
        } else {
          let balan = await window.web3.eth.getBalance(userwalletaddresss);
          console.log("balan", balan);
          balan = parseFloat(window.web3.utils.fromWei(balan)).toFixed(5);
          if (type == "from") {
            this.setState({ fromTokenBalance: balan });
            //this.setState({ balancefrom: balan })
          } else if (type == "to") {
            // this.setState({ balanceto: balan })
            this.setState({ toTokenBalance: balan });
          } else if (type == "liquidityfrom") {
            this.setState({ liquiditybalancefrom: balan });
          } else if (type == "lquidityto") {
            this.setState({ liquiditybalanceto: balan });
          } else {
            this.setState({ insuffientBalance: false });
          }
        }
      }
    } catch (e) {
      console.log(e);
      if (type == "from") {
        this.setState({ fromTokenBalance: "0" });
        //this.setState({ balancefrom: '0' })
      } else if (type == "to") {
        // this.setState({ balanceto: '0' })
        this.setState({ toTokenBalance: "0" });
      } else if (type == "liquidityfrom") {
        this.setState({ liquiditybalancefrom: "0" });
      } else if (type == "lquidityto") {
        this.setState({ liquiditybalanceto: "0" });
      }
    }
  }

  async quote(amountA, bool) {
    console.log(amountA, bool);
    if (window?.ethereum) {
      const accounts = await window?.ethereum.request({
        method: "eth_requestAccounts",
      });
      // console.log(accounts);
      let userwalletaddresss = accounts[0];
      window.web3 = new Web3(window?.ethereum);
      //  console.log(this.state.tokenAaddress,this.state.tokenBaddress)
      let factories = new window.web3.eth.Contract(
        BSwapfactoryAbi,
        BSwapfactoryContractAddress
      );
      // let factories = new window.web3.eth.Contract(BSwapfactoryAbi, PANCAKE_FACTORY);
      //  console.log(1)
      var tokenA;
      var tokenB;
      if (this.zeroIncludes(this.state.tokenAaddress)) {
        tokenA = TEST_WBNB;
        tokenB = this.state.tokenBaddress;
      } else if (this.zeroIncludes(this.state.tokenBaddress)) {
        tokenA = this.state.tokenAaddress;
        tokenB = TEST_WBNB;
      } else {
        tokenA = this.state.tokenAaddress;
        tokenB = this.state.tokenBaddress;
      }
      console.log(tokenA, tokenB);
      console.log(this.state.tokenAaddress, this.state.tokenBaddress);
      // let pair = {};
      factories.methods
        .getPair(tokenA, tokenB)
        .call({ from: userwalletaddresss })
        .then((pairaddress) => {
          console.log(pairaddress);
          // console.log(2)
          let addresss = pairaddress;
          let tokenpair = new window.web3.eth.Contract(pairAbi, addresss);
          tokenpair.methods
            .getReserves()
            .call({ from: userwalletaddresss })
            .then((amount) => {
              console.log(amount);
              tokenpair.methods
                .token0()
                .call({ from: userwalletaddresss })
                .then(async (addre) => {
                  // console.log(3)
                  // console.log(addre);
                  if (bool) {
                    if (tokenB.toLowerCase() == addre.toLowerCase()) {
                      const decimalA = await getDecimal(tokenA);
                      const decimalB = await getDecimal(tokenB);
                      amountA = amountA * 10 ** decimalA;
                      let reserveA = amount[0];
                      let reserveB = amount[1];
                      // console.log(reserveA,reserveB,amount)
                      let amountB = (amountA * reserveB) / reserveA;
                      amountB = amountB / 10 ** decimalB;
                      // console.log(amountB)
                      this.setState({ liquiditytokenamountA: amountB });
                    } else {
                      const decimalA = await getDecimal(tokenA);
                      const decimalB = await getDecimal(tokenB);
                      amountA = amountA * 10 ** decimalA;
                      let reserveB = amount[0];
                      let reserveA = amount[1];
                      //console.log(reserveA,reserveB,amount)
                      let amountB = (amountA * reserveB) / reserveA;
                      amountB = amountB / 10 ** decimalB;
                      // console.log(amountB)
                      this.setState({ liquiditytokenamountA: amountB });
                    }
                  } else {
                    if (tokenA.toLowerCase() == addre.toLowerCase()) {
                      // console.log(tokenA,addre);
                      const decimalA = await getDecimal(tokenA);
                      const decimalB = await getDecimal(tokenB);

                      amountA = amountA * 10 ** decimalA;
                      let reserveA = amount[0];
                      let reserveB = amount[1];
                      // console.log(reserveA,reserveB,amount)
                      let amountB = (amountA * reserveB) / reserveA;
                      amountB = amountB / 10 ** decimalB;
                      console.log(amountB);
                      this.setState({ liquiditytokenamountB: amountB });
                    } else {
                      const decimalA = await getDecimal(tokenA);
                      const decimalB = await getDecimal(tokenB);

                      amountA = amountA * 10 ** decimalA;
                      let reserveB = amount[0];
                      let reserveA = amount[1];
                      //console.log(reserveA,reserveB,amount)
                      let amountB = (amountA * reserveB) / reserveA;
                      amountB = amountB / 10 ** decimalB;
                      console.log(amountB);
                      this.setState({ liquiditytokenamountB: amountB });
                    }
                  }
                })
                .catch();
            })
            .catch();
        })
        .catch();
    }
  }

  handleContractChange(event) {
    console.log("amount in values", event.target.value)
    if (event.target.value.match(/^(0|[1-9]\d*)(\.\d+)?$/) != null) {
      if (!isValidNumber(event.target.value)) return;
      if (this.state.liquidityclick) {
        if (this.state.liquidityamountout) {
          this.setState({ liquiditytokenamountB: event.target.value });
          console.log(
            event.target.value,
            this.state.tokenBaddress,
            this.state.tokenAaddress
          );
          if (
            event.target.value > 0 &&
            this.state.tokenBaddress != "" &&
            this.state.tokenAaddress != ""
          ) {
            this.quote(event.target.value, true);
          } else if (
            this.state.liquiditytokenfrom == "Select Token" ||
            this.state.tot == "Select Token"
          ) {
            this.setState({
              liquiditymethod: "Add Liquidity",
              isliquidityapprove: false,
            });
          } else {
            this.setState({ liquiditytokenamountA: 0 });
            if (
              this.state.tokenAaddress !=
              "0x0000000000000000000000000000000000000000"
            ) {
              this.setState({
                liquiditymethod: "Approve " + this.state.liquiditytokenfrom,
                isliquidityapprove: false,
              });
            } else {
              this.setState({
                liquiditymethod: "Approve " + this.state.tot,
                isliquidityapprove: false,
              });
            }
          }
        } else {
          this.setState({ liquiditytokenamountA: event.target.value });
          console.log(
            event.target.value,
            this.state.tokenBaddress,
            this.state.tokenAaddress
          );
          if (
            event.target.value > 0 &&
            this.state.tokenBaddress != "" &&
            this.state.tokenAaddress != ""
          ) {
            this.quote(event.target.value, false);
          } else if (
            this.state.liquiditytokenfrom == "Select Token" ||
            this.state.tot == "Select Token"
          ) {
            this.setState({
              liquiditymethod: "Add Liquidity",
              isliquidityapprove: false,
            });
          } else {
            this.setState({ liquiditytokenamountB: 0 });
            if (
              this.state.tokenAaddress !=
              "0x0000000000000000000000000000000000000000"
            ) {
              this.setState({
                liquiditymethod: "Approve " + this.state.liquiditytokenfrom,
                isliquidityapprove: false,
              });
            } else {
              this.setState({
                liquiditymethod: "Approve " + this.state.tot,
                isliquidityapprove: false,
              });
            }
          }
        }
      } else {
        if (this.state.swapamountout) {
          this.setState({ tokenamountOut: event.target.value });
          console.log("tokenamountOut", event.target.value);
          if (
            event.target.value > 0 &&
            this.state.tokentoAddress != "" &&
            this.state.tokenfromAddress != ""
          ) {
            if (
              this.state.tokenfromAddress ==
              "0x0000000000000000000000000000000000000000"
            ) {
              this.setState({ method: "Swap" });
            } else if (this.state.tokenfromAddress != "") {
              this.setState({ method: "Approve " });
              this.setState({ isApprove: false });
            }

            this.getamountout(event.target.value, true);
            this.balance(this.state.tokenfromAddress, "from");
          } else {
            this.setState({ tokenamountIn: "" });
            if (
              this.state.tokenfromAddress ==
              "0x0000000000000000000000000000000000000000"
            ) {
              this.setState({ method: "Swap" });
            } else if (this.state.tokenfromAddress != "") {
              this.setState({ method: "Approve " });
              this.setState({ isApprove: false });
            }
          }
        } else {
          if (
            event.target.value.toString().split(".")[1] != undefined &&
            event.target.value.toString().split(".")[1].length > 6
          ) {
            this.setState({
              tokenamountIn: parseFloat(event.target.value).toFixed(6),
            });
          } else {
            this.setState({ tokenamountIn: event.target.value });
          }

          if (
            Math.abs(event.target.value) > 0 &&
            this.state.tokentoAddress != "" &&
            this.state.tokenfromAddress != ""
          ) {
            if (
              this.state.tokenfromAddress ==
              "0x0000000000000000000000000000000000000000"
            ) {
              this.setState({ method: "Swap" });
            } else if (this.state.tokenfromAddress != "") {
              this.setState({ method: "Approve " });
              this.setState({ isApprove: false });
            }

            if (
              this.state.fromChainName1 == "BSC" &&
              this.state.toChainName1 == "Ethereum"
            ) {
              this.handleBnbToEthContractChange(event.target.value);
            } else if (
              this.state.fromChainName1 == "Ethereum" &&
              this.state.toChainName1 == "BSC"
            ) {
              this.handleEthToBNBContractChange(event.target.value);
              this.balance(this.state.tokenfromAddress, "from");
            } else if (
              this.state.fromChainName1 == "Ethereum" &&
              this.state.toChainName1 == "Ethereum"
            ) {
              this.handleETHToEthContractChange(event.target.value);
            } else if (
              this.state.fromChainName1 == "BSC" &&
              this.state.toChainName1 == "BSC"
            ) {
              this.handleBscToBscContractChange(event.target.value);
              // this.getamountout(Math.abs(event.target.value), false);
              this.balance(this.state.tokenfromAddress, "from");
            }
          } else {
            this.setState({ tokenamountOut: "" });
            this.setState({ reimbursement_reward: 0 });
            this.setState({ reimbursement_inUSD: 0 });
            // if (this.state.tokenfromAddress == '0x0000000000000000000000000000000000000000') {
            if (
              this.state.fromtokenName1 == "ETH" &&
              this.state.fromtokenName1 == "BNB"
            ) {
              this.setState({ method: "Swap" });
            } else if (this.state.tokenfromAddress != "") {
              this.setState({ method: "Approve " });
              this.setState({ isApprove: false });
            }
            this.setState({ toConvertedvalue: "", fromConvertedValue: "" });
          }
        }
      }
    } else {
      // this.setState({ tokenamountIn: "", tokenamountOut: 0 });
      // event.target.value = "";
    }
  }

  async handleEthToBNBContractChange(amountIn) {
    const accounts = await window?.ethereum.request({
      method: "eth_requestAccounts",
    });
    let fromToken =
      this.state.tokenfromAddress ==
        "0x0000000000000000000000000000000000000000" ||
      this.state.tokenfromAddress ==
        "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
        ? WETH
        : this.state.tokenfromAddress;
    let toToken =
      this.state.tokentoAddress ==
        "0x0000000000000000000000000000000000000000" ||
      this.state.tokentoAddress == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
        ? WBNB
        : this.state.tokentoAddress;
    const decimal = await getDecimal(fromToken);
    let amount = amountIn; //((amountIn * Math.pow(10, decimal)).toLocaleString()).replace(/,/g, ''); // myStr.replace(/,/g, '-');
    let orderType = 2;
    let userAddress = accounts[0];

    let uniTokenToUsdt, sushiTokenToUsdt, panUsdtToToken;
    try {
      uniTokenToUsdt = await uniUsdtAmount({
        otherToken: fromToken,
        usdtSide: "to",
        amount: amount,
      });
    } catch (e) {
      uniTokenToUsdt = ["0", "0"];
    }
    try {
      sushiTokenToUsdt = await sushiUsdtAmount({
        otherToken: fromToken,
        usdtSide: "to",
        amount: amount,
      });
    } catch (e) {
      sushiTokenToUsdt = ["0", "0"];
    }
    const isUsingUni = +uniTokenToUsdt[0] > +sushiTokenToUsdt[0];
    console.log("isUsingUni=>", uniTokenToUsdt[0], sushiTokenToUsdt[0]);

    try {
      panUsdtToToken = await panUsdtAmount({
        otherToken: toToken,
        amount: isUsingUni ? uniTokenToUsdt[0] : sushiTokenToUsdt[0],
        shoudldCreateInstance: true,
      });
    } catch (e) {
      panUsdtToToken = ["0", "0"];
    }

    const maxValue = +panUsdtToToken[0];
    console.log("max_value =>", maxValue);

    //   setslippageCal((maxValue - (maxValue * slippage / 100)).toFixed(5));
    //   setMinimumValue((maxValue - (maxValue * slippage / 100)).toFixed(5));
    //   setPercentCalculate((maxValue * slippage / 100).toFixed(5));
    //   setValueQuote(+maxValue === 0 ? '0' : maxValue.toFixed(5));
    //   setInSuffLiq(+panUsdtToToken[0] === 0);
    //   setDexId(isUsingUni ? 0 : 1);
    //   setDexIdDestination(0)
    //   setIsThreePath(false);

    this.setState({ dexId: isUsingUni ? 0 : 1 });
    this.setState({ dexId_destination: 0 });
    this.setState({
      tokenamountOut: parseFloat(maxValue).toFixed(8),
      usingThreePath: uniTokenToUsdt[2] || panUsdtToToken[2],
    });

    //  let slippage = this.state.slippage;
    //  let decimalTo = await getDecimal(toToken);
    // const percentageValue = ((data.amount * slippage) / 100) / Math.pow(10, decimalTo);

    // const setValueMinExpected = (data.minExpected / Math.pow(10, decimalTo)).toFixed(8);
    //  const percentageValueExpected = ((data.minExpected * slippage) / 100) / Math.pow(10, decimalTo);

    //  const setValueMinExpected1 = (data.amount / Math.pow(10, decimalTo)).toFixed(8);
    //  const percentageValueExpected1 = ((data.amount * slippage) / 100) / Math.pow(10, decimalTo);
    //  //const minimumCalculate1 = setValueMinExpected1 - percentageValueExpected1;

    //  const minimumCalculate = setValueMinExpected - percentageValueExpected;

    this.setState({ minValue: parseFloat(maxValue).toFixed(8) });

    //const apiUrl = API_URL + 'getETHCrossChainExpectedAmount?fromToken=' + fromToken + '&toToken=' + toToken + '&amount=' + amount + '&orderType=' + orderType + '&userAddress=' + userAddress;
    // fetch(apiUrl)
    //     .then((response) => response.json())
    //     .then(async (data) => {
    //         let usd_rate = data;
    //         if (data.status == 'true') {
    //             let amount = window.web3.utils.fromWei(data['amount']);
    //             if (amount > 0) {
    //                 this.setState({ dexId: data['dexId'] });
    //                 this.setState({ dexId_destination: data['dexId_destination'] });
    //                 this.setState({ tokenamountOut: parseFloat(amount).toFixed(8) });

    //                 // //let slippage = 0.5;
    //                 // const minimumCalculate = setValueMinExpected - percentageValueExpected;
    //                 // this.setState({ minValue: parseFloat(minimumCalculate).toFixed(8) })

    //                 let slippage = this.state.slippage;
    //                 let decimalTo = await getDecimal(toToken);
    //                 const percentageValue = ((data.amount * slippage) / 100) / Math.pow(10, decimalTo);
    //                 //New changes
    //                 const setValueMinExpected = (data.minExpected / Math.pow(10, decimalTo)).toFixed(8);
    //                 const percentageValueExpected = ((data.minExpected * slippage) / 100) / Math.pow(10, decimalTo);

    //                 //New changes
    //                 const setValueMinExpected1 = (data.amount / Math.pow(10, decimalTo)).toFixed(8);
    //                 const percentageValueExpected1 = ((data.amount * slippage) / 100) / Math.pow(10, decimalTo);
    //                 const minimumCalculate1 = setValueMinExpected1 - percentageValueExpected1;
    //                 //setslippageCal(minimumCalculate1.toFixed(8));

    //                 // console.log(percentageValue,'percentageValue');
    //                 // const minimumCalculate = setValue - percentageValue;

    //                 const minimumCalculate = setValueMinExpected - percentageValueExpected;

    //                 // console.log(minimumCalculate,'minimumCalculate');
    //                 //setPercentCalculate(percentageValue.toFixed(8));
    //                 //setMinimumValue(minimumCalculate.toFixed(8));
    //                 this.setState({ minValue: parseFloat(minimumCalculate).toFixed(8) })

    //             } else {
    //                 this.setState({ tokenamountOut: 0 })
    //             }
    //         }
    //     });
    //this.unitETHToBSCCrossChainAmount();
  }

  async unitETHToBSCCrossChainAmount() {
    const accounts = await window?.ethereum.request({
      method: "eth_requestAccounts",
    });
    let fromToken =
      this.state.tokenfromAddress ==
      "0x0000000000000000000000000000000000000000"
        ? WBNB_Address
        : this.state.tokenfromAddress;
    let toToken =
      this.state.tokentoAddress == "0x0000000000000000000000000000000000000000"
        ? WBNB_Address
        : this.state.tokentoAddress;
    const decimal = await getDecimal(fromToken);
    let amount = (1 * Math.pow(10, decimal)).toLocaleString().replace(/,/g, ""); // myStr.replace(/,/g, '-');
    let orderType = 2;
    let userAddress = accounts[0];
    const apiUrl =
      API_URL +
      "getETHCrossChainExpectedAmount?fromToken=" +
      fromToken +
      "&toToken=" +
      toToken +
      "&amount=" +
      amount +
      "&orderType=" +
      orderType +
      "&userAddress=" +
      userAddress;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        let usd_rate = data;
        if (data.status == "true") {
          let amount = window.web3.utils.fromWei(data["amount"]);
          if (amount > 0) {
            let values =
              "1 " +
              this.state.fromtokenName1 +
              " = " +
              parseFloat(amount).toFixed(8) +
              " " +
              this.state.totokenName1;
            this.setState({ fromConvertedValue: values });
          }
          // else {
          //     this.setState({ tokenamountOut: 0 })
          // }
        }
      });
  }

  async handleBnbToEthContractChange(amountIn) {
    const accounts = await window?.ethereum.request({
      method: "eth_requestAccounts",
    });
    let fromToken =
      this.state.tokenfromAddress ==
        "0x0000000000000000000000000000000000000000" ||
      this.state.tokenfromAddress ==
        "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
        ? WBNB
        : this.state.tokenfromAddress;
    let toToken =
      this.state.tokentoAddress ==
        "0x0000000000000000000000000000000000000000" ||
      this.state.tokentoAddress == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
        ? WETH
        : this.state.tokentoAddress;
    const decimal = await getDecimal(fromToken);
    let amount = amountIn; //((amountIn * Math.pow(10, decimal)).toLocaleString()).replace(/,/g, ''); // myStr.replace(/,/g, '-');
    let orderType = 2;
    let userAddress = accounts[0];

    let panTokenToUsdt, sushiUsdtToToken, uniUsdtToToken;

    try {
      panTokenToUsdt = await panUsdtAmount({
        otherToken: fromToken,
        amount: amount,
        usdtSide: "to",
      });
    } catch (e) {
      panTokenToUsdt = ["0", "0"];
    }

    try {
      uniUsdtToToken = await uniUsdtAmount({
        otherToken: toToken,
        amount: panTokenToUsdt[0],
        multipliedAmount: panTokenToUsdt[1],
        shoudldCreateInstance: true,
      });
    } catch (e) {
      uniUsdtToToken = ["0", "0"];
    }
    try {
      sushiUsdtToToken = await sushiUsdtAmount({
        otherToken: toToken,
        amount: panTokenToUsdt[0],
        shoudldCreateInstance: true,
        multipliedAmount: panTokenToUsdt[1],
      });
    } catch (e) {
      sushiUsdtToToken = ["0", "0"];
    }

    const maxValue = Math.max(+sushiUsdtToToken[0], +uniUsdtToToken[0]);

    const isUsingUni = +uniUsdtToToken[0] > +sushiUsdtToToken[0];

    this.setState({ dexId: 0 });
    this.setState({ dexId_destination: isUsingUni ? 0 : 1 });
    this.setState({ tokenamountOut: parseFloat(maxValue).toFixed(8) });

    this.setState({
      minValue: parseFloat(maxValue).toFixed(8),
      usingThreePath: panTokenToUsdt[2] || uniUsdtToToken[2],
    });

    // setMinimumValue((maxValue - (maxValue * slippage / 100)).toFixed(5));
    // setslippageCal((maxValue - (maxValue * slippage / 100)).toFixed(5));
    // setPercentCalculate((maxValue * slippage / 100).toFixed(5));
    // setValueQuote(+maxValue === 0 ? '0' : maxValue.toFixed(5));
    // setIsThreePath(false);
    // setInSuffLiq(+uniUsdtToToken[0] === 0 && +sushiUsdtToToken[0] === 0);
    // setDexId(0);
    // setDexIdDestination(isUsingUni ? 0 : 1);

    // const apiUrl = API_URL + 'getBSCCrossChainExpectedAmount?fromToken=' + fromToken + '&toToken=' + toToken + '&amount=' + amount + '&orderType=' + orderType + '&userAddress=' + userAddress;
    // fetch(apiUrl)
    //     .then((response) => response.json())
    //     .then(async (data) => {
    //         let usd_rate = data;
    //         if (data.status == 'true') {
    //             let amount = window.web3.utils.fromWei(data['amount']);
    //             if (amount > 0) {
    //                 this.setState({ dexId: data['dexId'] });
    //                 this.setState({ dexId_destination: data['dexId_destination'] });
    //                 this.setState({ tokenamountOut: parseFloat(amount).toFixed(8) })

    //                 // //let slippage = 0.5;
    //                 // const minimumCalculate = setValueMinExpected - percentageValueExpected;
    //                 // this.setState({ minValue: parseFloat(minimumCalculate).toFixed(8) })

    //                 let slippage = this.state.slippage;
    //                 let decimalTo = await getDecimal(toToken);
    //                 const percentageValue = ((data.amount * slippage) / 100) / Math.pow(10, decimalTo);
    //                 //New changes
    //                 const setValueMinExpected = (data.minExpected / Math.pow(10, decimalTo)).toFixed(8);
    //                 const percentageValueExpected = ((data.minExpected * slippage) / 100) / Math.pow(10, decimalTo);

    //                 //New changes
    //                 const setValueMinExpected1 = (data.amount / Math.pow(10, decimalTo)).toFixed(8);
    //                 const percentageValueExpected1 = ((data.amount * slippage) / 100) / Math.pow(10, decimalTo);
    //                 const minimumCalculate1 = setValueMinExpected1 - percentageValueExpected1;
    //                 //setslippageCal(minimumCalculate1.toFixed(8));

    //                 // console.log(percentageValue,'percentageValue');
    //                 // const minimumCalculate = setValue - percentageValue;

    //                 const minimumCalculate = setValueMinExpected - percentageValueExpected;

    //                 // console.log(minimumCalculate,'minimumCalculate');
    //                 //setPercentCalculate(percentageValue.toFixed(8));
    //                 //setMinimumValue(minimumCalculate.toFixed(8));
    //                 this.setState({ minValue: parseFloat(minimumCalculate).toFixed(8) })

    //             } else {
    //                 this.setState({ tokenamountOut: 0 })
    //             }
    //         }
    //     });
    // this.unitBSCToETHCrossChainAmount();
  }

  async unitBSCToETHCrossChainAmount() {
    const accounts = await window?.ethereum.request({
      method: "eth_requestAccounts",
    });
    let fromToken =
      this.state.tokenfromAddress ==
      "0x0000000000000000000000000000000000000000"
        ? WBNB_Address
        : this.state.tokenfromAddress;
    let toToken =
      this.state.tokentoAddress == "0x0000000000000000000000000000000000000000"
        ? WBNB_Address
        : this.state.tokentoAddress;
    const decimal = await getDecimal(fromToken);
    let amount = (1 * Math.pow(10, decimal)).toLocaleString().replace(/,/g, ""); // myStr.replace(/,/g, '-');
    let orderType = 2;
    let userAddress = accounts[0];
    const apiUrl =
      API_URL +
      "getBSCCrossChainExpectedAmount?fromToken=" +
      fromToken +
      "&toToken=" +
      toToken +
      "&amount=" +
      amount +
      "&orderType=" +
      orderType +
      "&userAddress=" +
      userAddress;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        let usd_rate = data;
        if (data.status == "true") {
          let amount = window.web3.utils.fromWei(data["amount"]);
          if (amount > 0) {
            let values =
              "1 " +
              this.state.fromtokenName1 +
              " = " +
              parseFloat(amount).toFixed(8) +
              " " +
              this.state.totokenName1;
            this.setState({ fromConvertedValue: values });
          }
          // else {
          //     this.setState({ tokenamountOut: 0 })
          // }
        }
      });

    // const apiUrl1 = API_URL + 'getBSCCrossChainExpectedAmount?fromToken=' + toToken + '&toToken=' + fromToken + '&amount=' + amount + '&orderType=' + orderType + '&userAddress=' + userAddress;
    // fetch(apiUrl1)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         let usd_rate = data;
    //         if (data.status == 'true') {
    //             let amount = window.web3.utils.fromWei(data['amount']);
    //             if (amount > 0) {
    //                 let values = '1 ' + this.state.totokenName1 + ' = ' + parseFloat(amount).toFixed(8) + ' ' + this.state.fromtokenName1;
    //                 this.setState({ toConvertedvalue: values });
    //             }
    //             // else {
    //             //     this.setState({ tokenamountOut: 0 })
    //             // }
    //         }
    //     });
  }

  async handleBscToBscContractChange(amountIn) {
    let fromToken =
      this.state.tokenfromAddress ==
        "0x0000000000000000000000000000000000000000" ||
      this.state.tokenfromAddress ==
        "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
        ? WBNB
        : this.state.tokenfromAddress;
    let toToken =
      this.state.tokentoAddress ==
        "0x0000000000000000000000000000000000000000" ||
      this.state.tokentoAddress == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
        ? WBNB
        : this.state.tokentoAddress;
    let amount = amountIn;

    let amtPan;
    try {
      if (this.state.readOnlyMode)
        amtPan = await getValueForTesting({ amount, fromToken, toToken });
      else
        amtPan = await getAmountOut({
          fromToken,
          toToken,
          amount,
          router: BSwaprouter2ContractAddress,
          factoryContract: BSwapfactoryContractAddress,
          isBsc: true,
        });
    } catch (e) {
      console.log("error aagya");
      amtPan = ["0", "0"];
    }

    const maxValue = amtPan[0];
    this.setState({
      tokenamountOut: parseFloat(maxValue).toFixed(8),
      usingThreePath: amtPan[2],
    });

    let impactValue;
    if (!this.state.readOnlyMode)
      impactValue = await getImpact(
        fromToken,
        toToken,
        amount,
        maxValue,
        BSwapfactoryContractAddress
      );
    else
      impactValue = await getImpactForTesting(
        fromToken,
        toToken,
        amount,
        maxValue,
        BSwapfactoryContractAddress
      );
    const ff = await getFluctuationFees(fromToken, toToken, amountIn || 0);
    const ft = await getFluctuationFees(
      toToken,
      fromToken,
      maxValue || 0,
      true
    );
    this.setState({ fluctFees: { from: ft, to: ff } });

    this.setState({ dexId: 0, priceImpact: impactValue });
    //this.setState({ dexId_destination: isUsingUni ? 0 : 1 });

    this.setState({ minValue: parseFloat(maxValue).toFixed(8) });
  }

  async handleETHToEthContractChange(amountIn) {
    const accounts = await window?.ethereum.request({
      method: "eth_requestAccounts",
    });
    let fromToken =
      this.state.tokenfromAddress ==
        "0x0000000000000000000000000000000000000000" ||
      this.state.tokenfromAddress ==
        "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
        ? WETH
        : this.state.tokenfromAddress;
    let toToken =
      this.state.tokentoAddress ==
        "0x0000000000000000000000000000000000000000" ||
      this.state.tokentoAddress == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
        ? WETH
        : this.state.tokentoAddress;
    const decimal = await getDecimal(fromToken);
    let amount = amountIn; //((amountIn * Math.pow(10, decimal)).toLocaleString()).replace(/,/g, ''); // myStr.replace(/,/g, '-');

    let amtUni, amtSushi;
    try {
      amtUni = await getAmountOutUni({
        fromToken: fromToken,
        toToken: toToken,
        amount: amount,
      });
    } catch (e) {
      amtUni = ["0", "0"];
    }
    try {
      amtSushi = await getAmountOutSushi({
        fromToken: fromToken,
        toToken: toToken,
        amount: amount,
      });
    } catch (e) {
      amtSushi = ["0", "0"];
    }
    const maxValue = Math.max(+amtSushi[0], +amtUni[0]);
    console.log("data=>", amtSushi, amtUni);
    const impactValue = await getImpact(
      fromToken,
      toToken,
      amount,
      maxValue,
      maxValue === amtUni[0] ? UNISWAP_FACTORY : SUSHISWAP_FACTORY
    );
    //   const impact = await getImpact(fromToken, toToken, inputValue, maxValue, maxValue === +amtUni[0] ? UNISWAP_FACTORY : SUSHISWAP_FACTORY);
    //   console.log(impact,'impact value');
    //   setPriceImpact(impact.toFixed(4));
    //   setMinimumValue((maxValue - (maxValue * slippage / 100)).toFixed(5));
    //   setslippageCal((maxValue - (maxValue * slippage / 100)).toFixed(5));
    //   setPercentCalculate((maxValue * slippage / 100).toFixed(5));
    //   setValueQuote(+maxValue === 0 ? '0' : maxValue.toFixed(5));
    //   setIsThreePath(amtUni[2]);
    //   setInSuffLiq(+amtUni[0] === 0 && +amtSushi[0] === 0);
    //   setDexId(maxValue === +amtUni[0] ? 0 : 1);

    this.setState({
      dexId: maxValue === +amtUni[0] ? 0 : 1,
      priceImpact: impactValue,
    });
    //this.setState({ dexId_destination: isUsingUni ? 0 : 1 });
    this.setState({
      tokenamountOut: parseFloat(maxValue).toFixed(8),
      usingThreePath: amtUni[2],
    });

    this.setState({ minValue: parseFloat(maxValue).toFixed(8) });

    // setMinimumValue((maxValue - (maxValue * slippage / 100)).toFixed(5));
    // setslippageCal((maxValue - (maxValue * slippage / 100)).toFixed(5));
    // setPercentCalculate((maxValue * slippage / 100).toFixed(5));
    // setValueQuote(+maxValue === 0 ? '0' : maxValue.toFixed(5));
    // setIsThreePath(false);
    // setInSuffLiq(+uniUsdtToToken[0] === 0 && +sushiUsdtToToken[0] === 0);
    // setDexId(0);
    // setDexIdDestination(isUsingUni ? 0 : 1);

    // const apiUrl = API_URL + 'getBSCCrossChainExpectedAmount?fromToken=' + fromToken + '&toToken=' + toToken + '&amount=' + amount + '&orderType=' + orderType + '&userAddress=' + userAddress;
    // fetch(apiUrl)
    //     .then((response) => response.json())
    //     .then(async (data) => {
    //         let usd_rate = data;
    //         if (data.status == 'true') {
    //             let amount = window.web3.utils.fromWei(data['amount']);
    //             if (amount > 0) {
    //                 this.setState({ dexId: data['dexId'] });
    //                 this.setState({ dexId_destination: data['dexId_destination'] });
    //                 this.setState({ tokenamountOut: parseFloat(amount).toFixed(8) })

    //                 // //let slippage = 0.5;
    //                 // const minimumCalculate = setValueMinExpected - percentageValueExpected;
    //                 // this.setState({ minValue: parseFloat(minimumCalculate).toFixed(8) })

    //                 let slippage = this.state.slippage;
    //                 let decimalTo = await getDecimal(toToken);
    //                 const percentageValue = ((data.amount * slippage) / 100) / Math.pow(10, decimalTo);
    //                 //New changes
    //                 const setValueMinExpected = (data.minExpected / Math.pow(10, decimalTo)).toFixed(8);
    //                 const percentageValueExpected = ((data.minExpected * slippage) / 100) / Math.pow(10, decimalTo);

    //                 //New changes
    //                 const setValueMinExpected1 = (data.amount / Math.pow(10, decimalTo)).toFixed(8);
    //                 const percentageValueExpected1 = ((data.amount * slippage) / 100) / Math.pow(10, decimalTo);
    //                 const minimumCalculate1 = setValueMinExpected1 - percentageValueExpected1;
    //                 //setslippageCal(minimumCalculate1.toFixed(8));

    //                 // console.log(percentageValue,'percentageValue');
    //                 // const minimumCalculate = setValue - percentageValue;

    //                 const minimumCalculate = setValueMinExpected - percentageValueExpected;

    //                 // console.log(minimumCalculate,'minimumCalculate');
    //                 //setPercentCalculate(percentageValue.toFixed(8));
    //                 //setMinimumValue(minimumCalculate.toFixed(8));
    //                 this.setState({ minValue: parseFloat(minimumCalculate).toFixed(8) })

    //             } else {
    //                 this.setState({ tokenamountOut: 0 })
    //             }
    //         }
    //     });
    // this.unitBSCToETHCrossChainAmount();
  }
}

// Common Style Div

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const SSswapMBX = styled(FlexDiv)`
  width: 100%;
  max-width: 1080px;
  margin: 170px auto 80px auto;
  align-items: flex-start;

  &.topmFix01 {
    margin-top: 70px;
    margin-bottom: 40px;
  }

  ${Media.xs} {
    &.topmFix01 {
      margin-top: 10px;
      margin-bottom: 20px;
    }
  }
`;

const SSNTitle01 = styled(FlexDiv)`
  width: 100%;
  font: 300 32px/40px "Press Start 2P", arial;
  color: #fff;
  span {
    font: 300 18px/32px "IBM Plex Mono", monospace;
    display: block;
    color: #8e9195;
    width: 100%;
    text-align: center;
    padding-top: 10px;
    ${Media.sm} {
      font-size: 16px;
      line-height: 26px;
    }
  }
  ${Media.sm} {
    font-size: 21px;
  }
`;

const MainTitle = styled.div`
  font-size: 42px;
  color: ${(props) => props.theme.colorWhite};
  font-family: "Kanit", sans-serif;
  text-align: center;
  margin: 0px 15px 30px;
  padding-top: 30px;
  line-height: 18px;
  font-weight: 700;
  ${Media.xs} {
    font-size: 30px;
    margin-bottom: 20px;
  }
`;

const DMCList = styled(FlexDiv)`
  justify-content: space-between;
  p {
    font-size: 14px;
    line-height: 24px;
    margin: 0px;
    color: ${(props) => props.theme.colorWhite};
    &.text-right {
      text-align: right;
    }
    &.ml-10 {
      margin-left: 10px;
    }
  }
  &.align-items-start {
    align-items: flex-start;
  }
  &.mb-10 {
    margin-bottom: 10px;
  }
  &.mb-30 {
    margin-bottom: 30px;
  }
  &.ver2 {
    p {
      font-size: 18px;
      font-weight: bold;
    }
  }
`;

const PlusBox = styled(FlexDiv)`
  height: 50px;
  color: ${(props) => props.theme.colorPlus};
  font-size: 30px;
  font-weight: bold;
  &.ver2 {
    justify-content: flex-start;
    height: 45px;
  }
`;

const MainDesc = styled.div`
  font-size: 18px;
  line-height: 42px;
  color: ${(props) => props.theme.colorLightGrey};
  text-align: center;
  margin: 0px 15px 40px;
  font-family: "Montserrat", sans-serif;
  ${Media.xs} {
    margin-bottom: 40px;
  }
`;

const BoxesOuter = styled(FlexDiv)`
  justify-content: space-between;
  align-items: stretch;
  &.ver2 {
    margin-bottom: 0px;
    align-items: flex-start;
  }
`;

const Box1 = styled.div`
  width: 32.4%;
  position: relative;
  padding: 35px 23px;
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.bodybg02};
  background-color: ${(props) => props.theme.bodybg03};
  :after {
    content: "";
    position: absolute;
    right: -12px;
    top: 0px;
    width: 1px;
    height: 100%;
    background-color: ${(props) => props.theme.bodybg04};
    border-radius: 10px;
    ${Media.md2} {
      width: 100%;
      height: 1px;
      right: 0px;
      top: auto;
      bottom: -12px;
    }
  }
  &.ver2 {
    background: none;
    border: none;
    padding: 0px;
    :after {
      display: none;
    }
  }
  &.desktop-div {
    ${Media.md2} {
      display: none;
    }
  }
  &.mobile-div {
    display: none;
    ${Media.md2} {
      display: block;
    }
  }
  ${Media.lg} {
    width: 32%;
  }
  ${Media.md2} {
    width: 100%;
    margin-bottom: 20px;
  }
  ${Media.xs} {
    padding: 10px;
  }
`;

const Box2 = styled.div`
  width: 40.8%;
  position: relative;
  padding: 35px 23px;
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.bodybg02};
  background-color: ${(props) => props.theme.bodybg03};
  :after {
    content: "";
    position: absolute;
    right: -12px;
    top: 0px;
    width: 1px;
    height: 100%;
    background-color: ${(props) => props.theme.bodybg04};
    border-radius: 10px;
    ${Media.md2} {
      width: 100%;
      height: 1px;
      right: 0px;
      top: auto;
      bottom: -12px;
    }
  }
  &.ver2 {
    background: none;
    border: none;
    padding: 0px;
    :after {
      display: none;
    }
  }
  &.desktop-div {
    ${Media.md2} {
      display: none;
    }
  }
  &.mobile-div {
    display: none;
    ${Media.md2} {
      display: block;
    }
  }
  ${Media.md2} {
    width: 100%;
    margin-bottom: 20px;
  }
  ${Media.xs} {
    padding: 10px;
  }
`;

const Box3 = styled.div`
  width: 24%;
  position: relative;
  padding: 35px 23px;
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.bodybg02};
  background-color: ${(props) => props.theme.bodybg03};
  &.active {
    border: 2px solid ${(props) => props.theme.colorGreen};
    box-shadow: 0px 0px 10px 1px ${(props) => props.theme.colorGreen};
  }
  &.ver2 {
    background: none;
    border: none;
    padding: 0px;
  }
  &.orngBR {
    border-color: #8be05a;
    -webkit-box-shadow: rgb(139 224 90) 0px 0px 10px 1px;
    box-shadow: rgb(139 224 90) 0px 0px 10px 1px;
    padding: 30px 23px 10px !important;
  }
  ${Media.md2} {
    width: 100%;
  }
  ${Media.xs} {
    padding: 10px;
  }
`;

const BoxRow = styled.div`
  padding: 20px 0px;
  position: relative;
  :first-child {
    padding-top: 0px;
  }
  :last-child {
    padding-bottom: 0px;
    :after {
      display: none;
    }
  }
  :after {
    content: "";
    height: 2px;
    width: 100%;
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0;
    background: linear-gradient(
      ${(props) => props.theme.bodybg02} 50%,
      ${(props) => props.theme.bodybg05} 50%
    );
  }
`;

const Box3Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.colorWhite};
  margin-bottom: 7px;
  width: 100%;
  svg {
    font-size: 12px;
    position: relative;
    top: -6px;
  }
  &.mb-15 {
    margin-bottom: 15px;
  }
  &.mb-20 {
    margin-bottom: 20px;
  }
  &.mb-30 {
    margin-bottom: 30px;
  }
`;

const Box3Desc = styled.div`
  font-size: 12px;
  line-height: 21px;
  color: ${(props) => props.theme.colorLightGrey};
`;

const OuterLink = styled.div`
  position: absolute;
  top: 10px;
  right: 7px;
  a {
    color: ${(props) => props.theme.colorLightGrey};
  }
`;

const Box1TopPart = styled(FlexDiv)`
  justify-content: flex-start;
  margin-bottom: 10px;
  .img-outer {
    width: 21px;
    height: 21px;
    padding: 2px;
    border-radius: 50%;
    overflow: hidden;
    background-color: ${(props) => props.theme.colorWhite};
    margin-right: 1px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    &.ver2 {
      width: 27px;
      height: 27px;
    }
  }
  &.mb-0 {
    margin-bottom: 0px;
  }
`;

const Box1Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => props.theme.colorWhite};
  margin: 0px 10px 0px 15px;
  line-height: normal;
  text-transform: uppercase;
`;

const Box1MiddlePart = styled(FlexDiv)`
  justify-content: space-between;
  margin-bottom: 15px;
`;

const BMRight = styled(FlexDiv)`
  justify-content: flex-start;
`;

const GraphTypeSelect = styled.select`
  background: transparent;
  color: white;
  border: 0px;
  padding-right: 10px;
`;

const GraphTypeOption = styled.option`
  background: #16191e;
  border: 0px;
`;

const ExtraLinks = styled(FlexDiv)`
  margin-top: 15px;
  a {
    font-size: 12px;
    color: ${(props) => props.theme.colorGrey};
    :hover,
    &.active {
      color: ${(props) => props.theme.colorGreen};
    }
  }
  span {
    width: 2px;
    height: 10px;
    background-color: ${(props) => props.theme.colorGrey};
    margin: 0px 10px;
  }
  svg {
    font-size: 10px;
    position: relative;
    top: -6px;
    right: 5px;
  }
`;

const ExtraInfo = styled.div`
  font-size: 12px;
  line-height: 24px;
  color: ${(props) => props.theme.colorGrey};
`;

const ButtonList = styled(FlexDiv)`
  justify-content: space-between;
  button {
    width: calc(50% - 3px);
    color: ${(props) => props.theme.colorWhite};
    background-color: ${(props) => props.theme.colorDarkGrey};
    font-size: 14px;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    padding: 14px;
    :hover {
      background-color: ${(props) => props.theme.placeHolderColor};
    }
    &.green-btn {
      background-color: ${(props) => props.theme.colorGreen};
      :hover {
        background-color: ${(props) => props.theme.colorGreenHover};
      }
    }
    &.red-btn {
      background-color: ${(props) => props.theme.colorRed};
      :hover {
        background-color: ${(props) => props.theme.colorRedHover};
      }
    }
  }
  &.ver2 {
    button {
      width: calc(50% - 13px);
    }
  }
  &.ver3 {
    button {
      width: calc(50% - 11px);
    }
  }
`;

const GreenBtn = styled.button`
  font-size: 21px;
  font-family: "Kanit";
  color: ${(props) => props.theme.colorWhite};
  width: 100%;
  padding: 12px 0px;
  background-color: ${(props) => props.theme.colorGreen};
  border: none;
  border-radius: 10px;
  margin-top: 40px;
  :hover {
    background-color: ${(props) => props.theme.colorGreenHover};
  }
  &.mt-0 {
    margin-top: 0px;
  }
  &.mb-35 {
    margin-bottom: 35px;
  }
`;

const CustomTabs = styled.div`
 .react-tabs__tab-list{margin:0px; padding:0px; list-style-type:none; display:flex; align-items:center;
    li{{margin:0px 15px; cursor:pointer; position:relative; font-size:16px; font-weight:bold; color:${(
      props
    ) => props.theme.colorWhite};
      :first-child{margin-left:0px;}
      :last-child{
        :after{display:none;}
      }
      :after{content:''; height:100%; width:1px; background-color:${(props) =>
        props.theme.grayBorder2}; position:absolute; top:0; right:-15px;}
      &.react-tabs__tab--selected{color:${(props) => props.theme.colorGreen};}
    }
  }
`;

const CustomTabs2 = styled.div`
  .react-tabs__tab-list{margin:15px 0px 0px; padding:0px; list-style-type:none; display:flex; align-items:center;
    li{{padding:15px 0px; text-align:center; margin:0px; width:50%; border-bottom:3px solid ${(
      props
    ) =>
      props.theme
        .greyBorder}; cursor:pointer; position:relative; font-size:12px; font-weight:bold; color:${(
  props
) => props.theme.colorWhite};
      :after{display:none;}
      &.react-tabs__tab--selected{color:${(props) =>
        props.theme.colorGreen}; border-bottom:3px solid ${(props) =>
  props.theme.colorGreen};}
    }
  }
`;

const DoubleHR = styled.div`
  height: 2px;
  width: 100%;
  background: linear-gradient(
    ${(props) => props.theme.bodybg010} 50%,
    ${(props) => props.theme.colorGrey4} 50%
  );
  margin: 21px 0px;
`;

const CText = styled.div`
  font-size: 14px;
  line-height: 24px;
  color: ${(props) => props.theme.colorWhite};
  margin: 30px 0px 70px;
  &.mb-10 {
    margin-bottom: 10px;
  }
  &.mt-0 {
    margin-top: 0px;
  }
`;

const TimeVote = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.colorWhite};
  margin-bottom: 15px;
`;

const TimerList = styled(FlexDiv)`
  justify-content: flex-start;
  margin-bottom: 30px;
  color: white;
`;

const TimeBox = styled(FlexDiv)`
  width: 20px;
  height: 26px;
  border-radius: 3px;
  border: 1px solid ${(props) => props.theme.grayBorder3};
  background-color: ${(props) => props.theme.bodybg03};
  margin-right: 3px;
  font-size: 14.4px;
  font-weight: bold;
  &.colun {
    border: none;
    width: 6px;
  }
`;

const CDate = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.colorGrey3};
`;

const AddNewVote = styled.div`
  padding: 30px 0px 0px;
  input,
  textarea {
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
    min-height: 46px;
    padding: 10px 15px;
    font-size: 14px;
    color: ${(props) => props.theme.colorWhite};
    background-color: ${(props) => props.theme.bodybg03};
    border: 2px solid ${(props) => props.theme.greyBorder};
    margin-bottom: 20px;
    ::placeholder {
      color: ${(props) => props.theme.colorLightGrey};
    }
  }
  textarea {
    min-height: 105px;
    resize: none;
    margin-bottom: 30px;
  }
`;

const SelectOuter = styled.div`
  position: relative;
  z-index: 0;
  margin-bottom: 20px;
  select {
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
    min-height: 46px;
    padding: 0px 15px;
    font-size: 14px;
    color: ${(props) => props.theme.colorWhite};
    -webkit-appearance: none;
    background-color: transparent;
    border: 2px solid ${(props) => props.theme.greyBorder};
    option {
      background-color: ${(props) => props.theme.bodybg03};
    }
  }
  svg {
    color: ${(props) => props.theme.colorWhite};
    position: absolute;
    right: 15px;
    top: calc(50% - 7px);
    z-index: -1;
  }
`;

const BMTitle = styled.div`
  font-size: 16px;
  font-family: "Press Start 2P", cursive;
  color: ${(props) => props.theme.colorWhite};
`;

const BMRText = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => props.theme.colorWhite};
  margin-right: 15px;
`;

const Box1BottomPart = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.colorLightGrey};
  margin-bottom: 30px;
  span {
    color: ${(props) => props.theme.colorGreen2};
  }
`;

const SSswapSBX01 = styled(FlexDiv)`
  width: 65%;
  padding: 0 15px;
  justify-content: flex-start;
  .widthmenu {
    width: 100%;
  }
  &.borRight {
    border-right: 1px solid #16191e;
  }

  ${Media.md} {
    width: 100%;
    padding-bottom: 13px;
    margin-bottom: 30px;
    &.borRight {
      border-right: none;
      border-bottom: 1px solid #16191e;
    }
  }
`;
const SSswapSBX02 = styled(FlexDiv)`
  width: 35%;
  padding: 0 15px;
  justify-content: flex-start;
  ${Media.md} {
    width: 100%;
  }
`;
const SSBlackBX = styled(FlexDiv)`
  background-color: #16191e;
  border: 2px solid #000;
  padding: 26px;
  border-radius: 10px;
  width: 100%;
  flex-direction: column;

  &.greenBor {
    border-color: #8be05a;
    -webkit-box-shadow: 0 0 20px 1px rgba(139, 124, 90, 0.4);
    box-shadow: 0 0 20px 1px rgba(139, 124, 90, 0.4);
  }

  ${Media.xs} {
    padding: 10px;
  }
`;
const SSInputMBX = styled(FlexDiv)`
  border: 2px solid #545861;
  border-radius: 10px;
  width: 100%;
  flex-direction: row;
  min-height: 60px;
  justify-content: flex-start;
`;
const InfoText = styled.div`
  font-size: 11px;
  color: ${(props) => props.theme.colorLightGrey};
  margin-top: 9px;
  span {
    &.red {
      color: ${(props) => props.theme.colorRed};
    }
    &.green {
      color: ${(props) => props.theme.colorGreen2};
    }
  }
`;
const SSInputSBX01 = styled(FlexDiv)`
  width: 40%;
  input {
    width: 100%;
    background-color: transparent;
    font-size: 26px;
    font-weight: 700;
    color: #fff;
    padding: 10px 15px;
    outline: none;
    border: none;
  }
  ${Media.sm} {
    width: 100%;
  }
`;
const SSInputSBX02 = styled(FlexDiv)`
  width: 60%;
  justify-content: flex-end;
  flex-wrap: nowrap;
  ${Media.sm} {
    width: 100%;
    justify-content: space-between;
    padding-bottom: 10px;
    flex-direction: row;
  }
  ${Media.xs} {
    flex-direction: row;
    flex-wrap: nowrap;
  }
`;
const SSBTN01 = styled.button`
  display: inline-flex;
  font-size: 14px;
  color: #fff;
  margin-left: 12px;
  align-items: center;
  justify-content: flex-end;
  width: 150px;
  &:last-child {
    // margin-right: 10px;
  }
  & img {
    margin-right: 8px;
  }
  & .fas {
    margin-left: auto;
  }
  &.v2 {
    font-weight: 700;
  }

  &.v2.marFix003 {
    margin-left: 68px;
  }
  & img.imgStyle {
    height: 25px;
  }
  &.OrangeBTN {
    background-color: #8be05a;
    font-size: 16px;
    color: #fff;
    font-weight: 500;
    padding: 3px 8px;
    border-radius: 6px;
    white-space: nowrap;
  }

  ${Media.sm} {
    margin-left: 6px;
  }
  ${Media.xs} {
    margin-left: 0;
    display: flex;
    max-width: 50%;
    &.v2 {
      margin-right: 6px;
    }
  }
`;
const SSTitle01 = styled(FlexDiv)`
  width: 100%;
  justify-content: space-between;
  font-size: 11px;
  color: #8e9195;
  margin: 10px 0 10px 0;
  .redC {
    color: #c32b2d;
  }
  .greenC {
    color: #8db610;
  }
  p {
    margin: 0 0 6px 0;
  }

  &.marginFixTop {
    margin-bottom: -10px;
  }
  &.marginFix {
    margin-bottom: 42px;
  }
  &.marginFix2 {
    margin-bottom: 42px;
    color: #ababab;
    font-size: 12px;
    & a {
      font-size: 12px;
      cursor: pointer;
    }
    .first-div {
      display: inline-block;
      .helpIco {
        ${Media.sm} {
          position: relative;
          right: 0px;
          top: -9px;
        }
      }
    }
  }
  & a {
    color: #8e9195;
    margin: 0 4px;
    :hover {
      text-decoration: underline;
      color: #8be05a;
    }
  }
  & a.maxBotton {
    color: #8be05a;
    margin: 0 10px;
    :hover {
      color: #fe9500;
      cursor: pointer;
    }
  }
  .helpIco {
    position: relative;
    right: 0px;
    top: -9px;
  }
  ${Media.md} {
    display: inline-block;
  }
  ${Media.sm} {
    flex-direction: column;
    position: relative;
    line-height: 24px;
    .helpIco {
      position: absolute;
      top: 0px;
      right: 22%;
    }
  }
  ${Media.sm} {
    .helpIco {
      right: 4%;
    }
  }
`;
const SSTitle02 = styled(FlexDiv)`
  font: 300 16px/32px "Press Start 2P", arial;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 36px;
`;
const SSTitle03 = styled(FlexDiv)`
  font-size: 16px;
  font-weight: 700;
  //   margin-bottom: 22px;
  color: #fff;
  justify-content: flex-start;
  //   border-bottom: 1px solid #000;
  span {
    display: block;
    width: 100%;
    font-size: 12px;
    color: #8e9195;
    font-weight: 400;
    margin: 14px 0;
    line-height: 18px;
  }
  &:nth-last-child(01) {
    margin-bottom: 0;
    border-bottom: 0;
    span {
      margin-bottom: 0;
    }
  }
  & .fas {
    font-size: 12px;
  }
  ${Media.md} {
    width: 100%;
  }
`;

const SSBTNBar01 = styled(FlexDiv)`
  width: 100%;
  height: 1px;
  background-color: #282b31;
  margin: 40px 0;
  position: relative;
  hr {
    background: linear-gradient(
      ${(props) => props.theme.bodybg02} 50%,
      ${(props) => props.theme.bodybg05} 50%
    );
    height: 2px;
    margin-top: 0px;
    width: 100%;
    border: none;
  }
  button.arrowBTN01 {
    width: 48px;
    height: 34px;
    background-image: url(${SSIcon05});
    left: 80%;
    transform: translateX(-50%);
    top: -18px;
    position: absolute;
    background-position: 50% 50%;
    background-color: #16191e;
    background-repeat: no-repeat;
    :hover {
      opacity: 0.8;
    }
  }

  button.arrowBTN02 {
    left: 60%;
    filter: grayscale(100%);
    cursor: not-allowed;
  }
`;
const SSIconMBX01 = styled(FlexDiv)`
  width: 100%;
  position: relative;
  min-height: 42px;
  margin-top: 35px;
`;
const AeroBX = styled(FlexDiv)`
  width: 100%;
  color: #565a69;
  font-size: 15px;
  padding-bottom: 8px;
`;
const TokenLogoCenterBox = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  top: 30px;
  justify-content: center;
  padding: 6px;
  img {
    margin: 0px 20px 0px 20px;
  }
`;
const HeadCenterbox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1186px;
  position: relative;
  top: 19px;
  padding: 6px;
  span {
    font-size: 14px;
    font-weight: 700;
    color: #8e9195;
    margin-right: 26px;
    ${Media.md} {
      display: block;
      margin-right: 0px;
      margin-bottom: 20px;
      text-align: center;
    }
  }
  .support-list {
    display: flex;
    flex-wrap: wrap;
    a {
      display: flex;
      width: 34px;
      height: 34px;
      background-color: #16191e;
      border-radius: 25px;
      align-items: center;
      justify-content: center;
      padding: 4px;
      margin: 4px 9px;
      :hover {
        background-color: #000;
      }
      img {
        max-width: 100%;
        height: auto;
      }
    }
    ${Media.md} {
      justify-content: center;
    }
  }
  ${Media.md} {
    display: block;
  }
`;

const Title01 = styled.div`
  font: 400 16px/25px "Press Start 2P", arial;
  color: #8e9195;
  margin: 0 0 15px 0;
`;
const TimerBox = styled.div`
  font: 400 50px/60px "Press Start 2P", arial;
  color: #8be05a;
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  span {
    display: inline-block;
    background-color: #16191e;
    padding: 12px 8px;
    margin: 0 3px;
    border-radius: 10px;
    border: 2px solid #5a5e67;
    text-indent: 6px;
  }
`;
const SwapMbox01 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 60px 0 0 0;
`;
const SwapSbox01 = styled(FlexDiv)`
  width: 33.33%;
  justify-content: flex-start;
  &.rightAlign {
    justify-content: flex-end;
  }
`;
const SwapSbox02 = styled(FlexDiv)`
  width: 33.33%;
  padding: 15px;
  flex-direction: column;
`;
const SwapSSbox01 = styled.div`
  width: 100%;
  max-width: 430px;
  background-color: #16191e;
  border: 2px solid #000;
  min-height: 430px;
  padding: 18px;
  border-radius: 10px;
  &.active {
    border-color: #8be05a;
    -webkit-box-shadow: 1px 1px 25px 1px rgba(254, 187, 0, 0.4);
    box-shadow: 1px 1px 25px 1px rgba(254, 187, 0, 0.4);
  }
  ${Media.md} {
    max-width: 100%;
  }
`;
const SwapTitle01 = styled(FlexDiv)`
  font-size: 16px;
  line-height: 18px;
  color: #ffffff;
  font-weight: 700;
  font-family: "Montserrat";
  justify-content: flex-start;
  margin-bottom: 15px;
  position: relative;
  img {
    margin: 0 16px 0 0;
  }
  .tip-ico {
    position: relative;
    top: -10px;
    font-size: 12px;
    right: 10px;
  }
  &.smTitle {
    font: 700 16px/25px "Montserrat", sans-serif;
    justify-content: flex-start;
    width: 100%;
    span {
      position: relative;
      padding-right: 15px;
    }
  }
`;
const SwapInputMbx = styled(FlexDiv)`
  border: 2px solid #545861;
  border-radius: 10px;
  min-height: 82px;
  padding: 12px 14px;
  &.marginFixer01 {
    margin-bottom: 22px;
  }
`;
const SSbx01 = styled(FlexDiv)`
  margin: 0 auto 0 0;
  justify-content: flex-start;
  color: #8e9195;
  font-size: 14px;
  width: auto;
  max-width: 40%;
  span {
    width: 100%;
    margin: 0 0 6px 0;
    font-weight: 700;
  }
  input {
    background-color: transparent;
    font-weight: 700;
    font-size: 26px;
    width: 100%;
    height: 25px;
    color: #393d46;
    border: none;
  }
`;
const SSbx02 = styled(FlexDiv)`
  margin: 0 0 0 auto;
  justify-content: flex-end;
  color: #8e9195;
  font-size: 14px;
  width: auto;
  max-width: 55%;
  span {
    width: 100%;
    margin: 0 5px 6px 0;
    text-align: right;
    min-height: 20px;
  }

  button {
    font-size: 16px;
    color: #fff;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  button.OrangeBTN {
    background-color: #8be05a;
    font-size: 16px;
    color: #fff;
    font-weight: 500;
    padding: 6px 12px;
    border-radius: 6px;
    white-space: nowrap;
    .fas {
      font-size: 14px;
    }
    &:hover {
      background-color: #6cc837;
    }
    &.widthFix {
      font-size: 15px;
      padding: 6px 6px;
    }
  }
  .maxTitle {
    background-color: #8be05a;
    margin: 0 0 0 8px;
    font-size: 12px;
    border-radius: 3px;
    padding: 2px 5px;
    color: #fff;
    display: inline-block;
  }
  .imgBox {
    display: inline-block;
    margin: 0 10px;
    padding-top: 6px;
  }
  .fas {
    margin-left: 8px;
  }
`;
const SwapTitle02 = styled(FlexDiv)`
  font: 300 18px/25px "Press Start 2P", arial;
  color: #565a69;
  padding: 18px 0;
  justify-content: flex-start;
  &.Center {
    justify-content: center;
  }
`;
const SwapTitle03 = styled(FlexDiv)`
  font-size: 14px;
  color: #8e9195;
  font-weight: 600;
  min-height: 42px;
  justify-content: flex-start;
  span {
    margin-left: auto;
  }
`;
const SwapTitle04 = styled(FlexDiv)`
  font: 300 18px/40px "Press Start 2P", arial;
  color: #fff;
  margin-bottom: 20px;
  justify-content: flex-start;
  &.smlTitle {
    font: 300 11px/20px "IBM Plex Mono", arial;
    color: #8e9195;
    margin-top: 20px;
  }
`;

const SwapBTN01 = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border: none;
  background-color: #ababab;
  font-family: "Kanit", sans-serif;
  font-weight: 700;
  font-size: 21px;
  width: 100%;
  padding: 12px 12px;
  border-radius: 10px;
  :hover {
    background-color: #878787;
  }
  &.darkGray {
    background-color: #5d6268;
    :hover {
      background-color: #ababab;
    }
  }
  &.orangBack {
    background-color: #8be05a;
    :hover {
      background-color: #a0ef72;
    }
  }
`;

const SwapBTN02 = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  color: #fff;
  border: none;
  background-color: #8be05a;
  width: 152px;
  height: 152px;
  padding: 15px;
  border-radius: 80px;
  .imgBox01 {
    margin-bottom: 12px;
  }
  :hover {
    background-color: #e4a802;
  }
`;

const SwapLinkbx = styled(FlexDiv)`
  font-size: 12px;
  color: #ababab;
  font-weight: 400;
  min-height: 46px;
  width: 100%;
  max-width: 430px;
  a {
    color: #ababab;
    margin: 0 6px;
    :hover {
      color: #8be05a;
    }
  }
`;

const YwrTitle01 = styled(FlexDiv)`
  width: 100%;
  justify-content: space-between;
  font-size: 30px;
  font-weight: 700;
  color: #fff;
  line-height: 40px;
  span {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .ywrCoinImg {
      width: 24px;
      height: 24px;
      display: flex;
    }
  }
  &.smVr {
    font-size: 14px;
    font-weight: 400;
    color: #fff;
    line-height: 26px;
    margin-top: 9px;
    align-items: flex-start;
    span {
      text-align: right;
    }
    .ywrCoinImg {
      margin-right: 4px !important;
    }
  }
`;
const YwrTitle02 = styled(FlexDiv)`
  width: 100%;
  font-size: 16px;
  align-items: flex-start;
  justify-content: flex-start;
  font-weight: 700;
  color: #fff;
  line-height: 30px;
  margin-bottom: 25px;
`;

// New Const for Update Design
const AlertTitle01 = styled.div`
  font-size: 11px;
  color: #c32b2d;
  margin: 0 6px 15px 6px;
  line-height: 18px;
  & span {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  & a {
    text-decoration: underline;
    color: #c32b2d;
    :hover {
      color: #fff;
    }
  }
`;

const InitialPriceBox = styled(FlexDiv)`
  width: 33.33%;
  flex-direction: column;
  font-size: 12px;
  font-weight: 700;
  color: #565a69;
  & span {
    margin-bottom: 8px;
  }
`;
const PPClosBTN01 = styled.button`
  width: 20px;
  height: 20px;
  border: 0px;
  outline: none;
  color: #fff;
  background: url(${Xbtn}) left top no-repeat;
  position: absolute;
  right: -15px;
  top: -20px;
  transition: 0.5s ease all;
  :hover {
    opacity: 0.7;
    transform: rotate(180deg);
  }
`;

const SwapTitle05 = styled(FlexDiv)`
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin: 25px 0 15px 0;
  justify-content: flex-start;

  & .helpIco {
    font-size: 14px;
    margin-left: auto;
    right: 3px;
    top: 0px;
  }
`;
const ConnectWallText = styled(FlexDiv)`
  width: 100%;
  max-width: 260px;
  font-size: 14px;
  color: #565a69;
  text-align: center;
  font-weight: 400;
`;
const SSLinkbox01 = styled.div`
  width: 100%;
  font-size: 12px;
  color: #565a69;
  text-align: center;
  font-weight: 400;
  padding: 15px 0;

  & a {
    color: #8be05a;
    margin-left: 4px;
    :hover {
      text-decoration: underline;
    }
  }
`;

const YLMBX = styled(FlexDiv)`
  width: 100%;
  border: 2px solid #545861;
  border-radius: 10px;
  padding: 15px 15px 15px 15px;

  &.v2 {
    border: 0 solid #545861;
    border-radius: 10px;
    padding: 0px 0 8px 0;
  }
`;
const YLTitle01 = styled(FlexDiv)`
  justify-content: flex-start;
  width: 100%;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 10px;
  span {
    margin-right: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
  }
  i {
    width: 24px;
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 1px;
  }
`;
const YLTitle02 = styled(FlexDiv)`
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  min-height: 36px;

  &.v2 {
    font-size: 18px;
    font-weight: 700;
    span {
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        margin-right: 6px;
      }
    }
  }

  &.v3 {
    align-items: flex-start;
    margin-top: 10px;
    line-height: 30px;
    font-size: 14px;
    font-weight: 700;
    color: #8e9195;
    span {
      text-align: right;
    }
  }
`;

const YLTitle03 = styled(FlexDiv)`
  justify-content: flex-start;
  width: 100%;
  font-size: 12px;
  font-weight: 400;
  color: #fff;
  min-height: 38px;
`;
const YLBtnBar = styled(FlexDiv)`
  align-items: center;
  padding: 10px 0;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  .ylBTN01 {
    color: #8be05a;
    margin: 0 auto;
    :hover {
      text-decoration: underline;
    }
  }
  .ylBTN02 {
    background-color: #5d6168;
    text-align: center;
    font-weight: 700;
    color: #fff;
    border-radius: 10px;
    display: inline-block;
    padding: 12px 10px;
    width: 48%;
    :hover {
      background-color: #4f545c;
    }
  }
  .ylBTN03 {
    background-color: #8be05a;
    color: #fff;
    text-align: center;
    font-weight: 700;
    color: #fff;
    border-radius: 10px;
    display: inline-block;
    padding: 12px 10px;
    width: 48%;
    :hover {
      background-color: #6cc837;
    }
  }
  .ylBTN04 {
    background-color: #c32b2d;
    color: #fff;
    text-align: center;
    font-weight: 700;
    color: #fff;
    border-radius: 10px;
    display: inline-block;
    padding: 12px 10px;
    width: 48%;
    :hover {
      background-color: #ae1719;
    }
  }
  span {
    margin: 0 auto;
    color: #565a69;
    font-size: 12px;
    width: 100%;
    text-align: center;
  }
  //  span{ margin:0 auto; color:#565a69; font-size:12px}
`;
const TSinputBar = styled(FlexDiv)`
  width: 100%;
  justify-content: flex-start;
  margin-bottom: 10px;
  &.smbar {
    color: #8e9195;
    input {
      width: 75px;
      margin: 0 8px 0 0;
      color: #fff;
      text-align: center;
    }
  }

  .tsBTN01 {
    width: 75px;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: #fff;
    padding: 12px 6px;
    background-color: #8be05a;
    border-radius: 10px;
    :hover {
      background-color: #6cc837;
    }
  }
  input {
    padding: 10px 10px;
    background-color: transparent;
    border: 2px solid #545861;
    border-radius: 10px;
    font-size: 14px;
    color: #fff;
    text-align: right;
    width: calc(100% - 85px);
    margin-left: 10px;
  }
`;

const RLTitle01 = styled(FlexDiv)`
  width: 100%;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  margin: 20px 0 20px 0;

  a {
    color: #8be05a;
    :hover {
      text-decoration: underline;
    }
  }
  &.v2 {
    margin: 0 0 15px 0;
    font-size: 30px;
    line-height: 18px;
    font-weight: 700;
    font-family: "Kanit";
    color: #fff;
  }
`;
const DragorInput = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  padding-top: 0;
  padding-bottom: 0;

  .input-range__slider {
    -webkit-appearance: none;
    appearance: none;
    background: #8be05a;
    cursor: pointer;
    display: block;
    margin-left: -0.5rem;
    margin-top: -0.65rem;
    color: #fff !important;
    font-weight: 700;
    outline: none;
    position: absolute;
    top: 50%;
    transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    font-weight: 400;
    transform: translateY(-22px);
    border: 4px solid #fff;
    transform: translateY(-26px) translateX(-6px);
  }

  .input-range__slider:focus {
    box-shadow: 0 0 0 5px rgba(63, 81, 181, 0.2);
  }
  .input-range__slider-container {
    transition: left 0.3s ease-out;
    z-index: 100;
  }
  .input-range__label {
    color: #aaaaaa;
    font-size: 16px;
    transform: translateZ(0);
    white-space: nowrap;
  }
  .input-range__label--min,
  .input-range__label--max {
    bottom: -1.4rem;
    position: absolute;
  }
  .input-range__label--min {
    left: 12px;
    top: 7px;
    z-index: 2;
  }
  .input-range__label--max {
    right: 23px;
    top: 7px;
  }
  .input-range__label--value {
    position: absolute;
    top: -21px;
    z-index: 2;
    color: #fff;
    left: 9px;
    pointer-events: none;
  }
  .input-range__label-container {
    left: -50%;
    position: relative;
    color: #fff;
    font: 500 16px/20px "IBM Plex Mono", arial;
    pointer-events: none;
  }
  .input-range__label--max .input-range__label-container {
    left: 50%;
  }
  .input-range__track {
    background: #393d46;
    cursor: pointer;
    display: block;
    height: 26px;
    position: relative;
    transition: left 0.3s ease-out, width 0.3s ease-out;
    border-radius: 15px;
  }
  .input-range__track--background {
    left: 0;
    margin-top: -0.15rem;
    position: absolute;
    right: 0;
    top: 50%;
  }
  .input-range__track--active {
    background: #8be05a;
  }
  .input-range {
    height: 1rem;
    position: relative;
    width: 100%;
  }
  .input-range__label--value .input-range__label-container {
    color: #000;
    font-weight: 700;
    font-size: 14px;
  }
`;

const RLBTNBX = styled(FlexDiv)`
  width: 100%;
  justify-content: space-between;
  margin-bottom: 12px;

  button {
    width: calc(25% - 10px);
    background-color: #2d3037;
    color: #8e9195;
    padding: 4px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 400;
    :hover,
    &.active {
      background-color: #34383f;
      color: #fff;
    }
  }
`;

const TSinputBar02 = styled(FlexDiv)`
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 12px;
  color: white;

  .apollo-field-switcher label {
    display: block;
    float: left;
    cursor: pointer;
    position: relative;
    height: 42px;
    width: 102px;
    padding: 0;
    margin: 0;
    overflow: hidden;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 10px;
  }
  .apollo-field-switcher label input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }
  input[type="radio"],
  input[type="checkbox"] {
    border: 1px solid #b4b9be;
    background: #fff;
    color: #555;
    clear: none;
    cursor: pointer;
    display: inline-block;
    line-height: 0;
    height: 16px;
    margin: -4px 4px 0 0;
    outline: 0;
    padding: 0 !important;
    text-align: center;
    vertical-align: middle;
    width: 16px;
    min-width: 16px;
    -webkit-appearance: none;
    -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    -webkit-transition: 0.05s border-color ease-in-out;
    transition: 0.05s border-color ease-in-out;
  }
  .ui-widget input,
  .ui-widget select,
  .ui-widget textarea,
  .ui-widget button {
    font-family: Verdana, Arial, sans-serif;
    font-size: 1em;
  }
  .apollo-field-switcher input[type="radio"],
  .apollo-field-switcher input[type="checkbox"] {
    border: 1px solid #b4b9be;
    background: #fff;
    color: #555;
    clear: none;
    cursor: pointer;
    display: inline-block;
    line-height: 0;
    height: 16px;
    margin: -4px 4px 0 0;
    outline: 0;
    padding: 0 !important;
    text-align: center;
    vertical-align: middle;
    width: 16px;
    min-width: 16px;
    -webkit-appearance: none;
    -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    -webkit-transition: 0.05s border-color ease-in-out;
    transition: 0.05s border-color ease-in-out;
  }
  .apollo-field-switcher label em {
    position: relative;
    display: block;
    height: 42px;
    width: 102px;
    border-radius: 10px;
    font-size: 14px;
    line-height: 40px;
    font-weight: 500;
    font-style: normal;
    color: #8e9195;
    background-color: #16191e;
    border: 2px solid #545861;
    -moz-transition: background 0.15s ease-out;
    -o-transition: background 0.15s ease-out;
    -webkit-transition: background 0.15s ease-out;
    transition: background 0.15s ease-out;
  }
  .apollo-field-switcher label em:before {
    content: attr(data-off);
    right: 14px;
  }
  .apollo-field-switcher label em:before,
  .apollo-field-switcher label em:after {
    position: absolute;
    -moz-transition: opacity 0.15s ease-out;
    -o-transition: opacity 0.15s ease-out;
    -webkit-transition: opacity 0.15s ease-out;
    transition: opacity 0.15s ease-out;
  }
  .apollo-field-switcher label em:after {
    content: attr(data-on);
    left: 14px;
    opacity: 0;
  }
  .apollo-field-switcher label em:before,
  .apollo-field-switcher label em:after {
    position: absolute;
    -moz-transition: opacity 0.15s ease-out;
    -o-transition: opacity 0.15s ease-out;
    -webkit-transition: opacity 0.15s ease-out;
    transition: opacity 0.15s ease-out;
  }
  .apollo-field-switcher label span {
    position: absolute;
    top: 4px;
    left: 51px;
    width: 48px;
    height: 35px;
    background-color: #33373e;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 10px;
    -moz-transition: left 0.15s ease-out;
    -o-transition: left 0.15s ease-out;
    -webkit-transition: left 0.15s ease-out;
    transition: left 0.15s ease-out;
  }
  .apollo-field-switcher label input:checked ~ em:before {
    opacity: 1;
  }
  .apollo-field-switcher label em:before {
    content: attr(data-off);
    right: 14px;
  }
  .apollo-field-switcher label em:before,
  .apollo-field-switcher label em:after {
    position: absolute;
    z-index: 8;
    -moz-transition: opacity 0.15s ease-out;
    -o-transition: opacity 0.15s ease-out;
    -webkit-transition: opacity 0.15s ease-out;
    transition: opacity 0.15s ease-out;
  }
  .apollo-field-switcher label input:checked ~ em:after {
    opacity: 1;
    color: #fff;
  }
  .apollo-field-switcher label em:after {
    content: attr(data-on);
    left: 14px;
    opacity: 1;
  }
  .apollo-field-switcher label input:checked ~ em {
    background: #16191e;
  }
  .apollo-field-switcher label input:checked ~ span {
    left: 4px;
    background: #8be05a;
  }
  .apollo-field-switcher label em:before,
  .apollo-field-switcher label em:after {
    position: absolute;
    -moz-transition: opacity 0.15s ease-out;
    -o-transition: opacity 0.15s ease-out;
    -webkit-transition: opacity 0.15s ease-out;
    transition: opacity 0.15s ease-out;
  }
  .apollo-field-switcher input[type="checkbox"]:checked:before {
    content: "\f147";
    margin: -3px 0 0 -4px;
    color: #1e8cbe;
  }
  .apollo-field-switcher input[type="radio"]:checked:before,
  .apollo-field-switcher input[type="checkbox"]:checked:before {
    float: left;
    display: inline-block;
    vertical-align: middle;
    width: 16px;
    font: 400 21px/1 dashicons;
    speak: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const IconImage = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 7.5px;
`;

const TabMBX01 = styled(FlexDiv)`
  width: 100%;
  justify-content: flex-start;
  font-size: 16px;
  color: #545861;
  position: relative;

  a {
    color: #fff;
    font-weight: 500;
    font-size: 16px;
    margin: 0 8px;
    :hover,
    &.active {
      color: #8be05a;
    }
    &:nth-child(01) {
      margin-left: 0;
    }
  }
`;
const TabMBX02 = styled(FlexDiv)`
  width: 100%;
  justify-content: flex-start;
  font-size: 16px;
  color: #545861;
  position: relative;
  margin: 10px 0;

  a {
    color: #fff;
    font-weight: 700;
    font-size: 12px;
    margin: 0;
    width: 50%;
    text-align: center;
    line-height: 30px;
    border-bottom: 3px solid #545861;
    padding: 10px 0;
    :hover,
    &.active {
      color: #8be05a;
      border-color: #8be05a;
    }
    &:nth-child(01) {
      margin-left: 0;
    }
  }
`;
const TabText01 = styled(FlexDiv)`
  font-size: 14px;
  color: #fff;
  font-weight: 400;
  line-height: 24px;
  padding: 10px;
  min-height: 130px;
  align-items: flex-start;
`;

const TabText02 = styled(FlexDiv)`
  font-size: 14px;
  color: #fff;
  font-weight: 400;
  line-height: 24px;
  padding: 18px 10px 28px 10px;
  align-items: flex-start;
  border-bottom: 1px solid #282b31;
  &:nth-last-child(01) {
    border-bottom: none;
  }
  p {
    margin-bottom: 0;
  }
  span {
    display: block;
    width: 100%;
    color: #fff;
    font-size: 12px;
    color: #9a9a9a;
  }
`;
const TabTitle01 = styled(FlexDiv)`
  width: 100%;
  font-size: 16px;
  color: #fff;
  font-weight: 700;
  line-height: 30px;
  justify-content: flex-start;
  padding: 10px;
`;
const TabTimer = styled(FlexDiv)`
  width: 100%;
  font-size: 14px;
  color: #fff;
  font-weight: 600;
  line-height: 24px;
  justify-content: flex-start;
  padding: 0 10px 10px 10px;
  span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
    border: 1px solid #43474f;
    border-radius: 4px;
    margin: 3px;
    &:nth-child(01) {
      margin-left: 0;
    }
  }
`;

const TabSelBX = styled(FlexDiv)`
  position: relative;
  width: 100%;
  height: 46px;
  border: 2px solid #545861;
  margin: 30px 0 16px 0;
  padding: 0 4px;
  border-radius: 10px;
  select {
    width: 100%;
    height: 46px;
    border-radius: 10px;
    border: 0px;
    background-color: transparent;
    color: #8e9195;
    option {
      background-color: #000;
      color: #fff;
      font-size: 16px;
      line-height: 24px;
      padding: 6px;
    }
  }
`;

const TabFormBX = styled(FlexDiv)`
  position: relative;
  width: 100%;
  height: 46px;
  border: 2px solid #545861;
  margin: 5px 0 16px 0;
  padding: 0 4px;
  border-radius: 10px;

  input {
    width: 100%;
    height: 46px;
    border-radius: 10px;
    border: 0px;
    background-color: transparent;
    color: #8e9195;
  }
  textarea {
    width: 100%;
    height: 46px;
    border-radius: 10px;
    border: 0px;
    background-color: transparent;
    color: #8e9195;
  }
`;
const TabFormBX02 = styled(FlexDiv)`
  position: relative;
  width: 100%;
  height: auto;
  border: 2px solid #545861;
  margin: 5px 0 36px 0;
  padding: 0 4px;
  border-radius: 10px;

  textarea {
    width: 100%;
    height: 102px;
    border-radius: 10px;
    border: 0px;
    background-color: transparent;
    color: #8e9195;
  }
`;

export default withRouter(withSnackbar(Page01));
