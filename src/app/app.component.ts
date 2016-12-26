import { Component, OnInit } from '@angular/core'
import { MdSnackBar } from '@angular/material'
import { Router } from '@angular/router'
import { NgRedux, select } from 'ng2-redux/src'
import { Observable } from 'rxjs/Rx'

import { AppActions } from './app.actions'
import { IAppState } from './app.reducer'

import { Recipe } from './models/recipe'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public shoppingList: Recipe[] = []
  public showBackBtn: boolean = false

  private router: Router
  private ngRedux: NgRedux<IAppState>
  private snackBar: MdSnackBar

  // Redux
  @select('shoppingList') private appState$: Observable<any>

  constructor (
    router: Router,
    ngRedux: NgRedux<IAppState>,
    snackBar: MdSnackBar
  ) {
    this.router = router
    this.ngRedux = ngRedux
    this.snackBar = snackBar
  }

  ngOnInit () {
    this.router.events.subscribe((param) => {
      this.showBackBtn = param.url !== '/'
    })

    this.appState$.subscribe(shoppingList => {
      this.shoppingList = shoppingList
    })
  }

  public deleteRecipeFromCart (index) {
    this.ngRedux.dispatch(AppActions.removeRecipe(index))

    this.snackBar.open('Your recipe has been deleted from your cart', 'Close', { duration: 5000 })
  }

  public gotoList () {
    this.router.navigateByUrl('/')
  }

  public gotoResults () {
    this.router.navigateByUrl('/shopping-list')
  }
}
