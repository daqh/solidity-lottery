import { Injectable } from '@angular/core';
import Web3, { Contract } from 'web3';
import LotteryContract from '../../../../build/contracts/Lottery.json';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  private web3: Web3;

  constructor() {
    this.web3 = new Web3((window as any).ethereum);
    this.web3.eth.provider!.on('accountsChanged', (accounts: string[]) => {
      window.location.reload();
    });
    // Login Metamask
    this.loginMetamask();
  }

  getWeb3() {
    return this.web3;
  }

  getAccount() {
    return new Observable<string>((observer) => {
      this.web3.eth.getAccounts().then(accounts => {
        observer.next(accounts[0]);
      });
    });
  }
  
  async getBalance(address: string) {
    console.log(address)
    const balance = await this.web3.eth.getBalance(address);
    console.log(`${balance} ETH`);
    return Web3.utils.fromWei(balance, 'ether');
  }

  isMetamaskInstalled() {
    return of((window as any).ethereum)
  }

  async loginMetamask() {
    const eth = this.web3.currentProvider as any;
    try {
      const accounts = await eth.request({ method: 'eth_requestAccounts' })
      console.log(accounts[0])
      const address = accounts[0];
      console.log(address)
      const balance = await this.getBalance(address);
      const payload = {
        address,
        balance
      }
      return { ...payload };
    } catch (error) {
      if ((error as any).code == -32002) {
        alert('Please connect to MetaMask.');
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async logoutMetamask() {
    const eth = this.web3.currentProvider as any;
    try {
      await eth.request({ method: 'eth_requestAccounts' })
    } catch (error) {
      console.error(error);
    }
  }

}
