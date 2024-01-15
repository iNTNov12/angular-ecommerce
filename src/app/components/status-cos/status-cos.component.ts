import { Component, OnInit } from '@angular/core';
import { CosService } from 'src/app/services/cos.service';

@Component({
  selector: 'app-status-cos',
  templateUrl: './status-cos.component.html',
  styleUrls: ['./status-cos.component.css']
})
export class StatusCosComponent implements OnInit {

  pretTotal: number = 0.00;
  cantitateTotal: number = 0;

  constructor(private cosService: CosService) { }

  ngOnInit(): void {
    this.updateStatusCos();
  }
  updateStatusCos() {

    // abonare la cos totalPret
    this.cosService.pretTotal.subscribe(
      data => this.pretTotal = data
    );

    // abonare la cos totalCantitate
    this.cosService.cantitateTotala.subscribe(
      data => this.cantitateTotal = data
    );
  }

}
