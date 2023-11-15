import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from '../service/form.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  @Input() formGroup: FormGroup | undefined;
  public constructor(public formService: FormService) { }
  public addItem() {
    this.formService.skillsFormArray.push(this.formService.addSkills())
  }
  public removeItem(index: number) {
    this.formService.skillsFormArray.removeAt(index);
  }
}
