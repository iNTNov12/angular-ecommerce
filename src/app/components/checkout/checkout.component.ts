import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs';
import { Comanda } from 'src/app/common/comanda';
import { Cumparare } from 'src/app/common/cumparare';
import { DetaliuComenzi } from 'src/app/common/detaliu-comenzi';
import { ItemCos } from 'src/app/common/item-cos';
import { PaymentInfo } from 'src/app/common/payment-info';
import { State } from 'src/app/common/state';
import { Tara } from 'src/app/common/tara';
import { BitshopFormService } from 'src/app/services/bitshop-form.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CosService } from 'src/app/services/cos.service';
import { BitshopValidatori } from 'src/app/validators/bitshop-validatori';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;

  pretTotal: number = 0;
  canitateTotala: number = 0;

  aniCard: number[] = [];
  luniCard: number[] = [];

  tari: Tara[] = [];

  adresaLivrareStates: State[] = [];
  adresaFacturareStates: State[] = [];

  storage: Storage = sessionStorage;

  // initializare Stripe API
  stripe = Stripe(environment.stripePublishableKey);

  paymentInfo: PaymentInfo = new PaymentInfo();
  cardElement: any;
  displayError: any = "";

  isDisabled: boolean = false;

  constructor(private router: Router,
              private checkoutService: CheckoutService,
              private cosService: CosService,
              private formBuilder: FormBuilder,
              private bitshopForm: BitshopFormService) { }

  ngOnInit(): void {

    // setare Stripe payment form
    this.setupStripePaymentForm();

    this.reviewDetaliiCos();

    // citire email utilizator din stocarea browserului
    const theEmail = JSON.parse(this.storage.getItem('email')!);

    this.checkoutFormGroup = this.formBuilder.group ({
      client: this.formBuilder.group({
        nume: new FormControl('', 
                          [Validators.required, Validators.minLength(2), BitshopValidatori.faraDoarSpatii]),
        prenume: new FormControl('', 
                          [Validators.required, Validators.minLength(2), BitshopValidatori.faraDoarSpatii]),
        email: new FormControl(theEmail, 
                          [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,10}$')]
        )
      }),
      adresaLivrare: this.formBuilder.group({
        strada: new FormControl('', 
                              [Validators.required, Validators.minLength(2), BitshopValidatori.faraDoarSpatii]),
        oras: new FormControl('', 
                              [Validators.required, Validators.minLength(2), BitshopValidatori.faraDoarSpatii]),
        state: new FormControl('', 
                              [Validators.required]),
        tara: new FormControl('', 
                              [Validators.required]),
        codZip: new FormControl('', 
                              [Validators.required, Validators.minLength(2), BitshopValidatori.faraDoarSpatii])
      }),
      adresaFacturare: this.formBuilder.group({
        strada: new FormControl('', 
                              [Validators.required, Validators.minLength(2), BitshopValidatori.faraDoarSpatii]),
        oras: new FormControl('', 
                              [Validators.required, Validators.minLength(2), BitshopValidatori.faraDoarSpatii]),
        state: new FormControl('', 
                              [Validators.required]),
        tara: new FormControl('', 
                              [Validators.required]),
        codZip: new FormControl('', 
                              [Validators.required, Validators.minLength(2), BitshopValidatori.faraDoarSpatii])
      }),
      card: this.formBuilder.group({
        /*
        tipCard: new FormControl('', 
                                [Validators.required]),
        numeCard: new FormControl('', 
                                [Validators.required, Validators.minLength(2), BitshopValidatori.faraDoarSpatii]),
        numarCard: new FormControl('', 
                                [Validators.required, Validators.pattern('^[0-9]{16}')]),
        securityCode: new FormControl('', 
                                [Validators.required, Validators.pattern('^[0-9]{3}')]),
        lunaExpirare: new FormControl('', 
                                [Validators.required]),
        anExpirare: new FormControl('', 
                                [Validators.required])
        */
      })
    });


    /*
    // populare campuri card luni

    const startLuna: number = new Date().getMonth() + 1;
    console.log("startLuna: " + startLuna);

    this.bitshopForm.getLuniCard(startLuna).subscribe (
      data => {
        console.log("Intorc lunile pentru card: " + JSON.stringify(data));
        this.luniCard = data;
      }
    );

    // populare campuri card ani
    
    this.bitshopForm.getAniCard().subscribe(
      data => {
        console.log("Intorc anii pentru card: " + JSON.stringify(data));
        this.aniCard = data;
      }
    );
    */
    
    // populare tari

    this.bitshopForm.getTari().subscribe(
      data => {
        console.log("Intorc tarile: " + JSON.stringify(data));
        this.tari = data;
      }
    );
  }

  setupStripePaymentForm() {
    
    // gestionare elemente Stripe
    var elements = this.stripe.elements();

    // Creare element card
    this.cardElement = elements.create('card', { hidePostalCode: true});

    // Adaugare instanta a componentei UI al card-ului om div-ul 'card-element'
    this.cardElement.mount('#card-element');

    // Adaugare binding pentru event-ul 'change' din card element
    this.cardElement.on('change', (event: any)=> {

      // gestionare element card-errors
      this.displayError = document.getElementById('card-errors');
      
      if(event.complete) {
        this.displayError.textContent = "";
      } else if (event.error) {
        // arata erori validare la clienti
        this.displayError.textContent = event.error.message;
      }

    });

  }

  reviewDetaliiCos() {
    
    // abonare la cosService.cantitateTotal
    this.cosService.cantitateTotala.subscribe(
      canitateTotala => this.canitateTotala = canitateTotala
    );

    // abonare la cosService.pretTotal
    this.cosService.pretTotal.subscribe(
      pretTotal => this.pretTotal = pretTotal
    );
  }

  get nume() { return this.checkoutFormGroup.get('client.nume'); }
  get prenume() { return this.checkoutFormGroup.get('client.prenume'); }
  get email() { return this.checkoutFormGroup.get('client.email'); }

  get adresaLivrareStrada() { return this.checkoutFormGroup.get('adresaLivrare.strada'); }
  get adresaLivrareOras() { return this.checkoutFormGroup.get('adresaLivrare.oras'); }
  get adresaLivrareState() { return this.checkoutFormGroup.get('adresaLivrare.state'); }
  get adresaLivrareTara() { return this.checkoutFormGroup.get('adresaLivrare.tara'); }
  get adresaLivrarecodZip() { return this.checkoutFormGroup.get('adresaLivrare.codZip'); }

  get adresaFacturareStrada() { return this.checkoutFormGroup.get('adresaFacturare.strada'); }
  get adresaFacturareOras() { return this.checkoutFormGroup.get('adresaFacturare.oras'); }
  get adresaFacturareState() { return this.checkoutFormGroup.get('adresaFacturare.state'); }
  get adresaFacturareTara() { return this.checkoutFormGroup.get('adresaFacturare.tara'); }
  get adresaFacturarecodZip() { return this.checkoutFormGroup.get('adresaFacturare.codZip'); }

  get atipCard() { return this.checkoutFormGroup.get('card.tipCard'); }
  get anumeCard() { return this.checkoutFormGroup.get('card.numeCard'); }
  get anumarCard() { return this.checkoutFormGroup.get('card.numarCard'); }
  get asecurityCode() { return this.checkoutFormGroup.get('card.securityCode'); }
  

  copiazaAdrese(event: any) {

    if(event.target.checked) {
      this.checkoutFormGroup.controls['adresaFacturare']
          .setValue(this.checkoutFormGroup.controls['adresaLivrare'].value);

      this.adresaFacturareStates = this.adresaLivrareStates;
    }
    else {
      this.checkoutFormGroup.controls['adresaFacturare'].reset();

      this.adresaFacturareStates = [];
    }
  }

  onSubmit() {
    console.log("Gestionare buton de cumparare");

    if(this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    // setare comanda
    let comanda = new Comanda();
    comanda.pretTotal = this.pretTotal;
    comanda.cantitateTotala = this.canitateTotala;

    // preia produse din cos
    const itemeCos = this.cosService.itemeCos;

    // create DetaliuComenzi din itemeCos

    /*
    let detaliuComenzi: DetaliuComenzi[] = [];
    for(let i=0; i<itemeCos.length; i++) {
      detaliuComenzi[i] = new DetaliuComenzi(itemeCos[i]);
    } */

    let detaliuComenzi: DetaliuComenzi[] = itemeCos.map(tempItemCos => new DetaliuComenzi(tempItemCos));

    // setare Cumparare
    let cumparare = new Cumparare();

    // populare cumparare - client
    cumparare.client = this.checkoutFormGroup.controls['client'].value;

    // populare cumparare - adresaLivrare
    cumparare.adresaLivrare = this.checkoutFormGroup.controls['adresaLivrare'].value;
    const livrareState: State = JSON.parse(JSON.stringify(cumparare.adresaLivrare.state));
    const livrareTara: Tara = JSON.parse(JSON.stringify(cumparare.adresaLivrare.tara));
    cumparare.adresaLivrare.state = livrareState.nume;
    cumparare.adresaLivrare.tara = livrareTara.nume;

    // populare cumparare - adresaFacturare
    cumparare.adresaFacturare = this.checkoutFormGroup.controls['adresaFacturare'].value;
    const facturareState: State = JSON.parse(JSON.stringify(cumparare.adresaFacturare.state));
    const facturareTara: Tara = JSON.parse(JSON.stringify(cumparare.adresaFacturare.tara));
    cumparare.adresaFacturare.state = facturareState.nume;
    cumparare.adresaFacturare.tara = facturareTara.nume;

    // populare cumparare - comanda si detaliuComenzi
    cumparare.comanda = comanda;
    cumparare.detaliuComenzi = detaliuComenzi;

    // calculare info plata
    this.paymentInfo.amount = Math.round(this.pretTotal * 100);
    this.paymentInfo.currency = "RON";
    this.paymentInfo.receiptEmail = cumparare.client.email;

    console.log(` this.paymentInfo.amount: ${this.paymentInfo.amount}`);

    // daca este valid form-ul atunci
    // - creeaza payment intent
    // - confirma plata card
    // - pune comanda

    if (!this.checkoutFormGroup.invalid && this.displayError.textContent === "") {

      this.isDisabled = true;

      this.checkoutService.createPaymentIntent(this.paymentInfo).subscribe(
        (paymentIntentResponse) => {
          this.stripe.confirmCardPayment(paymentIntentResponse.client_secret,
            {
              payment_method: {
                card: this.cardElement,
                billing_details: {
                  email: cumparare.client.email,
                  name: `${cumparare.client.nume} ${cumparare.client.prenume}`,
                  address: {
                    line1: cumparare.adresaFacturare.strada,
                    city: cumparare.adresaFacturare.oras,
                    state: cumparare.adresaFacturare.state,
                    postal_code: cumparare.adresaFacturare.codZip,
                    country: this.adresaFacturareTara?.value.cod
                  }
                }
              }
            }, { handleActions: false })
            .then((result: any) => {
              if (result.error) {
                // instiintare client ca este eroare
                alert(`Am intampinat o eroare: ${result.error.message}`);
                this.isDisabled = false;
              } else {
                // apelam REST API prin CheckoutService
                this.checkoutService.puneComanda(cumparare).subscribe({
                  next: response => {
                    alert(`Comanda dvs. a fost receptionata.\nNumarul de urmarire comanda: ${response.urmarireNumarComanda}`);
                  
                    // resetare cos
                    this.resetCos();
                    this.isDisabled = false;
                  },
                  error: (err: any) => {
                    alert(`Am intampinat o eroare: ${err.message}`);
                    this.isDisabled = false;
                  }
                })
              }
            })
        }
      );
    } else {
      this.checkoutFormGroup.markAllAsTouched();
      return;

    }

  }

  resetCos() {
    // resetare data cos
    this.cosService.itemeCos = [];
    this.cosService.pretTotal.next(0);
    this.cosService.cantitateTotala.next(0);
    this.cosService.persistItemCos();

    // resetare form
    this.checkoutFormGroup.reset();

    // inapoi la pagina cu produse
    this.router.navigateByUrl("/produse");
  }

  handleLuniSiAni() {

    const cardFormGroup = this.checkoutFormGroup.get('card');

    const anCurent: number = new Date().getFullYear();
    const anSelectat: number = Number(cardFormGroup!.value.anExpirare);

    console.log("Anul selectat: " + Number(cardFormGroup!.value.anExpirare));

    // daca anul curent == anul selectat, incepem cu luna curenta

    let inceputLuna: number;

    if(anCurent === anSelectat) {
      inceputLuna = new Date().getMonth() + 1;
    }
    else {
      inceputLuna = 1;
    }

    this.bitshopForm.getLuniCard(inceputLuna).subscribe(
      data => {
        console.log("Intoarce luna card: " + JSON.stringify(data));
        this.luniCard = data;
      }
    );
  }

  getStates(formGroupName: string) {
    
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const codTara = formGroup!.value.tara.cod;
    const numeTara = formGroup!.value.tara.nume;

    console.log(`${formGroupName} cod tara: ${codTara}`);
    console.log(`${formGroupName} nume tara: ${numeTara}`);

    this.bitshopForm.getStates(codTara).subscribe(
      data => {

        if(formGroupName === 'adresaLivrare') {
          this.adresaLivrareStates = data;
        }
        else {
          this.adresaFacturareStates= data;
        }

        // selectam primul item implicit
        formGroup!.get('state')!.setValue(data[0]);
      }
    );

  }
}
