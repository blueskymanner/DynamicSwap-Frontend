import React, { Component, useRef, useState } from "react";
import styled from "styled-components";
import Modal from "../modal";
import ReactTooltip from "react-tooltip";
import { Scrollbars } from "react-custom-scrollbars";
import { useEffect } from "react";
import Media from "../../Theme/media-breackpoint";
import addTokenAbi from "../../abi/custom_token_abi.json";
import { useSnackbar } from "react-simple-snackbar";
import defaultIcon from "../../Assets/images/defaultIcon.svg";
import loadedIcon from "../../Assets/images/loaded.svg";
import Xbtn from "../../Assets/images/closeBTN.png";
import Bkbtn from "../../Assets/images/backBTN.png";
import DMCIcon from "../../Assets/images/selectTkn-09.png";

// import { get_web3_instance } from '../../services/metamask';
import {
  fetchLink,
  generateSecondary,
  getDefaultChain,
  get_web3_instance,
  useChainHook,
} from "../../helper";

class CustomScrollbars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen1: false,
      isOpen2: false,
    };
  }

  render() {
    return (
      <Scrollbars
        renderTrackVertical={(props) => (
          <div {...props} className="track-vertical" />
        )}
        renderThumbVertical={(props) => (
          <div {...props} className="thumb-vertical" />
        )}
        renderView={(props) => <div {...props} className="view" />}
        style={this.props.style}
      >
        {this.props.children}
      </Scrollbars>
    );
  }
}

export default function ManageToken({
  isOpen,
  customTokens,
  setCustomTokens,
  coinList,
  setCoinList,
  DEFAULT_ITEM,
  ...props
}) {
  const [openSnackbar, closeSnackbar] = useSnackbar();

  const boxRef = useRef(null);
  const [firstKey, setFirstKey] = useState(Math.random());
  const [secondKey, setSecondKey] = useState(Math.random());
  const [currTab, setCurrTab] = useState(1);
  const [contractValue, setContractValue] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [warning, setWarning] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [consent, setConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      if (boxRef?.current && !boxRef?.current?.contains(e.target) && isOpen) {
        props.dismiss();
        setSecondKey(Math.random());
        setFirstKey(Math.random());
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [boxRef, isOpen]);

  useEffect(() => {
    if (!openModal) setContractValue("");
  }, [openModal]);

  const addTokenHandler = async (contract, cb) => {
    setIsLoading(true);
    try {
      let web3 = get_web3_instance();
      const alreadyIndex = customTokens.findIndex(
        (el) => el.address === contract
      );
      if (alreadyIndex !== -1) {
        setIsLoading(false);
        return cb("This token already exists.");
      }
      const isValidAddress = await web3.utils.isAddress(contract);
      if (!isValidAddress) {
        setIsLoading(false);
        return cb("Invalid Token Address");
      }
      const contractInstance = new web3.eth.Contract(addTokenAbi, contract);
      const response = await contractInstance.methods.symbol().call();
      if (response) {
        cb("");
        const chainList = await getDefaultChain();
        const newToken = {
          address: contract,
          name: response,
          label: response,
          image: defaultIcon,
          decimals: 18,
          custom: true,
          addedByMe: true,
          chain: chainList,
        };

        setOpenModal(false);
        setIsLoading(false);
        return newToken;
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      openSnackbar("Seems like your contract address is incorrect.");
    }
  };

  const deleteToken = (addr) => {
    setTimeout(() => {
      if (!addr) {
        setCustomTokens([]);
        localStorage.setItem("customTokens", JSON.stringify([]));
        return;
      }
      const copy = customTokens.slice();
      const index = copy.findIndex((el) => el.address === addr);
      copy.splice(index, 1);
      setCustomTokens(copy);
      localStorage.setItem("customTokens", JSON.stringify(copy));
    }, 1);
  };

  const onDismiss = () => {
    setCurrTab(1);
    setFirstKey(Math.random());
    setSecondKey(Math.random());
    props.dismiss();
  };

  const resetAndBack = () => {
    if (!warning && !showWarning) {
      props.partialDismiss();
    } else {
      setFirstKey(Math.random());
      setSecondKey(Math.random());
    }
  };

  return (
    <Modal isOpen={isOpen} dismiss={props.dismiss}>
      <PPMainBx ref={boxRef}>
        <PPsBx01 className="v2">
          <PPstitle01 className="v2">
            Manage
            <PPBackBTN onClick={resetAndBack} />
            <PPClosBTN01 onClick={onDismiss} />
          </PPstitle01>

          <MTtabMBX>
            <button
              onClick={() =>
                setTimeout(() => {
                  setCurrTab(1);
                }, 1)
              }
              className={currTab === 1 ? "active" : ""}
            >
              List
            </button>
            <button
              onClick={() =>
                setTimeout(() => {
                  setCurrTab(2);
                }, 1)
              }
              className={currTab === 2 ? "active" : ""}
            >
              Name
            </button>
          </MTtabMBX>
        </PPsBx01>

        {currTab === 1 ? (
          <Tab1
            coinList={coinList}
            DEFAULT_ITEM={DEFAULT_ITEM}
            shouldReset={firstKey}
            setCoinList={setCoinList}
            showWarning={showWarning}
            setShowWarning={setShowWarning}
          />
        ) : (
          <Tab2
            setCustomTokens={setCustomTokens}
            customTokens={customTokens}
            DEFAULT_ITEM={DEFAULT_ITEM}
            consent={consent}
            warning={warning}
            setWarning={setWarning}
            shouldReset={secondKey}
            setConsent={setConsent}
            deleteToken={deleteToken}
            addTokenHandler={addTokenHandler}
            contractValue={contractValue}
            setContractValue={setContractValue}
          />
        )}
      </PPMainBx>
      <ReactTooltip effect="solid" className="myTip" />
    </Modal>
  );
}

const Warning = ({ listing, setCoinList, resetLink }) => {
  const [agree, setAgree] = useState(false);
  return (
    <>
      <MTtknMBX>
        <MTtknIcn>
          <img
            src={listing?.data?.logoURI}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultIcon;
            }}
            alt=""
          />
        </MTtknIcn>
        {listing?.data?.name}
        <span>{listing?.data?.tokens?.length || 0} tokens</span>
      </MTtknMBX>
      <WarnBox>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FF4343"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        <h2>Import at your own risk</h2>
        <div>
          By adding this list you are implicitly trusting that the data is
          correct. Anyone can create a list, including creating fake versions of
          existing lists and lists that claim to represent projects that do not
          have one.
        </div>
        <div>
          If you purchase a token from this list, you may not be able to sell it
          back.
        </div>
        <label style={{ margin: "20px 0" }}>
          <input
            style={{ marginRight: "5px" }}
            type="checkbox"
            checked={agree}
            onChange={() => setAgree((a) => !a)}
          />
          I understand
        </label>
        <OrangeButton
          type="button"
          style={{ width: "90%" }}
          onClick={() => {
            if (!agree) return;
            setTimeout(() => {
              setCoinList((l) => [
                {
                  data: listing.url,
                  enabled: true,
                },
                ...l,
              ]);
              resetLink();
            }, 1);
          }}
        >
          Import
        </OrangeButton>
      </WarnBox>
    </>
  );
};

