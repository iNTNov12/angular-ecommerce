import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CautaComponent } from './cauta.component';

describe('CautaComponent', () => {
  let component: CautaComponent;
  let fixture: ComponentFixture<CautaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CautaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CautaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
