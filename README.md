

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







  
