import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryDetailComponent } from './lottery-detail.component';

describe('LotteryDetailComponent', () => {
  let component: LotteryDetailComponent;
  let fixture: ComponentFixture<LotteryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LotteryDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotteryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
