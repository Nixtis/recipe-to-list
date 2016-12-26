import { ModuleWithProviders } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { RecipesListComponent } from './recipes-list/recipes-list.component'
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component'
import { ShoppingListComponent } from './shopping-list/shopping-list.component'

const recipesListRoute = {
    component: RecipesListComponent,
    path: '',
    useAsDefault: true,
}

const recipeDetailRoute = {
    component: RecipeDetailComponent,
    path: 'detail/:id',
    useAsDefault: true,
}

const shoppingListRoute = {
    component: ShoppingListComponent,
    path: 'shopping-list',
    useAsDefault: true,
}

const routes: Routes = [
    recipesListRoute,
    recipeDetailRoute,
    shoppingListRoute,
]

export const routing: ModuleWithProviders = RouterModule.forRoot(routes)
