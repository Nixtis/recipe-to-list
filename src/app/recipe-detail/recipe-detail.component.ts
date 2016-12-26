import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { MdSnackBar } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'
import { NgRedux } from 'ng2-redux/src'
import { Subscription } from 'rxjs'

import { AppActions } from '../app.actions'
import { IAppState } from '../app.reducer'

import { Ingredient } from '../models/ingredient'
import { Recipe } from '../models/recipe'

import { RecipesService } from '../services/recipes/recipes.service'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  public recipe: Recipe = new Recipe()

  private recipesService: RecipesService
  private activatedRoute: ActivatedRoute
  private ngRedux: NgRedux<IAppState>
  private snackBar: MdSnackBar
  private subscription: Subscription

  constructor(
    recipesService: RecipesService,
    activatedRoute: ActivatedRoute,
    ngRedux: NgRedux<IAppState>,
    snackBar: MdSnackBar
  ) {
    this.recipesService = recipesService
    this.activatedRoute = activatedRoute
    this.ngRedux = ngRedux
    this.snackBar = snackBar
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe((params: any) => {
      this.recipesService.getRecipe(parseInt(params['id'], 10))
        .then((data: Recipe) => {
          this.recipe = new Recipe(
            data.recipe_id,
            data.title,
            data.image_name,
            data.instructions,
            data.servings,
            data.ingredients.map(row => new Ingredient(row.display_index, row.name, row.department, row.quantity, row.unit))
          )
        })
    })
  }

  ngOnDestroy () {
    this.subscription.unsubscribe()
  }

  public addToCart () {
    this.ngRedux.dispatch(AppActions.addRecipe(this.recipe))

    this.snackBar.open('Your recipe has been added to your cart', 'Close', { duration: 5000 })
  }

  public addServings (qty) {
    if (this.recipe.servings + qty > 0) {
      this.recipe.servings += qty
    }
  }

}
