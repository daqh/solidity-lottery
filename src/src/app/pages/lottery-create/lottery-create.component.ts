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
    expiration: 0,
    prize: 0,
    participationFee: 0,
  };

  constructor(
    private lotteryFactoryService: LotteryFactoryService,
    private router: Router
  ) {}

  createLottery() {
    this.lotteryFactoryService.createLottery(this.lottery.description, this.lottery.expiration, this.lottery.prize).then(value => {
      console.log(value);
      this.router.navigate(['/lottery']);
    });
  }

  onSubmit() {
    if (this.lottery.description === '' || this.lottery.expiration === 0 || this.lottery.prize === 0 || this.lottery.participationFee === 0) {
      alert('Please fill all the fields');
      return;
    }
    this.createLottery();
  }

}
