import { Component } from '@angular/core';
import { FormService } from '../service/form.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.scss']
})
export class JobApplicationComponent {
  currentStep = 0;
  totalSteps = 4;
  constructor(public formService: FormService, private snackBar: MatSnackBar, public dialog: MatDialog) { }
  nextStep(): void {
    if (this.currentStep == 0 && this.formService.personalInfoForm.invalid) {
      this.formService.personalInfoForm.markAllAsTouched()
      return;
    } else if (this.currentStep == 1 && this.formService.educationForm.invalid) {
      this.formService.educationForm.markAllAsTouched()
      return;
    } else if (this.currentStep == 2 && this.formService.workExperienceForm.invalid) {
      this.formService.workExperienceForm.markAllAsTouched();
      return;
    } else if (this.currentStep == 3 && this.formService.skillsForm.invalid) {
      this.formService.skillsForm.markAllAsTouched();
      return;
    } else if (this.currentStep == 3 && this.formService.skillsForm.valid) {
      const dialogRef = this.dialog.open(DialogComponent)
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.showSuccess();
          return;
        }
      })
    }
    if (this.currentStep < this.totalSteps - 1) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }
  showSuccess(): void {
    this.snackBar.open('Your Personal Details Submited Successfully', 'cancel', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
    })
    this.currentStep = 0;
    this.formService.reset();
  }
}
