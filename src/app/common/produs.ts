export class Produs {

    constructor(public id: number,
                public unit_stoc: string,
                public nume: string,
                public descriere: string,
                public pret_unit: number,
                public imagine_url: string,
                public activ: boolean,
                public unitati_in_stoc: number,
                public data_creare: Date,
                public ultimul_update: Date
        ) {

    }
}
