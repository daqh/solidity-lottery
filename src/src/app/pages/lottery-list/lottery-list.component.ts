import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LotteryFactoryService } from '../../services/lottery-factory.service';
import { CommonModule, NgFor, NgForOf, NgForOfContext } from '@angular/common';
import { timer } from 'rxjs';
import moment from 'moment';

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

  constructor(private lotteryFactoryService: LotteryFactoryService) { }

  ngOnInit() {
    this.lotteryFactoryService.getLotteries().then(lotteries => {
      this.lotteries = lotteries;
      timer(0, 1000).subscribe(() => {
        for (const lottery of this.lotteries) {
          lottery.remainingTime = moment(lottery.expiration).fromNow();
          lottery.isOver = moment(lottery.expiration).isBefore(moment());
        }
      });
    });
  }

}
