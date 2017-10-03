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
  transform(value: string, ...args) {
    value = value + '';
    if(value.length >= 4){
      let hours = parseInt(value.substring(0,2));
      hours = hours >= 24 ? hours - 24 : hours;
      let minutes = value.substring(2,4);
      return (hours < 10 ? "0" + hours : hours) + ":" + minutes;
    } else {
      return value;
    }
  }
}
