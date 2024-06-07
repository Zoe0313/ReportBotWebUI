import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotStatisticsComponent } from './tot-statistics.component';

describe('TotStatisticsComponent', () => {
  let component: TotStatisticsComponent;
  let fixture: ComponentFixture<TotStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
