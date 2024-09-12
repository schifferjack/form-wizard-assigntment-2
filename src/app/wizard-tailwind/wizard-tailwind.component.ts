import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
  AsyncValidatorFn,
} from '@angular/forms';
import { Observable, delay, map, of } from 'rxjs';
import { EmailServiceService } from '../email-service.service';
import { EmailValidator } from '../email-validator';

@Component({
  selector: 'app-wizard-tailwind',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './wizard-tailwind.component.html',
  styleUrl: './wizard-tailwind.component.css',
})
export class WizardTailwindComponent {
  currentStep: number = 1;
  asyncTaskInProgress = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private emailService: EmailServiceService,
  ) {
    this.firstFormGroup = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.secondFormGroup = this._formBuilder.group({
      address1: ['', Validators.required],
      address2: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      poscode: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email],
        [EmailValidator.createValidator(this.emailService)],
      ],
    });
  }
  getCurrentFormGroup(): FormGroup {
    switch (this.currentStep) {
      case 1:
        return this.firstFormGroup;
      case 2:
        return this.secondFormGroup;
      case 3:
        return this.thirdFormGroup;
      default:
        return this.firstFormGroup;
    }
  }

  goNext() {
    if (this.getCurrentFormGroup().valid) {
      if (this.currentStep === 3) {
        this.submitForm();
      } else {
        this.asyncTaskInProgress = true;
        this.performAsyncCheck().subscribe({
          next: (isValid) => {
            this.asyncTaskInProgress = false;
            if (isValid) {
              this.currentStep++;
            }
          },
        });
      }
    } else {
      this.markFormGroupTouched(this.getCurrentFormGroup());
    }
  }

  goBack() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submitForm() {
    this.markFormGroupTouched(this.getCurrentFormGroup());
    if (this.getCurrentFormGroup().valid) {
      console.log('Form Data:', {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        ...this.thirdFormGroup.value,
      });
    }
  }

  performAsyncCheck(): Observable<boolean> {
    return of(true).pipe(delay(1500));
  }

  markFormGroupTouched(formGroup: FormGroup | null) {
    if (formGroup) {
      formGroup.markAllAsTouched();
    }
  }
}
