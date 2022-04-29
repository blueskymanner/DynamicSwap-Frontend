import React, {useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Component/header";
import Modal from "react-modal";
import SnackbarProvider from "react-simple-snackbar";
import Page01 from "./Pages/page01";
import Page02 from "./Pages/page02";
import Page03 from "./Pages/page03";
//import Page01 from './Pages/page01New'
import Gs from "./Theme/globalStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "./Theme/theme";
import Footer from "./Component/footer";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BsXLg } from "react-icons/bs";
const graphQLClient = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/coderighter2/devdynamicsswap", //[GraphQL endpoint]
  // uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2' //[GraphQL endpoint]
});
const selectedTheme = theme(true);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#20232a",
    border: "0px",
  },
};

function App() {

  const [resetFlag, setResetFlag] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const afterOpenModal = () => {
    console.log("After open modal");
  };

  const changeNetwork = async(network) => {
    var chainId = '0x38';
    if(network === "eth"){
      chainId = '0x1';
    }
    console.log(chainId, "Network ChainId", network)
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainId }], // chainId must be in hexadecimal numbers
        });
      } catch (error) {
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: chainId,
                  rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
                },
              ],
            });
          } catch (addError) {
            console.error(addError);
          }
        }
        console.error(error);
      }
    } 
    // else {
    //   alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
    // } 
  }

  return (
    <Router basename={"/"}>
      {/* basename={'bscswap_newdark_v2'}   */}
      <ThemeProvider theme={selectedTheme}>
        <SnackbarProvider>
          <ApolloProvider client={graphQLClient}>
            <section className="MainBox clearfix">
              <Gs.GlobalStyle />
              <Header openModal={openModal} />
              <Gs.MainBox>
                <Switch>
                  <Route path="/" exact>
                    {" "}
                    <Page01 resetFlag={resetFlag}/>{" "}
                  </Route>
                  <Route path="/page02" exact>
                    {" "}
                    <Page02 />{" "}
                  </Route>
                  <Route path="/page03" exact>
                    {" "}
                    <Page03 />{" "}
                  </Route>
                </Switch>
              </Gs.MainBox>
              <Footer setResetFlag={setResetFlag} resetFlag={resetFlag}/>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <button className="modal-close-btn" onClick={closeModal}><BsXLg className="white-font"/></button>
                <h2>You are on the wrong network</h2>
                <p className="white-font">Please select ETH or BSC networks</p>
                <div className="d-flex top-space-network-btn">
                  <button className="eth-network-btn" onClick={()=>changeNetwork("eth")}>ETH Network</button>
                  <button className="bsc-network-btn" onClick={()=>changeNetwork("bsc")}>BSC Network</button>
                </div>
              </Modal>
            </section>
          </ApolloProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
