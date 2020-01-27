import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class Validation {

  constructor() { }

    nameValid(control: FormControl){
        return new Promise(resolve =>{
          const pattern = /[0-9]/;
          if (pattern.test(control.value)) {
            resolve({ InvalidName : true });
          }
          resolve(null);
      });
    }
}