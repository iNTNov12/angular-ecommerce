import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProduseComponent } from './lista-produse.component';

describe('ListaProduseComponent', () => {
  let component: ListaProduseComponent;
  let fixture: ComponentFixture<ListaProduseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaProduseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaProduseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
