import { Pipe, PipeTransform } from '@angular/core';

/*
 * Determines how many percent of the first number is the second number
 * Usage:
 *   numberOne | percentOf: numberTwo
 * @example
 * // returns 10
 * {{ 5 | percentOf : 50 }}
 * @example
 * // returns 10
 * {{ 10 | percentOf : 100 }}
 */
@Pipe({
  name: 'percentOf'
})
export class PercentOfPipe implements PipeTransform {

  transform(numOne: number, numTwo: number): unknown {
    return numOne * 100 / numTwo;
  }

}
