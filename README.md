

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
