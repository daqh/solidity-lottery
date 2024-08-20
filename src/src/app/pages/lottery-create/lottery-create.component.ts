import { Component } from '@angular/core';
import { LotteryFactoryService } from '../../services/lottery-factory.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lottery-create',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './lottery-create.component.html',
  styleUrl: './lottery-create.component.css',
})
export class LotteryCreateComponent {

  lottery = {
    description: '',
    expiration: 0,
    amount: 0,
  };

  constructor(
    private lotteryFactoryService: LotteryFactoryService,
    private router: Router
  ) {}

  createLottery() {
    this.lotteryFactoryService.createLottery(this.lottery.description, this.lottery.expiration, this.lottery.amount).then(value => {
      console.log(value);
      this.router.navigate(['/lottery']);
    });
  }

  onSubmit() {
    this.createLottery();
  }

}
