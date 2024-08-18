import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryUpdateComponent } from './lottery-update.component';

describe('LotteryUpdateComponent', () => {
  let component: LotteryUpdateComponent;
  let fixture: ComponentFixture<LotteryUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LotteryUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotteryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
