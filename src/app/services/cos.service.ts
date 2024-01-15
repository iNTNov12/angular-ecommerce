import { Injectable } from '@angular/core';
import { ItemCos } from '../common/item-cos';
import { BehaviorSubject, Subject, empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CosService {

  itemeCos: ItemCos[] = [];

  pretTotal: Subject<number> = new BehaviorSubject<number>(0);
  cantitateTotala: Subject<number> = new BehaviorSubject<number>(0);

  //storage: Storage = sessionStorage;
  storage: Storage = localStorage;


  constructor() {

    // citim data din stocare (browser)
    let data = JSON.parse(this.storage.getItem('itemeCos')!);

    if (data != null) {
      this.itemeCos = data;

      // calculare total bazat pe data care este citita din stocare
      this.totalCos();
    }

  }

  adaugaInCos(theItemCos: ItemCos) {

    // verificam daca avem deja produse in cos
    let dejaExistaInCos: boolean = false;
    let itemCosExistent: ItemCos = undefined!;

    if (this.itemeCos.length > 0) {
      // cautam produsele din cos bazate pe id

      itemCosExistent = this.itemeCos.find(tempItemCos => tempItemCos.id === theItemCos.id)!;

      // verificam daca am gasit
      dejaExistaInCos = (itemCosExistent != undefined);
    }

    if (dejaExistaInCos) {
      // incrementare cantitate
      itemCosExistent.cantitate++;
    }
    else {
      // adaugam produsul in vector
      this.itemeCos.push(theItemCos);
    }

    this.totalCos();
  }

  totalCos() {

    let valoarePretTotal: number = 0;
    let valoareCantitateTotal: number = 0;

    for (let itemCosCurent of this.itemeCos) {
      valoarePretTotal += itemCosCurent.cantitate * itemCosCurent.pret_unit;
      valoareCantitateTotal += itemCosCurent.cantitate;
    }

    // publicare valori
    this.pretTotal.next(valoarePretTotal);
    this.cantitateTotala.next(valoareCantitateTotal);

    // pentru debugging
    this.logDataCos(valoarePretTotal, valoareCantitateTotal);

    // persist data cos
    this.persistItemCos();
  }

  persistItemCos() {
                          //cheie                         //valoare  
    this.storage.setItem('itemeCos', JSON.stringify(this.itemeCos));
  }

  logDataCos(valoarePretTotal: number, valoareCantitateTotal: number) {

    console.log("Continut cos: ");
    for (let tempItemCos of this.itemeCos) {
      const subTotalPret = tempItemCos.cantitate * tempItemCos.pret_unit;
      console.log(`nume: ${tempItemCos.nume}, cantitate: ${tempItemCos.cantitate}, pret_unit=${tempItemCos.pret_unit}, subTotalPret=${subTotalPret}`);
    }

    console.log(`pretTotal: ${valoarePretTotal.toFixed(2)}, totalCantitate: ${valoareCantitateTotal}`);
    console.log(`----`);
  }

  decrementCantitate(theItemCos: ItemCos) {

    theItemCos.cantitate--;

    if (theItemCos.cantitate === 0) {
      this.remove(theItemCos);
    }
    else {
      this.totalCos();
    }
  }

  remove(theItemCos: ItemCos) {

    // preia un index al unui produs in vector
    const produsIndex = this.itemeCos.findIndex(tempItemCos => tempItemCos.id === theItemCos.id);

    // daca este gasit, sterge produsul din vector la index-ul respectiv
    if (produsIndex > -1) {
      this.itemeCos.splice(produsIndex, 1);

      this.totalCos();
    }
  }

}
