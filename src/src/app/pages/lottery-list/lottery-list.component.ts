import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LotteryFactoryService } from '../../services/lottery-factory.service';
import { CommonModule, NgFor, NgForOf, NgForOfContext } from '@angular/common';
import { timer } from 'rxjs';
import moment from 'moment';
import { Web3Service } from '../../services/web3.service';

@Component({
  selector: 'app-lottery-list',
  standalone: true,
  imports: [CommonModule, RouterLink, NgForOf],
  templateUrl: './lottery-list.component.html',
  styleUrl: './lottery-list.component.css'
})
export class LotteryListComponent {

  lotteries: any;
  timer = timer(0, 1000);

  constructor(
    private lotteryFactoryService: LotteryFactoryService,
    private web3Service: Web3Service,
  ) { }

  ngOnInit() {
    this.lotteryFactoryService.getLotteries().then(lotteries => {
      this.lotteries = lotteries;
      this.web3Service.getAccount().subscribe(account => {
        for (const lottery of this.lotteries) {
          const choices = JSON.parse(localStorage.getItem(lottery.id) || '{}');
          const accountChoices = choices[account] || {};
          lottery.tickets = Object.keys(accountChoices).length;
        }
      });
      for (const lottery of this.lotteries) {
        lottery.expirationDelta = moment(lottery.expiration).fromNow();
        lottery.isOver = moment(lottery.expiration).isBefore(moment());
        lottery.revealWindowDelta = moment(lottery.revealWindow).fromNow();
        lottery.isRevealWindowOver = moment(lottery.revealWindow).isBefore(moment());
      }
      timer(0, 1000).subscribe(() => {
        for (const lottery of this.lotteries) {
          lottery.remainingTime = moment(lottery.expiration).fromNow();
          lottery.isOver = moment(lottery.expiration).isBefore(moment());
        }
      });
    });
  }

}
