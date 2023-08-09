import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import {QuizService} from "../services/quiz.service";

export class CreateUserValidators {
  constructor(private quizService: QuizService) {
  }
  static passwordFormat(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    if (!/(?=.*[0-9])/.test(value) || value.length < 6) {
      return { passwordFormat: true };
    }
    return null;
  }

  static uniqueLogin(existingLogins: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value;
      if (existingLogins.includes(value)) {
        return { uniqueLogin: true };
      }
      return null;
    };
  }
}
