import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';
import { MatStep } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  personalInfo: FormGroup;
  workExperience: FormGroup;
  education: FormGroup;
  skills: FormGroup;
  warnColor = 'red';

  separatorKeysCodes: number[] = [ENTER, COMMA];
  @Input() formGroup: FormGroup | undefined;
  languages: string[] = [];
  allLanguages: string[] = ['English', 'Hindi', 'Odia', 'Telugu', 'Marathi'];
  @ViewChild('languageInput') languageInput!: ElementRef<HTMLInputElement>;
  @ViewChild('stepper') stepper: MatStep | undefined;
  filteredLanguage: Observable<string[]>;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.personalInfo = this.personalInfofrom();
    this.workExperience = this.workExperienceForm();
    this.education = this.educationFrom();
    this.skills = this.skillsForm()


    this.filteredLanguage = (this.personalInfo.get('language') as FormControl).valueChanges.pipe(
      startWith(null),
      map((lang: string | null) => (lang ? this._filter(lang) : this.allLanguages.slice())),
    );
  }
  personalInfofrom() {
    return this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[1-9]{1}[0-9]{9}')]],
      language: ['']
    })
  }
  get personalInfofromControl() {
    return this.personalInfo.controls;
  }
  addWorkExp() {
    this.workExp.push(this.addWorkExperience())
  }
  addEducation() {
    this.educationInfo.push(this.addEducationDetails());
  }
  removeItemworkExp(index: number) {
    this.workExp.removeAt(index);
  }
  removeItemEducation(index: number) {
    this.educationInfo.removeAt(index);
  }
  workExperienceForm() {
    return this.fb.group({
      workExp: this.fb.array([this.addWorkExperience()])
    });
  }

  educationFrom() {
    return this.fb.group({
      educationInfo: this.fb.array([this.addEducationDetails()])
    })
  }
  skillsForm() {
    return this.fb.group({
      skillsInfo: this.fb.array([this.addSkills()])
    })
  }
  addWorkExperience() {
    return this.fb.group({
      companyName: ['', Validators.required],
      role: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    }, { validator: this.dateRangeValidator('startDate', 'endDate') })
  }
  dateRangeValidator(startControlName: string, endControlName: string) {
    return (formGroup: FormGroup): { [key: string]: any } | null => {
      const startControl = formGroup.get(startControlName);
      const endControl = formGroup.get(endControlName);

      if (!startControl || !endControl) {
        return null;
      }

      const startDate = new Date(startControl.value);
      const endDate = new Date(endControl.value);

      if (startDate > endDate) {
        endControl.setErrors({ dateRange: true });
        return { dateRange: true };
      } else {
        endControl.setErrors(null);
        return null;
      }
    };
  }
  addEducationDetails() {
    return this.fb.group({
      instituteName: ['', Validators.required],
      instituteType: ['', Validators.required],
      degree: ['', Validators.required],
      date: ['', Validators.required]
    })
  }
  addNewSkill() {
    this.skillarrInfo.push(this.addSkills());
  }
  addSkills() {
    return this.fb.group({
      skillName: ['', Validators.required],
      skillLevel: ['', Validators.required]
    })
  }
  removeSkill(index: number) {
    this.skillarrInfo.removeAt(index);
  }
  addLanguage(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    let index = this.languages.indexOf(value);
    if (value && index === -1) {
      this.languages
        .push(value);
    }

    event.chipInput.clear();

    (this.personalInfo.get('language') as FormControl).setValue(null);
  }

  remove(fruit: string): void {
    const index = this.languages.indexOf(fruit);

    if (index >= 0) {
      this.languages.splice(index, 1);

    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.languages.push(event.option.viewValue);
    this.languageInput.nativeElement.value = '';
    (this.personalInfo.get('language') as FormControl).setValue(null);
  }
  private _filter(value: string): string[] {
    const filterValue = value?.toLowerCase();

    return this.allLanguages.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
  onsubmit() {
    this.snackBar.open('Form Submited Successfully', 'cancel', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
    })
    setTimeout(() => {
      this.stepper?.reset();
      location.reload()
    }, 2000);
  }

  get workExp(): FormArray {
    return this.workExperience.get("workExp") as FormArray
  }
  get educationInfo(): FormArray {
    return this.education.get("educationInfo") as FormArray
  }
  get skillarrInfo(): FormArray {
    return this.skills.get("skillsInfo") as FormArray
  }
}

