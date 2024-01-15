import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Tara } from '../common/tara';
import { State } from '../common/state';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class BitshopFormService {

  private tariUrl = environment.bitShopApiUrl + '/tari';
  private statejudeteUrl = environment.bitShopApiUrl + '/states';

  constructor(private httpClient: HttpClient) { }

  getTari(): Observable<Tara[]> {

    return this.httpClient.get<GetResponseTari>(this.tariUrl).pipe(
      map(response => response._embedded.tari)
    );
  }

  getStates(theTaraCod: string): Observable<State[]> {

    //cauta url
    const cautaUrlState = `${this.statejudeteUrl}/search/findByTaraCod?code=${theTaraCod}`;

    return this.httpClient.get<GetResponseStates>(cautaUrlState).pipe(
      map(response => response._embedded.states)
    );
  }

  getLuniCard(lunaStart: number): Observable<number[]> {

    let data:number[]=[];

    //construire vectori pentru "luni" - luna curenta pana la final

    for(let theLuna = lunaStart; theLuna <= 12; theLuna++) {
      data.push(theLuna);
    }

    return of(data);
  }

  getAniCard(): Observable<number[]> {

    let data: number[]=[];

    //construire vectori pentru "Ani" - Anul curent pana 10 ani

    const startAn: number = new Date().getFullYear();
    const sfarsitAn: number = startAn + 10;

    for(let theAn = startAn; theAn <= sfarsitAn; theAn++) {
      data.push(theAn);
    }

    return of(data);
  } 
}

interface GetResponseTari {
  _embedded: {
    tari: Tara[];
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}

