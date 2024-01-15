import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaliiProdusComponent } from './detalii-produs.component';

describe('DetaliiProdusComponent', () => {
  let component: DetaliiProdusComponent;
  let fixture: ComponentFixture<DetaliiProdusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaliiProdusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetaliiProdusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
