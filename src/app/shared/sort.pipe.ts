import { CountriesData } from './../core/covid19Data.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {

  transform(value: CountriesData[], sortParam: string): CountriesData[] {

    return value.sort(function(a, b){return b[sortParam] - a[sortParam]});

  }

}
