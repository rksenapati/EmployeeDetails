import { Component, Input } from '@angular/core';
import { FormArray, FormArrayName, FormGroup } from '@angular/forms';
import { FormService } from '../service/form.service';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent {
  @Input() formGroup: any;
  public constructor(public formService: FormService) {
  }
  public addItem() {
    this.formService.workExperienceFormArray.push(this.formService.addWorkExperience());
  }
  public removeItem(index: number) {
    this.formService.workExperienceFormArray.removeAt(index);
  }
}
