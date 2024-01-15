import { FormControl, ValidationErrors } from "@angular/forms";

export class BitshopValidatori {

    // validare spatii albe
    static faraDoarSpatii(control: FormControl) : ValidationErrors | null {

        // verificam daca string-ul contine doar spatii
        if ((control.value != null) && (control.value.trim().length === 0)) {

            // invalid, returnam eroare
            return { 'faraDoarSpatii': true };
        }

        // valid, returnam null
        return null;
    }
}
