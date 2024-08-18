import { Injectable } from '@angular/core';
import LotteryFactoryContract from '../../../../build/contracts/LotteryFactory.json';
import { Web3Service } from './web3.service';
import Web3 from 'web3';


@Injectable({
  providedIn: 'root'
})
export class LotteryFactoryService {

  private web3: Web3;

  constructor(private web3Service: Web3Service) {
    this.web3 = web3Service.getWeb3();
  }

  async createLottery() {
    const lotteryFactory = new this.web3.eth.Contract(LotteryFactoryContract.abi, LotteryFactoryContract.networks['5777'].address);
    const accounts = await this.web3.eth.getAccounts();
    const account = accounts[0];
    return await lotteryFactory.methods['createLottery']().send({
      from: account,
      gas: "3000000"
    });
  }

  async getLotteries() {
    const lotteryFactory = new this.web3.eth.Contract(LotteryFactoryContract.abi, LotteryFactoryContract.networks['5777'].address);
    const lotteries = await lotteryFactory.methods['getLotteries']().call();
    return lotteries;
  }

}