const TokenWarning = ({ token, setCustomTokens, resetLink }) => {
  const [agree, setAgree] = useState(false);
  return (
    <>
      <MTtknMBX>
        {/* <MTtknIcn><img src={defaultIcon} alt="" /></MTtknIcn> */}
        {token?.name}
      </MTtknMBX>
      <WarnBox>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FF4343"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        <h2>Import at your own risk</h2>
        <div>
          By adding this token you are implicitly trusting that the data is
          correct.
        </div>
        <div>
          If you purchase this token, you may not be able to sell it back.
        </div>
        <label style={{ margin: "20px 0" }}>
          <input
            style={{ marginRight: "5px" }}
            type="checkbox"
            checked={agree}
            onChange={() => setAgree((a) => !a)}
          />
          I understand
        </label>
        <OrangeButton
          type="button"
          style={{ width: "90%" }}
          onClick={() => {
            if (!agree) return;
            setTimeout(() => {
              const localCustom = JSON.parse(
                localStorage.getItem("customTokens")
              );
              localStorage.setItem(
                "customTokens",
                JSON.stringify([...localCustom, token])
              );
              setCustomTokens((t) => [...t, token]);
              resetLink();
            }, 1);
          }}
        >
          Import
        </OrangeButton>
      </WarnBox>
    </>
  );
};

