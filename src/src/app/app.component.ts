import { Component, NgZone, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Web3Service } from './services/web3.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {

  title = 'solidity-lottery';
  public account: any;

  constructor(
    private web3Service: Web3Service,
    private ngZone: NgZone,
  ) {}

  async ngOnInit() {
    this.web3Service.getAccount().subscribe(account => {
      this.account = account;
      this.ngZone.run(() => {});
    });
  }

  loginMetamask() {
    
  }

  logoutMetamask() {

  }

}
