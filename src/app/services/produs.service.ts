import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produs } from '../common/produs';
import { map } from 'rxjs/operators'
import { CategorieProdus } from '../common/categorie-produs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdusService {

  private baseUrl = environment.bitShopApiUrl + '/produses';

  private categoryUrl = environment.bitShopApiUrl + '/categorie_produs';

  constructor(private httpClient: HttpClient) { }

  getProdus(theProdusId: number): Observable<Produs> {

    //url bazat pe id produs
    const produsUrl = `${this.baseUrl}/${theProdusId}`;

    return this.httpClient.get<Produs>(produsUrl);
  }

  getListaProduse(theCategorieId: number): Observable<Produs[]> {

    // url bazat pe id categorie
    const cautaUrl = `${this.baseUrl}/search/findByCategorieId?id=${theCategorieId}`;

    return this.getProduse(cautaUrl);
  }

  getListaProdusePaginare(thePage: number,
    thePageSize: number,
    theCategorieId: number): Observable<GetResponseProducts> {

    // url bazat pe id categorie, pagina si marime
    const cautaUrl = `${this.baseUrl}/search/findByCategorieId?id=${theCategorieId}`
      + `&page=${thePage}&size=${thePageSize}`;

    console.log(`Preia produse din - ${cautaUrl}`);
    return this.httpClient.get<GetResponseProducts>(cautaUrl);
  }

  private getProduse(cautaUrl: string): Observable<Produs[]> {
    return this.httpClient.get<GetResponseProducts>(cautaUrl).pipe(
      map(response => response._embedded.produses)
    );
  }

  getCategorieProduse(): Observable<CategorieProdus[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.categorie_produs)
    )
  }

  cautaProduse(theKeyword: string): Observable<Produs[]> {

    // url bazat pe keywork
    const cautaUrl = `${this.baseUrl}/search/findByNumeContaining?nume=${theKeyword}`;

    return this.getProduse(cautaUrl);
  }

  cautaProdusePaginare(thePage: number,
                      thePageSize: number,
                      theKeyword: string): Observable<GetResponseProducts> {

    // url bazat pe keyword, pagina si marime
    const cautaUrl = `${this.baseUrl}/search/findByNumeContaining?nume=${theKeyword}`
                   + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(cautaUrl);
  }
}

interface GetResponseProducts {
  _embedded: {
    produses: Produs[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    categorie_produs: CategorieProdus[];
  }
}
