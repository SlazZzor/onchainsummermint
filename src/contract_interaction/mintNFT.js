import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from "wagmi";
import tokenContract from "./contract.json";




export function MintNFT() {
  const NFT_CONTRACT_ADDRESS = "0xEAF4F4DaDA2e9E0Aeb09DD18932c8A255cF0c06d";
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
        {(!write || isLoading) ? "Please connect your wallet" : "Mint"}
        {isLoading ? 'Minting...' : ''}
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

