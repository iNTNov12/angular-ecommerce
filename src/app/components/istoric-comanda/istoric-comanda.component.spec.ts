import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IstoricComandaComponent } from './istoric-comanda.component';

describe('IstoricComandaComponent', () => {
  let component: IstoricComandaComponent;
  let fixture: ComponentFixture<IstoricComandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IstoricComandaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IstoricComandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
