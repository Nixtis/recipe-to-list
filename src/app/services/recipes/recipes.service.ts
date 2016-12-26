import { Inject, Injectable } from '@angular/core'
import { Headers, Http, RequestOptions, Response } from '@angular/http'
import 'rxjs/add/operator/toPromise'

import { Recipe } from '../../models/recipe'

@Injectable()
export class RecipesService {
  private http: Http
  private recipesPath: string = '/assets/recipes.json'

  constructor(http: Http) {
    this.http = http
  }

  public getRecipesList (): Promise<any> {
    return this.http.get(this.recipesPath)
      .toPromise()
      .then(this.extractData)
  }

  public getRecipe (id: number): Promise<Recipe> {
    return this.http.get(this.recipesPath)
      .toPromise()
      .then(this.extractData)
      .then((data: Recipe[]) => {
        return data.filter(row => row.recipe_id === id)[0]
      })
  }

  private extractData (res: Response): any {
    let body = res.json()

    return body || {}
  }
}
