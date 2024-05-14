# Boilerplate Foundry | Wagmi V2 | Viem V2 | RainbowKit V2 | Typescript | NextJS | ChakraUI

This project is a template that can serve as a basis for any new decentralized application project wanting to use foundry for the development of smart contracts and Next.js and Wagmi for the user interface.

https://www.loom.com/share/9a3456032f4d4123a47201bb8f36add0

<details>
<summary><h1>Preview</h1></summary>
  
![image](https://github.com/AlexScotte/boilerplate-foundry-nextjs-wagmi-rainbowkit/assets/53000621/621725c0-61f9-4ad4-925a-cf7ad0366116)

![image](https://github.com/AlexScotte/boilerplate-foundry-nextjs-wagmi-rainbowkit/assets/53000621/95f4d358-c908-4624-bc84-3d236d8cff18)

</details>

<details>
<summary><h1>Back-end</h1></summary>

## Description
  The smart contract is just a simple smart contract for storing and reading a digital value. It generates an event when the value is changed.

All commands must be executed in the backend folder (`cd backend`).

## Configuration

First you need to create a .env file in the root folder of the backend. The file must have these properties:
```
ADDRESS_WALLET_ANVIL="0xf39[...]266" // Address use to deploy contract on LOCALHOST (with "0x" prefix)
PRIVATE_KEY_WALLET_ANVIL="0xaa[...]80" // Private key of the address wallet above for deploying contract on LOCALHOST (with "0x" prefix)

ADDRESS_WALLET_PROD="0x0a[...]Ke" // Address use to deploy contract on MAINNET/TESTNET (with "0x" prefix)
PRIVATE_KEY_WALLET_PROD="0x45[...]1a" // Private key of the address wallet above for deploying contract on MAINNET/TESTNET (with "0x" prefix)

RPC_URL_SEPOLIA="https://eth-sepolia.g.alchemy.com/v2/Jk[...]ds" // Your favorite RPC to deploy on Testnet SEPOLIA
RPC_URL_ETH_MAINNET="https://eth-mainnet.g.alchemy.com/v2/Jk[...]ds" // Your favorite RPC to deploy on Ethereum MAINNET

ETHERSCAN_API_KEY="D[...]V" // Etherscan Api key to verify you contract on etherscan after deployment
```

## Deploying onchain
 * To deploy on LOCAL node, simply run your node with the command `make node` (or `anvil`) and execute the command `make deployCopy` (you can also use directly the forge command `forge script script/SimpleStorage.s.sol:SimpleStorageDeploy --rpc-url http://localhost:8545 --private-key $(PRIVATE_KEY_WALLET_ANVIL) --broadcast` but the make file is here to simplify this.

   Foundry will use configured wallet (***_WALLET_ANVIL) in your .env file to deploy the contract onchain.
 * To deploy on SEPOLIA testnet, execute the command `make deployCopy ARGS=sepolia` (you can also use directly the forge command `forge script script/SimpleStorage.s.sol:SimpleStorageDeploy --rpc-url $(RPC_URL_SEPOLIA) --private-key $(PRIVATE_KEY_WALLET_PROD) --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY)` but the make file is here to simplify this.

   Foundry will use configured wallet (***_WALLET_PROD) in your .env file to deploy the contract onchain. (don't forget to have faucet tokens in the wallet). 

<img width="907" alt="image" src="https://github.com/AlexScotte/boilerplate-hardhat-nextjs-wagmi-rainbowkit/assets/53000621/56e7c15b-cafd-418c-8e0b-f391021e6048">

After deploying the script will copy the ABI and deployed address of the contract into a folder in the front directory (editable in the script)
This makes it easy to modify and redeploy your contract and test it without importing the ABI.

![image](https://github.com/AlexScotte/boilerplate-hardhat-nextjs-wagmi-rainbowkit/assets/53000621/af11389b-4343-4058-be52-b9ab85be9c7e)


## Testing contract (optional)

Launch the coverage command `make coverage` (or `forge coverage`) to build and test the contract.

![image](https://github.com/AlexScotte/boilerplate-hardhat-nextjs-wagmi-rainbowkit/assets/53000621/75b7ab1b-b0c5-4bdd-bd9a-bb0130bf186d)

</details>

<details>
<summary><h1>Front-end</h1></summary>

## Description
The front is an interface which will allow interaction with the deployed smart contract. It allows the user to connect their wallet using the rainbow kit tool and to get and update the contract value on the blockchain.
The front is already deployed and you can interact with it 
https://boilerplate-hardhat-nextjs-wagmi-rainbowkit.vercel.app

All commands must be executed in the frontend folder (`cd frontend`).

## Configuration

If you want to deploy the front in local you must create a .env file in the root folder of the front-end. The file must have these properties:
```
NEXT_PUBLIC_WALLET_CONNECT=1[...]4 // Project ID created on wallet connect cloud to allow the user to connect via Wallet connect 
```
## Deploying on localhost

Simply run the command `make run` (or `npm run dev`) to deploy the front-end in local.

</details>
