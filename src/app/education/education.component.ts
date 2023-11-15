import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../service/form.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent {
  @Input() formGroup: FormGroup | undefined;
  constructor(public formService: FormService, public fb: FormBuilder) {
  }
  addItem() {
    this.formService.educationFormArray.push(this.formService.addEducation());
  }
  removeItem(index: number) {
    this.formService.educationFormArray.removeAt(index);
  }
}
