import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Web3Service } from '../../services/web3.service';
import { LotteryService } from '../../services/lottery.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  private web3: any;

  constructor(private web3Service: Web3Service, private lotteryService: LotteryService) {
    this.web3 = this.web3Service.getWeb3();
    this.lotteryService.getTickets().then((tickets: any) => {
      console.log(tickets);
    });
  }

}
