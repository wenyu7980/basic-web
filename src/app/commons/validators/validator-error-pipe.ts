import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'validatorError'})
export class ValidatorErrorPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    for (const key of Object.keys(value)) {
      return value[key];
    }
    return '';
  }
}
