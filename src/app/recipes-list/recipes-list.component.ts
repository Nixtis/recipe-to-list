import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { Ingredient } from '../models/ingredient'
import { Recipe } from '../models/recipe'

import { RecipesService } from '../services/recipes/recipes.service'

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  public recipesList: Recipe[] = []

  private recipesService: RecipesService
  private router: Router

  constructor(
    recipesService: RecipesService,
    router: Router
  ) {
    this.recipesService = recipesService
    this.router = router
  }

  ngOnInit() {
    this.recipesService.getRecipesList()
      .then((data: Recipe[]) => {
        this.recipesList = data.map(row => {
          return new Recipe(
            row.recipe_id,
            row.title,
            row.image_name,
            row.instructions,
            row.servings,
            row.ingredients.map(ing => new Ingredient(ing.display_index, ing.name, ing.department, ing.quantity, ing.unit))
          )
        })
      })
  }

  public gotoDetail (id) {
    this.router.navigateByUrl(`detail/${id}`)
  }
}
