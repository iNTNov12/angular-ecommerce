import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaMembriComponent } from './pagina-membri.component';

describe('PaginaMembriComponent', () => {
  let component: PaginaMembriComponent;
  let fixture: ComponentFixture<PaginaMembriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaMembriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaMembriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
