import Web3 from 'web3'
import {localprovide} from '../../constants'

export const  connectwallet = ()=>{
    let web3; //let ethereum=window?.ethereum;
    if (typeof window.web3 !== 'undefined') {
         web3 = new Web3(window.web3.currentProvider);
      } else {
         web3 = new Web3.providers.HttpProvider(localprovide);
      }
      
      window.web3 = new Web3(window?.ethereum);
     window?.ethereum.enable().then(async (accounts) => {
       // // console.log('transfer called.........', accounts[0]);
        localStorage.setItem('account', accounts[0]);
      });
      if (window.web3) {
        // Subscription register
        window?.ethereum?.on('accountsChanged', async (accounts) => {
          console.log("accounts", accounts)
            if(accounts == '')
            {
              localStorage.removeItem('account');
            }
            else
            {
              localStorage.setItem('account',accounts);
            }
            window.location.reload();
            
        });
        window?.ethereum?.on('chainChanged', (chainId) => {
            localStorage.setItem('chainId',chainId)
            // window.location.reload();
          });
        window?.ethereum?.on('networkChanged', async (network) => {
            // window.location.reload();
        });
   }
}