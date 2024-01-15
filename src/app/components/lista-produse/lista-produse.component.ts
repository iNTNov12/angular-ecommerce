import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemCos } from 'src/app/common/item-cos';
import { Produs } from 'src/app/common/produs';
import { CosService } from 'src/app/services/cos.service';
import { ProdusService } from 'src/app/services/produs.service';

@Component({
  selector: 'app-lista-produse',
  templateUrl: './lista-produse-grid.component.html',
  styleUrls: ['./lista-produse.component.css']
})
export class ListaProduseComponent implements OnInit {

  produses: Produs[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  currentCategoryName: string = "";
  searchMode: boolean = false;

  // proprietati paginare

  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string = "";

  constructor(private produsService: ProdusService,
              private cosService: CosService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(()=> {
    this.listaProduse();
    });
  }


  listaProduse() {
    
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode) {
      this.handleCautaProduse();
    }
    else
    {
      this.handleListaProduse();
    }
    
  }
  handleCautaProduse() {
    
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // daca avem keyword diferit ca cel trecut
    if(this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;
    
    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    // cauta produse folosing keyword
    this.produsService.cautaProdusePaginare(this.thePageNumber - 1,
                                            this.thePageSize,
                                            theKeyword).subscribe(this.processResult());
  }

  handleListaProduse() {

    //verificam daca id-ul este disponibil
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId) {
      // preia id-ul si il convertim in numar
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;

      // preia parametrul string nume
      this.currentCategoryName = this.route.snapshot.paramMap.get('nume_categorie')!;
    }
    else {
      // nu este categorie
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Carti';
    }

    // verificam daca avem o categorie diferita ca cea trecuta (angular refoloseste o componenta)
    if(this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumer=${this.thePageNumber}`);

    // preia produsele din categoria id aleasa
    this.produsService.getListaProdusePaginare(this.thePageNumber - 1,
                                               this.thePageSize,
                                               this.currentCategoryId)
                                               .subscribe(this.processResult());
  }

  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listaProduse();
  }

  processResult() {
    return (data: any) => {
      this.produses = data._embedded.produses;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  adaugaInCos(theProdus: Produs) {

    console.log(`Adauga in cos: ${theProdus.nume}, ${theProdus.pret_unit}`);

    const theItemCos = new ItemCos(theProdus);

    this.cosService.adaugaInCos(theItemCos);
  }

}
