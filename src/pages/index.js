import Image from 'next/image';
import Head from 'next/head';
import bg from "../images/background.png"
import nftimg from "../images/nft.png"
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  base,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { MintNFT } from '@/contract_interaction/mintNFT';
import { useContractRead } from 'wagmi';
import tokenContract from "../contract_interaction/contract.json";


function GetTotalSupply(){
  const NFT_CONTRACT_ADDRESS = "0xEAF4F4DaDA2e9E0Aeb09DD18932c8A255cF0c06d";
  const { data } = useContractRead({
    address: NFT_CONTRACT_ADDRESS,
    abi: tokenContract.abi,
    functionName: 'totalSupply',
  })
  return (
    <div>
      Total minted supply: {Number(data)}
    </div>
  )
};


export default function FirstPost() {
  const { chains, publicClient } = configureChains(
    [base],
    [
      publicProvider()
    ]
    );
  const { connectors } = getDefaultWallets({
      appName: 'Onchain Summer',
      projectId: '236c63c47334aa575b4537aa36088fcd',
      chains
  });
  const wagmiConfig = createConfig({
      autoConnect: true,
      connectors,
      publicClient
  });


  return (
    <main>
        <>
          <Head>
            <title>Mint on Base</title>
          </Head>
          <div> 
                <Image 
                src={bg}
                quality={100}
                fill
                style={{
                  objectFit: 'cover',
                  zIndex: '-1',
                }}
                />
          </div> 
          <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains}>              
              <h1 style={{'textAlign': "center", 'fontFamily': 'SFUI', "padding": "10px"}}>
                Onchain Summer is here!
              </h1>
              
              <h1 style={{'textAlign': "center", 'fontFamily': 'SFUI'}}>
                Mint this brand new NFT related to the Base "Onchain Summer" campaign
              </h1>
              
              

              <div>
                <Image
                src={nftimg}
                quality={100}
                style= {{"width": "30%", "height":"30%", "display": "block", "marginLeft": "auto", "marginRight": "auto", "marginTop": "3%"}}
                />
              </div>

              

              <div style={{"padding": "5px"}}>
                <MintNFT />
              </div>

              <div id="totalSupply" style={{'textAlign': "center", 'fontFamily': 'SFUI', "padding": "10px"}}>
                <GetTotalSupply />
              </div>

              <div style={{'position': "absolute", 'top': "15px", "right": "15px"}}>
                <ConnectButton />
              </div>


            </RainbowKitProvider>
          </WagmiConfig>

        </>
    </main>
  );
};



