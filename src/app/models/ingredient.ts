export class Ingredient {
    display_index: number
    name: string
    department: string
    quantity: number
    unit: string

    constructor (
        display_index: number = 0,
        name: string = '',
        department: string = '',
        quantity: number = 0,
        unit: string = ''
    ) {
        this.display_index = display_index
        this.name = name
        this.department = department
        this.quantity = quantity
        this.unit = unit
    }
}
