import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCategorieProdusComponent } from './menu-categorie-produs.component';

describe('MenuCategorieProdusComponent', () => {
  let component: MenuCategorieProdusComponent;
  let fixture: ComponentFixture<MenuCategorieProdusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCategorieProdusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCategorieProdusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
