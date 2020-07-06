import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'digitFormatter'
})

export class DigitFormatterPipe implements PipeTransform {

    transform(value: number): string {
        return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
}