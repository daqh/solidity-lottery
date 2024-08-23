import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';
import LotteryContract from '../../../../build/contracts/Lottery.json';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class LotteryService {

  private web3: Web3;

  constructor(private web3Service: Web3Service) {
    this.web3 = this.web3Service.getWeb3();
  }

  async enter(id: string) {
    const lottery = new this.web3.eth.Contract(LotteryContract.abi, id);
    const accounts = await this.web3.eth.getAccounts();
    const account = accounts[0];
    return await lottery.methods['getParticipationFee']().call().then((fee) => {
      const _fee = Number(fee).toString();
      lottery.methods['enter'](45).send({
        from: account,
        value: _fee,
        gas: "6721975",
      }).then(() => {
        alert('You have entered the lottery!');
      }).catch((error) => {
        alert('Error entering the lottery: ' + error);
      });
    });
  }

}
