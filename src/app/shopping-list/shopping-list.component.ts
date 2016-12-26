import { Component, OnDestroy, OnInit } from '@angular/core'
import { select } from 'ng2-redux/src'
import { Observable, Subscription } from 'rxjs/Rx'

import{ GetQtyPipe } from '../pipes/get-qty/get-qty.pipe'
import { Ingredient } from '../models/ingredient'
import { Recipe } from '../models/recipe'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public shoppingList: Recipe[] = []
  public ingredients: Ingredient[] = []
  public departments: string[] = []

  private getQtyPipe: GetQtyPipe = new GetQtyPipe()
  // Redux
  @select('shoppingList') private appState$: Observable<any>
  private subscription: Subscription

  constructor() {}

  ngOnInit() {
    this.subscription = this.appState$.subscribe(shoppingList => {
      this.shoppingList = shoppingList
      this.ingredients = this.getIngredients(shoppingList)
      this.departments = this.getDepartments(this.ingredients)
    })
  }

  ngOnDestroy () {
    this.subscription.unsubscribe()
  }

  private getIngredients (recipes: Recipe[]): Ingredient[] {
    return recipes.reduce((prev, current) => {
      let newIngredients: Ingredient[] = current.ingredients.filter(ing => {
        return prev.filter(row => row.name === ing.name).length === 0
      }).map(ing => {
        ing.quantity = this.getQtyPipe.transform(ing.quantity, current.baseServings, current.servings)

        return ing
      })

      prev = prev.map(row => {
        let existingIng = current.ingredients.filter(ing => ing.name === row.name)

        if (existingIng.length > 0) {
          row.quantity += this.getQtyPipe.transform(existingIng[0].quantity, current.baseServings, current.servings)
        }

        return row
      })

      return [
        ...prev,
        ...newIngredients
      ]
    }, [])
  }

  private getDepartments (ingredients: Ingredient[]): string[] {
    return ingredients.reduce((prev, current) => {
      if (prev.indexOf(current.department) === -1) {
        return [
          ...prev,
          current.department
        ]
      } else {
        return prev
      }
    }, [])
  }

}
