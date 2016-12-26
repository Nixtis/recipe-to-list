import { AppActions } from './app.actions'

import { Recipe } from './models/recipe'

const initialState: IAppState = {
    shoppingList: [],
}

export function appReducer (state: IAppState = initialState, action) {
    switch (action.type) {
        case AppActions.ADD_RECIPE:
            let recipeKey: number = -1
            let recipe = Object.assign({}, state.shoppingList.filter((row, key) => {
                if (row.recipe_id === action.recipe.recipe_id) {
                    recipeKey = key
                    return true
                } else {
                    return false
                }
            })[0])

            if (recipe.recipe_id !== undefined) {
                recipe.servings += action.recipe.servings

                state.shoppingList = [
                    ...state.shoppingList.slice(0, recipeKey),
                    recipe,
                    ...state.shoppingList.slice(recipeKey + 1)
                ]
            } else {
                state.shoppingList = [
                    ...state.shoppingList,
                    action.recipe,
                ]
            }

            return state
        case AppActions.REMOVE_RECIPE:
            let shoppingList = [
                ...state.shoppingList.slice(0, action.index),
                ...state.shoppingList.slice(action.index + 1)
            ]

            console.log(shoppingList)
            return Object.assign({}, { shoppingList })
        default:
            return state
    }
}

export interface IAppState {
    shoppingList: Recipe[]
}
