import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FormatOfNewsDatePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'formatOfNewsDate',
})
export class FormatOfNewsDatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    value = value + '';
    if(value.length > 0){
      var year = value.substring(0,4);
      var month = value.substring(5,7);
      var day = value.substring(8,10);
      var hours = value.substring(11,13);
      var minutes = value.substring(14,16);
      //var seconds = value.substring(17,19);
      return day + "." + month + "." + year + " " + hours + ":" + minutes;
    } else {
      return value;
    }
  }
}
