import { Component, OnInit } from '@angular/core';
import { IstoricComanda } from 'src/app/common/istoric-comanda';
import { IstoricComandaService } from 'src/app/services/istoric-comanda.service';

@Component({
  selector: 'app-istoric-comanda',
  templateUrl: './istoric-comanda.component.html',
  styleUrls: ['./istoric-comanda.component.css']
})
export class IstoricComandaComponent implements OnInit {

  comandaIstoricLista: IstoricComanda[] = [];
  storage: Storage = sessionStorage;

  constructor(private comandaIstoricService: IstoricComandaService) { }

  ngOnInit(): void {

    this.handleIstoricComanda();
  }

  handleIstoricComanda() {
    
    // citeste adresele de email din browser storage
    const theEmail = JSON.parse(this.storage.getItem('email')!);

    // intoarce data din service
    this.comandaIstoricService.getIstoricComanda(theEmail).subscribe(
      data => {
        this.comandaIstoricLista = data._embedded.comenzi;
      }
    );
  }

}
