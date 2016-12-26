import { Recipe } from './models/recipe'

export class AppActions {
    public static ADD_RECIPE: string = 'ADD_RECIPE'
    public static REMOVE_RECIPE: string = 'REMOVE_RECIPE'

    public static addRecipe (recipe: Recipe) {
        return {
            recipe,
            type: AppActions.ADD_RECIPE,
        }
    }

    public static removeRecipe (index: number) {
        return {
            index,
            type: AppActions.REMOVE_RECIPE,
        }
    }
}
