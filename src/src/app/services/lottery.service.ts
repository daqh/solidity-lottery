import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class LotteryService {

  private web3: Web3;

  constructor(private web3Service: Web3Service) {
    this.web3 = this.web3Service.getWeb3();
  }

}
