import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterPipe'
})
export class FilterPipe implements PipeTransform {
    transform(value: Array<any>, filter: string): any {
        if (filter) {
            filter = filter.toUpperCase();

            return value.filter(a => 
                a.name.toUpperCase().indexOf(filter) >= 0
          );
        } else return value;
    }
}