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

  constructor(
    private lotteryFactoryService: LotteryFactoryService,
    private router: Router
  ) {}

  createLottery() {
    this.lotteryFactoryService.createLottery().then(value => {
      console.log(value);
      this.router.navigate(['/lottery']);
    });
  }

  onSubmit() {
    this.createLottery();
  }

}
