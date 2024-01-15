import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cumparare } from '../common/cumparare';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentInfo } from '../common/payment-info';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private cumparareUrl = environment.bitShopApiUrl + '/checkout/cumparare';

  private paymentIntentUrl = environment.bitShopApiUrl + '/checkout/payment-intent';

  constructor(private httpClient: HttpClient) { }


  puneComanda(cumparare: Cumparare): Observable<any> {
    return this.httpClient.post<Cumparare>(this.cumparareUrl, cumparare);
  }
  
  createPaymentIntent(paymentInfo: PaymentInfo): Observable<any> {
    return this.httpClient.post<PaymentInfo>(this.paymentIntentUrl, paymentInfo);
  }

}
