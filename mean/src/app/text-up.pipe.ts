import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textUp'
})
export class TextUpPipe implements PipeTransform {

  val:string;

  transform(titleVal): any {
    this.val = titleVal.toUpperCase();
    return this.val;
  }

}
