import { Ingredient } from './ingredient'

export class Recipe {
    recipe_id: number
    title: string
    image_name: string
    instructions: string
    servings: number
    baseServings: number
    ingredients: Ingredient[]

    constructor (
        recipe_id: number = 0,
        title: string = '',
        image_name: string = '',
        instructions: string = '',
        servings: number = 0,
        ingredients: Ingredient[] = []
    ) {
        this.recipe_id = recipe_id
        this.title = title
        this.image_name = image_name
        this.instructions = instructions
        this.servings = servings
        this.baseServings = servings
        this.ingredients = ingredients
    }
}
