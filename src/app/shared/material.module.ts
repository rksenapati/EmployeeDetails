import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
    declarations: [
    
    DialogComponent
  ],
    imports: [
        MatIconModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatStepperModule,
        MatCardModule,
        MatButtonModule,
        MatDividerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatSnackBarModule,
        MatProgressBarModule,
        MatChipsModule,
        MatInputModule,
        MatDialogModule
    ],
    exports: [
        MatIconModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatStepperModule,
        MatCardModule,
        MatButtonModule,
        MatDividerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatSnackBarModule,
        MatProgressBarModule,
        MatChipsModule,
        MatInputModule,
        MatDialogModule
    ],
})
export class MaterialModule { }
