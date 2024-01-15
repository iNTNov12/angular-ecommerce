import { Data } from "@angular/router";

export class IstoricComanda {

    constructor(public id: string,
                public urmarireNumarComanda: string,
                public pretTotal: number,
                public cantitateTotala: number,
                public creareData: Date ) {

                }
}
