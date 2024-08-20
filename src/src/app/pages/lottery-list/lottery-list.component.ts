import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LotteryFactoryService } from '../../services/lottery-factory.service';
import { NgFor, NgForOf, NgForOfContext } from '@angular/common';

@Component({
  selector: 'app-lottery-list',
  standalone: true,
  imports: [RouterLink, NgForOf],
  templateUrl: './lottery-list.component.html',
  styleUrl: './lottery-list.component.css'
})
export class LotteryListComponent {

  lotteries: any;

  constructor(private lotteryFactoryService: LotteryFactoryService) { }

  ngOnInit() {
    this.lotteryFactoryService.getLotteries().then(lotteries => {
      this.lotteries = lotteries;
    });
  }

}
