import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from "wagmi";
import tokenContract from "./contract.json";




export function MintNFT() {
  const NFT_CONTRACT_ADDRESS = "0x078f5a3799E869467a613D28Ab5B7ad2b1Ffd6a6";
  const { 
    config,
    error: prepareError,
    isError: isPrepareError, } = usePrepareContractWrite({
      address: NFT_CONTRACT_ADDRESS,
      abi: tokenContract.abi,
      functionName: 'mintNFT',
  })

  const { data, error, isError, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
  })

  return (
    <div style={{"margin": "auto", "width": "20%"}}>
      <button className="button-1" disabled={!write || isLoading} onClick={() => write()}>
        {(!write) ? "Please connect your wallet" : (isLoading ?  "Minting..." : "Mint")}
        </button>
        {isSuccess && (
        <div style={{'textAlign': "center", 'fontFamily': 'SFUI', 'font-size': '15px', 'padding': "10px"}}>
          Successfully minted your NFT!
          <div style={{'font-size': '12px'}}>
            <a href={`https://basescan.org/tx/${data?.hash}`}>click here to view transaction on BaseScan</a>
            </div>
          </div>
          )}
        {(isPrepareError || isError) && (
        <div style={{'fontFamily': 'SFUI', 'font-size': '10px', 'padding': "10px", 'textAlign': 'center'}}>Error: {(prepareError || error)?.message}</div>
      )}
    </div>
  )
};

