import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFix'
})
export class ArrayFixPipe implements PipeTransform {

  transform(objectOrArray: any): any[] {
    if (!objectOrArray) {
      return [];
    } else {
      return this.ArrayFix(objectOrArray);
    }
  }

  ArrayFix(objectOrArray: any): any {
    return Array.isArray(objectOrArray) ? objectOrArray : [objectOrArray];
  }

}
