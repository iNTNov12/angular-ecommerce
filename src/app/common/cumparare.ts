import { Client } from "./client";
import { Adresa } from "./adresa";
import { Comanda } from "./comanda";
import { DetaliuComenzi } from "./detaliu-comenzi";

export class Cumparare {

    client!: Client;
    adresaLivrare!: Adresa;
    adresaFacturare!: Adresa;
    comanda!: Comanda;
    detaliuComenzi!: DetaliuComenzi[];
}
