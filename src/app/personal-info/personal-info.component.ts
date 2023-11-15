import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';
import { FormService } from '../service/form.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent {
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  @Input() formGroup: FormGroup | undefined;
  public languages: string[] = [];
  @ViewChild('languageInput') languageInput!: ElementRef<HTMLInputElement>;
  constructor(public formService: FormService) {
    console.log(this.formService.form.value);
  }

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.languages
        .push(value);
    }
    event.chipInput.clear();

    (this.formService.personalInfoForm?.get('language') as FormControl).setValue(null);
  }

  public remove(fruit: string): void {
    const index = this.languages.indexOf(fruit);

    if (index >= 0) {
      this.languages.splice(index, 1);

    }
  }
  public addLanguage(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    let index = this.languages.findIndex((language: string) => language === value);
    if (value && index === -1) {
      this.languages
        .push(value);
    }

    event.chipInput.clear();

    (this.formService.personalInfoForm.get('language') as FormControl).setValue(null);
  }
  public selected(event: MatAutocompleteSelectedEvent): void {
    this.languages.push(event.option.viewValue);
    this.languageInput.nativeElement.value = '';
    (this.formService.personalInfoForm.get('language') as FormControl).setValue(null);
  }
}
