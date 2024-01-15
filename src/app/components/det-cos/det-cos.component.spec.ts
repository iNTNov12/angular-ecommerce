import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetCosComponent } from './det-cos.component';

describe('DetCosComponent', () => {
  let component: DetCosComponent;
  let fixture: ComponentFixture<DetCosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetCosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetCosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
