import { Injectable } from '@angular/core';
import LotteryFactoryContract from '../../../../build/contracts/LotteryFactory.json';
import LotteryContract from '../../../../build/contracts/Lottery.json';
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

  async createLottery(description: string, duration: number, prize: number) {
    const lotteryFactory = new this.web3.eth.Contract(LotteryFactoryContract.abi, LotteryFactoryContract.networks['5777'].address);
    const account = await this.web3Service.getAccount();
    return await lotteryFactory.methods['createLottery'](description, duration, this.web3.utils.toWei("0.01", "ether")).send({
      from: account,
      value: this.web3.utils.toWei(prize.toString(), "ether"),
      gas: "6721975",
    });
  }

  async getLotteries() {
    const lotteryFactory = new this.web3.eth.Contract(LotteryFactoryContract.abi, LotteryFactoryContract.networks['5777'].address);
    const lotteryIds = await lotteryFactory.methods['getLotteries']().call();
    const lotteries: any[] = []
    const account = await this.web3Service.getAccount();
    for (let i = 0; i < lotteryIds!.length; i++) {
      const lottery = new this.web3.eth.Contract(LotteryContract.abi, lotteryIds![i]);
      lotteries.push({
        id: lotteryIds![i],
        balance: Number(await lottery.methods['getBalance']().call() as string) / 1e18,
        manager: await lottery.methods['getManager']().call(),
        description: await lottery.methods['getDescription']().call(),
        participationFee: Number(await lottery.methods['getParticipationFee']().call() as string) / 1e18,
        prize: Number(await lottery.methods['getPrize']().call() as string) / 1e18,
        entries: Number(await lottery.methods['getEntries'](account).call()),
        contestants: await lottery.methods['getContestants']().call(),
        expiration: new Date(Number(await lottery.methods['getExpiration']().call()) * 1000),
        isOver: await lottery.methods['isOver']().call(),
      });
    }
    return lotteries;
  }

}
