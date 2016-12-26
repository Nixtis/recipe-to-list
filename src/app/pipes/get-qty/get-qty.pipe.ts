import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'getQty'
})
export class GetQtyPipe implements PipeTransform {

  transform(qty: number, baseServings: number, servings: number): number {
    let result = qty * servings / baseServings

    return Math.round(result * 100) / 100
  }

}
