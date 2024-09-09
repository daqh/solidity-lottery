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
    description: 'Lottery Name',
    expiration: "null",
    prize: 0,
    participationFee: 0,
  };

  constructor(
    private lotteryFactoryService: LotteryFactoryService,
    private router: Router
  ) {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    const now_string = now.toISOString().slice(0, 19);
    this.lottery.expiration = now_string;
  }

  createLottery() {
    const expiration = Math.floor(new Date(this.lottery.expiration).getTime() / 1000 - new Date().getTime() / 1000);
    this.lotteryFactoryService.createLottery(this.lottery.description, expiration, this.lottery.prize).then(value => {
      console.log(value);
      this.router.navigate(['/lottery']);
    });
  }

  onSubmit() {
    const expiration = Math.floor(new Date(this.lottery.expiration).getTime() / 1000 - new Date().getTime() / 1000);
    if (this.lottery.description === '' || expiration === 0 || this.lottery.prize === 0 || this.lottery.participationFee === 0) {
      alert('Please fill all the fields');
      return;
    }
    this.createLottery();
  }

}
