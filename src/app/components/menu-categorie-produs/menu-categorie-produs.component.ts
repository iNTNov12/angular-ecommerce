import { Component, OnInit } from '@angular/core';
import { CategorieProdus } from 'src/app/common/categorie-produs';
import { ProdusService } from 'src/app/services/produs.service';

@Component({
  selector: 'app-menu-categorie-produs',
  templateUrl: './menu-categorie-produs.component.html',
  styleUrls: ['./menu-categorie-produs.component.css']
})
export class MenuCategorieProdusComponent implements OnInit {

  categorie_produs: CategorieProdus[] = [];
  constructor(private serviciuProdus: ProdusService) {}

  ngOnInit(): void {
    this.listaCategorieProduse();
  }
  listaCategorieProduse() {
    
    this.serviciuProdus.getCategorieProduse().subscribe(
      data => {
        console.log('Categorie Produs=' + JSON.stringify(data));
        this.categorie_produs = data;
      }
    );
  }

}
