import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FormatTimeHhmmPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'formatTimeHhmm',
})
export class FormatTimeHhmmPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    value = value + '';
    if(value.length >= 4){
      return value.substring(0,2) + ":" + value.substring(2,4);
    } else {
      return value;
    }
  }
}