const Tab2 = ({
  setCustomTokens,
  DEFAULT_ITEM,
  customTokens,
  deleteToken,
  contractValue,
  setContractValue,
  addTokenHandler,
  consent,
  setConsent,
  shouldReset,
  warning,
  setWarning,
}) => {
  const [addedToken, setAddedToken] = useState();
  const [addUrl, setAddUrl] = useState("");

  useEffect(() => {
    getDefaultChain()
      .then((chain) => {
        const map = { bsc: "bsc", eth: "ether" };
        setAddUrl(`https://${map[chain]}scan.com/address/`);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (contractValue)
      addTokenHandler(contractValue, setWarning)
        .then(setAddedToken)
        .catch(() => {});
    else setWarning("");
  }, [contractValue]);
  const reset = () => {
    setContractValue("");
    setConsent(false);
    setWarning("");
    setAddedToken(undefined);
  };
  useEffect(reset, [shouldReset]);
  return (
    <MTTabBX>
      {consent ? (
        <TokenWarning
          setCustomTokens={setCustomTokens}
          resetLink={reset}
          token={addedToken}
        />
      ) : (
        <>
          <MTSearchBX>
            <input
              type="text"
              placeholder="0x0000"
              value={contractValue}
              onChange={(e) => setContractValue(e.target.value)}
            />{" "}
          </MTSearchBX>
          {warning ? <Error>{warning}</Error> : <></>}
          <MTTtitle01>
            {" "}
            {customTokens?.length || 0} custom token{" "}
            <div>
              <a onClick={() => deleteToken()} href="javascript:void(0);">
                Clear all
              </a>
            </div>
          </MTTtitle01>
          {addedToken ? (
            <MTtknMBX>
              <MTtknIcn>
                <img src={defaultIcon} alt="" />
              </MTtknIcn>
              {addedToken.name}
              <MTtkncheBX>
                <OrangeButton
                  onClick={() =>
                    setTimeout(() => {
                      setConsent(true);
                    }, 1)
                  }
                >
                  Import
                </OrangeButton>
              </MTtkncheBX>
            </MTtknMBX>
          ) : (
            <></>
          )}
          <MTCoinMBX>
            {/* Token Item of Manage Token List */}
            {/* <PPListtoken02> 
            <ImgBx> <img src={DMCIcon} alt='' /> </ImgBx>
            DMC 
            <PPLLinkBX>
                <a href="javascript:void(0);"><i className="fas fa-trash-alt"></i></a>
                <a target='blank' rel='noopener noreferrer' href="#" className="v2"><i className="fas fa-external-link-alt"></i></a>
            </PPLLinkBX>
        </PPListtoken02> */}
            {(customTokens || []).map((t, index) => (
              <PPListtoken02 key={index}>
                <ImgBx>
                  {" "}
                  <img
                    src={t.image || defaultIcon}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultIcon;
                    }}
                    alt=""
                  />{" "}
                </ImgBx>
                {t.name}
                <PPLLinkBX>
                  <a
                    href="javascript:void(0);"
                    onClick={() => deleteToken(t.address)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </a>
                  <a
                    target="blank"
                    rel="noopener noreferrer"
                    href={addUrl + t.address}
                    className="v2"
                  >
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                </PPLLinkBX>
              </PPListtoken02>
            ))}
          </MTCoinMBX>

          <PPsBx02 className="v3" style={{ marginTop: "auto" }}>
            Tip: Custom tokens are stored locally in your browser
          </PPsBx02>
        </>
      )}
    </MTTabBX>
  );
};

const Tab1 = ({
  coinList = [],
  DEFAULT_ITEM,
  setCoinList,
  shouldReset,
  showWarning,
  setShowWarning,
}) => {
  const [isWrong, setIsWrong] = useState(false);
  const [renderData, setRenderData] = useState([]);
  const [newListing, setNewListing] = useState(null);
  const [linkQuery, setLinkQuery] = useState("");
  const chainId = useChainHook();
  useEffect(() => {
    Promise.all(
      [...coinList].map(async (item) => {
        try {
          const response = await fetch(
            item.data.includes("http")
              ? item.data
              : generateSecondary(item.data)
          );
          const res = await response.json();
          const tokens = (res.tokens || []).filter(
            (el) => el.chainId === +chainId || item.locked
          )?.length;
          const name = res.name;
          const logo = res.logoURI;
          return { ...item, name, logo, tokens };
        } catch (e) {
          return {
            ...item,
            name: "Errored List",
            tokens: 0,
            logo: defaultIcon,
          };
        }
      })
    )
      .then(setRenderData)
      .catch((err) => setRenderData(coinList));
  }, [coinList, chainId]);
  useEffect(() => {
    setLinkQuery("");
    setNewListing(null);
    setIsWrong(false);
    setShowWarning(false);
  }, [shouldReset]);
  useEffect(() => {
    if (linkQuery) fetchLink(linkQuery, setNewListing, setIsWrong);
    else {
      setNewListing(null);
      setIsWrong(false);
    }
  }, [linkQuery]);

  const updateList = (data, locked) => {
    setTimeout(() => {
      if (locked) return;
      const copy = coinList.slice();
      const index = copy.findIndex((el) => el.data === data);
      copy[index].enabled = !copy[index].enabled;
      setCoinList(copy);
    }, 1);
  };

  const checkStatus = (url) => {
    const index = [...coinList].findIndex(
      (el) => el.data.includes(url) || url.includes(el.data)
    );
    return index !== -1;
  };
  const [openSnackbar] = useSnackbar();

  return (
    <MTTabBX>
      {showWarning ? (
        <Warning
          resetLink={() => {
            setLinkQuery("");
            setNewListing(false);
            setShowWarning(false);
          }}
          setCoinList={setCoinList}
          setShowWarning={setShowWarning}
          listing={newListing}
        />
      ) : (
        <>
          <MTSearchBX>
            <input
              value={linkQuery}
              onChange={(e) => setLinkQuery(e.target.value)}
              type="text"
              placeholder="https:// or ipfs:// or ENS name"
            />{" "}
          </MTSearchBX>
          <CustomScrollbars
            style={{ width: "100%", height: "420px", position: "relative" }}
          >
            {isWrong ? <Error>Seems like the url is broken</Error> : <></>}
            {newListing ? (
              <MTtknMBX style={{ marginBottom: "35px" }}>
                <MTtknIcn>
                  <img
                    src={newListing.data.logoURI}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultIcon;
                    }}
                    alt=""
                  />
                </MTtknIcn>
                {newListing.data.name}
                <span>{newListing?.data?.tokens?.length || 0} tokens</span>
                <MTtkncheBX>
                  {checkStatus(newListing?.url) ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <img
                        style={{ height: "15px", width: "15px", color: "#aaa" }}
                        alt="Loaded"
                        src={loadedIcon}
                      />
                      <span style={{ marginLeft: "5px" }}>Loaded</span>
                    </div>
                  ) : (
                    <OrangeButton
                      onClick={() =>
                        setTimeout(() => {
                          setShowWarning(true);
                        }, 1)
                      }
                    >
                      Import
                    </OrangeButton>
                  )}
                </MTtkncheBX>
              </MTtknMBX>
            ) : (
              <></>
            )}
            {renderData.map((item, _, arr, index) => (
              <MTtknMBX
                key={index}
                className={
                  arr[arr.findIndex((el) => el.data === item.data)].enabled
                    ? "active"
                    : ""
                }
              >
                <MTtknIcn>
                  <img
                    src={item.logo}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultIcon;
                    }}
                    alt=""
                  />
                </MTtknIcn>
                {item.name}
                <span>
                  {item.tokens || 0} tokens
                  <MTDDMbx>
                    <i className="fas fa-cog"></i>
                    <div className="MTDDinBX">
                      V2.0.0
                      <a
                        href={
                          "https://tokenlists.org/token-list?url=" + item.data
                        }
                        target="blank"
                        rel="noopener noreferrer"
                      >
                        View list
                      </a>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setTimeout(() => {
                            if (item.locked)
                              return openSnackbar(
                                "Cannot delete this list, its added by default."
                              );
                            const response = window.prompt(
                              "Please type delete to remove the token list."
                            );
                            if (response === "delete") {
                              const copy = coinList.slice();
                              const index = copy.findIndex(
                                (el) => el.data === item.data
                              );
                              copy.splice(index, 1);
                              setCoinList(copy);
                              openSnackbar("Token list deleted successfully.");
                            } else
                              openSnackbar(
                                "The token list name you entered is incorrect."
                              );
                          }, 1);
                        }}
                      >
                        Remove list
                      </span>
                    </div>
                  </MTDDMbx>
                </span>
                <MTtkncheBX>
                  <div className="apollo-element apollo-element-active apollo-field-switcher">
                    <div className="apollo-fieldset">
                      <label>
                        {" "}
                        <input
                          type="checkbox"
                          onChange={() => updateList(item.data, item.locked)}
                          checked={
                            arr[arr.findIndex((el) => el.data === item.data)]
                              .enabled
                          }
                          name="shortcode[active]"
                          value="1"
                          data-depend-id="active"
                          data-atts="active"
                        />
                        <em data-on="on" data-off="off"></em>
                        <span></span>
                      </label>
                    </div>
                  </div>
                </MTtkncheBX>
              </MTtknMBX>
            ))}
          </CustomScrollbars>
        </>
      )}
    </MTTabBX>
  );
};

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const MTtabMBX = styled(FlexDiv)`
  width: 100%;
  button {
    width: 50%;
    height: 56px;
    text-align: center;
    display: block;
    font-weight: 700;
    font-size: 16px;
    color: #8e9195;
    border-bottom: 3px solid #8e9195;
    :hover,
    &.active {
      border-color: #8be05a;
      color: #8be05a;
    }
  }
`;
const MTTabBX = styled(FlexDiv)`
  width: 100%;
  min-height: 520px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;

const MTSearchBX = styled(FlexDiv)`
  width: 100%;
  padding: 15px 28px 20px 28px;
  border-bottom: 1px solid #3c3f46;

  input {
    width: 100%;
    height: 50px;
    border-radius: 10px;
    border: 2px solid #545861;
    background-color: transparent;
    padding: 10px;
    font-size: 14px;
    color: #fff;
  }
