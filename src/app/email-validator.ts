import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { EmailServiceService } from './email-service.service';

export class EmailValidator {
  static createValidator(emailService: EmailServiceService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return emailService
        .checkIfEmailExists(control.value)
        .pipe(map((result: boolean) => (result ? { emailTaken: true } : null)));
    };
  }
}
