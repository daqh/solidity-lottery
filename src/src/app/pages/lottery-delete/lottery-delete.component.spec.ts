import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryDeleteComponent } from './lottery-delete.component';

describe('LotteryDeleteComponent', () => {
  let component: LotteryDeleteComponent;
  let fixture: ComponentFixture<LotteryDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LotteryDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotteryDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