`;
const Error = styled(FlexDiv)`
  margin: 15px 15px 15px 25px;
  width: calc(100% - 55px);
  color: red;
`;

const MTtknMBX = styled(FlexDiv)`
  margin: 15px 15px 15px 25px;
  width: calc(100% - 55px);
  border-radius: 10px;
  border: 1px solid #545861;
  min-height: 66px;
  justify-content: flex-start;
  padding: 12px 94px 12px 70px;
  position: relative;
  font-size: 16px;
  font-weight: 300;
  &.active {
    border-color: #8be05a;
  }
  span {
    width: 100%;
    display: block;
    font-size: 11px;
  }
  ${Media.xs} {
    margin: 15px;
    width: calc(100% - 30px);
  }
`;
const MTtknIcn = styled(FlexDiv)`
  width: 36px;
  height: 36px;
  position: absolute;
  left: 14px;
  top: 14px;
  img {
    max-width: 100%;
    height: auto;
  }
`;
const MTDDMbx = styled(FlexDiv)`
  width: 14px;
  height: 14px;
  position: relative;
  color: white;
  display: inline-flex;
  margin-left: 5px;
  margin-top: 2px;
  transition: all 0.5s;
  .MTDDinBX {
    position: absolute;
    left: 5px;
    top: 5px;
    line-height: 20px;
    width: 120px;
    min-height: 92px;
    background-color: #fff;
    border-radius: 10px;
    z-index: 100;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-weight: 400;
    justify-content: flex-start;
    color: #000000;
    font-size: 12px;
    -webkit-box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
    transition: all 0.5s;
    opacity: 0;
    visibility: hidden;
    a,
    span {
      color: #8be05a;
      cursor: pointer;
      font-weight: 700 !important;
      :hover {
        text-decoration: underline;
      }
    }
  }
  :hover {
    color: #8be05a;
    .MTDDinBX {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const MTTtitle01 = styled(FlexDiv)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  color: white;
  font-weight: 600;
  padding: 14px 25px;
  a,
  span {
    font-size: 12px;
    cursor: pointer;
    color: #8be05a;
    :hover {
      text-decoration: underline;
    }
  }
`;

const MTCoinMBX = styled(FlexDiv)`
  width: 100%;
  padding: 14px 25px;
`;
const PPListtoken02 = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  color: #fff;
  padding: 15px 0px;
  & i {
    margin-left: auto;
  }
`;
const ImgBx = styled(FlexDiv)`
  width: 23px;
  height: 23px;
  text-align: center;
  margin-right: 12px;
  border-radius: 15px;
  overflow: hidden;
  img {
    max-width: 100%;
    height: auto;
  }
`;

const PPLLinkBX = styled(FlexDiv)`
  margin-left: auto;

  a {
    color: #fff;
    font-size: 14px;
    display: inline-block;
    margin-left: 15px;
    :hover {
      opacity: 0.5;
    }
    &.v2 {
      color: #8be05a;
    }
  }
`;

const MTtkncheBX = styled(FlexDiv)`
  justify-content: flex-end;
  position: absolute;
  right: 10px;
  width: 75px;

  .apollo-field-switcher label {
    display: block;
    float: left;
    cursor: pointer;
    position: relative;
    height: 42px;
    width: 75px;
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
    width: 75px;
    border-radius: 10px;
    font-size: 14px;
    line-height: 40px;
    font-weight: 500;
    font-style: normal;
    color: #8e9195;
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
    top: 13px;
    left: 10px;
    width: 18px;
    height: 18px;
    background-color: #545861;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 10px;
    -moz-transition: left 0.15s ease-out;
    -o-transition: left 0.15s ease-out;
    -webkit-transition: left 0.15s ease-out;
    transition: left 0.15s ease-out;
  }
  .apollo-field-switcher label input:checked ~ em:before {
    opacity: 0;
  }
  .apollo-field-switcher label em:before {
    content: attr(data-off);
    right: 14px;
  }
  .apollo-field-switcher label em:before,
  .apollo-field-switcher label em:after {
    position: absolute;
    z-index: 100;
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
  }
  .apollo-field-switcher label input:checked ~ em {
    border-color: #8be05a;
  }
  .apollo-field-switcher label input:checked ~ span {
    background: #8be05a;
    left: 44px;
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

const PPMainBx = styled.div`
  width: 100%;
  max-width: 431px;
  margin: 0 auto;
  background-color: #2c2f36;
  border: 2px solid #000;
  display: block;
  border-radius: 10px;
  ${Media.xs} {
    margin: 0px 15px;
    max-width: 100%;
    width: auto;
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
  right: 0px;
  transition: 0.5s ease all;
  :hover {
    opacity: 0.7;
    transform: rotate(180deg);
  }
`;

const PPBackBTN = styled(PPClosBTN01)`
  right: auto;
  left: 0px;
  background: url(${Bkbtn}) left top no-repeat;
  :hover {
    opacity: 0.5;
    transform: none;
  }
`;

const PPsBx01 = styled(FlexDiv)`
  width: 100%;
  padding: 30px 30px 10px 30px;
  border-bottom: #3c3f46 1px solid;

  &.v2 {
    border-bottom: 0px;
  }
`;

const PPsBx02 = styled(FlexDiv)`
  width: 100%;
  padding: 20px 30px 20px 30px;
  border-top: #3c3f46 1px solid;

  &.v2 {
    font-size: 12px;
    border-top: 0px;
    button {
      color: #8be05a;
    }
  }
  &.v3 {
    font-size: 12px;
    font-weight: 300;
    padding: 20px 15px 20px 15px;
  }

  & button {
    border: 0px;
    outline: none;
    background-color: transparent;
    color: #fff;
    :hover {
      opacity: 0.7;
    }
  }
`;

const PPselectTokenBTN = styled(FlexDiv)`
  justify-content: flex-start;
  width: 100%;
  padding: 8px 0;

  button {
    display: inline-flex;
    color: #fff;
    border-radius: 10px;
    border: 1px solid #545861;
    align-items: center;
    justify-content: flex-start;
    padding: 4px 10px 4px 6px;
    margin: 0 8px 8px 0;

    :hover {
      background-color: #545861;
    }

    &.active {
      background-color: #1f2127;
      border-color: #1f2127;
    }
  }
`;

const PPstitle01 = styled(FlexDiv)`
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  font-size: 14px;
  font-weight: 700;
  padding: 8px 0 12px 0;
  position: relative;

  &.v2 {
    justify-content: center;
    font-size: 18px;
  }
`;

const PPstitle02 = styled(PPstitle01)`
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px 0;
  width: 100%;
  color: #fff;
  font-size: 12px;
  font-weight: 400;

  & button {
    border: 0px;
    outline: none;
    background-color: transparent;
    color: #fff;

    :hover {
      opacity: 0.7;
    }
  }
`;

const PopInput01 = styled.input`
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  line-height: normal;
  background-color: transparent;
  border: 2px solid #545861;
  width: 100%;
  padding: 11px 8px;
  border-radius: 10px;
  margin: 10px 0;
`;

const CWBTNBX = styled(FlexDiv)`
  width: 100%;
  padding: 10px 30px 0px 30px;

  button {
    width: 100%;
    height: 62px;
    border: 1px solid #545861;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 14px;
    padding: 10px 14px;
    color: #ffffff;
    position: relative;
    margin: 0 0 15px 0;

    i {
      width: 32px;
      height: 32px;
      position: absolute;
      right: 11px;
      top: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :hover {
      background-color: #32353b;
    }
  }
`;
const OrangeButton = styled.button`
  font-size: 16px;
  color: #fff;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #8be05a;
  font-size: 16px;
  color: #fff;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 6px;
`;

const WarnBox = styled(FlexDiv)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 28px;

  div {
    color: #ffffffaa;
  }
`;
