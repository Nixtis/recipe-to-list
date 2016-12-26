import { BrowserModule } from '@angular/platform-browser'
import { NgModule, ValueProvider } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { NgRedux, NgReduxModule } from 'ng2-redux/src'
import { MaterialModule } from '@angular/material'
import { Store, createStore } from 'redux'

import { environment } from '../environments/environment'

import { routing } from './app.routes'

import { RecipesService } from './services/recipes/recipes.service'

import { AppComponent } from './app.component'
import { RecipesListComponent } from './recipes-list/recipes-list.component'
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component'
import { ShoppingListComponent } from './shopping-list/shopping-list.component'

import { IAppState, appReducer } from './app.reducer';
import { GetQtyPipe } from './pipes/get-qty/get-qty.pipe';
import { FilterPipe } from './pipes/filter/filter.pipe'

const appStore: Store<IAppState> = environment.production ? createStore(appReducer) : createStore(appReducer, window['devToolsExtension'] && window['devToolsExtension']())

@NgModule({
  declarations: [
    AppComponent,
    RecipesListComponent,
    RecipeDetailComponent,
    ShoppingListComponent,
    GetQtyPipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    NgReduxModule.forRoot(),
    routing
  ],
  providers: [ NgRedux, RecipesService ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor (ngRedux: NgRedux<IAppState>) {
    ngRedux.provideStore(appStore)
  }
}
