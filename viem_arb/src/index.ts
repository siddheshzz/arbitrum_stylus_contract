import "dotenv/config";
import {
  createWalletClient,
  http,
  publicActions,
  parseAbi,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { arbitrumSepolia } from "viem/chains";

const ERC721_ADDRESS = "0xA097D7D1918DC539b22Ab24747354391F1f45543";
const WALLET_ADDRESS = "0xBB1EEdbEbdD29898ad0911CC4262E39A7D21daC8";

const main = async () => {
  const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);

  const walletClient = createWalletClient({
    account,
    chain: arbitrumSepolia,
    transport: http(process.env.RPC_URL),
  }).extend(publicActions);

  const address = await walletClient.getAddresses();
  console.log(`The wallet address is ${address}`);

  const erc721Abi = parseAbi([
    "function setTokenUri(uint256 token_id, string calldata token_uri) external",
    "function tokenUri(uint256 token_id) external view returns (string memory)",
    "function totalSupply() external view returns (uint256)",
    "function mintToken(address to, string calldata token_uri) external",
    "function ownerOf(uint256 token_id) external view returns (address)",
    "error ERC721InvalidOwner(address)",


    "error ERC721InvalidReceiver(address)" ,

    "error ERC721InvalidSender(address)" ,

    "error ERC721NonexistentToken(uint256)",

    "error ERC721InsufficientApproval(address, uint256)",

    "error ERC721InvalidApprover(address)",
  ]);
// Mint NFTS below with receipt
//   const receipt = await walletClient.writeContract({
//     address: ERC721_ADDRESS,
//     abi: erc721Abi,
//     functionName: "mintToken",
//     args: [WALLET_ADDRESS, "URI of the token 1"],
//     chain: arbitrumSepolia,
//     account: account,
//   });

//   console.log(`Receipt: ${receipt}`);


  const TOKEN_ID = 1n;

  const totalSupply = await walletClient.readContract({
    address: ERC721_ADDRESS,
    abi: erc721Abi,
    functionName: "totalSupply",
  });

  console.log(`The total supply is ${totalSupply}`);

  const tokenUri = await walletClient.readContract({
    address: ERC721_ADDRESS,
    abi: erc721Abi,
    functionName: "tokenUri",
    args: [TOKEN_ID],
  });

  console.log(`The token URI of the Token ${TOKEN_ID} is ${tokenUri}`);

  const ownerOf = await walletClient.readContract({
    address: ERC721_ADDRESS,
    abi: erc721Abi,
    functionName: "ownerOf",
    args: [TOKEN_ID],
  });

  console.log(`The owner of the Token ${TOKEN_ID} is ${ownerOf}`);
};

main();