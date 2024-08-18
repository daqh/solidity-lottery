import { Injectable } from '@angular/core';
import Web3, { Contract } from 'web3';
import LotteryContract from '../../../../build/contracts/Lottery.json';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  private web3: Web3;

  constructor() {
    this.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
  }

  getWeb3() {
    return this.web3;
  }

  async getLotteryContract() {
    const networkId = await this.web3.eth.net.getId();
    const deployedNetwork: any = LotteryContract.networks["5777"];
    return new this.web3.eth.Contract(LotteryContract.abi, deployedNetwork && deployedNetwork.address);
  }

}
