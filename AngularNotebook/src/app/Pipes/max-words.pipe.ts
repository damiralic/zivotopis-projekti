import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxWords',
  standalone: true
})
export class MaxWordsPipe implements PipeTransform {

  transform(value: string | null | undefined, limit=25, ellipsis = "..." ): string | null {
    if(value === null || value == undefined){
      return value === undefined ? null : value;
    }

    return value.length > limit ? value.slice(0,limit) + ellipsis : value;
  }

}
