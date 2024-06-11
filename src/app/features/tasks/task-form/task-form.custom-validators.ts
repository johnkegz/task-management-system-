import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export function min(limit: number): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return new Observable<ValidationErrors | null>(observer => {
      const value = control.value;
      if (value && value.length < limit) {
        observer.next({ 'max': true });
      } else {
        observer.next(null);
      }
      observer.complete();
    }).pipe(delay(1000)) as Observable<ValidationErrors | null>; 
  };
}
