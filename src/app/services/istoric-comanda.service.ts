import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IstoricComanda } from '../common/istoric-comanda';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IstoricComandaService {

  private comandaUrl = environment.bitShopApiUrl + '/comenzi';
  
  constructor(private httpClient: HttpClient) { }

  getIstoricComanda(theEmail: string): Observable<GetResponseIstoricComanda> {

    // contruire Url bazat pe email-ul clientului
    const comandaIstoricUrl = `${this.comandaUrl}/search/findByClientEmailOrderByCreareDataDesc?email=${theEmail}`;

    return this.httpClient.get<GetResponseIstoricComanda>(comandaIstoricUrl)
  }
}

interface GetResponseIstoricComanda {
  _embedded: {
    comenzi: IstoricComanda[];
  }
}
