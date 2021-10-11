import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeFirstPart'
})
export class RemoveFirstPartPipe implements PipeTransform {

  transform(value: string): string {
    return value.substring(value.indexOf('//')+2);
  }
}
