import {AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';

/**
 * Custom validator functions for reactive form validation
 */
export class CustomValidators {

  /**
   * Validates that child controls in the form group are equal
   */
  static childrenEqual: ValidatorFn = (formGroup: FormGroup) => {
    const [firstControlName, ...otherControlNames] = Object.keys(formGroup.controls || {});
    const isValid = otherControlNames.every(controlName => formGroup.get(controlName).value === formGroup.get(firstControlName).value);
    return isValid ? null : {childrenNotEqual: true};
  };


  static customPasswordValidator(editMode : boolean): ValidatorFn {
    return (control: FormControl): {[key: string]: any} => {
      console.log(editMode);
      console.log(control.value);
      console.log('condition ' + (typeof control.value === 'undefined' || control.value === ''));
      if (editMode && (typeof control.value === 'undefined' || control.value === '')) {
        return null;
      } else {
        if (!regExps.password.test(control.value)) {
          console.log('invalid')
          return {'password': true};
        }
        return null;
      }
    };
  }

  static customEmailValidator(control: FormControl): { [key: string]: any } {
    const emailError = Validators.email(control);

    if (typeof control.value !== 'undefined' && control.value && emailError) {

      return {'emailOptional': {}};
    }

    return null;
  }
}

/**
 * Custom ErrorStateMatcher which returns true (error exists) when the parent form group is invalid and the control has been touched
 */
export class ConfirmValidParentMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return control.parent && control.parent.invalid && (control.dirty || control.touched || isSubmitted);
  }
}

/**
 * Collection of reusable RegExps
 */
export const regExps: { [key: string]: RegExp } = {
  password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/,
  email: /(^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,}))$/i
};





/**
 * Collection of reusable error messages
 */
export const errorMessages: { [key: string]: string } = {
  fullName: 'Full name must be between 1 and 128 characters',
  email: 'Email must be a valid email address (username@domain)',
  confirmEmail: 'Email addresses must match',
  password: 'Password must be between 7 and 15 characters, and contain at least one number and special character',
  confirmPassword: 'Passwords must match'
};
