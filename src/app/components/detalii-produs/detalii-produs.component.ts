import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemCos } from 'src/app/common/item-cos';
import { Produs } from 'src/app/common/produs';
import { CosService } from 'src/app/services/cos.service';
import { ProdusService } from 'src/app/services/produs.service';

@Component({
  selector: 'app-detalii-produs',
  templateUrl: './detalii-produs.component.html',
  styleUrls: ['./detalii-produs.component.css']
})
export class DetaliiProdusComponent implements OnInit {

  produs: Produs = new Produs(
    0,
    '',
    '',
    '',
    0,
    '',
    true,
    100,
    new Date(),
    new Date()
  );

  constructor(private produsService: ProdusService,
              private cosService: CosService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleDetaliiProdus();
    })
  }
  handleDetaliiProdus() {
    
    // prea id-ul din string in number 
    const theProdusId: number = +this.route.snapshot.paramMap.get('id')!;

    this.produsService.getProdus(theProdusId).subscribe(
      data => {
        this.produs = data;
      }
    )
  }

  adaugaInCos() {

    console.log(`Adauga in cos: ${this.produs.nume}, ${this.produs.pret_unit}`);
    const theCosItem = new ItemCos(this.produs);
    this.cosService.adaugaInCos(theCosItem);
    
  }


}
