import { Produs } from "./produs";

export class ItemCos {

    id: number;
    nume: string;
    imagine_url: string;
    pret_unit: number;

    cantitate: number;

    constructor(produses: Produs) {
        this.id = produses.id;
        this.nume =produses.nume;
        this.imagine_url =produses.imagine_url;
        this.pret_unit =produses.pret_unit;

        this.cantitate = 1;
    }
}
