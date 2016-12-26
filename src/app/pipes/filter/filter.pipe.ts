import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(input: any[], arg: string, value: any): any {
    return input.filter(row => {
      console.log(row, value)
      return row[arg] === value
    })
  }

}
