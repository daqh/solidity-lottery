import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LotteryService } from '../../services/lottery.service';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-lottery-detail',
  standalone: true,
  imports: [
    RouterLink, FormsModule, NgIf, NgClass, NgFor,
  ],
  templateUrl: './lottery-detail.component.html',
  styleUrl: './lottery-detail.component.css',
})
export class LotteryDetailComponent implements OnInit {

  id?: string;
  lottery: any = {};
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private lotteryService: LotteryService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.lotteryService.getLottery(this.id!).then(lottery => {
        this.lottery = lottery;
        this.isLoading = false;
      });
    });
  }

  isOver() {
    return new Date() > this.lottery.expiration;
  }

  onSubmit() {
    this.lotteryService.enter(this.id!).then(() => {
      alert('You have entered the lottery!');
    });
  }

  get tickets() {
    const choices = JSON.parse(localStorage.getItem(this.id!) || '{}');
    const tickets = [];
    for (let key in choices) {
      tickets.push({ number: key, salt: choices[key] });
    }
    return tickets;
  }

  hasNoTickets() {
    return this.tickets.length === 0;
  }

  onReveal() {
    this.lotteryService.reveal(this.id!).then(() => {
      
    });
  }

}
