import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCosComponent } from './status-cos.component';

describe('StatusCosComponent', () => {
  let component: StatusCosComponent;
  let fixture: ComponentFixture<StatusCosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusCosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusCosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
