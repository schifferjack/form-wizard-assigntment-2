import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { Observable, of, delay, map } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { WizardTailwindComponent } from './wizard-tailwind/wizard-tailwind.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { emails } from './email';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    WizardTailwindComponent,
    MatButtonToggleModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  asyncTaskInProgress: boolean = false;
  selectedStyle: string = '';
  //this is just to show emails you can use to test the async validation
  emails = emails;

  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
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
        [this.emailAsyncValidator.bind(this)],
      ],
    });
  }
  goNext(stepper: MatStepper) {
    const currentFormGroup = this.getCurrentFormGroup(stepper.selectedIndex);
    if (currentFormGroup && currentFormGroup.valid) {
      this.asyncTaskInProgress = true;
      this.performAsyncCheck().subscribe({
        next: (isValid) => {
          this.asyncTaskInProgress = false;
          if (isValid) {
            stepper.next();
          }
        },
      });
    } else {
      this.markFormGroupTouched(currentFormGroup);
    }
  }
  performAsyncCheck(): Observable<boolean> {
    return of(true).pipe(delay(1500));
  }
  getCurrentFormGroup(index: number): FormGroup | null {
    switch (index) {
      case 0:
        return this.firstFormGroup;
      case 1:
        return this.secondFormGroup;
      case 2:
        return this.thirdFormGroup;
      default:
        return null;
    }
  }

  markFormGroupTouched(formGroup: FormGroup | null) {
    if (formGroup) {
      formGroup.markAllAsTouched();
    }
  }
  emailAsyncValidator(
    control: AbstractControl,
  ): Observable<ValidationErrors | null> {
    return this.http.get<any>('https://dummyjson.com/users').pipe(
      map((response) => {
        const takenEmails = response.users.map((user: any) => user.email);
        return takenEmails.includes(control.value)
          ? { emailTaken: true }
          : null;
      }),
    );
  }
  submitForm() {
    console.log({
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value,
    });
  }
}
