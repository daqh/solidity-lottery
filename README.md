# Solidity Lottery

### Authors
[@daqh](https://github.com/daqh), [@YuriBrandi](https://github.com/YuriBrandi).

## Features

The Solidity smart contract allows for community-based, decentralized lotteries to be arranged.
Specifically, the lotteries are characterized by the following key features:

- **Unpredictable randomness**, based on the *Commit-Reveal scheme*, rather than block-dependant values.
- **Absent fraud risks**, thanks to the decentralized aspect of the lotteries, the manager has no exclusive control over lottery extraction and winner payment.
- Players involvement in the extraction, since players committed numbers are direclty used in the winner extraction.
- Automatic authentication through users' MetaMask crypto wallets.

## Commit-Reveal Scheme

### How does it work?
![solidity-lottery-cc](https://github.com/user-attachments/assets/1fc050b4-3ea3-47cf-9f25-d424fb1429eb)

> **_NOTE:_** Image released under the [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) License, please refer to [this project's license](LICENSE) for author attribution.

### How is it effective?


## Build

#### Requirements: 
- Node.js (tested on v20);
- Truffle suite (tested on 5.11.x);
- Ganache (tested on 2.7.x);
- Angular CLI (tested on 18.x).

### 1. Compile the contracts

  Run the compile command inside the root folder of the project.
   
   ```
   truffle compile
   ```

### 2. Deploy the contracts

  Run the migrate command inside the root folder of the project.
   
   ```
   truffle migrate
   ```

### 3. Launch Ganache

### 4. Build and deploy your 

  Run the Angular `serve` command inside the `src/` directory.
   
   ```
   ng serve
   ```

## UI

The Front-end Angular DApp is rather minimal, and offers high compatibility with the Truffle suite thanks to the *web3* library interfacing through the *Factory* contract.

*Screenshots*

## License

This project is distributed under the [MIT License](LICENSE).
