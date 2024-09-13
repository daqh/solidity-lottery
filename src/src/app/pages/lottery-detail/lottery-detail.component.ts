import { Component, NgZone, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LotteryService } from '../../services/lottery.service';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Web3Service } from '../../services/web3.service';
import { timer } from 'rxjs';
import moment from 'moment';

@Component({
  selector: 'app-lottery-detail',
  standalone: true,
  imports: [
    CommonModule, RouterLink, FormsModule, NgIf, NgClass, NgFor,
  ],
  templateUrl: './lottery-detail.component.html',
  styleUrl: './lottery-detail.component.css',
})
export class LotteryDetailComponent implements OnInit {

  id?: string;
  lottery: any = {};
  isLoading = true;
  account?: string;
  tickets: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private lotteryService: LotteryService,
    private web3Service: Web3Service,
    private ngZone: NgZone,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.lotteryService.getLottery(this.id!).then(lottery => {
        this.lottery = lottery;
        this.isLoading = false;
        this.lottery.expirationDelta = moment(this.lottery.expiration).fromNow();
        this.lottery.isExpirationOver = moment(this.lottery.expiration).isBefore(moment());
        this.lottery.revealWindowDelta = moment(this.lottery.revealWindow).fromNow();
        this.lottery.isRevealWindowOver = moment(this.lottery.revealWindow).isBefore(moment());
        timer(0, 1000).subscribe(() => {
          this.lottery.expirationDelta = moment(this.lottery.expiration).fromNow();
          this.lottery.isExpirationOver = moment(this.lottery.expiration).isBefore(moment());
          this.lottery.revealWindowDelta = moment(this.lottery.revealWindow).fromNow();
          this.lottery.isRevealWindowOver = moment(this.lottery.revealWindow).isBefore(moment());
        });
      });
    });
    this.web3Service.getAccount().subscribe(account => {
      this.account = account;
      this.tickets = this.getTickets(this.account);
      this.ngZone.run(() => {});
    });
  }

  isOver() {
    return new Date() > this.lottery.expiration;
  }

  onSubmit() {
    this.lotteryService.enter(this.id!).then(() => {
      window.location.reload();
    });
  }

  getTickets(account: string) {
    const choices = JSON.parse(localStorage.getItem(this.id!) || '{}');
    let accountChoices: any = {} //choices[account.toString()] || {};
    for (let key in choices) {
      if (key === account) {
        accountChoices = choices[account];
      }
    }
    const tickets = [];
    // console.log(account, choices, choices[account]);
    for (let key in accountChoices) {
      tickets.push({ number: key, ...accountChoices[key] });
    }
    return tickets;
  }

  hasNoTickets() {
    for (let key in this.tickets) {
      if (this.tickets[key].revealed === false) {
        return false;
      }
    }
    return true;
  }

  onReveal() {
    this.lotteryService.reveal(this.id!).then(() => {
      this.tickets = this.getTickets(this.account!);
    });
  }

  canWithdraw() {
    if (this.lottery.winner === null) {
      return this.lottery.isRevealWindowOver && this.lottery.manager === this.account;
    } else if (this.lottery.isRevealWindowOver && this.lottery.reveals.length === 0) {
      return this.account === this.lottery.manager;
    } else {
      return this.lottery.winner === this.account;
    }
  }

  withdraw() {
    this.lotteryService.withdraw(this.id!).then(() => {
      window.location.reload();
    });
  }

}
