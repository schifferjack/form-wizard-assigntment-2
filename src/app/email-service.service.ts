import { Injectable } from '@angular/core';
import { emails } from './email';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailServiceService {
  private existingEmail = emails;

  checkIfEmailExists(value: string) {
    return of(this.existingEmail.some((a) => a === value)).pipe(delay(1000));
  }
}
