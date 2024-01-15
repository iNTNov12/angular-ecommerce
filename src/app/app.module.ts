import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListaProduseComponent } from './components/lista-produse/lista-produse.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProdusService } from './services/produs.service';

import { Routes, RouterModule, Router } from '@angular/router';
import { MenuCategorieProdusComponent } from './components/menu-categorie-produs/menu-categorie-produs.component';
import { CautaComponent } from './components/cauta/cauta.component';
import { DetaliiProdusComponent } from './components/detalii-produs/detalii-produs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StatusCosComponent } from './components/status-cos/status-cos.component';
import { DetCosComponent } from './components/det-cos/det-cos.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';

import {
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG,
  OktaAuthGuard
} from '@okta/okta-angular';

import { OktaAuth } from '@okta/okta-auth-js';

import myAppConfig from './config/my-app-config';
import { PaginaMembriComponent } from './components/pagina-membri/pagina-membri.component';
import { IstoricComandaComponent } from './components/istoric-comanda/istoric-comanda.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';

const oktaConfig = myAppConfig.oidc;

const oktaAuth = new OktaAuth(oktaConfig);

function trimitePaginaConectare(oktaAuth: OktaAuth, injector: Injector) {
  // folosim inejctorul pentru accesul la servici
  const router = injector.get(Router);

  // redirectionare catre pagina de logare
  router.navigate(['/login']);
}

const routes: Routes = [

  {path: 'istoric-comenzi', component: IstoricComandaComponent, canActivate: [OktaAuthGuard],
  data: {onAuthRequired: trimitePaginaConectare} },

  {path: 'membri', component: PaginaMembriComponent, canActivate: [OktaAuthGuard],
  data: {onAuthRequired: trimitePaginaConectare} },

  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},

  {path: 'checkout', component: CheckoutComponent},
  {path: 'detalii-cos', component: DetCosComponent},
  {path: 'produse/:id', component: DetaliiProdusComponent},
  {path: 'search/:keyword', component: ListaProduseComponent},
  {path: 'categorie/:id/:nume_categorie', component: ListaProduseComponent},
  {path: 'catogorie', component: ListaProduseComponent},
  {path: 'produse', component: ListaProduseComponent},
  {path: '', redirectTo: '/produse', pathMatch: 'full'},
  {path: '**', redirectTo: '/produse', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ListaProduseComponent,
    MenuCategorieProdusComponent,
    CautaComponent,
    DetaliiProdusComponent,
    StatusCosComponent,
    DetCosComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    PaginaMembriComponent,
    IstoricComandaComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [ProdusService, { provide: OKTA_CONFIG, useValue: { oktaAuth }},
              {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
