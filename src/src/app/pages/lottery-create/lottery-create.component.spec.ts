import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryCreateComponent } from './lottery-create.component';

describe('LotteryCreateComponent', () => {
  let component: LotteryCreateComponent;
  let fixture: ComponentFixture<LotteryCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LotteryCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotteryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
