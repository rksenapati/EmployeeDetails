import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatternService {

  constructor() { }
  public phoneNumberPattern = '[1-9]{1}[0-9]{9}';
}
