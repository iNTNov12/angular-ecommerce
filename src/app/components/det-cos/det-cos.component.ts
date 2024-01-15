import { Component, OnInit } from '@angular/core';
import { ItemCos } from 'src/app/common/item-cos';
import { CosService } from 'src/app/services/cos.service';

@Component({
  selector: 'app-det-cos',
  templateUrl: './det-cos.component.html',
  styleUrls: ['./det-cos.component.css']
})
export class DetCosComponent implements OnInit {

  itemeCos: ItemCos[] = [];
  pretTotal: number = 0;
  cantitateTotala: number = 0;

  constructor(private cosService: CosService) { }

  ngOnInit(): void {
    this.listaDetaliiCos();
  }

  listaDetaliiCos() {
      
    // preia gestionarea produselor din cos
    this.itemeCos = this.cosService.itemeCos;

    // abonare la pretTotal din cos
    this.cosService.pretTotal.subscribe(
      data => this.pretTotal = data
    );

    // abonare la cantitateTotal din cos
    this.cosService.cantitateTotala.subscribe(
      data => this.cantitateTotala = data
    );

    // pret total si cantitate totala din cos
    this.cosService.totalCos();
  }

  incrementCantitate(theItemCos: ItemCos) {
    this.cosService.adaugaInCos(theItemCos);
  }

  decrementCantitate(theItemCos: ItemCos) {
    this.cosService.decrementCantitate(theItemCos);
  }

  remove(theItemCos: ItemCos) {
    this.cosService.remove(theItemCos);
  }
}
