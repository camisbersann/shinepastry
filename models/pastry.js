var id = 0

class Pastry {
    constructor(name) {
        this.id = this.makeID();
        this.name = name;
        this.ingredients = [];
    }

    makeID() {
        return id++
    }

    addIngredient(ingredient) {
        this.ingredients.push(ingredient)
    }
}

export default Pastry;