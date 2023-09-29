var id = 0

class Pastry {
    constructor(name, ingredients) {
        this.id = this.makeID();
        this.name = name;
        this.ingredients = ingredients;
        this.price = this.getPrice();
    }

    getPrice() {
        let price = 0;
        this.ingredients.map(ingredient => {
            price += ingredient.price
        })
        return price
    }

    addIngredient(ingredient) {
        this.ingredients.push(ingredient)
        this.price += ingredient.price
    }

    removeIngredient(ingredient) {
        const index = this.ingredients.indexOf(ingredient)
        if (index > -1) {
            this.ingredients.splice(index, 1)
            this.price -= ingredient.price
        }
    }

    makeID() {
        return id++
    }
}

export default Pastry;