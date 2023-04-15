import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { EthersAdapter } from '@safe-global/protocol-kit'
import { SafeFactory } from '@safe-global/protocol-kit'
import SafeApiKit from '@safe-global/api-kit'
import { SafeAccountConfig } from '@safe-global/protocol-kit'
import { Signer, ethers } from 'ethers';
import { Button, Card, TextField } from '@mui/material';
import { useAccount, useContract, useProvider, useSigner, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { useState } from 'react';
import {
  SismoConnectButton,
  SismoConnectClientConfig,
  SismoConnectResponse,
  AuthType,
  useSismoConnect
} from "@sismo-core/sismo-connect-react";
import { SismoAbi } from '../public/SismoConnectModuleABI';

const Home: NextPage = () => {
  const [safeAddress, setSafeAddress] = useState("")
  const [inputValue, setInputValue] = useState('');

  const { data: owner1Signer, isError, isLoading } = useSigner()
  const { address, isConnected, isDisconnected } = useAccount();


  const config: SismoConnectClientConfig = {
    appId: "0x282ff775a754ebea339746f096635a5a",
    devMode: {
      enabled: true,
      devGroups: [{
        groupId: "0x84f8495423ea1aa1b212356f31f6c7d9",
        data: {
          "0x079217e9a45a0e4b49c3cb9b6d93b127513d1f07": 1,

        }
      }]
    }
  };
  
  const { response, responseBytes } = useSismoConnect({config: config });
  console.log(responseBytes)

  console.log("OWNEEER", owner1Signer)
  const ethAdapterOwner1 = new EthersAdapter({
    ethers,
    signerOrProvider: owner1Signer
  })

  async function handleCreateAccount() {
    const txServiceUrl = 'https://safe-transaction-goerli.safe.global'
    const safeService = new SafeApiKit({ txServiceUrl, ethAdapter: ethAdapterOwner1 })
    const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner1 })

    const safeAccountConfig: SafeAccountConfig = {
      owners: [
        await owner1Signer.getAddress(),
      ],
      threshold: 1,
      // ... (Optional params)
    }

    const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig })
    
    const tempSafeAddress = safeSdkOwner1.getAddress()

    setSafeAddress(tempSafeAddress)
    
    console.log('Your Safe has been deployed:')
    console.log(`https://goerli.etherscan.io/address/${safeAddress}`)
    console.log(`https://app.safe.global/gor:${safeAddress}`)
  }

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleSendEthClick = async () => {
    sendEthToSafe(inputValue);
  };

  async function sendEthToSafe(amount: string) {
    const safeAmount = ethers.utils.parseUnits(amount, 'ether').toHexString()

    const transactionParameters = {
      to: safeAddress,
      value: safeAmount
    }

    const tx = await owner1Signer.sendTransaction(transactionParameters)

    console.log('Fundraising.')
    console.log(`Deposit Transaction: https://goerli.etherscan.io/tx/${tx.hash}`)
  }

  let to = "0xD844C6Dc4E328024a1EA1baDd31FCe7b4790934B"
  let value = ethers.utils.parseUnits("0.0003", 'ether').toHexString()
  let data = "0x"

  const sismoModuleContract = useContract({address: "0x9BC26354920410929aC057DaF44840168a4AD3AB", abi: SismoAbi, signerOrProvider: owner1Signer})

  const {execConfig} = usePrepareContractWrite({
    address: "0x9BC26354920410929aC057DaF44840168a4AD3AB", 
    abi: SismoAbi, 
    functionName: 'execTransactionFromModule',
    args: [
      to,
      value,
      data,
      0,
      responseBytes
    ]
  })

  const {addOwnerConfig} = usePrepareContractWrite({
    address: "0x9BC26354920410929aC057DaF44840168a4AD3AB", 
    abi: SismoAbi, 
    functionName: 'addOwner',
    args: [
      owner1Signer?.getAddress(),
      1,
      responseBytes
    ]
  })


  const { data: result, isLoading: islodin, isSuccess, write } = useContractWrite(execConfig)
  const {data: result2, isLoading: islod, isSuccess: isUc2, write: write2 } = useContractWrite(addOwnerConfig)

  async function useExecTransactionFromModule() {
    write?.()
  }

  async function handleAddOwner() {
    write2?.()
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Mango</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <ConnectButton />

      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <Button onClick={handleCreateAccount} variant="outlined">Handle Create Account </Button>
            <h5>Your Safe Address: {safeAddress}</h5>
          </div>
          <div className={styles.card}>
            <TextField id="standard-basic" label="amount" variant="standard" onChange={handleInputChange}/>
            <br></br>
            <Button onClick={handleSendEthClick} variant="outlined">Send ETH to Your Safe</Button>
          </div>
        </div>
          
          <SismoConnectButton
          // Use the config you defined above
            config={config}
            // request a proof of Data Vault Ownership
            auths={[{authType: AuthType.VAULT}]}
            // request a proof of group membership for `the-merge-contributor`
            claims={[{ groupId: "0x84f8495423ea1aa1b212356f31f6c7d9" }]}
            // request to generate a proof that can't valid without 
            // a message chosen by the user
            signature={{
              // here we encode the message using ethers
              // we encode it as an address
              // we will use it to airdrop the ERC721 on this address in our contracts
              message: ethers.utils.defaultAbiCoder.encode(
                  ["address", "uint256", "bytes"],
                  [to, value, data]
                )
            }}
            onResponseBytes={(responseBytes: string) => {
            //Send the response to your contract to verify it
            //thanks to the @sismo-core/sismo-connect-solidity package
            //Will see how to do this in next part of this tutorial
            }} />

          <div className={styles.grid}>
            <div className={styles.card}>
              <Button onClick={useExecTransactionFromModule}>Execute Transaction Send Treasury Ether to somewhere</Button>
            </div>

            <div className={styles.card}>
              <Button onClick={handleAddOwner}>Add Yourself Multisigner</Button>
            </div>
          </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
          from Tokyo with love...
        </a>
      </footer>
    </div>
  );
};

export default Home;
