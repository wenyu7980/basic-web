import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

/**
 * 校验器
 */
export class Validators {
  /**
   * 必填
   * @param name 字段名
   * @param msgFn 消息函数
   */
  static required(
    name: string,
    msgFn: (name: string) => string = (n: string) => `请输入${n}`): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      if (control.value === null || control.value === '') {
        return {required: msgFn(name)};
      }
      return null;
    };
  }

  /**
   * 最大长度
   * @param name 字段名
   * @param length 长度
   * @param msgFn 错误提示
   */
  static maxLength(
    name: string,
    length: number,
    msgFn: (name: string, length: number) => string = (n: string, l: number) => `${n}长度大于${l}`): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      if (control.value !== null && control.value.toString().length > length) {
        return {maxLength: msgFn(name, length)};
      }
      return null;
    };
  }

  /**
   * 最小长度
   * @param name 字段名
   * @param length 长度
   * @param msgFn 错误提示
   */
  static minLength(
    name: string,
    length: number,
    msgFn: (name: string, length: number) => string = (n: string, l: number) => `${n}长度小于${l}`): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      if (control.value !== null && control.value.toString().length < length) {
        return {minLength: msgFn(name, length)};
      }
      return null;
    };
  }

  /**
   * 长度大小
   * @param name 字段名
   * @param min 最小长度
   * @param max 最大长度
   * @param msgFn 错误提示
   */
  static size(
    name: string,
    min: number,
    max: number,
    msgFn: (name: string, min: number, max: number) => string = (n: string, a: number, i: number) => `${n}长度必须介于${a}与${i}之间`): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      if (control.value === null) {
        return null;
      }
      if (control.value.toString().length > max || control.value.toString().length < min) {
        return {size: msgFn(name, min, max)};
      }
      return null;
    };
  }

}
