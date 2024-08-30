# Solidity Lottery

### Authors
[@daqh](https://github.com/daqh), [@YuriBrandi](https://github.com/YuriBrandi).

## Features

The Solidity smart contract allows for community-based, decentralized lotteries to be arranged.
Specifically, the lotteries are characterized by the following key features:

- **Unpredictable, and non-manipulable randomness**, based on the *Commit-Reveal scheme*, rather than block-dependant values.
- **Absent fraud risks**, thanks to the decentralized aspect of the lotteries, the manager has no exclusive control over lottery extraction and winner payment.
- Players involvement in the extraction, since players committed numbers are direclty used in the winner extraction.
- Automatic authentication through users' MetaMask crypto wallets.

## Commit-Reveal Scheme

### How does it work?
![solidity-lottery-cc(1)](https://github.com/user-attachments/assets/48b751b0-7469-416a-9475-6f78b76b409a)


Lotteries are divided into 3 phases:

1. During the **Commit phase**, players choose a value they *commit to*, this value is **secretly stored** as a commitment, which corresponds to the SHA3-256 digest of the combination of the *player's address* and their chosen value. During this phase, players pay the entry fee to the lottery manager.
2. In the **Reveal phase**, players have to reveal their chosen numbers. Note that only from now on a player can see other players' chosen values, and no new player can enter the lottery. The revealed values are verified thanks to the initial commitments, thus **a player cannot cheat by revealing a different number**. If a player reveals their number correctly, they will be added for the extraction phase.
3. Finally, in the **Extraction phase**, the revealed values are summed together in a single value used for extraction as `val mod participants.length`.

> **_NOTE:_** Image released under the [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) License, please refer to [this project's license](LICENSE) for author attribution.

### How is it effective?

As briefly mentioned above, a player cannot input a specific value for the purpose of winning the lottery as other players' chosen values are only revealed when the Commit phase ends.

This means that the only way to purposely choose a number that leads to one's victory, would be to brute force the SHA3-256 digests and "crack" every players' number in a reasonable time, quite *impossible*.

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
