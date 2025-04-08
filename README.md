# Stylus Artbitrum ERC721 Token

Configure Stylus by visiting [Arbitrum Stylus](https://docs.arbitrum.io/stylus/quickstart)

Creating a project:
```
cargo stylus new <YOUR_PROJECT_NAME>
```

check the project

> If you end up with `error[E0463]: can't find crate for `core`` try -
```
rustup default 1.80
rustup target add wasm32-unknown-unknown --toolchain 1.80
```

```
cargo stylus check -e https://sepolia-rollup.arbitrum.io/rpc
```

```
cargo stylus deploy \
   --endpoint='https://sepolia-rollup.arbitrum.io/rpc' \
   --private-key="<YOUR_PRIVATE_KEY>" \
   --estimate-gas
```

Estimates the gas required and prints it out-

`
stripped custom section from user wasm to remove any sensitive data
contract size: 24.5 KB (24525 bytes)
wasm size: 89.3 KB (89321 bytes)
File used for deployment hash: ./Cargo.lock
File used for deployment hash: ./Cargo.toml
File used for deployment hash: ./examples/counter.rs
File used for deployment hash: ./rust-toolchain.toml
File used for deployment hash: ./src/lib.rs
File used for deployment hash: ./src/main.rs
project metadata hash computed on deployment: "37f08c6c7c172be74d5b9ba715fdb0da6751240cec0b6afab0808229696d49e2"
stripped custom section from user wasm to remove any sensitive data
contract size: 24.5 KB (24525 bytes)
wasm data fee: 0.000131 ETH (originally 0.000110 ETH with 20% bump)

estimates
deployment tx gas: 5399499
gas price: "0.100000000" gwei
deployment tx total cost: "0.000539949900000000" ETH

`


```
cargo stylus deploy \
   --endpoint='https://sepolia-rollup.arbitrum.io/rpc' \
   --private-key="<YOUR_PRIVATE_KEY>"

```


Now deploy the contract to Arbitrum sepolia testnet, make sure you have arb sepolia.
If you dont have arb sepolia you can get Eth Sepolia and use [Bridge](https://bridge.arbitrum.io/?destinationChain=arbitrum-sepolia&sourceChain=sepolia)
Refer [this](https://academy.horizonprotocol.com/futures/guides/futures-testnet-guide/1.-getting-started/b.-get-arbitrum-sepolia-eth)

Export the Abi-

```
cargo stylus export-abi
```


## Interacting with smart contract via viem

```

mkdir my_project
cd my_project

pnpm init

<!-- Next, install TypeScript, @types/node, dotenv, and ts-node -->
pnpm add typescript @types/node dotenv ts-node
```
```

<!-- Set Up TypeScript Configuration -->
touch tsconfig.json

```
Add following to the tsconfig.json
```
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "esModuleInterop": true,
    "outDir": "./dist",
    "moduleResolution": "node",
    "resolveJsonModule": true,
  }
}
```

```
<!-- Create source directory with index.ts in it -->
mkdir src
touch src/index.ts

```

configure your package.json like wise
{
  ...
  "main": "src/index.js",
  "type": "module",
  "scripts": {
    "dev": "node --loader ts-node/esm ./src/index.ts"
  }
  ...
  
}

Create .env and :
```
PRIVATE_KEY=your_private_key
RPC_URL=your_rpc_url

```


```

```
pnpm run dev
```









# Arbitrum

The core goal of Arbitrum is to enable fast and cost-efficient transactions on Ethereum. 
It achieves this through the technology of Optimistic Rollups by bundling many transactions into one group, thus reducing network congestion and significantly increasing processing capacity.

Arbitrum's primary products include Arbitrum One, Arbitrum Nitro, Arbitrum Nova, Arbitrum Orbit, Arbitrum Stylus

Arbitrum is an L2 scaling solution for Ethereum, combining its unique advantages:

1. Trustless Security: Security is rooted in Ethereum, allowing anyone to ensure the correct L2 outcomes.
2. Ethereum Compatibility: All contracts and transfers that are EVM-standard can be executed on Arbitrum.
3. Scalability: Transfers Ethereum's computation and storage off-chain, resulting in higher throughput.
4. Lowest Cost: Designed to minimize Ethereum L1 gas costs, reducing the cost per transaction.


![image](https://github.com/user-attachments/assets/7f357992-ac20-4567-98ec-94876d5e5bef)

## AVM
The AVM (Arbitrum Virtual Machine) is specifically designed for Arbitrum to execute and manage operations and states on the Arbitrum Classic.

In the context of blockchain, a virtual machine (VM) is a software that runs programs, often referred to as the runtime environment for executing blockchain smart contracts.

AVM is only used on Arbitrum classic, whose working model is quite simple: 
  it reads messages from the inbox (all messages received in the inbox are recorded on Ethereum in the form of calldata), changes the chain's state, and generates outputs.
  The design of the AVM is based on the Ethereum Virtual Machine (EVM), as AVM aims to efficiently execute programs written or compiled for the EVM, hence many design aspects of the EVM are retained.

### ArbOS
ArbOS (the second-layer state machine) is software developed by Offchain Labs that is responsible for handling all the logic and state updates of Arbitrum. 
It is called ArbOS because it functions like the operating system of a computer or smartphone, initiating startup and then managing other codes on the chain.

ArbOS is the Layer 2 EVM hypervisor that facilitates the execution environment of L2 Arbitrum.
ArbOS accounts for and manages network resources, produces blocks from incoming messages, and operates its instrumented instance of Geth for smart contract execution.
> In the "Geth sandwich" structure, ArbOS is located in the middle layer, its primary functions include parsing the data batches issued by the sequencer, calculating the gas cost on Layer 1, and collecting fees to compensate for them. ArbOS acts as a bridge in this structure, connecting the bottom layer's Geth simulating EVM contract execution with the top layer's handling of network requests and other advanced functionalities.


### Arbitrum Nitro
Arbitrum nitro is a technical stack upgrade of Classic to address issues like :
bringing users reduced fees - efficiency
increased capacity - efficiency
overall faster experience - performance 



### Sequencer

![image](https://github.com/user-attachments/assets/d27c1146-c1e1-4610-8a99-50c8ba0edba9)

Sequencer in Arbitrum is a specifically designated node, primarily responsible for determining the order of transaction execution.

Arbitrum Sequencer operates on a **first-come, first-served basis,** inserting transactions into a queue based on the order they are received, before submitting the user's transactions to L1.

This queue replaces the mempool. (Mempool is a holding area for transactions on Ethereum that have yet to be confirmed. The order of transactions within the mempool is primarily governed by transaction fees, incentivizing users to expedite the processing of their transactions by paying higher fees.)

Transactions within Sequencer that are not executed on time will eventually time out and be discarded.

### State Transition Function
![image](https://github.com/user-attachments/assets/0b33ab4a-8d1d-4643-a24b-f6dd43abe5c7)


0. Input: The input of state transition function includes two parts:
     - Current State: This refers to all the information on the blockchain, such as account balances, smart contract code, etc.
     - Next Transaction: This is the transaction that will be processed next, which may change account balances, contract states, etc.
1. Processing: After receiving the current state and the next transaction, state transition function processes the transaction according to predetermined rules.
   For example, it verifies the validity of the transaction (whether the sender has enough balance for the transfer), etc.
2. Update State: Once the transaction is verified and processed, the blockchain's state is updated.
3. Generating a New Layer 2 Block: Sometimes, state transition function also generates a new Layer 2 block. This block contains a series of transactions and records their results on the chain. The purpose of this is to improve processing speed and efficiency by aggregating multiple transactions on Layer 2, reducing reliance and pressure on Ethereum.


Once a transaction is verified and processed through state transition function, the blockchain's state is updated. 
Additionally, state transition function sometimes generates a new Layer 2 block, containing a series of transactions and recording their results on the chain, to improve processing speed and efficiency by aggregating multiple transactions on Layer 2, reducing reliance and pressure on Ethereum.

## Transaction Execution

### Two-Phase Transaction Execution in Arbitrum One

#### First Phase: Self-Processing on Layer2

![image](https://github.com/user-attachments/assets/01ce0458-0d3e-43b2-99ff-2e46107ab05c)

First Phase: Self-Processing on Layer2
1. Creating and Sending Transactions: Users create a transaction, which, after being confirmed via wallet signature, is sent to Arbitrum One's Sequencer.
2. Work of Sequencer: Upon receiving the user's transaction, Sequencer arranges it with other transactions in order of arrival, based on a first-come, first-served principle.
3. State Transition Function: The sequenced transactions are processed one by one through state transition function. This function updates chain's state based on the current chain state (such as     account balances) and received transactions.
4. Handling Invalid Transactions: If Sequencer sends invalid transactions, state transition function will identify and discard these transactions.
5. Determinism: The behavior of state transition function is entirely determined by the current chain state and the next received transaction (the workflow of state transition function has been detailed in the previous section), meaning it is predictable. Therefore, as long as the transaction order is known, anyone can independently calculate the chain's state.
At this point, the transaction has not been submitted to Ethereum yet and can still be altered, so it is considered a "soft confirmation."

However, for users, this step is essentially complete, although there are many more steps to ensure security.Second Phase: Acquiring the Transaction SequenceSequencer publishes the transaction sequence in two ways: real-time feeds and batches posted on Ethereum.

- Real-time Feeds: As each transaction is sequenced, Sequencer publishes instant feed to all subscribers.
- Batches on Ethereum L1: Sequencer also periodically compresses the transaction sequence and posts it on Ethereum L1 chain (stored in the form of calldata), becoming the official and final record of the transaction sequence. Once this data is confirmed on Ethereum, the related transactions are considered final, also known as "hard confirmation."


It's important to note that Sequencer's operation in the "state transition function" during the first phase is public, and anyone can calculate the chain's state based on the transaction order they know, leading to the same result for all honest parties.Therefore, Arbitrum One's nodes do not need a consensus mechanism; they just need to acquire the transaction sequence (real-time feeds and batch retrieval on Ethereum), and run it locally, significantly reducing costs.

Therefore, Arbitrum One's nodes do not need a consensus mechanism; they just need to acquire the transaction sequence (real-time feeds and batch retrieval on Ethereum), and run it locally, significantly reducing costs.

![image](https://github.com/user-attachments/assets/1ab66c64-cb89-40ad-bd75-6042ba1dd508)

 That all is fine but how does the state transition function and everything done technically?-

 Here comes mighty Geth is go ethereum client It allows anyone to run an Ethereum node, participate in the Ethereum network, and use Geth to send Ether, create smart contracts, etc.

![image](https://github.com/user-attachments/assets/7f8e561f-3b5e-46e4-b967-9d0420476045)

- The bottom layer is the core part of Geth, responsible for simulating the execution of EVM (Ethereum Virtual Machine) contracts and maintaining Ethereum's state data structures.
- The middle layer, known as ArbOS (previously mentioned), provides functions such as parsing data batches issued by the sequencer, calculating the gas cost on Layer 1, and collecting fees to compensate for them.
- The top layer is mainly composed of node software provided by Geth, handling connections from clients and RPC requests, as well as other advanced functionalities required to run a blockchain node compatible with Ethereum.

> State Transition Function mentioned earlier is comprised of Geth's bottom layer and a part of ArbOS.


Fraud proofs is a blockchain technology used to ensure the correctness of transaction executions. 
They allow anyone to challenge the outcome of transactions on the chain. 

If errors or fraudulent actions are detected, evidence (fraud proofs) can be provided to prove the mistake, thereby ensuring the security of the data on the chain.

In simple terms, the workflow of fraud proofs is as follows:
1. Submit Transactions: Sequencer submit transactions batch to L1.
2. Optimistic Execution: The makenodes validator sends the after state of those transaction to L1 rollups contract. And the rollup contract will assume this state is correct.
3. Challenge Period: After submitting state to rollup contract, there is a time window that allows other participants to review these transactions. If they believe a transaction results recorded on L1 is incorrect or fraudulent, they can submit a fraud proof to challenge the transaction.
4. Verification of Proof: Once a fraud proof is submitted, the system undertakes a detailed verification process to check if the challenge is valid.
5. Determination of Outcome: If the challenge is valid, the incorrect transaction results recorded on L1 is revoked, ensuring correctness. If the challenge is invalid, the original transaction results recorded on L1 is confirmed as accurate.


No there are thwo things one you have operations which you to like generating block using STF(state transition function) etc, the other is verifying execution result.

![image](https://github.com/user-attachments/assets/a3955c2f-cebd-41bb-88f4-d19937524881)

Simple use 
- Go lang compiler and computation for operations
- leverage WASM by compiling fraud proof into WASM- Nitro has fine tune this to make it more suitable naming it as WAVM code.
If someone has doubts about the results of operations, this WAVM format code can be used for verification.

> WebAssembly (abbreviated as WASM) is a bytecode format that provides high performance for web applications. In the blockchain domain, the application of WebAssembly (WASM) mainly focuses on the development and execution of smart contracts, allowing developers to write smart contracts in various high-level programming languages (such as Rust, C++) and then compile these contracts into WASM bytecode to run efficiently on blockchain platforms.

#### Interactive Fraud Proofs
The main benefit of interactive fraud proofs is resolving disputes off-chain through participant interaction, thus reducing reliance on the blockchain contract. This method narrows down disputes to a specific operation through a series of steps, and the blockchain contract only intervenes at this smallest point to make a final judgment, significantly reducing the blockchain's burden.

### Arbitrum Nova

![image](https://github.com/user-attachments/assets/714aea0d-a89c-4c65-be89-eb14e3b16380)


Both Arbitrum One and Arbitrum Nova use nitro codebase, but One uses ordinary mode and Nova uses anytrust mode. 
The core of anytrust involves creating a trusted group called Data Availability Committee (detailed in the next section). 
With this group's assistance in recording transaction data, we sacrifice a degree of decentralization in exchange for improved performance, making it highly suitable for scenarios sensitive to speed and costs, such as gaming, social media, and lightweight financial applications.


**Data Availability Committee** is a group composed of authorized nodes. Members of this committee store and manage data on blockchain and are responsible for providing it when other parts of the network need access to these data.

**AnyTrust**
AnyTrust is a variant of the Nitro technology stack that accepts a small trust assumption to reduce costs.
AnyTrust relies on the Data Availability Committee (DAC) to help store and provide data. 
This committee might have many members, and AnyTrust assumes that at least two members are honest. To generate a DACert, it requires the commitment and signature from N - 1 committee members for data access. 

If two honest members oppose the generation of a malicious certificate, the signature process cannot be completed, and the system will automatically revert to rollup mode.
Furthermore, when a third party attempts to access data later, the presence of honest nodes ensures that data can be properly obtained and verified through a DACert recorded on the parent chain. This mechanism allows the system to function, ensuring data is always available when needed, rather than having to publicly store all data, thereby reducing costs
![image](https://github.com/user-attachments/assets/d42f7d9f-9a86-4618-a597-decc60e29af8)

**Data Availability Servers (DAS)**
Data Availability Servers (DAS) is software run by committee members to help store and retrieve data on blockchain. DAS offers two main ways to interact with the outside world:

- **Sequencer API**:This is an interface specifically designed for Sequencer on Arbitrum. It allows the Sequencer to submit data blocks for storage to DAS. For security reasons, this interface is usually set to allow only Sequencer access, preventing other unauthorized access.(iNTERNAL OPS)
- **REST API** : This is a globally accessible interface that allows data blocks to be retrieved via their hash values.

![image](https://github.com/user-attachments/assets/fe471690-79a8-49fc-a37d-a7810f580766)

Interaction Between Sequencer and the Committee
![image](https://github.com/user-attachments/assets/7b25e00e-a69c-4863-bbfd-7bb00d40ecc2)

The interaction includes data submission, the signing process, and creating and publishing DACert. 
Sequencer submits the prepared data and expiration time to the Data Availability Committee, committee members sign the hash value of the data and the expiration time, and once the Sequencer collects enough signatures, it creates a valid Data Availability Certificate (DACert) and publishes it on the L1.

**The Core Difference Between One And Nova**
The most fundamental difference lies in data availability: the data availability for One is on-chain (Ethereum mainnet), whereas for Nova, it is off-chain (Data Availability Committee, DAC).


One publishes the complete data in the form of Calldata on Ethereum. 
Since Calldata occupies a certain amount of space in the mainnet block, the gas fees paid for this operation constitute the largest part of One's costs.Nova offers two methods of data publication: one is similar to One, publishing the complete data in the form of Calldata, and the other is publishing a DACert to prove data availability.

**Arbitrum Orbit**

![image](https://github.com/user-attachments/assets/e6b0afc9-dd42-4cea-9d74-e1fa0ac60bcf)



## Arbitrum Stylus
A TestNet
Stylus is an upgrade to the Arbitrum Nitro technology stack, which supports Arbitrum One, Arbitrum Nova, and Arbitrum Orbit chains.
This upgrade introduces a second virtual machine to the EVM, with the behavior of EVM contracts being identical to their behavior on Ethereum.
This paradigm is referred to as EVM+.

This second virtual machine executes WebAssembly (WASM) instead of EVM bytecode. With the WASM virtual machine, any programming language that can be compiled into WASM falls within the scope of Stylus. 
This means that traditional internet domain programmers proficient in Rust, C, C++, and other languages that compile into WASM can participate in blockchain contract development without needing to learn Solidity or other native smart contract development languages.

![image](https://github.com/user-attachments/assets/3ecca5a5-7bc9-4bee-96d8-4d868bcdd880)


**How does Stylus wORK?**

Stylus is a blockchain platform that allows developers to create smart contracts using various programming languages, breaking down the development and deployment of smart contracts into four main steps: coding, compiling, executing, and verifying.

![image](https://github.com/user-attachments/assets/f383454b-5759-4ffd-8c81-9565505d0fed)


Finally, if disputes arise among verifiers during the execution of smart contracts, Stylus leverages Nitro technology to convert the execution history back into WASM format for verification and dispute resolution on Ethereum.

**CONCLUSION**

![image](https://github.com/user-attachments/assets/94bb54cf-235f-4693-8f2e-7df4639512c3)






  
