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
  private account: any;

  constructor(private web3Service: Web3Service) {
    this.web3 = this.web3Service.getWeb3();
    this.web3Service.getAccount().subscribe(account => {
      this.account = account;
    });
  }

  async getLottery(id: string) {
    const lottery = new this.web3.eth.Contract(LotteryContract.abi, id);
    const data = {
      id: id,
      balance: Number(await lottery.methods['getBalance']().call() as string) / 1e18,
      manager: await lottery.methods['getManager']().call(),
      isManager: await lottery.methods['getManager']().call() === this.account,
      description: await lottery.methods['getDescription']().call(),
      participationFee: Number(await lottery.methods['getParticipationFee']().call() as string) / 1e18,
      prize: Number(await lottery.methods['getPrize']().call() as string) / 1e18,
      entries: Number(await lottery.methods['getEntries'](this.account).call()),
      contestants: await lottery.methods['getContestants']().call(),
      reveals: await lottery.methods['getReveals']().call(),
      expiration: new Date(Number(await lottery.methods['getExpiration']().call()) * 1000),
      revealWindow: new Date(Number(await lottery.methods['getRevealWindow']().call()) * 1000),
      isExpirationOver: await lottery.methods['isExpirationOver']().call(),
      isRevealWindowOver: await lottery.methods['isRevealWindowOver']().call(),
      winner: null,
    };
    if(data.isRevealWindowOver) {
      data.winner = await lottery.methods['getWinner']().call();
    }
    return data;
  }

  async enter(id: string) {
    const choosenNumber = Math.floor(Number.MAX_SAFE_INTEGER * Math.random());
    const salt = Math.floor(Number.MAX_SAFE_INTEGER * Math.random());
    // const choice = keccak256(Buffer.from(choosenNumber.toString() + salt.toString()));
    const choice = solidityPackedKeccak256(['address', 'uint256', 'uint256'], [this.account, choosenNumber, salt]);
    console.log(choice);
    const otherChoices = JSON.parse(localStorage.getItem(id) || '{}');
    if (!(this.account in otherChoices)) {
      otherChoices[this.account] = {};
    }
    otherChoices[this.account][choosenNumber] = {
      salt,
      revealed: false,
    };
    const lottery = new this.web3.eth.Contract(LotteryContract.abi, id);
    if (await lottery.methods['isExpirationOver']().call()) {
      throw new Error('The lottery is over');
    }
    const _fee = Number(await lottery.methods['getParticipationFee']().call()).toString();
    const result = await lottery.methods['enter'](choice).send({
      from: this.account,
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
    const accountChoices = choices[account];
    for (const choosenNumber in accountChoices) {
      const choice = accountChoices[choosenNumber];
      const { salt, revealed } = choice;
      if (revealed) {
        continue;
      }
      try {
        const result = await lottery.methods['reveal'](choosenNumber, salt).send({
          from: account,
          gas: "6721975",
        });
        console.log(result);
        choice.revealed = true;
      } catch (e) {
        console.error(e);
      }
    }
    localStorage.setItem(id, JSON.stringify(choices));
  }

}
