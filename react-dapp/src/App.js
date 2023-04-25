import logo from './logo.svg';
import './App.css';
import { Contract, ethers } from "ethers";

import contractABI from './contractABI.json';
import { useState, useEffect } from 'react';

const contractAddress = "0x593Efd8C0affefF25504E6173bCCFDE3e60f4419";

function App() {
  const [account, setAccount] = useState(null);
  const [isWalletInstalled, setWalletInstalled] = useState(false);
  const [NFTContract, setNFTContract] = useState(null);
  const [isMinting, setIsMinting] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      setWalletInstalled(true);
    }
  }, []);

  useEffect(() => {
    function initNFTContract() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setNFTContract(new Contract(contractAddress, contractABI.abi, signer));
    }
    initNFTContract();
  }, [account]);

  async function connectWallet() {
    window.ethereum
      .request({
        method: "eth_requestAccounts"
      })
      .then((accounts) => {
        setAccount(accounts[0]);
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  }

  const data = [
    {
      url: "./images/image01.jpg",
      param: "handleMint('https://gateway.pinata.cloud/ipfs/QmTCfbaVCvn68fiPjiDvbokuqERR9vzpaUR2DbkDJyDTvs/1')",
    },
    {
      url: "./images/image02.jpg", 
      param: "handleMint('https://gateway.pinata.cloud/ipfs/QmTCfbaVCvn68fiPjiDvbokuqERR9vzpaUR2DbkDJyDTvs/2')",
    },
    {
      url: "./images/image03.jpg",
      param: "handleMint('https://gateway.pinata.cloud/ipfs/QmTCfbaVCvn68fiPjiDvbokuqERR9vzpaUR2DbkDJyDTvs/3')",
    },
    {
      url: "./images/image04.jpg",
      param: "handleMint('https://gateway.pinata.cloud/ipfs/QmTCfbaVCvn68fiPjiDvbokuqERR9vzpaUR2DbkDJyDTvs/4')",
    },
    {
      url: "./images/image05.jpg",
      param: "handleMint('https://gateway.pinata.cloud/ipfs/QmTCfbaVCvn68fiPjiDvbokuqERR9vzpaUR2DbkDJyDTvs/5')",
    },
    {
      url: "./images/image06.jpg",
      param: "handleMint('https://gateway.pinata.cloud/ipfs/QmTCfbaVCvn68fiPjiDvbokuqERR9vzpaUR2DbkDJyDTvs/6')",
    },
    {
      url: "./images/image07.jpg",
      param: "handleMint('https://gateway.pinata.cloud/ipfs/QmTCfbaVCvn68fiPjiDvbokuqERR9vzpaUR2DbkDJyDTvs/7')",
    },
    {
      url: "./images/image08.jpg",
      param: "handleMint('https://gateway.pinata.cloud/ipfs/QmTCfbaVCvn68fiPjiDvbokuqERR9vzpaUR2DbkDJyDTvs/8')",
    },
    {
      url: "./images/image09.jpg",
      param: "handleMint('https://gateway.pinata.cloud/ipfs/QmTCfbaVCvn68fiPjiDvbokuqERR9vzpaUR2DbkDJyDTvs/9')",
    },
    {
      url: "./images/image10.jpg",
      param: "handleMint('https://gateway.pinata.cloud/ipfs/QmTCfbaVCvn68fiPjiDvbokuqERR9vzpaUR2DbkDJyDTvs/10')",
    }
  ];

  async function handleMint(tokenURI) {
    setIsMinting(true);
      try {
        const options = {value: ethers.utils.parseEther("0.0001")};
        const response = await NFTContract.mintNFT(tokenURI, options);
        console.log("Received: ", response);
      } catch (err) {
        alert(err);
      }
      finally {
        setIsMinting(false);
      }
  }

  async function withdrawMoney(){
    try {
      const response = await NFTContract.withdrawMoney();
      console.log("Received: ", response);
    } catch (err) {
      alert(err);
    }
  }

  if (account === null) {
    return (
      <>
        <div className="container contentDiv">
          <br/>
          <br/>
          
          <h1>NFT Marketplace</h1>
          <p>Mint NFT from Marketplace into your Account.</p>

          {isWalletInstalled ? (
            <button onClick={connectWallet}>Connect Wallet</button>
          ) : (
            <p>Install Metamask wallet</p>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div className='container contentDiv'>
        <h1>NFT Minting Application</h1>
        <p>Mint NFT of your choice from marketplace to your account.</p>
        <h4>Connected as: {account}</h4>
        
        {
          account === "0xbaf5dd35f3af1467445676387783181c2f946542" ? <><button 
          onClick={() => {
            withdrawMoney();
          }}
        >
          Withdraw Money from Contract
        </button>
        </> : <></>
        }

        <div className='card'>
          {data.map((item, index) => (
            <div className='imageDiv'>
              <img
                src={item.url}
                key={index}
                alt="images"
                width={250}
                height={250}
              />
              <p>0.0001 ETH</p>
              <button isLoading={isMinting}
                onClick={() => {
                  eval(item.param);
                }}
              >
                Mint to Your Account
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
