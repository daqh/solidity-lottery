import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';
import LotteryContract from '../../../../build/contracts/Lottery.json';
import Web3 from 'web3';
// import keccak256 from 'keccak256';
import { Buffer } from "buffer";
import { solidityPackedKeccak256, solidityPacked } from 'ethers';
window.Buffer = window.Buffer || Buffer;

@Injectable({
  providedIn: 'root'
})
export class LotteryService {

  private web3: Web3;

  constructor(private web3Service: Web3Service) {
    this.web3 = this.web3Service.getWeb3();
  }

  async getLottery(id: string) {
    const lottery = new this.web3.eth.Contract(LotteryContract.abi, id);
    const account = await this.web3Service.getAccount();
    return {
      id: id,
      balance: Number(await lottery.methods['getBalance']().call() as string) / 1e18,
      manager: await lottery.methods['getManager']().call(),
      description: await lottery.methods['getDescription']().call(),
      participationFee: Number(await lottery.methods['getParticipationFee']().call() as string) / 1e18,
      prize: Number(await lottery.methods['getPrize']().call() as string) / 1e18,
      entries: Number(await lottery.methods['getEntries'](account).call()),
      contestants: await lottery.methods['getContestants']().call(),
      expiration: new Date(Number(await lottery.methods['getExpiration']().call()) * 1000),
      isOver: await lottery.methods['isOver']().call(),
    };
  }

  async enter(id: string) {
    const choosenNumber = Math.floor(Number.MAX_SAFE_INTEGER * Math.random());
    const salt = Math.floor(Number.MAX_SAFE_INTEGER * Math.random());
    // const choice = keccak256(Buffer.from(choosenNumber.toString() + salt.toString()));
    const accounts = await this.web3.eth.getAccounts();
    const account = accounts[0];
    const choice = solidityPackedKeccak256(['address', 'uint256', 'uint256'], [account, choosenNumber, salt]);
    console.log(choice);
    const otherChoices = JSON.parse(localStorage.getItem(id) || '{}');
    otherChoices[choosenNumber] = salt;
    const lottery = new this.web3.eth.Contract(LotteryContract.abi, id);
    if (await lottery.methods['isOver']().call()) {
      throw new Error('The lottery is over');
    }
    const _fee = Number(await lottery.methods['getParticipationFee']().call()).toString();
    const result = await lottery.methods['enter'](choice).send({
      from: account,
      value: _fee,
      gas: "6721975",
    });
    localStorage.setItem(id, JSON.stringify(otherChoices));
    return result;
  }

  async reveal(id: string) {
    const choices = JSON.parse(localStorage.getItem(id) || '{}');
    const lottery = new this.web3.eth.Contract(LotteryContract.abi, id);
    const accounts = await this.web3.eth.getAccounts();
    const account = accounts[0];
    for (const choosenNumber in choices) {
      const salt = choices[choosenNumber];
      try {
        const result = await lottery.methods['reveal'](choosenNumber, salt).send({
          from: account,
          gas: "6721975",
        });
        console.log(result);
      } catch (e) {
        console.error(e);
      }
    }
    localStorage.removeItem(id);
  }

}
