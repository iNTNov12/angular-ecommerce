import { ItemCos } from "./item-cos";

export class DetaliuComenzi {
    url_imagine: string;
    pret_unitar: number;
    cantitate: number;
    id_produs: number;

    constructor(itemCos: ItemCos) {
        this.url_imagine = itemCos.imagine_url;
        this.pret_unitar = itemCos.pret_unit;
        this.cantitate = itemCos.cantitate;
        this.id_produs = itemCos.id;
    }
}
