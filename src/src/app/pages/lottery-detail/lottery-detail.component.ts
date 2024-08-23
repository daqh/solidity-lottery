import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LotteryService } from '../../services/lottery.service';

@Component({
  selector: 'app-lottery-detail',
  standalone: true,
  imports: [
    RouterLink, FormsModule,
  ],
  templateUrl: './lottery-detail.component.html',
  styleUrl: './lottery-detail.component.css',
})
export class LotteryDetailComponent implements OnInit {

  id?: string;

  constructor(
    private route: ActivatedRoute,
    private lotteryService: LotteryService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  onSubmit() {
    this.lotteryService.enter(this.id!).then(() => {
      alert('You have entered the lottery!');
    });
  }

}
