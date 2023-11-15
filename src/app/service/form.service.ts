import { Injectable } from '@angular/core';
import { FormArray, FormArrayName, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatternService } from './pattern.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  public form: FormGroup;
  public warnColor = 'red';
  public constructor(private fb: FormBuilder, private patternService: PatternService) {
    this.form = this.fb.group({
      personalInfo: this.fb.group({
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(patternService.phoneNumberPattern)]],
        language: ['']
      }),
      workExperienceForm: this.fb.group({
        workExperience: this.fb.array([this.addWorkExperience()])
      }),
      educationForm: this.fb.group({
        education: this.fb.array([this.addEducation()])
      }),
      skillsForm: this.fb.group({
        skills: this.fb.array([this.addSkills()])
      }),
    });
  }
  public get personalInfoForm() {
    return this.form.get('personalInfo') as FormGroup;
  }

  public get workExperienceForm() {
    return this.form.get('workExperienceForm') as FormGroup;
  }

  public get educationForm() {
    return this.form.get('educationForm') as FormGroup;
  }
  public get skillsForm() {
    return this.form.get('skillsForm') as FormGroup;
  }
  public get educationFormArray() {
    return this.educationForm.get('education') as FormArray;
  }
  public get workExperienceFormArray() {
    return this.workExperienceForm.get('workExperience') as FormArray;
  }
  public get skillsFormArray() {
    return this.skillsForm.get('skills') as FormArray;
  }
  public addEducation() {
    const education = this.fb.group({
      instituteName: ['', Validators.required],
      instituteType: ['', Validators.required],
      degree: ['', Validators.required],
      date: ['', Validators.required]
    })
    return education;
  }
  public addWorkExperience() {
    return this.fb.group({
      companyName: ['', Validators.required],
      role: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', [Validators.required]]
    }, { validator: this.dateRangeValidator('startDate', 'endDate') })
  }
  public addSkills() {
    return this.fb.group({
      skillName: ['', Validators.required],
      skillLevel: ['', Validators.required]
    })
  }
  public reset() {
    this.form.reset();
    this.clearEducationForm();
    this.clearWorkExperence();
    this.clearSkills()
  }
  public clearEducationForm() {
    while (this.educationFormArray.controls.length !== 0) {
      this.educationFormArray.removeAt(0);
    }

    this.educationFormArray.push(this.addEducation());
  }
  public clearWorkExperence() {
    while (this.workExperienceFormArray.controls.length !== 0) {
      this.workExperienceFormArray.removeAt(0);
    }

    this.workExperienceFormArray.push(this.addWorkExperience());
  }
  public clearSkills() {
    while (this.skillsFormArray.controls.length !== 0) {
      this.skillsFormArray.removeAt(0);
    }

    this.skillsFormArray.push(this.addSkills());
  }
  public dateRangeValidator(startControlName: string, endControlName: string) {
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
}